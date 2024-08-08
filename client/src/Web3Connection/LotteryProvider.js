import React, { createContext, useEffect, useState } from "react"
import Lottery from "../components/Lottery";
import Web3 from "web3";
import LotteryJson from '../contracts/Lottery.json'
export const LotteryContext = createContext(); //1 export create context variable
const LotteryProvider = (props) => {
  const [web3, setweb3] = useState();
  const [contract, setContract] = useState();
  const [Account, setAccount] = useState();
  const [Manager, setManager] = useState();
  const [balance, setBalance] = useState();
  useEffect(() => {
    const Web3Connection = async () => {
      if (window.ethereum) {
        try {
          console.log("Ethereum Provider",window.ethereum)
          //crate Web3 instance
          const connection = new Web3(window.ethereum);
          console.log('web3 connectionn',connection)
          setweb3(connection)
          // Ask for comfime on each request
          await window.ethereum.request({method:"eth_requestAccounts"});

          //get Accounts
          const accounts = await connection.eth.getAccounts();// return all accounts
          setAccount(accounts[0]);
          //Change connected Account
          window.ethereum.on("accountsChanged", (accounts) => {
            setAccount(accounts[0])
          })
          //get Abi
          const Abi = LotteryJson.abi;
          //get Address off contract
          const NetworkId = await connection.eth.net.getId();
          const networkData = LotteryJson.networks[NetworkId];
          const address = LotteryJson.networks[5777].address;

          //check block----------------------------------------------------------------
          const value = await connection.eth.requestAccounts();// return Connected account
          console.log("request Account is :",value)
    
          const AccountBalance = await connection.eth.getBalance(accounts[0]);// get Connected Account balance
          console.log("Account Balance :",connection.utils.fromWei(AccountBalance,"ether"))

          

          //close check block-----------------------------------------------------------------


          console.log("addres is :",address)
          //create contract instance
          const Contract = new connection.eth.Contract(Abi, networkData.address);
          
          setContract(Contract)
          const manager = await Contract.methods.Manager().call({ from: Account });
          console.log("manager is:", manager)
          setManager(manager);

          const Balance = await Contract.methods.getBalance().call()
          setBalance(Balance)


        } catch (error) {
          console.log("Not any contract deployer on this network")
        }
      } else {
        console.log("please install provider for connect with blockchain network")
      }
    }
    Web3Connection();
  }, []);




  return (
    <LotteryContext.Provider value={{ web3, Account, contract, Manager,balance }}>{/* contestVariabl.Provider and set Value*/}
      <Lottery />{/*3 Wrap child into context Provider*/}
    </LotteryContext.Provider>
  )
};

export default LotteryProvider;
