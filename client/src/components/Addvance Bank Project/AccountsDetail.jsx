import React, { useContext, useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from '@mui/material';
import { BlockchainContext } from '../../Web3Connection/BankAdd';

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const AccountsDetail = () => {
    const [Users, setUsers] = useState([]);
    const { web3, contract, account } = useContext(BlockchainContext);

    const getAccounts = async () => {
        try {
            const result = await contract.methods.getAllAccounts().call()
            setUsers(result)
            console.log("accounts", result)
        } catch (error) {
            let errorMessage;
            if (error && error.data && error.data.data) {
                errorMessage = error.data.data.reason;
            } else if (error.message) {
                errorMessage = error.message;
            } else {
                errorMessage = "Unexpected Error";
            }
        }
    }
    useEffect(() => {
        getAccounts();
    }, [contract]);

    return (
        <div>
            <TableContainer className='TableAccounts mt-5 mx-auto' component={Paper}>
                <h3 className='font-weight-bold ms-3 '>All User's Accounts Detail</h3>
                <Table style={{fontSize:'20px'}}>
                    <TableHead>
                        <TableRow sx={{backgroundColor:'lightslategray'}}>
                            <TableCell className='text-white'>Index No.</TableCell>
                            <TableCell className='text-white'>User Id</TableCell>
                            <TableCell className='text-white'>User Name</TableCell>
                            <TableCell className='text-white'>User Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Users.map((item, i) =>
                            <TableRow hover key={i}>
                                <TableCell>{i}</TableCell>
                                <TableCell>{item.id.toString()}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.addr}</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
};

export default AccountsDetail;
