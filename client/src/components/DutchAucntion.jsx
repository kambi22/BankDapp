import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";

const DutchAuction = ({ value }) => {
    const [nft, setNft] = useState('');
    const [owner, setOwner] = useState('');
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [amount, setAmount] = useState('');
    const [currentPrice, setCurrentPrice] = useState('');

    const { web3, account, contract } = value;

    // Function blockcb
    
    const getOwner = async () => {
        try {
            const result = await contract.methods.owner().call({ from: account });
            setOwner(result)
            console.log("owner is:",owner)
        } catch (error) {
            console.log("error owner", error.message, error.stack)
        }
    }
    const getStartSelling = async () => {
        try {
            const gas = await contract.methods.startSell(nft, duration, startPrice, endPrice).estimateGas({ from: account });
            const result = await contract.methods.startSell(nft, duration, startPrice, endPrice)
                .send({ from: account, gas })
                .on('error', (error, receipt) => {
                    console.error("Selling item error:", error);
                });
                getOwner()

            if (result.events && result.events.startsell) {
                let message = result.events.startsell.returnValues.message;
                alert(message);
            } else {
                console.error("Event 'startsell' not found in receipt");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const getBuyItem = async () => {
        try {
            const gas = await contract.methods.buyItem().estimateGas({ from: account, value: web3.utils.toWei(amount, "ether") });
            const result = await contract.methods.buyItem().send({
                from: account,
                value: web3.utils.toWei(amount, "ether"),
                gas
            });

            if (result.events && result.events.buyitem) {
                alert(result.events.buyitem.returnValues.message);
            } else {
                console.error("Event 'buyitem' not found in receipt");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    const getCurrentPrice = async () => {
        try {
            const result = await contract.methods.getCurrentPrice().call({ from: account });
            setCurrentPrice(result);
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    const getStopSell = async () => {
        try {
            const gas = await contract.methods.stopSell().estimateGas({ from: account });
            const result = await contract.methods.stopSell().send({ from: account, gas });

            if (result.events && result.events.stopsell) {
                alert(`${result.events.stopsell.returnValues.message} at Current Price: ${web3.utils.fromWei(currentPrice, "ether")} ETH`);
            } else {
                console.error("Event 'stopsell' not found in receipt");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    const getRestart = async () => {
        try {
            const gas = await contract.methods.restart().estimateGas({ from: account });
            const result = await contract.methods.restart().send({ from: account, gas });

            if (result.events && result.events.restartsell) {
                alert(`${result.events.restartsell.returnValues.message} at Current Price: ${web3.utils.fromWei(currentPrice, "ether")} ETH`);
            } else {
                console.error("Event 'restartsell' not found in receipt");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    return (
        <div>
            <Container className="mt-5">
                <Card className="shadow" style={{ height: '600px' }}>
                    <Card.Header className="text-center"><Card.Title><h1>Dutch Auction</h1></Card.Title></Card.Header>
                    <Card className="p-5 m-5">
                        <ul>
                            <li><h5>Owner: {owner}</h5></li>
                            <li><h5>NFT Address: {nft}</h5></li>
                            <hr className="m-2" />
                            <li><h5>Start Price: {startPrice} ETH</h5></li>
                            <li><h5>End Price: {endPrice} ETH</h5></li>
                            <li><h5>Current Price: {currentPrice} ETH</h5></li>
                            <hr className="m-2" />
                            <li><h5>Start Time: {startTime} sec</h5></li>
                            <li><h5>End Time: {endTime} sec</h5></li>
                            <li><h5>Sell Time: {duration} sec</h5></li>
                            <hr className="m-2" />
                            <li><h5>is Active: {isActive.toString()}</h5></li>
                        </ul>
                        </Card>
                    <Card.Body className="text-center">
                        <div>
                            <TextField type="text" label="NFT" placeholder="Enter NFT Address" onChange={(e) => setNft(e.target.value)} />
                            <TextField type="number" label="Start Price" placeholder="Enter Start Price In Ether" onChange={(e) => setStartPrice(e.target.value)} />
                            <TextField type="number" label="End Price" placeholder="Enter End Price In Ether" onChange={(e) => setEndPrice(e.target.value)} />
                            <TextField type="number" label="Time" placeholder="Enter Selling Time In Seconds" onChange={(e) => setDuration(e.target.value)} />
                            <Button variant="contained" size="large" onClick={getStartSelling}>Start Sell</Button>
                        </div><br />
                        <div>
                            <TextField type="number" label="Amount" placeholder="Enter Amount in Ether" onChange={(e) => setAmount(e.target.value)} />
                            <Button variant="contained" size="large" onClick={getBuyItem}>Buy Item</Button><br /><br />
                            <Button variant="contained" size="large" onClick={getCurrentPrice}>Current Price</Button>
                            <Button variant="contained" size="large" onClick={getStopSell}>Stop Sell</Button>
                            <Button variant="contained" size="large" onClick={getRestart}>Restart Sell</Button>
                            <Button variant="contained" size="large" onClick={getOwner}>Owner</Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
};

export default DutchAuction;
