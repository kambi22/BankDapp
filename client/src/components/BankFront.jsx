import React, { useContext, useEffect, useState } from "react";
import { BankContext } from "../BankConnection"; // Ensure correct path
import { Card, Container } from 'react-bootstrap'
import { Button, TextField } from '@mui/material'
const BankFront = (props) => {
    const [Amount ,setAmount ] = useState();
    const [balance ,setbalance ] = useState();
    const [color ,setcolor ] = useState(false);
    const { web3, account, Contract,owner } = useContext(BankContext);

    const getBalance = async() => {
       const Balance = await Contract.methods.Balances(account).call({from:account})
        setbalance(Balance);
        setcolor(true)
    }
    const handleDeposit = async() => {
        if (Amount > 0) {
           
            await Contract.methods.Deposit().send({from:account, value: web3.utils.toWei(Amount, "ether")})
            .then(receipt =>{
              console.log("receipt is:",receipt.events.deposit.event)
              alert(Amount + "  Ether Deposit In Your Account")
              getBalance()
              setAmount('')
            })
            setcolor(true)
        }else{
            alert("please Enter Amount in Ether's")
        }
    }
    const handleWithdraw = async() => {
        if (Amount > 0) {
            await Contract.methods.Withdraw(web3.utils.toWei(Amount, "ether")).send({from:account})
           
              alert(Amount + "  Ether Withdraw In Your Account")
              
            setcolor(true)
            getBalance()
            setAmount('')

        }else{
            alert("please Enter Amount in Ether's")
        }
    }

    return (
        <div>
        <Container className='mt-5'>
          <Card className='shadow ' style={{ height: '600px' }}>
            <Card.Header><Card.Title className='h1 text-center'><h1>SATNAM BANK Dapp</h1></Card.Title></Card.Header>
            <Card.Body>
  
              <h5>Connected Account :{account}</h5><hr />
              <h5>Bank Manager :{owner}</h5><hr />
              <h5>Your Account Balanc: {balance} ETH</h5>
              <hr />
              <div className='text-center m-2'>
                <TextField type='number' className='w-75' id='number' name='number' label='Enter Amount In Ether' placeholder="Enter Amount in Ether's" value={Amount} onChange={(e) => setAmount(e.target.value)} /><br /><br />
                <Button onClick={handleDeposit} className="w-75 lg m-2" size='large' variant='contained' color={color === true ? 'success' : 'secondary'} >Deposit</Button>
                <Button onClick={handleWithdraw} className="w-75 lg bg-warning m-2" size='large' variant='contained' color={color === true ? 'primary' : "inherit"} >Withdraw</Button>
                <Button onClick={getBalance} className="w-75 lg m-2" size='large ' variant='contained' color={color === true ? 'secondary' : "info"} >Get Balance</Button>
  
              </div>
            </Card.Body>
          </Card>
        </Container>
  
      </div>
    );
};

export default BankFront;
