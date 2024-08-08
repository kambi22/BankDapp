import React, { useContext, useEffect, useState } from "react"
import LotteryProvider, { LotteryContext } from "../Web3Connection/LotteryProvider";
import { Card, Container } from 'react-bootstrap';
import { Button, ButtonGroup, ButtonGroupButtonContext, selectClasses } from "@mui/material";

const Lottery = (props) => {
    const [balance, setBalance] = useState();
    const [random, setRandom] = useState();
    const [Amount, setAmount] = useState();
    const [winner, setWinner] = useState();
    let Players = ['0x4f6C2D6f2d480F4aA36AdC6aF24390D3e0B22316', '0x4f6C2D6f2d480F4aA36AdC6aF24390D3e0B22316', '0x3268d8bbC09E1a16Fd3b98f31c7d46C94eAcc6cb', '0x8258b01a07Ab4Fc2EE758B2c17C3b69Ae83b7A8b'];
    let players = [1, 3, 4, 5];
    const superHeroes = ['Superman', 'Batman', 'Wonder Woman', 'Flash', 'Aquaman'];
    const { web3, Account, contract, Manager } = useContext(LotteryContext);//4 import useContext(pass ContextVariable) and get Value that imported

    useEffect(() => {
        GetBalance()
    }, []);
    const GetBalance = async () => {
        const Balance = await contract.methods.getBalance().call({ from: Account })
        setBalance(Balance)
    }
    const getRandom = async () => {
        const random = await contract.methods.Rendom().call({ from: Account })
        setRandom(random)
    }
    const SelecteWinner = async () => {
        try {
            const receipt = await contract.methods.SelecteWinner().send({ from: Account, gas: 5000000 });
            console.log("Transaction receipt:", receipt);
            alert("Winner selected successfully");
        } catch (error) {
            console.error("Error in selectWinner:", error);
            // Check if the error message includes the specific revert message
            if (error.message.includes("Only Manager can be select winner")) {
                alert("Only Manager can select the winner");
            } else {
                alert("Unknown Error");
            }
        }
       


    }
    const getWinner = async () => {
        const winner = await contract.methods.Winner().call({ from: Account })
        setWinner(winner)
    }
    const getPlayers = async () => {
        Players = await contract.methods.getPlayers().call({ from: Account })

        console.log("players", Players)
    }
    const ResetLottery = async () => {
        await contract.methods.Reset().call({ from: Account })
        alert("Lottey Resent now");

    }
    const JoinToLottery = async () => {
        await contract.methods.Joinlottery().send({ from: Account, value: web3.utils.toWei("2", "ether") })
            .then(receipt => {
                console.log("receipt is:", receipt)

            })
    }
    return (
        <div>

            <Container className="mt-5">
                <Card className="shadow w-100 h-100" >
                    <Card.Header className="text-center"><Card.Title><h1>Lottery Dapp</h1></Card.Title></Card.Header>
                    <Card.Body>
                        <ul>
                            <li ><h2>Connected Account:  {Account}</h2></li><hr />
                            <li><h2>Lottery Manager:    {Manager}</h2></li><hr />
                            <li><h2>Contrac Balance:    {balance}ETH</h2></li><hr />
                        </ul>
                        <Card className="">
                            <Card.Header><h2>Players</h2></Card.Header>
                            <Card.Body>
                                <ul>
                                    {Players.map((result) => {
                                        return <h3><li>{result}</li></h3>
                                    })}
                                </ul>
                            </Card.Body>
                        </Card>
                        
                    </Card.Body>
                    <Card.Footer>
                    <div className="text-center mt-5 mb-5">
                            <Button variant="contained" className="me-5" size="large" onClick={GetBalance} >Balance</Button>
                            <Button variant="contained" className="me-5 bg-success" size="large" onClick={JoinToLottery} >Join</Button>
                            <Button variant="contained" className="me-5 bg-info" size="large" onClick={getPlayers} >Players</Button>
                            <Button variant="contained" className="me-5 bg-secondary" size="large" onClick={getRandom} >Random Number</Button>
                            <Button variant="contained" className="me-5 bg-warning" size="large" onClick={SelecteWinner} >Select Winner</Button>
                            <Button variant="contained" className="me-5 bg-light text-dark" size="large" onClick={getWinner} > Winner</Button>
                            <Button variant="contained" className="me-5 bg-danger" size="large" onClick={ResetLottery} >Reset</Button>

                        </div>
                    </Card.Footer>
                </Card>
            </Container>

        </div>
    )
};

export default Lottery;
