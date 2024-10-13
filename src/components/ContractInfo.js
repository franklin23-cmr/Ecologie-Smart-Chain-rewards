import React, { useEffect, useState } from "react";
import { getContractBalanceInETH } from "../utils/contractServices";
import { useAccount } from "../hooks/useAccount";

function ContractInfo({ account }) {
  const [balance, setBalance] = useState(null);
  const {provider} = useAccount()

  useEffect(() => {
    const FetchBalance = async () => {
      console.log('my provider here', provider)
      const balanceInETH = await getContractBalanceInETH(provider);
      setBalance(balanceInETH);
    };
    FetchBalance();
  }, []);

  return (
    <div>
      <h2>Contract Balance: {balance} ETH</h2>
      <p>Connected Account: {account}</p>
    </div>
  );
}

export default ContractInfo;
