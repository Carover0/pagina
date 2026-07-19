// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// cΔrovΣr0 · Mensajes descentralizados en Polygon


contract MessageBoard {
    struct Message {
        address sender;
        string text;
        uint256 timestamp;
    }
    
    Message[] public messages;
    
    function sendMessage(string memory _text) public {
        require(bytes(_text).length > 0, "Vacio");
        require(bytes(_text).length <= 200, "Muy largo");
        messages.push(Message(msg.sender, _text, block.timestamp));
    }
    
    function getMessages(uint256 limit) public view returns (Message[] memory) {
        uint256 count = messages.length > limit ? limit : messages.length;
        Message[] memory result = new Message[](count);
        for (uint i = 0; i < count; i++) {
            result[i] = messages[messages.length - count + i];
        }
        return result;
    }
    
    function getTotalMessages() public view returns (uint256) {
        return messages.length;
    }
}