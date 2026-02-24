#!/bin/bash

# ============================================
# ZCASH 
#
# Genera un json detallado mediante consultas al nodo.
# Este script esta hecho a mi medida  y lo que ves en 
# la pagina lo modifico segun lo que quiero mostrar.
#
# Necesitas Zebra sincronizado + lightwalletd + zingo-cli
# ============================================

# Configuración
ZEC_OUT="/var/www/html/zec/status.json"
ZEC_GRPC="carover0.xyz:9067"
ZEBRA_RPC="http://127.0.0.1:8232"
TIMESTAMP=$(date +%s)
DATETIME=$(date -u '+%Y-%m-%d %H:%M:%S UTC')

# ============================================
# 1. Obtener datos de lightwalletd vía gRPC
# ============================================
LWD_JSON=$(/usr/local/bin/grpcurl -d '{}' $ZEC_GRPC cash.z.wallet.sdk.rpc.CompactTxStreamer/GetLightdInfo 2>/dev/null)

if [ -n "$LWD_JSON" ] && [ "$(echo "$LWD_JSON" | jq -r '.version')" != "null" ]; then
    BLOCK_HEIGHT=$(echo "$LWD_JSON" | jq -r '.blockHeight')
    ESTIMATED_HEIGHT=$(echo "$LWD_JSON" | jq -r '.estimatedHeight')
    CHAIN_NAME=$(echo "$LWD_JSON" | jq -r '.chainName')
    DONATION_ADDR=$(echo "$LWD_JSON" | jq -r '.donationAddress')
    SAPLING_ACTIVATION=$(echo "$LWD_JSON" | jq -r '.saplingActivationHeight')
    CONSENSUS_BRANCH=$(echo "$LWD_JSON" | jq -r '.consensusBranchId')
    LWD_VERSION=$(echo "$LWD_JSON" | jq -r '.version')
    ZCASHD_BUILD=$(echo "$LWD_JSON" | jq -r '.zcashdBuild')
    ZCASHD_SUBVERSION=$(echo "$LWD_JSON" | jq -r '.zcashdSubversion')
    TADDR_SUPPORT=$(echo "$LWD_JSON" | jq -r '.taddrSupport')
    SYNCED=$([ "$BLOCK_HEIGHT" = "$ESTIMATED_HEIGHT" ] && echo "true" || echo "false")
    BLOCKS_BEHIND=$((ESTIMATED_HEIGHT - BLOCK_HEIGHT))
    LWD_RUNNING=true
else
    BLOCK_HEIGHT="null"
    ESTIMATED_HEIGHT="null"
    CHAIN_NAME="null"
    DONATION_ADDR="null"
    SAPLING_ACTIVATION="null"
    CONSENSUS_BRANCH="null"
    LWD_VERSION="null"
    ZCASHD_BUILD="null"
    ZCASHD_SUBVERSION="null"
    TADDR_SUPPORT="null"
    SYNCED="false"
    BLOCKS_BEHIND="null"
    LWD_RUNNING=false
fi

# ============================================
# 2. Obtener datos de Zebra RPC
# ============================================
ZEBRA_JSON=$(curl -s --data-binary '{"jsonrpc": "1.0", "id":"zecscript", "method": "getblockchaininfo", "params":[]}' -H 'content-type: application/json' $ZEBRA_RPC 2>/dev/null)

if [ -n "$ZEBRA_JSON" ] && [ "$(echo "$ZEBRA_JSON" | jq -r '.result')" != "null" ]; then
    ZEBRA_BLOCKS=$(echo "$ZEBRA_JSON" | jq -r '.result.blocks')
    ZEBRA_HEADERS=$(echo "$ZEBRA_JSON" | jq -r '.result.headers')
    ZEBRA_BESTBLOCKHASH=$(echo "$ZEBRA_JSON" | jq -r '.result.bestblockhash')
    ZEBRA_DIFFICULTY=$(echo "$ZEBRA_JSON" | jq -r '.result.difficulty')
    ZEBRA_CHAINWORK=$(echo "$ZEBRA_JSON" | jq -r '.result.chainwork')
    ZEBRA_VERIFICATION_PROGRESS=$(echo "$ZEBRA_JSON" | jq -r '.result.verificationprogress')
    ZEBRA_PRUNED=$(echo "$ZEBRA_JSON" | jq -r '.result.pruned')
else
    ZEBRA_BLOCKS="null"
    ZEBRA_HEADERS="null"
    ZEBRA_BESTBLOCKHASH="null"
    ZEBRA_DIFFICULTY="null"
    ZEBRA_CHAINWORK="null"
    ZEBRA_VERIFICATION_PROGRESS="null"
    ZEBRA_PRUNED="null"
fi

# ============================================
# 3. Datos del sistema
# ============================================
if [ -f /proc/uptime ]; then
    UPTIME_SECONDS=$(awk '{print int($1)}' /proc/uptime)
else
    UPTIME_SECONDS="null"
fi

LWD_PID=$(pgrep -f "lightwalletd.*--grpc-bind-addr" | head -1)
if [ -n "$LWD_PID" ]; then
    LWD_UPTIME=$(ps -o etimes= -p $LWD_PID 2>/dev/null | awk '{print $1}')
    LWD_UPTIME=${LWD_UPTIME:-0}
else
    LWD_UPTIME="null"
fi

# ============================================
# 4. Últimos 15 bloques
# ============================================
LAST_BLOCKS="[]"
if [ "$BLOCK_HEIGHT" != "null" ] && [ "$BLOCK_HEIGHT" -gt 15 ] 2>/dev/null; then
    START_HEIGHT=$((BLOCK_HEIGHT - 14))
    END_HEIGHT=$BLOCK_HEIGHT
    BLOCKS_JSON=$(grpcurl -d "{\"startHeight\": $START_HEIGHT, \"endHeight\": $END_HEIGHT}" $ZEC_GRPC cash.z.wallet.sdk.rpc.CompactTxStreamer/GetBlockRange 2>/dev/null)
    if [ -n "$BLOCKS_JSON" ]; then
        LAST_BLOCKS=$(echo "$BLOCKS_JSON" | jq -s '[.[] | {
            height: (.height | tonumber),
            hash: .hash,
            time: (.time | tonumber),
            tx_count: (.numTxns | tonumber),
            size: (.size | tonumber)
        }] | sort_by(.height)')
    fi
fi

# ============================================
# 5. Últimas 15 transacciones
# ============================================
LAST_TXS="[]"
if [ "$BLOCK_HEIGHT" != "null" ] && [ "$BLOCK_HEIGHT" -gt 15 ] 2>/dev/null; then
    START_HEIGHT=$((BLOCK_HEIGHT - 14))
    END_HEIGHT=$BLOCK_HEIGHT
    BLOCKS_WITH_TXS=$(grpcurl -d "{\"startHeight\": $START_HEIGHT, \"endHeight\": $END_HEIGHT}" $ZEC_GRPC cash.z.wallet.sdk.rpc.CompactTxStreamer/GetBlockRange 2>/dev/null)
    if [ -n "$BLOCKS_WITH_TXS" ]; then
        LAST_TXS=$(echo "$BLOCKS_WITH_TXS" | jq -s '[.[] | .vtx[]? | {
            txid: (.hash | @base64),
            block_height: (.height | tonumber),
            confirmations: (($END_HEIGHT - .height + 1) | tonumber)
        }] | sort_by(-.block_height, -.confirmations) | .[0:15]')
    fi
fi

# ============================================
# 6. Generar JSON final
# ============================================
cat > "$ZEC_OUT" <<EOF
{
  "meta": {
    "service": "zcash-lightwalletd-api",
    "schema": 2
  },
  "timestamp": $TIMESTAMP,
  "datetime": "$DATETIME",
  "health": {
    "state": $( [ "$LWD_RUNNING" = true ] && [ "$SYNCED" = "true" ] && echo '"ok"' || echo '"warning"' ),
    "synced": $SYNCED,
    "blocks_behind": $BLOCKS_BEHIND,
    "lightwalletd_running": $LWD_RUNNING
  },
  "chain": {
    "name": $([ "$CHAIN_NAME" = "null" ] && echo 'null' || echo "\"$CHAIN_NAME\"" ),
    "height": $BLOCK_HEIGHT,
    "estimated_height": $ESTIMATED_HEIGHT,
    "headers": $ZEBRA_HEADERS,
    "best_block": $([ "$ZEBRA_BESTBLOCKHASH" = "null" ] && echo 'null' || echo "\"$ZEBRA_BESTBLOCKHASH\"" ),
    "difficulty": $ZEBRA_DIFFICULTY,
    "chainwork": $([ "$ZEBRA_CHAINWORK" = "null" ] && echo 'null' || echo "\"$ZEBRA_CHAINWORK\"" ),
    "verification_progress": $ZEBRA_VERIFICATION_PROGRESS,
    "pruned": $ZEBRA_PRUNED,
    "size_on_disk_gb": null,
    "sapling_activation": $SAPLING_ACTIVATION,
    "consensus_branch_id": $([ "$CONSENSUS_BRANCH" = "null" ] && echo 'null' || echo "\"$CONSENSUS_BRANCH\"" )
  },
  "network": {
    "subversion": $([ "$ZCASHD_SUBVERSION" = "null" ] && echo 'null' || echo "\"$ZCASHD_SUBVERSION\"" ),
    "connections": 8,
    "inbound": 3,
    "outbound": 5
  },
  "mempool": {
    "size": 0,
    "bytes": 0,
    "usage_percent": 0
  },
  "mining": {
    "difficulty": $ZEBRA_DIFFICULTY,
    "block_reward": 3.125
  },
  "recent": {
    "blocks": $LAST_BLOCKS,
    "transactions": $LAST_TXS
  },
  "versions": {
    "lightwalletd": $([ "$LWD_VERSION" = "null" ] && echo 'null' || echo "\"$LWD_VERSION\"" ),
    "zcashd": $([ "$ZCASHD_BUILD" = "null" ] && echo 'null' || echo "\"$ZCASHD_BUILD\"" )
  },
  "donation": {
    "address": $([ "$DONATION_ADDR" = "null" ] && echo 'null' || echo "\"$DONATION_ADDR\"" ),
    "supports_taddr": $TADDR_SUPPORT
  },
  "node": {
    "uptime_seconds": $UPTIME_SECONDS,
    "lightwalletd_uptime_seconds": $LWD_UPTIME
  }
}
EOF

# ============================================
# 7. Verificar resultado
# ============================================
if [ $? -eq 0 ]; then
    echo "Status JSON generado correctamente en $ZEC_OUT"
    echo "Tamaño: $(du -h $ZEC_OUT | cut -f1)"
else
    echo "Error generando status JSON"
fi
root@vmi2547085:~#
