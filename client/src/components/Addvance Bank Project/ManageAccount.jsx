import { Player } from "@lottiefiles/react-lottie-player";
import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react"
import { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notify, toast } from "./Notify";
import { useActionData } from "react-router";


const ManageAccount = (props) => {
  const { web3, account, contract } = useContext(BlockchainContext);
  const [id, setId] = useState(0);
  const [address, setAddress] = useState('');
  const [buttonFreezColor, setButtonFreezColor] = useState();
  const [unfreezColor, setUnfreezColor] = useState();
  const [btnDelColor, setBtnDelColor] = useState();
  const [isFreez, setIsFreez] = useState(false);

 

  const getFreezAccount = async () => {
    try {
      const gas = await contract.methods.freezAcount(id, address).estimateGas({ from: account });
      const result = await contract.methods.freezAcount(id, address).send({ from: account, gas: gas });
      setIsFreez(true)
      setButtonFreezColor(true)
      setUnfreezColor(false)
      let WalletBalance = await web3.eth.getBalance(account);
      toast('info', 'Wallet Balance', `Current Balance: ${web3.utils.fromWei(WalletBalance, 'ether')}`)
      notify('success', 'Freezed Account', 'Account Successfuly Freezed')
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
  const getUnFreezAccount = async () => {
    try {
      const gas = await contract.methods.unfreezAcount(id, address).estimateGas({ from: account });
      const result = await contract.methods.unfreezAcount(id, address).send({ from: account, gas: gas });
      setIsFreez(false)
      setUnfreezColor(true)
      setButtonFreezColor(false)
      let WalletBalance = await web3.eth.getBalance(account);
      toast('info', 'Wallet Balance', `Current Balance: ${web3.utils.fromWei(WalletBalance, 'ether')}`)
      notify('success', 'Un-Freezed Account', 'Account Successfuly Un-Freezed')
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

  const getDeleteAccount = async () => {
    try {
      const gas = await contract.methods.DeleteAccount(id, address).estimateGas({ from: account });
      const result = await contract.methods.DeleteAccount(id, address).send({ from: account, gas: gas });
      setBtnDelColor(true)
      notify('success', 'Account Deleted', 'Account Successfuly Deleted')
    } catch (error) {
      console.log('id', id, 'addess:', address)
      let errorMessage;
      if (id === 0 && address === '') {
        errorMessage = 'Please Enter An Id And Address Values to Delete An Account.'
      } else if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      }
      else {
        errorMessage = 'Unexpected Error'
      }
      notify('error', 'Error Message', errorMessage)
    }
  }
  return (
    <div className="">

      <Player className="mb-0" style={{ height: '200px', width: '200px' }} src="https://lottie.host/476b0928-eb7f-4454-a4e5-73fce9690aa0/1ZPclysd5f.json" loop autoplay />

      <div className=" Loginform p-3 mt-0 mx-auto text-center" >
        <TextField className="w-100 mt-5 me-2" label='User Id' placeholder="Enter User Id" name="id" id="id" onChange={(e) => setId(e.target.value)} />
        <TextField className="w-100 mt-5 ms-1" label='Address' placeholder="Enter User Addresss " name="address" id="address" onChange={(e) => setAddress(e.target.value)} /><br />{/*if(true){<h6>Un-Freez Account</h6>}else if(false){<h6>Freez Acount</h6>}*/}
        {/* <Button className="w-100 mt-5 " size='large' variant="contained" onClick={!isFreez? getFreezAccount : getUnFreezAccount} color={buttonFreezColor ? "success" : "warning"}>{isFreez ? <h6>Un-Freez Account</h6>:<h6>Freez Acount</h6>}</Button><br /> */}
        <Button className="w-100 mt-5 " size='large' variant="contained" onClick={getFreezAccount} color={buttonFreezColor ? "success" : "warning"}>Freez Account</Button><br />
        <Button className="w-100 mt-5 " size='large' variant="contained" onClick={getUnFreezAccount} color={unfreezColor ? "success" : "warning"}>Un-Freez Account</Button><br />
        <h5 className="mb-0 mt-5">OR</h5>
        <hr className="mt-0" />
        <Button className="w-100  " size='large' variant="contained" onClick={getDeleteAccount} color={btnDelColor ? "success" : "error"}>Delete Account</Button>
      </div>

    </div>
  )
};

export default ManageAccount;
