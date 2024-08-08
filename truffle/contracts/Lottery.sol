// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Lottery{
    address public Manager;
    address payable[]  public  players;
    address payable public Winner;
    constructor(){
        Manager = msg.sender;
    }

    function Joinlottery() external payable{
        require(msg.value >= 2 ether,"Please pay should be greater then 2 ether");
        players.push(payable (msg.sender));
    }
    function getBalance() public view returns(uint256){
        return address(this).balance;
    }
    function getPlayers( ) view public returns (address payable[] memory) {
        return players;
        
    }

    function Rendom() public view returns(uint256) {
        return uint256(keccak256(abi.encodePacked(blockhash(block.number),block.timestamp,players.length)));
    }

    function SelecteWinner() public payable{
        require(msg.sender == Manager,"Only Manager can be select winner");
        require(players.length >= 3,"Players Length must be greater than three");//greater than 3 becouse if its less than 3 than we can't get riminder(carry)
        uint256 value = Rendom();
        uint256 index = value % players.length;//% this sign return reminder(carry) during devision 
        Winner = players[index];// .ex: 10/3 = 9/3 +1 here is one is remain reminder we get reminder value to select winner
        (bool sent,) = Winner.call{value: getBalance()}("");
        require(sent,"Transfer failed");
        
    }

    function Reset() public {
        players = new address payable[](0);
        
    }
}