import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import { requestAccount } from './utils/contractServices';
import ConnectWalletButton from './components/ConnectWalletButton';
import ContractInfo from './components/ContractInfo';
import ContractActions from './components/ContractActions';
import Customer from './components/Customer';
import Login from './pages/Login';
import { useAccount } from './hooks/useAccount';

function App() {

  const {account, setAccount} = useAccount()

  useEffect(() => {
    const fetchCurAccount = async () => {
      const account = await requestAccount();
      setAccount(account);
    };
    fetchCurAccount();
  }, []);

  useEffect(() => {
    const handleAccountChanged = (newAccounts) =>
      setAccount(newAccounts.length > 0 ? newAccounts[0] : null);
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountChanged);
    }
    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountChanged);
    };
  });

  return (
    <div className="App">
         {!account && <Login/>}
         {account && <Customer/>}
    </div>
  );
}

export default App;
