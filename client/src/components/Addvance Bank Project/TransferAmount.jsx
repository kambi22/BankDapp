import { Avatar, Button, TextField } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { Card, Container, Row, Col } from "react-bootstrap";
import { notify, toast } from "./Notify";
import { BlockchainContext } from "../../Web3Connection/BankAdd";

const Transfer = (props) => {
  const { web3, contract, account } = useContext(BlockchainContext);
  const [id, setId] = useState();
  const [recipientId, setRecipientId] = useState();
  const [address, setAddress] = useState();
  const [amount, setAmount] = useState(0);
  const [user, setUser] = useState();
  const [bankBalnace, setbankBalnace] = useState(0);
  const [buttonColor, setButtonColor] = useState(false);

  const GetUserById = async () => {
    try {
      const result = await contract.methods.getAccountById(id).call({ from: account });
      setUser(result);
      console.log("result", result);
    } catch (error) {
      //toast("error",'Error',"Error From Fetch User Data")
    }
  }
  const getBnakBlance = async () => {
    try {
      const result = await contract.methods.balances(account, id).call({ from: account });
      setbankBalnace(web3.utils.fromWei(result, "ether"));
    } catch (error) {
      //toast("error",'Error',"Error From Fetch User Balance")

    }
  }
  useEffect(() => {
    GetUserById();
    getBnakBlance();
  }, [id, account]);

  const getTransfer = async () => {

    if (user && user.addr.toLowerCase() === account.toLowerCase()) {
      try {
        const gas = await contract.methods.transferAmount(id, recipientId, address, web3.utils.toWei(amount, 'ether')).estimateGas({ from: account });
        const result = await contract.methods.transferAmount(id, recipientId, address, web3.utils.toWei(amount, 'ether')).send({ from: account, gas: gas });
        setButtonColor(true)
        getBnakBlance()
        let WalletBalance = await web3.eth.getBalance(account);
        toast('info', 'Wallet Balance', `Current Balance: ${web3.utils.fromWei(WalletBalance, 'ether')}`)
        notify('success', 'Successful', "Amount Successfully Transfered 🎉")

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
      notify('warning', 'Conneted Address Must Be Account Address', 'Plese Select Account Address From Metamask')

    }

  }
  return (
    <div className="">
      <Container className="mb-5 mt-5">
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
        <Row className="col-xl-9 p-2 mt-5 text-center mx-auto" xl={2} md={2} sm={1} xs={1}>{/* col-sm-12 col-xl-9 specify width according ot size */}
          <Col>
            <TextField className="w-100 mt-5 me-2" label='User Id' placeholder="Enter User Id" name="id" id="id" onChange={(e) => setId(e.target.value)} />
            <TextField className="w-100 mt-5 ms-1" label='Recipient Id' placeholder="Enter Recipient Id" name="id" id="id" onChange={(e) => setRecipientId(e.target.value)} /><br />
          </Col>
          <Col>
            <TextField className="w-100 mt-5 me-2" label='Recipient Address ' placeholder="Enter Recipient Address" name="address" id="address" onChange={(e) => setAddress(e.target.value)} />
            <TextField className="w-100 mt-5 ms-1" label='Amount' placeholder="Enter Transfer Amount " name="amount" id="amount" onChange={(e) => setAmount(e.target.value)} /><br />
          </Col>
          <Col className="text-center mx-auto">
            <Button className="w-100 mt-5 " size='large' variant="contained" onClick={getTransfer} color={buttonColor ? "success" : "primary"}>
              Transfer Amount
            </Button></Col>
        </Row>

      </Container>

    </div>

  )
};

export default Transfer;
