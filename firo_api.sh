# contruido por etapas y modificado de acuerdo a mis necesidades.
# debe correr en el vps donde se ejecuta el nodo.
# si lo implementas tene en cuenta las rutas en tu nodo
# revisa las versiones porque cambia periodicamente de acuerdo a lo que voy haciendo.

#!/bin/bash

LOCKFILE="/tmp/firo_api.lock"

exec 9>"$LOCKFILE"
flock -n 9 || exit 1

### ===== FIRO FULL STATUS API =====

FIRO_CLI="/root/firo_node/bin/firo-cli"
FIRO_CONF="/root/firo_node/.firo/firo.conf"
FIRO_DATADIR="/root/firo_node/.firo"

FIRO_OUT="/var/www/html/api/firo.json"

NOW_TS=$(date +%s)
NOW_HUMAN=$(date -u +"%Y-%m-%d %H:%M:%S UTC")

### --- RPC CALLS ---
BCINFO=$($FIRO_CLI -conf=$FIRO_CONF getblockchaininfo)
NETINFO=$($FIRO_CLI -conf=$FIRO_CONF getnetworkinfo)
MEMINFO=$($FIRO_CLI -conf=$FIRO_CONF getmempoolinfo)
MININFO=$($FIRO_CLI -conf=$FIRO_CONF getmininginfo)
PEERINFO=$($FIRO_CLI -conf=$FIRO_CONF getpeerinfo)

### --- PROCESS UPTIME ---
FIRO_PID=$(pidof firod)
UPTIME=$(ps -o etimes= -p "$FIRO_PID" | tr -d ' ')

### --- BLOCKCHAIN ---
BLOCKS=$(echo "$BCINFO" | jq '.blocks')
HEADERS=$(echo "$BCINFO" | jq '.headers')
VERIFY=$(echo "$BCINFO" | jq '.verificationprogress')
CHAIN=$(echo "$BCINFO" | jq -r '.chain')
BESTHASH=$(echo "$BCINFO" | jq -r '.bestblockhash')
DIFFICULTY=$(echo "$BCINFO" | jq '.difficulty')
CHAINWORK=$(echo "$BCINFO" | jq -r '.chainwork')
PRUNED=$(echo "$BCINFO" | jq '.pruned')
MEDIANTIME=$(echo "$BCINFO" | jq '.mediantime')

BLOCKS_BEHIND=$((HEADERS - BLOCKS))
SYNCED=$(echo "$VERIFY > 0.999" | bc)

SIZE_ON_DISK=$(du -sb "$FIRO_DATADIR" | awk '{print $1}')
CLOCK_DRIFT=$((NOW_TS - MEDIANTIME))

### --- NETWORK ---
CONNECTIONS=$(echo "$NETINFO" | jq '.connections')
PROTOCOL=$(echo "$NETINFO" | jq '.protocolversion')
SUBVERSION=$(echo "$NETINFO" | jq -r '.subversion')
RELAYFEE=$(echo "$NETINFO" | jq '.relayfee')
LOCALSERVICES=$(echo "$NETINFO" | jq -r '.localservices')

### --- PEERS ---
INBOUND=$(echo "$PEERINFO" | jq '[.[] | select(.inbound==true)] | length')
OUTBOUND=$(echo "$PEERINFO" | jq '[.[] | select(.inbound==false)] | length')

### --- MEMPOOL ---
MEM_TX=$(echo "$MEMINFO" | jq '.size')
MEM_BYTES=$(echo "$MEMINFO" | jq '.bytes')
MEM_USAGE=$(echo "$MEMINFO" | jq '.usage')
MEM_MAX=$(echo "$MEMINFO" | jq '.maxmempool')

### --- MINING ---
HASHRATE=$(echo "$MININFO" | jq '.networkhashps')
MIN_DIFF=$(echo "$MININFO" | jq '.difficulty')
MIN_BLOCKS=$(echo "$MININFO" | jq '.blocks')

### --- HEALTH ---
if [ "$SYNCED" -eq 1 ] && [ "$BLOCKS_BEHIND" -eq 0 ]; then
  HEALTH="ok"
elif [ "$BLOCKS_BEHIND" -lt 5 ]; then
  HEALTH="almost_synced"
else
  HEALTH="syncing"
fi

LOW_CONN=$( [ "$CONNECTIONS" -lt 8 ] && echo true || echo false )

### --- LAST 10 BLOCKS ---
LAST_BLOCKS_JSON="["
CURRENT_HEIGHT=$BLOCKS

for ((i=0;i<15;i++)); do
  HEIGHT=$((CURRENT_HEIGHT - i))
  HASH=$($FIRO_CLI -conf=$FIRO_CONF getblockhash $HEIGHT)
  BLOCK=$($FIRO_CLI -conf=$FIRO_CONF getblock $HASH)

  TIME=$(echo "$BLOCK" | jq '.time')
  TXCOUNT=$(echo "$BLOCK" | jq '.tx | length')
  SIZE=$(echo "$BLOCK" | jq '.size')

  LAST_BLOCKS_JSON+="{\"height\":$HEIGHT,\"hash\":\"$HASH\",\"time\":$TIME,\"tx_count\":$TXCOUNT,\"size\":$SIZE},"
done

LAST_BLOCKS_JSON="${LAST_BLOCKS_JSON%,}]"

### --- LAST 10 TRANSACTIONS ---

LAST_TX_JSON="["
TX_COUNTER=0
HEIGHT=$BLOCKS

while [ $TX_COUNTER -lt 15 ]; do
  HASH=$($FIRO_CLI -conf=$FIRO_CONF getblockhash $HEIGHT)
  BLOCK=$($FIRO_CLI -conf=$FIRO_CONF getblock $HASH | jq -r '.tx[]')

  for TX in $BLOCK; do
    RAW=$($FIRO_CLI -conf=$FIRO_CONF getrawtransaction $TX 1)

    SIZE=$(echo "$RAW" | jq '.size')
    CONFIRM=$(echo "$RAW" | jq '.confirmations')
    TIME=$(echo "$RAW" | jq '.time')
    VALUE_OUT=$(echo "$RAW" | jq '[.vout[].value] | add')

    LAST_TX_JSON+="{\"txid\":\"$TX\",\"block_height\":$HEIGHT,\"confirmations\":$CONFIRM,\"size\":$SIZE,\"value_out\":$VALUE_OUT,\"time\":$TIME},"

    TX_COUNTER=$((TX_COUNTER + 1))
    if [ $TX_COUNTER -ge 10 ]; then
      break
    fi
  done

  HEIGHT=$((HEIGHT - 1))
done

LAST_TX_JSON="${LAST_TX_JSON%,}]"


### --- MEMPOOL ---
#MEMPOOL_TXS=$($FIRO_CLI -conf=$FIRO_CONF getrawmempool | jq '.[0:10]')

MEMPOOL_TXS=$($FIRO_CLI -conf=$FIRO_CONF getrawmempool)
for txid in $(echo "$MEMPOOL_TXS" | jq -r '.[]'); do
    RAW_TX=$($FIRO_CLI -conf=$FIRO_CONF getrawtransaction $txid true)
    VALUE_OUT=$(echo "$RAW_TX" | jq '[.vout[].value] | add')
    echo "$txid -> $VALUE_OUT Firo"
done

MEMPOOL_PREVIEW_JSON=$(for txid in $(echo "$MEMPOOL_TXS" | jq -r '.[]'); do
    RAW_TX=$($FIRO_CLI -conf=$FIRO_CONF getrawtransaction $txid true)
    VALUE_OUT=$(echo "$RAW_TX" | jq '[.vout[].value] | add')
    echo "{\"txid\":\"$txid\",\"value_out\":$VALUE_OUT}"
done | jq -s .)


LAST_BLOCKS_YAML="${LAST_BLOCKS_JSON#[}"
LAST_BLOCKS_YAML="${LAST_BLOCKS_YAML%]}"

LAST_TX_YAML="${LAST_TX_JSON#[}"
LAST_TX_YAML="${LAST_TX_YAML%]}"

LAST_BLOCKS_YAML="${LAST_BLOCKS_JSON#[}"
LAST_BLOCKS_YAML="${LAST_BLOCKS_YAML%]}"

MEMPOOL_YAML="${MEMPOOL_TXS#[}"
MEMPOOL_YAML="${MEMPOOL_YAML%]}"

# LAST BLOCKS
LAST_BLOCKS_YAML=$(echo "$LAST_BLOCKS_JSON" | jq -r '.[] | "  - height: \(.height)\n    hash: \(.hash)\n    time: \(.time)\n    tx_count: \(.tx_count)\n    size: \(.size)"')

# LAST TRANSACTIONS
LAST_TX_YAML=$(echo "$LAST_TX_JSON" | jq -r '.[] | "  - txid: \(.txid)\n    block_height: \(.block_height)\n    confirmations: \(.confirmations)\n    size: \(.size)\n    value_out: \(.value_out)\n    time: \(.time)"')

# MEMPOOL PREVIEW
MEMPOOL_YAML=$(echo "$MEMPOOL_TXS" | jq -r '.[] | "  - \(. )"')

### --- OUTPUT ---
cat > "$FIRO_OUT" <<EOF
{
  "meta": {
    "service": "firo-node-api",
    "schema": 1
  },

  "timestamp": $NOW_TS,
  "datetime": "$NOW_HUMAN",

  "health": {
    "state": "$HEALTH",
    "synced": $( [ "$SYNCED" -eq 1 ] && echo true || echo false ),
    "blocks_behind": $BLOCKS_BEHIND
  },

  "blockchain": {
    "chain": "$CHAIN",
    "blocks": $BLOCKS,
    "headers": $HEADERS,
    "bestblockhash": "$BESTHASH",
    "difficulty": $DIFFICULTY,
    "chainwork": "$CHAINWORK",
    "pruned": $PRUNED,
    "size_on_disk_bytes": $SIZE_ON_DISK
  },

  "network": {
    "connections": $CONNECTIONS,
    "protocolversion": $PROTOCOL,
    "subversion": "$SUBVERSION",
    "relayfee": $RELAYFEE,
    "localservices": "$LOCALSERVICES"
  },

  "peers": {
    "inbound": $INBOUND,
    "outbound": $OUTBOUND
  },

  "mempool": {
    "txcount": $MEM_TX,
    "bytes": $MEM_BYTES,
    "usage": $MEM_USAGE,
    "maxmempool": $MEM_MAX
  },

  "mining": {
    "networkhashps": $HASHRATE,
    "difficulty": $MIN_DIFF,
    "blocks": $MIN_BLOCKS
  },

  "time": {
    "mediantime": $MEDIANTIME,
    "clock_drift_seconds": $CLOCK_DRIFT
  },

  "node": {
    "uptime_seconds": $UPTIME
  },

  "flags": {
    "low_connections": $LOW_CONN
  },
  "recent": {
    "last_15_blocks": $LAST_BLOCKS_JSON,
    "last_15_transactions": $LAST_TX_JSON,
    "mempool_preview": $MEMPOOL_PREVIEW_JSON
  }
}
EOF

FIRO_OUT_TXT="/var/www/html/api/firo.txt"

cat > "$FIRO_OUT_TXT" <<EOF
FIRO NODE STATUS
================

Timestamp: $NOW_TS
Datetime: $NOW_HUMAN

Health:
  State: $HEALTH
  Synced: $( [ "$SYNCED" -eq 1 ] && echo yes || echo no )
  Blocks Behind: $BLOCKS_BEHIND

Blockchain:
  Chain: $CHAIN
  Blocks: $BLOCKS
  Headers: $HEADERS
  Best Block Hash: $BESTHASH
  Difficulty: $DIFFICULTY
  Chainwork: $CHAINWORK
  Pruned: $PRUNED
  Size on Disk: $SIZE_ON_DISK bytes

Network:
  Connections: $CONNECTIONS
  Protocol Version: $PROTOCOL
  Subversion: $SUBVERSION
  Relay Fee: $RELAYFEE
  Local Services: $LOCALSERVICES

Peers:
  Inbound: $INBOUND
  Outbound: $OUTBOUND

Mempool:
  TX Count: $MEM_TX
  Bytes: $MEM_BYTES
  Usage: $MEM_USAGE
  Max Mempool: $MEM_MAX

Mining:
  Network Hashrate: $HASHRATE
  Difficulty: $MIN_DIFF
  Blocks: $MIN_BLOCKS

Time:
  Median Time: $MEDIANTIME
  Clock Drift: $CLOCK_DRIFT sec

Node:
  Uptime: $UPTIME sec

Flags:
  Low Connections: $LOW_CONN

Recent:
  Last 15 blocks: $LAST_BLOCKS_YAML
  Last 15 transactions: $LAST_TX_YAML
  Mempool preview: $MEMPOOL_YAML


EOF


### --- GENERAR SNAPSHOT TXT PARA WEB --- ###

OUT="/var/www/html/zfiro.txt"
TMP="/tmp/firo_snapshot.tmp"

BLOCKCHAIN_INFO=$($FIRO_CLI -conf=$FIRO_CONF getblockchaininfo)
CURRENT_BLOCK=$(echo "$BLOCKCHAIN_INFO" | jq -r '.blocks')
MEDIAN_TIME=$(echo "$BLOCKCHAIN_INFO" | jq -r '.mediantime')

echo "INFO|$CURRENT_BLOCK|$MEDIAN_TIME|$(date +%s)" > "$TMP"

################################
# 150 BLOQUES
################################
for i in $(seq 0 149); do
  HEIGHT=$((CURRENT_BLOCK - i))
  HASH=$($FIRO_CLI -conf=$FIRO_CONF getblockhash $HEIGHT)
  BLOCK=$($FIRO_CLI -conf=$FIRO_CONF getblock "$HASH" true)

  TIME=$(echo "$BLOCK" | jq -r '.time')
  SIZE=$(echo "$BLOCK" | jq -r '.size')
  TXC=$(echo "$BLOCK" | jq '.tx | length')

  echo "BLOCK|$HEIGHT|$HASH|$TIME|$TXC|$SIZE" >> "$TMP"
done

# 150 TRANSACCIONES

FIRO_CLI="/root/firo_node/bin/firo-cli"
FIRO_CONF="/root/firo_node/.firo/firo.conf"


CURRENT_BLOCK=$($FIRO_CLI -conf=$FIRO_CONF getblockcount)

for i in $(seq 0 149); do

  HEIGHT=$((CURRENT_BLOCK - i))
  HASH=$($FIRO_CLI -conf=$FIRO_CONF getblockhash $HEIGHT)
  BLOCK=$($FIRO_CLI -conf=$FIRO_CONF getblock "$HASH" true)

  BLOCK_TIME=$(echo "$BLOCK" | jq -r '.time')

  # recorrer txid directamente
  for TXID in $(echo "$BLOCK" | jq -r '.tx[]'); do

    if [ -z "$TXID" ]; then
      continue
    fi

    TX=$($FIRO_CLI -conf=$FIRO_CONF getrawtransaction "$TXID" true 2>/dev/null)

    if [ -z "$TX" ]; then
      continue
    fi

    TOTAL=$(echo "$TX" | jq '[.vout[].value] | add')

    LINE="TX|$TXID|$HEIGHT|$TOTAL|$BLOCK_TIME|"

    ################################
    # INPUTS
    ################################

    VIN_COUNT=$(echo "$TX" | jq '.vin | length')

    for ((v=0; v<VIN_COUNT; v++)); do

      PREV_TXID=$(echo "$TX" | jq -r ".vin[$v].txid // empty")
      PREV_VOUT=$(echo "$TX" | jq -r ".vin[$v].vout // empty")

      if [ -z "$PREV_TXID" ]; then
        continue
      fi

      PREV_TX=$($FIRO_CLI -conf=$FIRO_CONF getrawtransaction "$PREV_TXID" true 2>/dev/null)

      if [ -z "$PREV_TX" ]; then
        continue
      fi

      IN_ADDR=$(echo "$PREV_TX" | jq -r ".vout[$PREV_VOUT].scriptPubKey.addresses[0] // empty")
      IN_VAL=$(echo "$PREV_TX" | jq -r ".vout[$PREV_VOUT].value // empty")

      LINE="${LINE}<- ${IN_ADDR}:${IN_VAL};"

    done

    ################################
    # OUTPUTS
    ################################

    VOUT_COUNT=$(echo "$TX" | jq '.vout | length')

    for ((n=0; n<VOUT_COUNT; n++)); do

      OUT_ADDR=$(echo "$TX" | jq -r ".vout[$n].scriptPubKey.addresses[0] // empty")
#      OUT_VAL=$(echo "$TX" | jq -r ".vout[$n].value // empty")
      OUT_VAL=$(echo "$TX" | jq -r ".vout[$n].value // 0" | awk '{printf "%.8f", $1}')

      LINE="${LINE}-> ${OUT_ADDR}:${OUT_VAL};"

    done

    echo "$LINE" >> "$TMP"

  done
done

################################
# REEMPLAZO ATÓMICO
################################
mv "$TMP" "$OUT"
