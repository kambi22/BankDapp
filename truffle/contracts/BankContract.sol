// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Bank {
    address public owner;
    mapping(address => uint256) public Balances;
    event deposit(address Rcipient, uint256 Amount,string message);
    event withdraw(address Rcipient, uint256 Amount,string message);
    constructor() {
        owner = msg.sender;
    }

    function Deposit() public payable {
        require(msg.value >= 1 ether, "Amount will be greater then 1 ehter");
        Balances[msg.sender] += msg.value;
        emit deposit(msg.sender, msg.value,"Deposit");
    }
    function Withdraw(uint256 _amount) public payable {
        uint256 balance = Balances[msg.sender];
        require(_amount <= balance, "Your are not participant");
        Balances[msg.sender] -= _amount;
        (bool sent, ) = msg.sender.call{value: _amount}("");
        require(sent, "Transaction Failed");
        emit withdraw(msg.sender, _amount,"Withdraw");
    }
}
