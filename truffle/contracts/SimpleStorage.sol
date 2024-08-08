// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SimpleStorage {
  uint256 value;
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
