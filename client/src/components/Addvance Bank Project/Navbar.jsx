import React, { useState } from "react"
import { Card, Container, Nav, Navbar, NavbarBrand, NavLink } from "react-bootstrap";
import { Button, AppBar, Toolbar, Typography, Tooltip, IconButton } from '@mui/material'
import { useNavigate } from "react-router";
import { Menu, MenuBookOutlined } from "@mui/icons-material";
import Sidebar from "./Sidebar";

const MyNavbar = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSidebar = () => {
      setOpen(!open)
  }

  return (
    <div className="sticky-top">
      <Navbar expand='sm' sticky="top" className="bg-primary " style={{ height: '70px' }}>
        <Container >
          <IconButton size='large' className="d-sm-none d-inline text-white  me-2" onClick={handleSidebar}>
            <Menu/>
          </IconButton>
          <Sidebar open={open} close={handleSidebar}/>
          <NavbarBrand className="text-white me-auto  " style={{ cursor: "pointer" }} onClick={() => navigate('/')}>
            <strong style={{ fontWeight: 'bolder', }} className="h3 ">MyBank Dapp</strong>
            </NavbarBrand>
          <Nav className=" w-100 mr-auto d-flex justify-content-end">

          
          <Nav.Link  color="white" className="text-white me-5 d-none d-sm-inline" onClick={() => navigate('/createAccount')}>CreateAccount</Nav.Link>
          <Nav.Link color="white" className="text-white me-5 d-none d-sm-inline" onClick={() => navigate('/deposit')}>Deposit</Nav.Link>
          <Nav.Link color="white" className="text-white me-5 d-none d-sm-inline" onClick={() => navigate('/withdraw')}>Withdraw</Nav.Link>
          <Nav.Link color="white" className="text-white me-5 d-none d-sm-inline" onClick={() => navigate('/transferAmount')}>Transfer</Nav.Link>
          <Nav.Link color="white" className="text-white me-5 d-none d-sm-inline" onClick={() => navigate('/manager')}>Manager</Nav.Link>
          <Nav.Link color="white" className="text-white  d-none d-sm-inline" onClick={() => navigate('/login')}>Login</Nav.Link>
      
          </Nav>

        </Container>
      </Navbar>
    </div>
  )
};

export default MyNavbar;
