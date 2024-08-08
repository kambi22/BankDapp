import React, { useContext, useEffect, useState } from "react"
import { BidProvider } from "../Web3Connection/Bidding";
import { backdropClasses, Button, TextField } from "@mui/material";
import { getDropdownMenuPlacement } from "react-bootstrap/esm/DropdownMenu";

const Bidding = (props) => {
    const [ended, setEnded] = useState();
    const [highestBid, setHighestBid] = useState();
    const [owner, setOwner] = useState();
    const [nft, setNft] = useState();
    const [endTime, setEndTime] = useState();
    const [tokenId, setTokenId] = useState();
    const [highestBidder, setHighestBidder] = useState();
    const [balance, setBalance] = useState();
    const [bidValue, setBidValue] = useState();

    
// -----------------------------------------------------------------------------------------------------------

    const {web3, account, contract} = useContext(BidProvider);

    const getEnded = async() => {
        try {
          const result = await contract.methods.ended().call();
          setEnded(result)
          console.log('ended',result)
        } catch (error) {
          console.log("error in check ended",error)
        }
    }
    const getOwer = async() => {
        try {
          const result = await contract.methods.owner().call();
          setOwner(result)
          console.log("getOwer ", result)
         
        } catch (error) {
          console.log("error in check getOwer",error)
        }
    }
    const getTokenId = async() => {
        try {
          const result = await contract.methods.tokenId().call();
          setTokenId(result)
          console.log("getTokeId", result)
         
        } catch (error) {
          console.log("error in check getTokeId",error)
        }
    }
    const getNft = async() => {
        try {
          const result = await contract.methods.nft().call();
          setNft(result)
          console.log("hgetNft", result)
         
        } catch (error) {
          console.log("error in check getNft",error)
        }
    }
    const getEndtime = async() => {
        try {
          const result = await contract.methods.endTime().call();
          setEndTime(result)
          console.log("getEndtime bid", result)
         
        } catch (error) {
          console.log("error in check getEndtime",error)
        }
    }
    const getHighestBidder = async() => {
        try {
          const result = await contract.methods.highestBidder().call();
          setHighestBidder(result)
          console.log("getHighestBidder bid", result)
         
        } catch (error) {
          console.log("error in check getHighestBidder",error)
        }
    }
    const getHighestBid = async() => {
        try {
          const result = await contract.methods.highestBid().call();
          setHighestBid(result)
          console.log("getHighestBid bid", result)
         
        } catch (error) {
          console.log("error in check getHighestBid",error)
        }
    }
    const getBalance = async() => {
        try {
          const result = await contract.methods.balances(account).call();
          setBalance(result)
          console.log("getBalance bid", result)
         
        } catch (error) {
          console.log("error in check getBalance",error)
        }
    }
    
    useEffect(()=>{
        getEnded();
        getEndtime();
        getHighestBid();
        getHighestBidder();
        getNft();
        getOwer();
        getTokenId()
        getBalance();
    },[]);


    //function block--------------------------------------------------------------------------------------

    const getCreateBidding = async () => {
      try {
          const result = await contract.methods.createBidding(nft, tokenId, endTime, highestBid).send({
              from: account,
              gas: 3000000 // Set a higher gas limit
          });
          alert("Successfully created");
      } catch (error) {
          console.error("Error in getCreateBidding:", error);
          let errorMessage = extractErrorMessage(error);
          alert(errorMessage);
      }
  };
  
  const getBid = async () => {
      try {
          const result = await contract.methods.bid().send({
              from: account,
              value: web3.utils.toWei(bidValue, "ether"),
              gas: 3000000 // Set a higher gas limit
          })
          .then((receipt)=>{
            console.log("receipt:",receipt)
          })
          alert("Successfully bidded");
      } catch (error) {
          if (error.message.includes == false) {
            alert("Bid must be higher than the current highest bid.")
          } else {
            alert("Unknown Error")
          }
      }
  };
  
  const getWithdraw = async () => {
      try {
          const result = await contract.methods.withdraw().send({
              from: account,
              gas: 3000000 // Set a higher gas limit
          });
          alert("Successfully withdrawn");
      } catch (error) {
        if (error.message.includes == false) {
          alert("You cannot withdraw because you are the highest bidder.")
        } else {
          alert("Unknown Error")
        }
      }
  };
  
  const getEndTime = async () => {
      try {
          const result = await contract.methods.endAuction().send({
              from: account,
              gas: 3000000 // Set a higher gas limit
          });
          alert("Successful");
      } catch (error) {
        if (error.message.includes == false) {
          alert("Only the owner can perform this action.");
        } else {
          alert("Unknown Error")
        }
      }
  };
  
  const extractErrorMessage = (error) => {
      let errorMessage = "An unknown error occurred";
      if (error && error.message) {
          // Match the revert message
          const revertMessageMatch = error.message.match(/revert (.+?)["']/);
          if (revertMessageMatch && revertMessageMatch[1]) {
              errorMessage = revertMessageMatch[1];
          } else {
              // Match the original error message from JSON-RPC response
              const originalMessageMatch = error.message.match(/"message":"([^"]+)"/);
              if (originalMessageMatch && originalMessageMatch[1]) {
                  errorMessage = originalMessageMatch[1];
              }
          }
      }
      return errorMessage;
  };
  
  
  
  
  return (
    <div>
      <h5>owner: {owner}</h5>
      <h5>Bidder Balance: {balance}</h5>
      <h5>Highest Bid: {highestBid}</h5>
      <h5>NFT: {nft}</h5>
      <h5>NFT token id: {tokenId}</h5>
      <h5>End Time: {endTime}</h5>
      <h5>Highest Bidder: {highestBidder}</h5>
      <Button variant="contained" onClick={getHighestBid}>HighestBid</Button>
      <Button variant="contained" onClick={getBalance}>Balance</Button>
      <Button variant="contained" onClick={getNft}>nft</Button>
      <Button variant="contained" onClick={getTokenId}>Token Id</Button>
      <Button variant="contained" onClick={getHighestBidder}>HighestBidder</Button>
      <Button variant="contained" onClick={getOwer}>owner</Button><br /><br />



      <TextField type='text' placeholder="Enter ntt's addess" id='addrss' name="adderss" label='Address' onChange={(e)=>setNft(e.target.value)} />
      <TextField type='number' placeholder="Enter Token Id" id='Token Id' name="Token Id*" label='Token Id*' onChange={(e)=>setTokenId(e.target.value)} />
      <TextField type='number' placeholder="Enter End Time" id='End Time' name="End Time" label='End Time' onChange={(e)=>setEndTime(e.target.value)} />
      <TextField type='number' placeholder="Enter Inital Price" id='Inital Price' name="Inital Price" label='Inital Price' onChange={(e)=>setHighestBid(e.target.value)} />
      <Button className=" " variant="contained" onClick={getCreateBidding}>Create Bidding</Button><br /><br />

      <TextField type='number' placeholder="Enter Bid value" id='addrss' name="adderss" label='value' value={bidValue} onChange={(e)=>setBidValue(e.target.value)} />
      <Button className=" " variant="contained" onClick={getBid}>Bid</Button><br /><br /><br />
      <Button className=" " variant="contained" onClick={getWithdraw}>Withdraw</Button><br /><br />
      <Button className=" " variant="contained" onClick={getEndTime}>End Auction</Button><br />

    </div>
  )
};
 
export default Bidding;
