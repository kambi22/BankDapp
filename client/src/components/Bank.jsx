// src/App.js

import React, { useContext, useState, useEffect } from 'react';
import Web3Provider, { Web3Context } from '../Bank';

const Bank = () => {
  const { web3, contract, owner, activeAccount, events } = useContext(Web3Context);
  const [balance, setBalance] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    if (web3 && activeAccount) {
      getBalance();
    }
  }, [web3, activeAccount]);

  const handleDeposit = async () => {
    try {
      if (contract && activeAccount) {
        await contract.methods.Deposit().send({ from: activeAccount, value: web3.utils.toWei("1", "ether") });
        getBalance(); // Update balance after deposit
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleWithdraw = async () => {
    try {
      if (contract && activeAccount) {
        await contract.methods.Withdraw().send({ from: activeAccount });
        getBalance(); // Update balance after withdraw
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const getBalance = async () => {
    try {
      if (contract && activeAccount) {
        const balance = await contract.methods.Balances(activeAccount).call();
        setBalance(web3.utils.fromWei(balance, "ether"));
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>Bank DApp</h1>
      <p>Connected account: {activeAccount}</p>
      <p>Contract owner: {owner}</p>
      <p>Your balance: {balance} ETH</p>
      <button onClick={handleDeposit}>Deposit 1 ETH</button>
      <button onClick={handleWithdraw}>Withdraw</button>
      <button onClick={getBalance}>Get Balance</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h2>Events</h2>
      <ul>
        
        {events.map((event, index) => (//occrint error:Error: Please pass numbers as strings or BN objects to avoid precision errors.
        //this code is not working
          <li key={index}>
            {event.event}: {event.returnValues.recipient} - {web3.utils.fromWei(event.returnValues.amount, 'ether')} ETH
          </li>
        ))}
      </ul>
    </div>
  );
};

const Root = () => (
  <Web3Provider>
    <Bank/>
  </Web3Provider>
);

export default Root;
