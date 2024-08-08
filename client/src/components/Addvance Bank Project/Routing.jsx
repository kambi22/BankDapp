import React from "react";
import { BrowserRouter, HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import CreateAccount from "./CreateAccount";
import Deposit from "./Deposit";
import Withdreaw from "./Withdraw";

import Manager from "./Manager";
import Login from "./Login";

import Navbar from "./Navbar";
import Emergency from "./Emergency";
import PayIterest from "./PayInterest";
import ManageAccount from "./ManageAccount";
import MyNavbar from "./Navbar";
import Transfer from "./TransferAmount";
import Home from "./Home";
import Footer from "./Footer";
import { Contract } from "web3";
import BecomeManager from "./BecomeManager";
import AccountsDetail from "./AccountsDetail";



const Routing = () => {
  const FooterWrapper = () => {
    const { pathname } = useLocation();
  
    // Conditionally render footer only if not on the manager page
    if (pathname !== '/manager') {
      return <Footer />;
    }
  
    return null;
  };

  return (
    <div className="" >
      <HashRouter>
        <MyNavbar />
        <Routes>

          <Route path="/" Component={Home} />
          <Route path="/createAccount" element={<CreateAccount  />} />
          <Route path="/deposit" element={<Deposit />} />
          <Route path="/withdraw" Component={Withdreaw} />
          <Route path="/transferAmount" Component={Transfer} />
          <Route path="/manager" element={<Manager />} />
          <Route path="/manager/becomeManager" element={<BecomeManager />} />
          <Route path="/manager/accountsDetail" element={<AccountsDetail />} />
          <Route path="/manager/payinterest" Component={PayIterest} />
          <Route path="/manager/emergency" element={<Emergency />} />
          <Route path="/manager/payiterest" element={<PayIterest />} />
          <Route path="/manager/manageAccount" element={<ManageAccount />} />
          <Route path="/login" element={<Login />} />


        </Routes>

        <FooterWrapper />
      </HashRouter>
      
    </div>
    

  )


};

export default Routing;
