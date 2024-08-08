// src/App.jsx
import React from 'react';
// import MyFile from './components/MyFile';
// import Webs from './Web3';
// import Bank from './components/Bank';
// import { FetchDAta } from './Web3Connection';
// import MyTheme from './components/useContext';

// import Root from './components/Bank';
// import BankFront from './components/BankFront';
// import BankConnection from './BankConnection';
import './styles.css'
import '../src/components/Addvance Bank Project/AddvanceBank.css'
// import LotteryProvider from './Web3Connection/LotteryProvider';
// import CrowdConnect from './Web3Connection/CrowdFunding';
// import Bidding from './Web3Connection/Bidding';
// import Parent from './components/perant';
// import DutchConnetion from './Web3Connection/DutchAuction';
// import BankAdvanceCon from './Web3Connection/AdvanceBank';
// import Routing from './components/Addvance Bank Project/Routing';
import BankAddvance from './Web3Connection/BankAdd';



const App = () => {
 
  return (
    <div className=''>
     
       {/* Always pass parent component here  */}
        <BankAddvance/>
        

    </div>
  );
};

export default App;
