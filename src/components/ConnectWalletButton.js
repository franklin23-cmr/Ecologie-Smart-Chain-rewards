import React from "react";
import { Button } from "@mui/material";
import { useAccount } from "../hooks/useAccount";
// import { useNavigate } from "react-router-dom";

function ConnectWalletButton({ setAccount, role }) {

  const account = useAccount()
  // const navigate = useNavigate()
  const connectWallet = async () => {
    try {
      const result = await account.login(role)
      if(result){
        setAccount(result)
        console.log(result)
  
        // navigate('/customer')
      }else{
        throw new Error('login impossible')
      }

    } catch (error) {
      console.error("Failed to connect wallet:", error);
    }
  };

return <Button onClick={connectWallet} variant="contained" color="primary" fullWidth sx={{ mt: 2 }} > Connect Web3 Wallet - Metamask </Button>  

  
}

export default ConnectWalletButton;
