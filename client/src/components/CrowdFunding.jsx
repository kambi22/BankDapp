import React, { useContext, useEffect, useState } from "react"
import { CrowdFundingPovider } from "../Web3Connection/CrowdFunding";
import { Button, TextField } from '@mui/material';
const CrodFunding = (props) => {
    const [indexId, setIndexId] = useState();
    const [goal, setGoal] = useState();
    const [deadline, setDeadline] = useState();
    const [penality, setPenality] = useState();
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0);
    const [isStoped, setIsStoped] = useState(false);
    const [penalityPercent, setPenalityPercent] = useState(0);
    const [campaignBy, setCampaignBy] = useState({});
    const [participants, setParticipants] = useState(0);
    const [contribute, setContribute] = useState(0);

    const { web3, account, contract, owner } = useContext(CrowdFundingPovider);
    //call stat variables---------------------------------------------------------------------------------
    const getBalance = async () => {
        try {
            const balance = await contract.methods.totalBalance(indexId).call();
            setBalance(web3.utils.fromWei(balance, "ether"));
            console.log("index id is :", indexId);
            console.log("balance is :", balance);
        } catch (error) {
            console.error("Error getting balance:", error);
        }
    };

    const getIsStopped = async () => {
        try {
            const isStoped = await contract.methods.isStoped(indexId).call();
            setIsStoped(isStoped);
            console.log("is stoped",isStoped)
        } catch (error) {
            console.error("Error getting isStopped status:", error);
        }
    };

    const getPenalityPercent = async () => {
        try {
            const penalityPercent = await contract.methods.penalityPercent(indexId).call();
            setPenalityPercent(penalityPercent);
        } catch (error) {
            console.error("Error getting penalityPercent:", error);
        }
    };

    const getCampaignBy = async () => {
        try {
            const campaignBy = await contract.methods.CampaignBy(indexId).call();
            console.log("get Campaign by that's Id", campaignBy);
            setCampaignBy(campaignBy);
        } catch (error) {
            console.error("Error getting campaignBy:", error);
        }
    };

    const getParticipants = async () => {
        try {
            const participants = await contract.methods.Participants(indexId).call();
            setParticipants(participants);
        } catch (error) {
            console.error("Error getting participants:", error);
        }
    };

    const getContribute = async () => {
        try {
            const contribute = await contract.methods.contribute(indexId, account).call();
            setContribute(contribute);
        } catch (error) {
            console.error("Error getting contribute:", error);
        }
    };
    useEffect(() => {
        if (contract && account && indexId !== undefined) {
            getBalance();
            getIsStopped();
            getPenalityPercent();
            getCampaignBy();
            getParticipants();
            getContribute();
        }
    }, [contract, account, indexId]);
    

    //call contract functions ------------------------------------------------------------------------

    const getCreateCampaign = async () => {
        try {
            const result = await contract.methods.CreateCampaign(indexId, goal, deadline, penality).send({ from: account });
            console.log("Campaign Successfully created", result);
            alert("Campaign Successfully created");
        } catch (error) {
            console.error("Error campaign is not created", error);
            alert("Error: Campaign is not created");
        }
    };

    const getFunding = async () => {
        try {
            const result = await contract.methods.Funding(indexId).send({ from: account, value: web3.utils.toWei(amount, "ether") });
            console.log("Successfully funded", result);
            alert("Successfully funded");
        } catch (error) {
            console.error("Funding failed", error);
            alert("Error: Funding failed");
        }
    };

    const getRefund = async () => {
        try {
            const result = await contract.methods.Refund(indexId).send({ from: account });
            console.log("Refunded", result);
            alert("Successfully refunded");
        } catch (error) {
            console.error("Refund failed", error);
            alert("Error: Refund failed");
        }
    };

    const getWithdraw = async () => {
        try {
            const result = await contract.methods.Withdraw(indexId).send({ from: account });
            console.log("Withdrawn", result);
            alert("Successfully withdrawn");
        } catch (error) {
            console.error("Withdraw failed", error);
            alert("Error: Withdraw failed");
        }
    };

    const getStop = async () => {
        try {
            const result = await contract.methods.Stop(indexId).send({ from: account });
            console.log("Stopped", result);
            alert("Campaign stopped");
        } catch (error) {
            console.error("Stop failed", error);
            alert("Error: Stop failed");
        }
    };

    const getRestart = async () => {
        try {
            const result = await contract.methods.Restart(indexId).send({ from: account });
            console.log("Restarted", result);
            alert("Campaign restarted");
        } catch (error) {
            console.error("Restart failed", error);
            alert("Error: Restart failed");
        }
    };

    const getCheckTime = async () => {
        try {
            const result = await contract.methods.CheckTime(indexId).call({ from: account });
            console.log("Time", result);
            alert(`Time check: ${result}`);
        } catch (error) {
            console.error("Time check failed", error);
            alert("Error: Time check failed");
        }
    };

    return (
        <div>
            <h5>Campaign Owner : {owner}</h5>
            <h5>Campaign Balance : {balance}</h5>
            <h5>Campaign is Stop: {isStoped}</h5>
            <h5>Campaign Participants : {participants}</h5>
            <h5>Campaign User Contribution Balance : {contribute}</h5>
            <h5>Campaign Goal: {goal}</h5>
            <h5>Campaign Deadline: {deadline}</h5>
            <h5>Campaign Penality in Percent: {penalityPercent}</h5>
            <h5>Campaign Penality : {penality}</h5>




             {/* <Button variant="contained" onClick={getBalance}>Total balance</Button><br /><br />
            <Button variant="contained" onClick={getisStoped}>getisStoped</Button><br /><br /> */}
            <Button variant="contained" onClick={getCampaignBy}>getCampaignBy</Button><br /><br />
            {/* <Button variant="contained" onClick={getParticipants}>getParticipants</Button><br /><br />
            <Button variant="contained" onClick={getcontribute}>getcontribute</Button><br /><br />
            <Button variant="contained" onClick={getpenalityPercent}>getpenalityPercent</Button><br /><br /> */}

            <TextField type='number' placeholder="Enter Index Id" onChange={(e) => setIndexId(e.target.value)}></TextField>
            <TextField type='number' placeholder="Enter Goal" onChange={(e) => setGoal(e.target.value)}></TextField>
            <TextField type='number' placeholder="Enter Deadline" onChange={(e) => setDeadline(e.target.value)}></TextField>
            <TextField type='number' placeholder="Enter Penality percent" onChange={(e) => setPenality(e.target.value)}></TextField>
            <Button onClick={getCreateCampaign} variant="contained" >Create Campaign</Button><br /><br />

            <TextField type='number' placeholder="Enter Contribution Amouont" onChange={(e) => setAmount(e.target.value)}></TextField><br />
            <Button className="" onClick={getFunding} variant="contained" >Funding</Button><br /><br />
            <Button className="" onClick={getRefund} variant="contained" >Refund</Button><br /><br />
            <Button className="" onClick={getWithdraw} variant="contained" >Withdraw</Button><br /><br />
            <Button className="" onClick={getStop} variant="contained" >Stop</Button><br /><br />
            <Button className="" onClick={getRestart} variant="contained" >Restart</Button><br /><br />
            <Button className="" onClick={getCheckTime} variant="contained" >CheckTime</Button><br /><br />




        </div>
    )
};

export default CrodFunding;
