import React, { useContext, useEffect, useState } from "react"
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { BlockchainContext } from "../../Web3Connection/BankAdd";
import { notifyconfirm } from "./Notify";

const Manager = (props) => {
  const {web3, contract, account} = useContext(BlockchainContext);

  const [manager, setManager] = useState();
  const navigate = useNavigate();

  const getManager = async() => {
      try {
        const result = await contract.methods.Manager().call();
        setManager(result)
      } catch (error) {
        console.log('error:',error)
      }
  }
  // useEffect(()=>{
  //   notifyconfirm('info','Manager','Please fist become manager for use amazing manager features',true)
  //     getManager();
  // },[contract]);
  return (
    <div className=" vh-100 mb-5">

      <Container className="mt-5 mb-5  Manager mb-5" >

        <Row className="mb-5" xl={4} lg={4} md={3} sm={2} xs={1} style={{height:"220px"}}>
          <Col className="mb-3">
          <Card className="shadow rounded-5 h-100 overflow-hidden "  style={{cursor:"pointer"}} onClick={()=>navigate('becomeManager')} >
              <Card.Img className="" style={{height:"180px"}} src="https://www.wikihow.life/images/thumb/3/39/Become-a-Manager-Step-11.jpg/aid11189315-v4-728px-Become-a-Manager-Step-11.jpg.webp"></Card.Img>
              <Card.Header><Card.Title><h4>Become Manager</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden " style={{cursor:"pointer"}} onClick={()=>navigate('emergency')} >
              <Card.Img className="overflow-hidden" style={{height:"200px"}} src="https://cdnlearnblog.etmoney.com/wp-content/uploads/2023/04/Emergency-fund.png"></Card.Img>
              <Card.Header><Card.Title><h4>Emergency Withdraw</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden" style={{cursor:"pointer"}} onClick={()=>navigate('accountsDetail')}>
              <Card.Img style={{height:"200px"}} src="https://www.naukri.com/cloudgateway-fastforward/ff-content-services/v0/unauth/cms/photo?id=63cd53a29a092c62230756afc9a1f79bba0e36a8e4b2fda2013bd1f0f76e7195266f9b30d8db7b73bc8b98894627150ed91bb9f2345afd277b922e899525d285ae771c1bdda6e048f79fd6c296adc7b6&postTypeId=c4eff10da33c562d3e88af8f60fcf6cecdf3e35370f49177&source=ff"></Card.Img>
              <Card.Header><Card.Title><h4>Accounts Detail</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden" style={{cursor:"pointer"}} onClick={()=>navigate('payinterest')}>
              <Card.Img style={{height:"200px"}} src="https://www.taxscan.in/wp-content/uploads/2024/01/Payment-of-Interest-Interest-JVAT-Act-Pay-Interest-Refund-Amount-sc-supreme-court-TAXSCAN.jpg"></Card.Img>
              <Card.Header><Card.Title><h4>Pay Iterest To User</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden" style={{cursor:"pointer"}} onClick={()=>navigate('manageAccount')}>
              <Card.Img style={{height:"200px"}} src="https://www.tutterflycrm.com/assets/images/account-management-software.png"></Card.Img>
              <Card.Header><Card.Title><h4>Manage Account</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden" style={{cursor:"pointer"}} onClick={()=>navigate('emergency')} >
              <Card.Img style={{height:"200px"}} src="https://www.northwestregisteredagent.com/wp-content/uploads/images/change-owner-corporation-768x402.png"></Card.Img>
              <Card.Header><Card.Title><h4>Change Ownership</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden" style={{cursor:"pointer"}} onClick={()=>navigate('manageAccount')}>
              <Card.Img style={{height:"200px"}} src="https://commercemarketplace.adobe.com/media/catalog/product/8/c/8c9c_m2-delete-account-marketplace-image_2.png?width=750&height=360&store=default&image-type=image&fit=bounds"></Card.Img>
              <Card.Header><Card.Title><h4>Delete Account</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-3">
            <Card className="shadow rounded-5 overflow-hidden" style={{cursor:"pointer"}} onClick={()=>navigate('manageAccount')}>
              <Card.Img style={{height:"200px"}} src="https://ipi.media/wp-content/uploads/2020/06/IPI-Access-to-information-02-06-2020-jpg.jpg"></Card.Img>
              <Card.Header className=""><Card.Title><h4>Freez Account</h4></Card.Title></Card.Header>
              <Card.Body>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat, praesentium iusto atque aperiam facere est mollitia vel voluptatem perferendis minima.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        

      </Container>
    </div>
  )
};

export default Manager;
