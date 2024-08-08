// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AdvanceBank {
    struct Account {
        uint id;
        string name;
        address addr;
    }
    address public Manager;
    mapping(address => mapping(uint => uint)) public balances;
    mapping(address => mapping(uint => bool)) public isfreez;
    mapping(uint => Account) private accountsById; // Mapping to access accounts by ID
    mapping(uint => bool) private accountExists; // Mapping to check if account ID exists
    Account[] public  accounts; // array store accounts
    event createAccountEvent(uint id,string name,address addr, string message);
    event depositEvent(address user, uint amount, string message);
    event withdrawEvent(address user, uint amount, string message);
    event transferEvent(address user, address to, uint amount, string message);
    event emergencyEvent(address user, uint amount, string message);
    event freezEvent(address manager, string message);
    event unfreezEvent(address manager, string message);
    event changeManagerEvent(address oldManager, address newManager, string message);
    event payInterestEvent(uint payPercent, uint amount, string message);
    event checkEvent(uint result, string message);
    event DeleteEvent(uint index,bool status, string message);

    modifier onlyManager() {
        require(msg.sender == Manager, "Only Manager Can Take This Action");
        _;
    }

    modifier notFreez(uint _id) {
        require(!isfreez[msg.sender][_id], "This Account Is Freezed By Manager");
        _;
    }

    modifier isAccount(uint _id) {
        require(accountExists[_id], "Account Does Not Exist On This ID");
        _;
    }

    constructor() {
        Manager = msg.sender;
    }

    function createAccount(uint _id, string memory _name, address _addr) public {
        require(_addr != address(0), "Invalid Address, Make Address Is Vailed");
        require(!accountExists[_id], "Account Already Exist On This Id, Please Choose different Id");

        Account memory newAccount = Account({id: _id, name: _name, addr: _addr});

        accounts.push(newAccount);
        accountsById[_id] = newAccount;
        accountExists[_id] = true;
        emit createAccountEvent(_id, _name, _addr, "Account Successfuly Created");
    }
    function check(uint value) public pure returns(uint result) {
        require(value >=10 ,"Value should be greater than equal 10");
        return value;
        
    }

    function getAccountById(uint _id) public view returns (Account memory) {
        require(accountExists[_id], "Account Does Not Exist");
        return accountsById[_id];
    }

    function getAllAccounts() public view returns (Account[] memory) {
        return accounts;
    }

    function deposit(uint _id) public payable notFreez(_id) isAccount(_id) {
        require(msg.value >= 1 ether, "Pay Should Be Greateer Than 1 Ether");

        balances[msg.sender][_id] += msg.value;
        emit depositEvent(msg.sender, msg.value, "Amount Successfully deposit");
    }

    function withdraw(uint _id, uint amount) public isAccount(_id) notFreez(_id) {
        uint balance = balances[msg.sender][_id];
        require(balance >= amount, "Insufficient Balance");

        balances[msg.sender][_id] -= amount;
        (bool sent, ) = payable(msg.sender).call{value: amount}("");
        require(sent, "Transfer failed");
        emit withdrawEvent(msg.sender, amount, "Successfully withdraw");
    }

    function transferAmount(uint _id, uint recipientId, address to, uint amount) public notFreez(_id) isAccount(_id) {
        uint balance = balances[msg.sender][_id];
        require(balance >= amount, "Insufficient Balance");

        balances[msg.sender][_id] -= amount;
        balances[to][recipientId] += amount;
        emit transferEvent(msg.sender, to, amount, "Successfully Transfer");
    }

    function freezAcount(uint _id, address addr) public onlyManager isAccount(_id) {
        isfreez[addr][_id] = true;
        emit freezEvent(msg.sender, "Account Freezed By Manager");
    }

    function unfreezAcount(uint _id, address addr) public onlyManager {
        require(isfreez[addr][_id], "Account Is Not Freezed");
        isfreez[addr][_id] = false;
        emit unfreezEvent(msg.sender, "Account Un-Freez By Manager");
    }

    function emergencyWithdraw() public onlyManager {
        uint contractBalance = address(this).balance;
        payable(Manager).transfer(contractBalance);
        emit emergencyEvent(Manager, contractBalance, "Successfully Withdraw by emergency withdraw");
    }

    function changeManager(address newManager) public  {
        require(newManager != address(0), "New Manager Address Cannot Be Zero Address");
        address oldManager = msg.sender;
        Manager = newManager;
        emit changeManagerEvent(oldManager, newManager, "Manager Successfully Changed");
    }

    function payInterest(uint recipientId, address to, uint payPercent) public onlyManager notFreez(recipientId) isAccount(recipientId) {
        uint amount = balances[to][recipientId] / payPercent;
        balances[to][recipientId] += amount;
        (bool sent, ) = payable(to).call{value: amount}("");
        require(sent, "Transfer Failed");
        emit payInterestEvent(payPercent, amount, "Successfully Payed Interest To User");
    }
    function DeleteAccount(uint _id, address _addr) public onlyManager isAccount(_id) returns(bool) {
        uint256 balance = balances[_addr][_id];
        balances[_addr][_id] = 0;
        payable(_addr).transfer(balance);
        
        delete accountsById[_id];
        uint index;
        for (uint i= 0; i < accounts.length; i++) // find element index from an array
        {
            if (accounts[i].id == _id) { //when acccount[index].id == id the set value to index
                index = i;
                break;
            }
        } // const accounts = ['satnam','jassa','gopy','ravi'];
        //            index =       0,      1       2       3
        // length - 1 , because array start with 0 and length is counting with 1 
        // length = 4-1 = 3 is last index in an array
        // set acount[2] = accounts[4-1]  , // new value in accounts[3] replace element with last element
        //  resutl :- accounts = ['satnam','jassa','ravi','ravi']; now remove last element using pop();
        accounts[index] = accounts[accounts.length -1]; // accounts.length - 1 is return last index in an array
        accounts.pop();

        accountExists[_id] = false;
        
        emit DeleteEvent(index, true,"Account Successfully Deleted");

        return true;
    }
}
