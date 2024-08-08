import { Button, ButtonBase, TextField } from "@mui/material";
import React, { useEffect, useState } from "react"
import { Card, Container } from "react-bootstrap";

const BankAdvace = ({ value }) => {
    const [Manager, setManager] = useState();
    const [id, setId] = useState();
    const [name, setName] = useState();
    const [Address, setAddress] = useState();
    const [amount, setAmount] = useState();
    const [recipientId, setRecipientId] = useState();
    const [userBalance, setUserBalance] = useState();
    const [isfreezed, setIsfreezed] = useState();
    const [isExist, setIsExist] = useState();
    const [userAccount, setUserAccount] = useState(null);
    const [allUserAccounts, setAllUserAccounts] = useState([]);


    const { web3, account, contract } = value;

    const notify = (message) => {//notify function take an parameter and show message alert
        alert(message)
    }
    //state block-------------------------------------------------------------------------------------------------------------------
    const ChekUserbalance = async () => {
        try {
            const result = await contract.methods.balances(account, id).call({ from: account });
            setUserBalance(web3.utils.fromWei(result, "ether"));
            console.log("result", web3.utils.fromWei(result, "ether"))

        } catch (error) {
            console.log("error message", error)
            notify(error.message)
        }
    }
    const getIsFreezed = async () => {
        try {
            const result = await contract.methods.isfreez(account, id).call({ from: account });
            setIsfreezed(result)
            console.log("result", result)

        } catch (error) {
            console.log("error message", error)
            notify(error.message)
        }
    }
    // const getIsAccountExist = async () => {// private function hai
    //     try {
    //         const result = await contract.methods.accountExists(id).call({from:account});
    //        setIsExist(result)
    //         console.log("result",result)
    //         notify(`Acount Is Freezed ${result}`)

    //     } catch (error) {
    //         console.log("error message",error)
    //         notify(error.message)
    //     }
    // }
    //function block-----------------------------------------------------------------------------------------------------------------
    const getCheck = async () => {
        try {
            const gas = await contract.methods.check(id).estimateGas({ from: account });
            const result = await contract.methods.check(id).call({ from: account, gas: gas })

            console.log("result", result);
            notify(`Your value is: ${result}`)
        } catch (error) {
            //const errorMessage = error.message.includes() 
            console.log('kambi', error.data.data.reason)//fetch require error msg from jsor RPC error;
            console.log("kambi message ", error.message)
            notify(error.data.data.reason)
            // console.log("error messge",errorMessage)
            // if(errorMessage == false){
            //     notify("Error: Value should be greater than equal 10")//calling notify function declear above 
            // }else{
            //     console.log("error manager", error);
            // }

        }
    };;



    const getManager = async () => {
        try {

            const result = await contract.methods.Manager().call({ from: account })
            setManager(result)
        } catch (error) {
            console.log("error manager", error)
        }
    }
    const getCreateAccount = async () => {
        try {
            const gas = await contract.methods.createAccount(id, name, Address).estimateGas({ from: account });
            const result = await contract.methods.createAccount(id, name, Address).send({ from: account, gas: gas })
            console.log("result", result)
            notify("Account successfully created")

        } catch (error) {

            notify(error.data.data.reason)
            console.log("Error", error.message)


        }
    }

    const getdeposit = async () => {//Success
        try {
            const gas = await contract.methods.deposit(id).estimateGas({ from: account, value: web3.utils.toWei(amount, "ether") });
            const result = await contract.methods.deposit(id).send({ from: account, value: web3.utils.toWei(amount, "ether"), gas: gas })
            console.log("result", result)
            notify(`${amount}ETH Sucessfully Deposit`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }
    const getWithdraw = async () => {//success
        try {
            const gas = await contract.methods.withdraw(id, web3.utils.toWei(amount, "ether")).estimateGas({ from: account });
            const result = await contract.methods.withdraw(id, web3.utils.toWei(amount, "ether")).send({ from: account, gas: gas })
            console.log("result", result)
            notify(`${amount}ETH Sucessfully Withdraw`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }
    const getTransferAmount = async () => {//Success
        try {
            const gas = await contract.methods.transferAmount(id, recipientId, Address, web3.utils.toWei(amount, "ether")).estimateGas({ from: account });
            const result = await contract.methods.transferAmount(id, recipientId, Address, web3.utils.toWei(amount, "ether")).send({ from: account, gas: gas })
            console.log("result", result)
            notify(`${amount}ETH Sucessfully Transfer`)

        } catch (error) {
            console.log('error', error)
            notify(error.data.data.reason)
        }
    }
    const getFreezAccount = async () => {
        try {
            const gas = await contract.methods.freezAcount(id, Address).estimateGas({ from: account });
            const result = await contract.methods.freezAcount(id, Address).send({ from: account, gas: gas })
            console.log("result", result)
            notify(`Your Account Freezed By Bank Manager`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }
    const getUnFreezAccount = async () => {
        try {
            const gas = await contract.methods.unfreezAcount(id, Address).estimateGas({ from: account });
            const result = await contract.methods.unfreezAcount(id, Address).send({ from: account, gas: gas })
            console.log("result", result)
            notify(`Your Account Un-Freez By Bank Manager`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }
    const getEmergencyWithdraw = async () => {
        try {
            const gas = await contract.methods.emergencyWithdraw().estimateGas({ from: account });
            const result = await contract.methods.emergencyWithdraw().send({ from: account, gas: gas })
            console.log("result", result)
            notify(`Successfully Withdraw For Emergency`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }
    const getchangeManager = async () => {
        try {
            const gas = await contract.methods.changeManager(Address).estimateGas({ from: account });
            const result = await contract.methods.changeManager(Address).send({ from: account, gas: gas })
            console.log("result", result)
            notify(`Manager Successfully Changed`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }
    const getPayInterest = async () => {
        try {
            const gas = await contract.methods.payInterest(recipientId, Address, amount).estimateGas({ from: account });
            const result = await contract.methods.payInterest(recipientId, Address, amount).send({ from: account, gas: gas })
            console.log("result", result)
            notify(`Interest Successfully Payed To User Account`)

        } catch (error) {
            notify(error.data.data.reason)
        }
    }

    const getAccountById = async () => {
        try {
            const gas = await contract.methods.getAccountById(id).estimateGas({ from: account });
            const result = await contract.methods.getAccountById(id).call({ from: account, gas: gas })
            console.log("result", result)
            setUserAccount(result)
            notify(`Successfully Fetched Account`)

        } catch (error) {
            if (error.data.data.reason) {
                notify(error.data.data.reason)

            } else {
                notify(error.message)
            }
        }
    }
    const getAllAccounts = async () => {//Success
        try {
            const gas = await contract.methods.getAllAccounts().estimateGas({ from: account });
            const result = await contract.methods.getAllAccounts().call({ from: account, gas: gas })
            console.log("result", result)
            setAllUserAccounts(result);
            notify("All Account Successfully  Fatched")

        } catch (error) {
            if (error.data.data.reason) {
                notify(error.data.data.reason)

            } else {
                notify("Unexpected Error")
            }
        }
    }

    return (
        <div>
            <Container className="mt-5">
                <Card className="shadow">
                    <Card.Header><Card.Title><h1>Softwork Bank</h1></Card.Title></Card.Header>
                    <Card.Body>
                        <h5>Bank Manager Account Address: {Manager}</h5>
                        <h5>User Account Address: {account}</h5>
                        <h5>User Balance In ETH: {userBalance}</h5>
                        <h5>I Accouont Exist: {isExist}</h5>
                        <h5>is Account Freezed: {isfreezed}</h5>
                        <div> {/* get user by Id */}
                            {userAccount && (
                                <ul>
                                    <li><h5>User Id: {userAccount.id.toString()}</h5></li>
                                    <li><h5>User Name:{userAccount[1]}</h5></li>
                                    <li><h5>User Address:{userAccount.addr}</h5></li>
                                </ul>
                            )}
                        </div>
                        <div>
                            {allUserAccounts.map((account, i) => (
                                <ul key={i}>
                                    <li><h4>User Index{i}</h4></li>
                                    <li><h5>User Id: {account.id.toString()}</h5></li>
                                    <li><h5>User Name: {account.name}</h5></li>
                                    <li><h5>User Address: {account.addr}</h5></li>
                                </ul>
                            ))}
                        </div>
                        <Button variant="contained" onClick={getManager}>Manager</Button>
                        <Button variant="contained" onClick={ChekUserbalance}>User Balance</Button>
                        <br />
                        <TextField className="" placeholder="Enter Id" label='Id' name="id" id="id" value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField className="" placeholder="Enter User Name" label='name' name="name" id="naem" value={name} onChange={(e) => setName(e.target.value)} />
                        <TextField className="" placeholder="Enter User Account Address" label='Address' name="address" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <Button variant="contained" onClick={getCreateAccount}>create Account</Button><br /><br />
                        <Button variant="contained" onClick={getCheck}>Check</Button>
                        <Button variant="contained" onClick={getAllAccounts}>All Accounts</Button>
                        <Button variant="contained" onClick={getIsFreezed}>Is Freezed</Button>
                        {/* <Button variant="contained" onClick={getIsAccountExist}>Is Exist</Button> */}
                        <Button variant="contained" onClick={getAccountById}>Get Account</Button><br /><br />

                        <TextField className="" placeholder="Enter User Id" label='Id' name="Id" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField className="" placeholder="Enter User Amouont" label='Amouont' name="Amouont" id="Amouont" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getdeposit}>Deposit</Button><br /><br />

                        <TextField className="" placeholder="Enter User Id" label='Id' name="Id" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField className="" placeholder="Enter User Amouont" label='Amouont' name="Amouont" id="Amouont" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getWithdraw}>Withdraw</Button><br /><br />


                        <TextField className="" placeholder="Enter User Id" label='Id' name="Id" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField className="" placeholder="Enter User Account Address" label='Address' name="address" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getFreezAccount}>Freez Account</Button><br /><br />

                        <TextField className="" placeholder="Enter User Id" label='Id' name="Id" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField className="" placeholder="Enter User Account Address" label='Address' name="address" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getUnFreezAccount}>Un-Freez Account</Button><br /><br />

                        <TextField className="" placeholder="Enter User Id" label='Id' name="Id" id="Id" value={id} onChange={(e) => setId(e.target.value)} />
                        <TextField className="" placeholder="Enter Recipient Id" label='recipientId' name="recipientId" id="recipientId" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
                        <TextField className="" placeholder="Enter User Account Address" label='Address' name="address" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <TextField className="" placeholder="Enter Transfer amount" label='amount' name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getTransferAmount}>Transfer</Button><br /><br />

                        <Button className="me-5" variant="contained" onClick={getEmergencyWithdraw}>Emergency Withdraw</Button><br /><br />

                        <TextField className="" placeholder="Enter New Manager Address" label='New Address' name="address" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getchangeManager}>Change Manager</Button><br /><br />

                        <TextField className="" placeholder="Enter Recipient Id" label='recipientId' name="recipientId" id="recipientId" value={recipientId} onChange={(e) => setRecipientId(e.target.value)} />
                        <TextField className="" placeholder="Enter User  Address To Pay Interest" label='Pay Interest Address' name="address" id="address" value={Address} onChange={(e) => setAddress(e.target.value)} />
                        <TextField className="" placeholder="Enter Amount In Percentage" label='amount' name="amount" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        <Button className="me-5" variant="contained" onClick={getPayInterest}>Pay Interest</Button><br /><br />

                    </Card.Body>
                </Card>
            </Container>

        </div>
    )
};

export default BankAdvace;
