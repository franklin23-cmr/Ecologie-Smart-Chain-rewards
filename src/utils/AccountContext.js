import { Contract } from "ethers"
import { BrowserProvider } from "ethers"
import { createContext, useEffect, useState } from "react"
import { CONTRACT_ADDRESS } from "./constants";
import DEPLOY_ABI from "../artifacts/contracts/EcoRewardSystem.sol/EcoRewardSystem.json";

const defaultProvider = {

    contract: null,
    account: null,
    role: null,
    loading: true,
    isConnect: false,
    setAccount: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve()
  }

  const AccountContext = createContext(defaultProvider)

  const  AccountProvider =({children})=>{

    const [account, setAccount] = useState(defaultProvider.account)
    const [role, setRole] = useState(defaultProvider.role)
    const [loading, setLoading] = useState(defaultProvider.loading)
    const [contract ,setContract]= useState(defaultProvider.contract)
    const [isConnect , setIsConnect] = useState(defaultProvider.isConnect)
    const [signer, setSigner]= useState(defaultProvider.signer)
    const [provider, setProvider]= useState(defaultProvider.provider)

   useEffect(()=>{
    const storedAdress = window.localStorage.getItem('address')
    console.log(storedAdress)
    
    const initialize = async () => {
      if(storedAdress){
        // setAccount(storedAdress)
        setLoading(true)
        if (typeof window.ethereum !== "undefined") {
          const provider = new BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(CONTRACT_ADDRESS, DEPLOY_ABI.abi, signer);
          const accounts = await provider.send("eth_requestAccounts", []);
          setLoading(false)

          console.log(provider)
          console.log(contract)

          console.log(accounts[0])
          console.log(signer)

          setAccount(accounts[0])
          setSigner(signer)
          setProvider(provider)
          setContract(contract)
          setIsConnect(true)

        } else {
          console.error("Please install MetaMask!");
        }
      }else{
        setLoading(false)
        setIsConnect(false)
        setSigner(null)
        setProvider(null)
        setContract(null)
        window.localStorage.clear()
      } 

    };
    
    // Initialize once when the module is loaded
    initialize();
   },[])
    
    const handleLogin = async (role, errorCallback) =>{
      try {
        if (typeof window.ethereum !== "undefined") {
     
          const prov = new BrowserProvider(window.ethereum);
          const sig= await prov.getSigner();
          const cntrct = new Contract(CONTRACT_ADDRESS, DEPLOY_ABI.abi, sig);
          const accounts = await prov.send("eth_requestAccounts", []);
         
          if(accounts[0]){

            setRole(role)
            setAccount(accounts[0])
            setIsConnect(true)
            setSigner(sig)
            setProvider(prov)
            setContract(cntrct)

            window.localStorage.setItem('address', accounts[0])

            console.log("my provider",provider )
            console.log("contract")
            console.log("my acccount", accounts[0])
            console.log("signer", signer)

          }
          return accounts[0]

        } else {
          console.error("Please install MetaMask!");
          return null
        }

      } catch (error) {
        console.error("Error requesting account:", error.message);
        return null;
      }
    }

    const values = {
        provider,
        signer,
        contract,
        isConnect: isConnect,
        account,
        role,
        loading,
        setAccount,
        setLoading,
        login: handleLogin,
    
      }
    return <AccountContext.Provider value={values}>{children}</AccountContext.Provider>

  }

  export { AccountContext, AccountProvider }