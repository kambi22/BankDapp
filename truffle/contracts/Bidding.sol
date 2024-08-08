// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bidding {
    address public owner;
    uint public tokenId;
    uint public endTime;
    address public nft;
    address public highestBidder;
    uint public highestBid;
    mapping(address => uint) public balances;
    bool public ended;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action.");
        _;
    }

    function createBidding(address _nft, uint _tokenId, uint _endTime, uint _initPriceInEther) external { // Ensure it's not already initialized
        owner = msg.sender;
        tokenId = _tokenId;
        nft = _nft;
        endTime = block.timestamp + _endTime;
        highestBid = _initPriceInEther * 1 ether; // Convert Ether to Wei
        ended = false;
    }

    function bid() external payable {
        require(!ended, "Auction has ended.");
        require(block.timestamp < endTime, "Bidding time is over.");
        require(msg.value > highestBid, "Bid must be higher than the current highest bid.");

        if (highestBidder != address(0)) {
            balances[highestBidder] += highestBid;
        }
        balances[msg.sender] += msg.value;

        highestBidder = msg.sender;
        highestBid = msg.value;
    }

    function withdraw() external payable returns  (bool) {
        require(msg.sender != highestBidder, "You cannot withdraw because you are the highest bidder.");
        uint amount = balances[msg.sender];
        require(amount > 0, "You are not a bidder.");

        balances[msg.sender] = 0;
        payable(msg.sender).transfer(amount);
        
        return true;
    }

    function endAuction() external payable onlyOwner {
        require(!ended, "Auction has already ended.");

        ended = true;
        owner = highestBidder;
        payable(msg.sender).transfer(highestBid);
    }
}
