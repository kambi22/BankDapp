import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react"
import { useNavigate } from "react-router";
import {AddCircle, CompareArrows, CompareArrowsOutlined, Home, Login, Person3, PersonAdd, PersonAddAlt, PersonAddAlt1, RemoveCircle, Settings} from '@mui/icons-material'
import { ListGroup, Offcanvas } from "react-bootstrap";
import { FaHome, FaUserPlus, FaDollarSign, FaMinusCircle, FaUserTie, FaInbox } from 'react-icons/fa';
import { FiLogIn } from "react-icons/fi";
import { PiHandWithdrawFill } from "react-icons/pi";
import { IoMdSettings } from "react-icons/io";
import { BiTransferAlt } from "react-icons/bi";
const Sidebar = ({open, close}) => {
    const navigate = useNavigate();
  return (
    <div className="">

<Offcanvas className='sidebar w-75 ' show={open} onHide={close} >
      <Offcanvas.Header closeButton>
      <ListGroup.Item  className="SideItems ps-3 pt-3"  action onClick={() => navigate('/')}>
               <FaHome className="me-5 SideIcon" />
              Home
            </ListGroup.Item>
        </Offcanvas.Header>
        <Offcanvas.Body >
            <ListGroup variant='flush'  >
            <hr className="m-2"/>
            
            <ListGroup.Item className="SideItems mt-1 " action onClick={() => navigate('/createAccount')}>
              <FaUserPlus className="me-5 SideIcon"/>
              Create Account
            </ListGroup.Item>
            <ListGroup.Item className="SideItems" action onClick={() => navigate('/deposit')}>
              <FaDollarSign className="me-5 SideIcon"/>
              Deposit
            </ListGroup.Item>
            <ListGroup.Item className="SideItems" action onClick={() => navigate('/withdraw')}>
              <PiHandWithdrawFill className="me-5 SideIcon"/>
              Withdraw
            </ListGroup.Item>
            <ListGroup.Item className="SideItems" action onClick={() => navigate('/transferAmount')}>
              <BiTransferAlt className="me-5 SideIcon"/>
              Transfer
            </ListGroup.Item>
            <hr className="m-2"/>
            <ListGroup.Item className="SideItems" action onClick={() => navigate('/manager')}>
              <FaUserTie className="me-5 SideIcon"/>
              Managger
            </ListGroup.Item>
            <ListGroup.Item className="SideItems" action onClick={() => navigate('/login')}>
             <FiLogIn className="me-5 SideIcon"/>
              Login
            </ListGroup.Item>
            <ListGroup.Item className="SideItems" action onClick={() => navigate('/')}>
             <IoMdSettings className="me-5 SideIcon"/>
              Settings
            </ListGroup.Item>
            </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      </div >
  )
};

export default Sidebar;
