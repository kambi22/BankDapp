// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CrowdFunding {
    struct Campaign {
        uint256 id;
        uint256 goal;
        uint256 deadline;
        bool withdraw;
        bool reached;
    }

    Campaign[] public campaigns;
    address payable public Owner;
    mapping(uint => bool) public isStoped;
    mapping(uint => uint) public penalityPercent;
    mapping(uint => mapping(address => uint)) public contribute;
    mapping(uint => uint) public totalBalance;
    mapping(uint => Campaign) public CampaignBy;
    mapping(uint => uint) public Participants;

    event CampaignFunded(uint indexed indexId, address contributor, uint amount);
    event CampaignRefunded(uint indexed indexId, address participant, uint amount);
    event CampaignCreated(uint indexed indexId, uint goal, uint deadline);
    event CheckGoal(uint indexed indexId, uint goal);
    event CheckBalance(uint indexed indexId, uint balance);

    constructor() {
        Owner = payable(msg.sender);
    }

    modifier OnlyOwner() {
        require(msg.sender == Owner, "Only Owner can Access this");
        _;
    }

    modifier isStopedCamp(uint indexId) {
        require(!isStoped[indexId], "Now Campaign stoped by owner");
        // execute code if campaign not stopped
        _;
    }

    modifier afterDeadline(uint indexId) {
        require(block.timestamp >= CampaignBy[indexId].deadline, "Only Owner can Access this");
        // execute code if time is over
        _;
    }

    function CreateCampaign(uint _id, uint _goal, uint _deadline, uint _penality) external {
        penalityPercent[_id] = _penality;

        Campaign memory newCampaign = Campaign({
            id: _id,
            goal: _goal * 1 ether, // Convert goal to Wei
            deadline: block.timestamp + _deadline,
            reached: false,
            withdraw: false
        });

        campaigns.push(newCampaign);
        CampaignBy[_id] = newCampaign;

        emit CampaignCreated(_id, _goal, _deadline);
    }

    function Funding(uint indexId) external payable isStopedCamp(indexId) {
        require(msg.value >= 1 ether, "Contribution should be greater than or equal to 1 ether");
        require(block.timestamp <= CampaignBy[indexId].deadline, "Time is over, you can't fund");
        Campaign storage Camp = CampaignBy[indexId];
        require(Camp.id == indexId, "Campaign Does not exist");

        Participants[indexId]++;
        contribute[indexId][msg.sender] += msg.value;
        totalBalance[indexId] += msg.value;

        emit CheckGoal(indexId, Camp.goal);
        emit CheckBalance(indexId, totalBalance[indexId]);

        if (totalBalance[indexId] >= Camp.goal) {
            Camp.reached = true;
        }

        emit CampaignFunded(indexId, msg.sender, msg.value);
    }

    function Refund(uint indexId) external afterDeadline(indexId) isStopedCamp(indexId) {
        Campaign storage camp = CampaignBy[indexId];
        require(!camp.reached, "You cannot refund because the goal is reached");
        uint amount = contribute[indexId][msg.sender];
        require(amount >= 1 ether, "You are not a participant");
        uint penalty = (amount * penalityPercent[indexId] / 100);
        uint refundAmount = amount - penalty;

        (bool sent,) = payable(msg.sender).call{value: refundAmount}("");
        require(sent, "Transfer failed");

        contribute[indexId][msg.sender] = 0;
        totalBalance[indexId] -= amount;

        emit CampaignRefunded(indexId, msg.sender, refundAmount);
    }

    function Withdraw(uint indexId) external payable OnlyOwner() isStopedCamp(indexId) afterDeadline(indexId) {
        Campaign storage camp = CampaignBy[indexId];
        require(camp.reached, "Cannot withdraw because campaign not reached goal");
        require(!camp.withdraw, "Already withdrawn amount");

        uint amount = totalBalance[indexId];

        (bool sent,) = Owner.call{value: amount}("");
        require(sent, "Transfer Failed");
        totalBalance[indexId] = 0;
        camp.withdraw = true;
    }

    function Stop(uint indexId) external OnlyOwner {
        isStoped[indexId] = true;
    }

    function Restart(uint indexId) external OnlyOwner {
        isStoped[indexId] = false;
    }

    function CheckTime(uint indexId) external view returns (string memory time) {
        if (block.timestamp > CampaignBy[indexId].deadline) {
            return "Stop, time is over";
        } else {
            return "Continue, time is not over";
        }
    }
}
