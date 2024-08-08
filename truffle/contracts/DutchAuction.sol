// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DutchAuction {
    address public owner;
    address public nft;
    address public buyer;
    uint public startPrice;
    uint public endPrice;
    uint public startTime;
    uint public endTime;
    bool public isActive;

    event startsell(bool start, string message);
    event buyitem(address buyer, uint getCurrentprice, string message);
    event stopsell(uint currentPrice, string message);
    event restartsell(uint currentprice, string message);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    modifier auctionActive() {
        require(isActive, "Auction is not active");
        _;
    }

    modifier auctionNotActive() {
        require(!isActive, "Auction is active");
        _;
    }

    function startSell(address _nft, uint _duration, uint _startPrice, uint _endPrice) public {
        require(_nft != address(0), "NFT address cannot be zero");
        require(_startPrice > _endPrice, "Start price must be greater than end price");
        require(_duration > 0, "Duration must be greater than zero");

        nft = _nft;
        owner = msg.sender;
        startPrice = _startPrice * 1 ether;
        endPrice = _endPrice * 1 ether;
        startTime = block.timestamp;
        endTime = startTime + _duration;
        isActive = true;

        emit startsell(true, "Selling start");
    }

    function getCurrentPrice() public view returns (uint) {
        if (block.timestamp >= endTime) {
            return endPrice;
        }

        uint elapsedTime = block.timestamp - startTime;
        uint totalTime = endTime - startTime;
        uint priceDecrease = startPrice - endPrice;
        uint currentPrice = startPrice - (priceDecrease * elapsedTime / totalTime);

        return currentPrice;
    }

    function buyItem() public payable auctionActive {
        uint currentprice = getCurrentPrice();
        require(msg.value >= currentprice, "Insufficient funds to buy item");

        isActive = false;
        buyer = msg.sender;

        // Transfer only the current price to the owner
        payable(owner).transfer(currentprice);

        uint refund = msg.value - currentprice;
        if (refund > 0) {
            payable(buyer).transfer(refund);
        }
        emit buyitem(buyer, currentprice, "Successfully bought item");
    }

    function stopSell() public onlyOwner auctionActive {
        isActive = false;
        emit stopsell(getCurrentPrice(), "Selling stopped");
    }

    function restart() public onlyOwner auctionNotActive {
        require(block.timestamp < endTime, "Auction has ended");
        isActive = true;
        emit restartsell(getCurrentPrice(), "Selling restarted");
    }
}
