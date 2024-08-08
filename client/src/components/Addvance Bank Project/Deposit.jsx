import { Avatar, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap";
import { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notify, toast } from "./Notify";

const Deposit = (props) => {
  const { web3, contract, account } = useContext(BlockchainContext);
  const [id, setId] = useState();
  const [amount, setAmount] = useState(0);
  const [bankBalnace, setBankBalnace] = useState(0);
  const [user, setUser] = useState();
  const [buttonColor, setButtonColor] = useState(false);

  const GetUserById = async() => {
    try {
      const result = await contract.methods.getAccountById(id).call({from: account});
      setUser(result);
      console.log("result", result);
    } catch (error) {
      //toast("error",'Error',"Error From Fetch User Data")
    }
}
const getBnakBlance = async() => {
    try {
    const result = await contract.methods.balances(account, id).call({ from: account });
    setBankBalnace(web3.utils.fromWei(result, 'ether'));
    } catch (error) {
      //toast("error",'Error',"Error From Fetch User Balance")
      
    }
}
useEffect(()=>{
    GetUserById();
    getBnakBlance();
},[id, account]);


  const getDeposit = async () => {
    
    try {
      if (user && user.addr.toLowerCase() === account.toLowerCase()) {
      const gas = await contract.methods.deposit(id).estimateGas({ from: account, value: web3.utils.toWei(amount, 'ether') });
      const result = await contract.methods.deposit(id).send({ from: account, gas: gas, value: web3.utils.toWei(amount, 'ether') });
      setButtonColor(true)
      getBnakBlance();
      const WalletBalance = await web3.eth.getBalance(account)
      const Walbal = web3.utils.fromWei(WalletBalance, "ether")
      toast("info", "Wallet Balance", `Current Balance ${Walbal} ETH`)
      notify('success', 'Successful', "Successfully Deposit In You Account 🎉");
      }else {
        notify('warning','Conneted Address Must Be Account Address','Plese Select Account Address From Metamask')
      }
    } catch (error) {
      console.log("error is :", error)
      let errorMessage;
      if(amount === 0){
        errorMessage = 'Please Enter Vailed Data'
      }
      else if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
      } else {
        errorMessage = 'Unexpected Error'
      }
      notify('error', 'Error', errorMessage)
    }
 
  }
  return (
    <div className="">




      <Container className="mt-5">
        <h3>User Details</h3>

        <Row xl={2} lg={2} md={1} sm={1} xs={1} className="" >
          <Col className="mb-3">
            <Card style={{ height: '' }} className="shadow">
              <Card.Header>
                <Card.Title>
                  <h4>Profile</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {user? user && (
                  <div className="">
                  <h6 className="d-inline">Address: <p className="text-muted d-inline  ">{user.addr}</p> </h6>
                  <div className="d-flex">
                    <Avatar className="bg-warning">{user.name[0]}</Avatar>
                    <div className="ms-3 mt-2">
                      <h6>Name: {user.name}</h6>
                      <h6>Id: {user.id.toString()}</h6>
                    </div>
                  </div>
                </div>
                ):(
                  <div className="">
                  <h6 className="d-inline">Address: <p className="text-muted d-inline  ">0x00000000000000000000000000000000000000000</p> </h6>
                  <div className="d-flex">
                    <Avatar className="bg-warning"></Avatar>
                    <div className="ms-3 mt-2">
                      <h6>Name: </h6>
                      <h6>Id: </h6>
                    </div>
                  </div>
                </div>
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <Card className="w-100  shadow" style={{ height: '' }} >
              <Card.Header>
                <Card.Title>
                  <h4>Balance</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <h6 className="d-inline">Connected: <p className="text-muted d-inline  ">{account}</p> </h6>
                <h6>In Ethers</h6>
                <h3 className="mt-2">{bankBalnace} ETH   / <h3 className="d-sm-inline d-none">USD $ {bankBalnace * 3181}</h3></h3>

                </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>




      <div className="mt-5 p-3 Loginform mx-auto" style={{ marginTop: "200px" }}>
        <TextField className="w-100 mb-5 mt-5" label='User Id' placeholder="Enter User Id" name="id" id="id" onChange={(e) => setId(e.target.value)} /><br />
        <TextField className="w-100 mb-5 mt-3" label='Amount' placeholder="Enter Amount For Deposit" name="amount" id="amount" onChange={(e) => setAmount(e.target.value)} /><br />
        <Button className="w-100 mb-5" size='large' variant="contained" onClick={getDeposit} color={buttonColor ? "success" : "primary"}>Deposit</Button>

      </div>

    </div>

  )
};

export default Deposit;
