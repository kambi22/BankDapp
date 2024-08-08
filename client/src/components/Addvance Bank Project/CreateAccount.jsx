import { Player } from "@lottiefiles/react-lottie-player";
import { Button, TextField } from "@mui/material";
import React, { useContext, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notify, toast } from "./Notify";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

const CreateAccount = () => {
  const { web3, contract, account } = useContext(BlockchainContext);
  const [id, setId] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [buttonColor, setButtonColor] = useState(false);
  const navigate = useNavigate();

  
  const getCreateAccount = async () => {
    // Check if any of the inputs are empty and notify the use
    try {
      const gas = await contract.methods.createAccount(id, name, address).estimateGas({ from: account });
      const result = await contract.methods.createAccount(id, name, address).send({ from: account, gas: gas });
      Swal.fire({
        icon:'success',
        title:`Hi ${name}`,
        text:`Account Successfully Created With Id: ${id} 🎉`,
        timer:5000,
        showConfirmButton: false
      })
      setButtonColor(true);
      navigate('/')
    } catch (error) {
      console.error("Full error object:", error);
      
      let errorMessage;
  
      if(id === 0 && name === '' && address === ''){
        errorMessage = 'Please Enter Vailed Data'
      }
      else if (error && error.data && error.data.data) {
        errorMessage = error.data.data.reason;
      } else if (error.message) {
        errorMessage = error.message;
    
      } else {
        errorMessage = 'Unexpected Error, Try Again';
      }
  
      notify('error', 'Error', errorMessage);
      console.log("Error message:", errorMessage);
      setButtonColor(false)
    }
  
    
    console.log('create account');
  };
  
  
  return (
    <div className="">

      <Container>

        <Row xl={2} lg={2} md={2} >
          <Col className="d-sm-inline d-none" style={{ marginTop: '100px' }}>
            <Player className="w-75 h-75" src='https://lottie.host/cfcb06f6-c107-4031-bcd9-f366c8a3f0ed/Dp8i0KbN3n.json' loop autoplay style={{ height: '200px', width: '200px' }} />
          </Col>
          <Col>
            <div className="m-auto mt-5 p-3 d-flex CreateAccount justify-content-center flex-wrap  w-100 h-100">
              <Player className="" src='https://lottie.host/28489f37-c5b8-4d46-99ec-28f5482d24fa/LcLSzjK909.json' loop autoplay style={{ height: '200px', width: '200px' }} />

              <TextField className="w-100 mb-5 " label='User Id' placeholder="Enter User Id" name="id" id="id" onChange={(e) => setId(e.target.value)} /><br />
              <TextField className="w-100 mb-5" label='User Name' placeholder="Enter User Name" name="name" id="name" onChange={(e) => setName(e.target.value)} /><br />
              <TextField className="w-100 mb-5" label='User Address' placeholder="Enter User Address" name="address" id="adderss" onChange={(e) => setAddress(e.target.value)} /><br />
              <Button className="w-100 mb-5 " size='large' variant="contained" onClick={getCreateAccount} color={buttonColor ? "success" : "primary"}>Create Account</Button>

            </div>
          </Col>
        </Row>
      </Container>

    </div>
  )
};

export default CreateAccount;
