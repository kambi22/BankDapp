import { Avatar, Button, Paper, TextField } from "@mui/material";
import React, { useContext, useEffect, useState, useTransition } from "react"
import BankAddvance, { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notify } from "./Notify";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Player } from "@lottiefiles/react-lottie-player";

const BecomeManager = (props) => {
  const { web3, contract, account, contractAddress } = useContext(BlockchainContext);
  const [address, setAddress] = useState();
  const [buttonColor, setButtonColor] = useState(false);
  const [bankBalnace, setBankBalnace] = useState();
  const [changeManagerColor, setChangeManagerColor] = useState(false);
  const [manager, setManager] = useState();
  const [firstname, setFirstname] = useState('Satnam');
  const [lastname, setLastname] = useState('Singh');

  const GetBankBalance = async () => {
    try {
      const BnakBalance = await web3.eth.getBalance(contractAddress)
      setBankBalnace(web3.utils.fromWei(BnakBalance, 'ether'))
    } catch (error) {
      console.log("error is:", error)
    }
  }

  useEffect(() => {
    GetBankBalance()
  }, [contractAddress]);

  const getManager = async () => {
    try {
      const result = await contract.methods.Manager().call();
      console.log("manager",manager)
      setManager(result)
    } catch (error) {
      console.log('error:', error)
    }
  }
  useEffect(() => {
    getManager();
  }, [contract]);

  const getChangeOwnerShip = async () => {
    try {
      const gas = await contract.methods.changeManager(address).estimateGas({ from: account });
      const result = await contract.methods.changeManager(address).send({ from: account, gas: gas });
      setButtonColor(true)
      notify('success', `Manager ${firstname} ${lastname}`, "Congratulations Your Successfuly Become Manager 🎉")
      getManager()
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
  
  return (
    <div>
      <Container>
        <Row className="mt-5 p-3">
          <Col className="mb-3">
            <Card  className="shadow">
              <Card.Header>
                <Card.Title>
                  <h4>Profile</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                {manager && (
                  <div>
                    <h6 className="d-inline">Contract Address: <p className="text-muted d-inline  ">{contractAddress}</p> </h6><br />
                    <h6 className="d-inline"> Manager Address: <p className="text-muted d-inline  mt-2">{manager}</p> </h6>
                    <div className="d-flex">
                      <Avatar className="bg-info display-3 text-weight-bold"><h5>{firstname[0]}</h5></Avatar>
                        <h5 className="mt-3 ms-2">Manager: {`${firstname} ${lastname}`}</h5>
                    </div>
                  </div>
                )}
              </Card.Body>
            </Card>
        
          </Col>
          <Col>
          <Card className="w-100 shadow " style={{ height: '' }}>
              <Card.Header>
                <Card.Title>
                  <h4>Bank Balance</h4>
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <h6 className="d-inline">Connected: <p className="text-muted d-inline  ">{account}</p> </h6>
                <h6>In Ethers</h6>
                <h3 className="mt-5 ">{bankBalnace} ETH /USD $ {bankBalnace * 3181.01}</h3>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <div className="mt-5 text-center mx-auto Loginform">
              <Player className="mb-5" src='https://lottie.host/9ca628d9-d025-4353-aa5a-4ab05637c437/mkK4al4SQA.json' loop autoplay style={{height:'200px'}}/>
              <Row xs={1} sm={1} md={2} lg={2} xl={2} className="mb-3">
                <Col>
                  <TextField className="w-100 mb-5" label='First Name' placeholder="Enter User First Name" name="name" id="name" onChange={(e) => setFirstname(e.target.value)} /><br />

                </Col>
                <Col>
                  <TextField className="w-100 mb-5" label='Last Name' placeholder="Enter User Last Name" name="name" id="name" onChange={(e) => setLastname(e.target.value)} /><br />

                </Col>
              </Row>
              <TextField className="w-100 mb-5" label='New Owner Address' placeholder="New Owner Address" name="address" id="adderss" onChange={(e) => setAddress(e.target.value)} /><br />
              <Button className="w-100 mb-5 " size='large' variant="contained" color={changeManagerColor ? "success" : "info"} onClick={getChangeOwnerShip}>Become Manager</Button>
            </div>
           
      </Container>
      
    </div>
  )
};

export default BecomeManager;
