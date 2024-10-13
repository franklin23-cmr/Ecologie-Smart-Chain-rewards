import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ConnectWalletButton from "../components/ConnectWalletButton";
import ContractInfo from "../components/ContractInfo";
import ContractActions from "../components/ContractActions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAccount } from '../hooks/useAccount';

function Login() {
    const [role, setRole] = useState('customer');
    const {account , setAccount} = useAccount()

    const handleChange = (event) => {
        setRole(event.target.value);
    };


  return (
    <>
    {!account ? (
        <>
            <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="70vh"   
        >
        <Box
            p={4}  
            width="300px"  
            bgcolor="white"  
            boxShadow={3}  
            borderRadius={2}  
            textAlign="center"  
        >
            <Typography variant="h5" mb={2}>
            Connect
            </Typography>

            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={role}
                    label="Role"
                    onChange={handleChange}
                >
                    <MenuItem value="customer">customer</MenuItem>
                    <MenuItem value="partner">partner</MenuItem>
                    <MenuItem value="partner">admin</MenuItem>
                </Select>
                </FormControl>
            </Box>

            <ToastContainer />
            <ConnectWalletButton setAccount={setAccount} role={role} />
        </Box>
        </Box>

        </>
        ) : (
            <div className="contract-interactions">
            <ContractInfo account={account} />
            <ContractActions />
            </div>
        )}
    </>

  )
}

export default Login