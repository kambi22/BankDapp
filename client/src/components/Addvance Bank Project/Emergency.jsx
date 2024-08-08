import { Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import BankAddvance, { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notify } from "./Notify";

const Emergency = (props) => {
  const { web3, contract, account, contractAddress } = useContext(BlockchainContext);
  const [address, setAddress] = useState();
  const [buttonColor, setButtonColor] = useState(false);
  const [bankBalnace, setBankBalnace] = useState();
  const [manager, setManager] = useState();
  const [changeManagerColor, setChangeManagerColor] = useState(false);

  const GetBankBalance = async() => {
      try {
        const BnakBalance = await web3.eth.getBalance(contractAddress)
        setBankBalnace(web3.utils.fromWei(BnakBalance, 'ether'))
        console.log('contract Addreass',contractAddress)
      } catch (error) {
        console.log("error is:",error)
      }
  }
  const getManager = async () => {
    try {
      const result = await contract.methods.Manager().call();
      console.log("manager",manager)
      setManager(result)
    } catch (error) {
      console.log('error:', error)
    }
  }

 useEffect(()=>{
    GetBankBalance()
    getManager();
},[contractAddress]);


  const getEmergency = async () => {
    try {
      const gas = await contract.methods.emergencyWithdraw().estimateGas({ from: account });
      const result = await contract.methods.emergencyWithdraw().send({ from: account, gas: gas });
      setButtonColor(true)
      GetBankBalance();
      notify('success', 'Withdraw Successful', 'All Bank Balance Successfuly Withdraw')
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error'
      }
      notify('error', 'Error Message', errorMessage)
    }
  }
  const getChangeOwnerShip = async () => {
    if (manager.toLowerCase() === account.toLowerCase()) {
    try {
      const gas = await contract.methods.changeManager(address).estimateGas({ from: account });
      const result = await contract.methods.changeManager(address).send({ from: account, gas: gas });
      setChangeManagerColor(true)
      notify('success', 'Successfuly Changed', "Bank Manager Successfully Changed 🎉")
    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error'
      }
      notify('error', 'Error Message', errorMessage)
    }
   } else {
    notify('error','Error Message','Only Owner Can Take This Action ')
   }
  }
  return (
    <div className="mx-auto">
      <div className="text-center mx-auto Loginform p-3">
   
  
        <img className="" style={{ height: '300px', width: '300px' }} src="https://www.slideteam.net/media/catalog/product/cache/1280x720/g/r/green_growth_arrow_on_dollars_bar_graph_stock_photo_Slide01.jpg" alt="graph growing " />
        <div className="card-img-overlay me-5 pe-4 " style={{ marginTop: '100px' }}>
          <h1 className="display-2"><strong>{bankBalnace} ETH</strong></h1>
          <h2 className="text-muted">Bank Balance</h2>
        </div>

        <div className="text-center">
          <Button className="w-100 mt-5 " size='large' variant="contained" onClick={getEmergency} color={buttonColor ? "success" : "error"}>Emergency Withdraw</Button>

        </div>


        <h5 className="mb-0 mt-5">OR</h5>
        <hr className="mt-0" />
        <div className="mt-5 text-center ">
          <TextField className="w-100 mb-5" label='New Owner Address' placeholder="New Owner Address" name="address" id="adderss" onChange={(e) => setAddress(e.target.value)} /><br />
          <Button className="w-100 mb-5 " size='large' variant="contained" color={changeManagerColor ? "success" : "info"} onClick={getChangeOwnerShip}>Change Ownership</Button>

        </div>
      </div>
    </div>
  )
};

export default Emergency;
