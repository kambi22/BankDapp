import { Player } from "@lottiefiles/react-lottie-player";
import { Button, Fab } from "@mui/material";
import React, { useContext, useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from 'react-router'
import Footer from "./Footer";
import { notifyconfirm, toast } from "./Notify";
import { BlockchainContext } from "../../Web3Connection/BankAdd";
const Home = (props) => {
  const {web3, account, contract} = useContext(BlockchainContext);
  const [buttonColor, setButtonColor] = useState(false);
  const navigate = useNavigate();

  const ShowWelcomeMessage = localStorage.getItem('ShowWelcomeMessage')

  const HomeLoan = () => {
    toast('info', 'Demo Content', 'This is Only For Demo Pupose')
  }
  const InsuranceLoan = () => {
    toast('info', 'Demo Content', 'This is Only For Demo Pupose')
  }
  const showMessage = () => {
      if(!ShowWelcomeMessage){
        notifyconfirm('info','Welcome',"Welcome to my website! To access all the amazing features, please create an account. Click on the create account button. Enjoy your experience, and don't forget to rate my project afterward. For More information, Check My Linked profile in Footer",true)
        localStorage.setItem('ShowWelcomeMessage',true)
      }
  }
  useEffect(()=>{
    showMessage();
  },[]);
  return (
    <div>
      {/* Min crate account page -----------------------------------------------------------------------*/}
      <Container className="d-sm-inline d-none ">
        <Row xl={2} lg={2} md={2}  >

          <Col className="d-inline">

            <div className="p-5 mt-5 bg-primaryk align-items-center" >
              <h1 className=" text-info mb-5 display-4 text-weight-bold"><strong>Well Come To MyBank</strong></h1>
              <div className="ms-5 text-secondary">
                <p className="textstyle">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit beatae natus accusantium possimus blanditiis nobis fuga, esse voluptas cum deleniti ipsam, iste doloribus consectetur omnis consequuntur neque fugiat suscipit dignissimos nihil voluptatibus totam sequi? Qui, hic ex! Ipsam accusantium quos autem quia nobis,repellat dicta distinctio dignissimos voluptates facere cupiditate? Porro numquam tempora sequi reprehenderit inventore iure molestiae? Veritatis, a earum facere voluptatem architecto porro eaque dolore tenetur ipsa iusto itaque cumque enim dolorem. Aperiam nihil sit, dolores quasi at, dignissimos impedit facere ab alias quidem deleniti nesciunt expedita non provident. Similique fugit quam est. Deserunt tempore qui repellat veritatis more...</p><br />
                <p className="textstyle">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ab, beatae exercitationem assumenda amet libero dolor illo enim, sunt dolorum quis a dolores incidunt! Sapiente repellat accusamus ut eligendi quam.</p>
              </div>
              {/* <Fab className="w-50  mt-5"  variant="extended" color="white"><h5 className="mt-1">Create Account</h5></Fab> */}
              <Button className="shadow mt-5 ms-5 w-50 rounded-5 btn-lg multi-colored-button " onClick={() => navigate("createAccount")} color='info' size='large' variant="contained" style={{ height: "50px" }} >Crate Account</Button>

            </div>
          </Col>
          <Col className="d-inline">
            <Player className="" src="https://lottie.host/2f5dd171-1a95-47ec-8ca5-b4d1e3a8d648/KJ8ttahyHS.json" loop autoplay />
          </Col>
        </Row>

      </Container>
      <Container className="d-sm-none d-inline">
        <Row sm={1} xs={1} >


          <Col>
            <Player className="" src="https://lottie.host/2f5dd171-1a95-47ec-8ca5-b4d1e3a8d648/KJ8ttahyHS.json" loop autoplay />
          </Col>
          <Col>
            <div className="p-5 mt-5 bg-primaryk align-items-center" >
              <h1 className="text-info mb-5 display-3"><strong>Well Come To MyBank</strong></h1>
              <h5 className="textstyle text-secondary">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Necessitatibus voluptate molestiae delectus numquam illo. Ipsum, ex. Voluptate saepe sint officia iure tenetur! Velit ipsa a quo qui earum hic! Et aut sunt reprehenderit consequuntur labore debitis ducimus iusto facilis at sed. Aperiam voluptates est quam debitis numquam explicabo nulla consectetur?</h5>
              <Button className="shadow w-50 mt-5 ms-5 rounded-5 btn-lg multi-colored-button  " onClick={() => navigate("/createAccount")} color='info' size='large' variant="contained" style={{ height: "50px" }} >Crate Account</Button>


            </div>
          </Col>
        </Row>
      </Container>

      {/* Home Load page *--------------------------------------------------------------------------------*/}
      <Container >
        <Row xl={2} lg={2} md={2} sm={1} xs={1} >
          <Col >
            <Player className="mt-5 pt-5 w-100" src="https://lottie.host/cc15c601-b284-4fbc-88c5-e0be9b169c88/k2Hy1gO6Lm.json" loop autoplay />
          </Col>
          <Col >
            <div className="p-5 mt-5  align-items-center" >
              <h1 className="text-secondary mb-5 display-4 text-weight-bold"><strong>Apply For Home Loan</strong></h1>
              <div className="text-secondary">
                <p className="textstyle"> nobis fuga, esse voluptas cum deleniti ipsam, iste doloribus consectetur omnis consequuntur neque fugiat suscipit dignissimos nihil voluptatibus totam sequi? Qui, hic ex! Ipsam accusantium quos autem quia itaque cumque enim dolorem. Aperiam nihil sit, dolores quasi at, dignissimos impedit facere ab alias quidem deleniti nesciunt expedita non provident. Similique fugit quam est. Deserunt tempore qui repellat veritatis more</p><br />
                <p className="textstyle">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos ab, beatae exercitationem assumenda amet libero dolor illo enim, sunt dolorum quis a dolores incidunt! Sapiente repellat accusamus ut eligendi quam.</p>
              </div>
              <Button className="shadow w-50 ms-5 mt-5 rounded-5 btn-lg multi-colored-button " onClick={HomeLoan} color='primary' size='large' variant="contained" style={{ height: "50px" }} >Home Loan</Button>


            </div>
          </Col>

        </Row>

      </Container>
      {/*Life insurence page *--------------------------------------------------------------------------------*/}
      <Container className="mt-5">
        <Row xl={2} lg={2} md={2} sm={1} xs={1} >

          <Col >
            <div className="p-5 mt-5  align-items-center" >
              <h1 className="text-warning mb-5 display-4 text-weight-bold"><strong>Apply For Life Insurence</strong></h1>
              <div className=" text-secondary">
                <p className="textstyle"> nobis fuga, esse voluptas cum deleniti ipsam, nesciunt expedita non provident. Similique fugit quam est. Deserunt tempore qui repellat veritatis more...</p><br />
                <p className="textstyle ">Lorem ipsum dolor sit, amet consectetur iste doloribus consectetur omnis consequuntur neque fugiat suscipit dignissimos nihil voluptatibus totam sequi? Qui, hic ex! Ipsam accusantium quos autem quia itaque cumque enim dolorem. Aperiam nihil sit, dolores quasi at, dignissimos impedit facere ab alias quidem deleniti adipisicing elit. Quos ab, beatae exercitationem assumenda amet libero dolor illo enim, sunt dolorum quis a dolores incidunt! Sapiente repellat accusamus ut eligendi quam.</p>
              </div>
              <Button className="shadow ms-5 w-50 mt-5 rounded-5 btn-lg multi-colored-button " onClick={InsuranceLoan} size='large' variant="contained" style={{ height: "50px" }} >Apply Insurance</Button>

            </div>
          </Col>
          <Col >
            <Player className="mt-5 pt-5 w-100" src="https://lottie.host/0bfe69b1-9d6d-4d38-8ba4-4c9b90bb0804/6F0qbxbWOt.json" loop autoplay />
          </Col>
        </Row>

      </Container>


    </div>
  )
};

export default Home;
