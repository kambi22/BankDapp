import { Avatar, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState, useTransition } from "react"
import { Card, Col, Container, Row } from "react-bootstrap";
import { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notify, toast } from "./Notify";

const PayInterest = (props) => {
  const {web3, contract, account} = useContext(BlockchainContext);
  const [id, setId] = useState();
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState();
  const [bankBalnace, setBankBalnace] = useState(0);
  const [user, setUser] = useState();
  const [buttonColor, setButtonColor] = useState(false);

  const GetUserById = async() => {
    try {
      const result = await contract.methods.getAccountById(id).call({from: account});
      setUser(result);
      console.log('result',result)
    } catch (error) {
      //toast("error",'Error',"Error From Fetch User Data")
      console.log("error get user by id:",error)
    }
}
const getBnakBlance = async() => {
    try {
    const result = await contract.methods.balances(address, id).call({ from: account });
    setBankBalnace(web3.utils.fromWei(result, "ether"));
    } catch (error) {
      //toast("error",'Error',"Error From Fetch User Balance")
      console.log("error get bank balance",error)
      
    }
}
useEffect(()=>{
    GetUserById();
    getBnakBlance();
},[id, account]);

const getPayInterest = async () => {
    try {
      const gas = await contract.methods.payInterest(id, address, amount).estimateGas({ from: account });
      const result = await contract.methods.payInterest(id, address, amount).send({ from: account, gas: gas });
      setButtonColor(true)
      getBnakBlance()
      let WalletBalance = await web3.eth.getBalance(account);
      toast('info','Wallet Balance',`Current Balance: ${web3.utils.fromWei(WalletBalance, 'ether')}`)
      notify('success', 'Successful', "Interest Successfully Pay To User 🎉")

    } catch (error) {
      let errorMessage;
      if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
        notify('error','Error Message',errorMessage)
      } else if(error.message){
        errorMessage = error.message;
        notify('error','Error Message', errorMessage)
      }else{
        notify('error','Error Message', "Unexpected Error")
      }
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

        <div className="mt-5 text-center mx-auto p-3 Loginform" style={{ marginTop: "200px" }}>
          <Row className="p-0 text-center mx-auto" xl={2} lg={2} md={1} sm={1} xs={1}>
            <TextField className="w-100 mt-5 ps-2 pe-2 me-2 mb-4" label='Recipient Address ' placeholder="Enter Recipient Address" name="address" id="adderss" onChange={(e) => setAddress(e.target.value)} /><br />

            <Col className="mb-4">
              <TextField className="w-100" label='Recipient Id' placeholder="Enter Recipient Id" name="id" id="id" onChange={(e) => setId(e.target.value)} />
            </Col>
            <Col >
              <TextField className="w-100 " label='Percent Value' placeholder="Enter Percentage Value " name="amount" id="amount" onChange={(e) => setAmount(e.target.value)} /><br />
            </Col>
          </Row>
          <Button className="w-100 mt-5 " size='large' variant="contained" onClick={getPayInterest} color={buttonColor ? "success" : "primary"}>Pay Interest</Button>

        </div>
      </Container>





    </div>

  )
};

export default PayInterest;
