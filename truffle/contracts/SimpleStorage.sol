// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleStorage {
  uint256 public value;
  address public owner;

  constructor(){
    owner = msg.sender;
  }

  function read() public view returns (uint256) {
    return value;
  }

  function write(uint256 newValue) public {
    value = newValue;
  }
  function getOwener() public view returns(address ){
    return owner;
  }
}
