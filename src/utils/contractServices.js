import Lock_ABI from "./Lock_ABI.json";
import { BrowserProvider, Contract, parseEther, formatEther, ethers } from "ethers";
import { CONTRACT_ADDRESS } from "./constants";

// Module-level variables to store provider, signer, and contract
let provider;
let signer;
let contract;


// Function to initialize the provider, signer, and contract
const initialize = async () => {
  if (typeof window.ethereum !== "undefined") {
    provider = new BrowserProvider(window.ethereum);
    signer = await provider.getSigner();
    contract = new Contract(CONTRACT_ADDRESS, Lock_ABI, signer);
  } else {
    console.error("Please install MetaMask!");
  }
};

// Initialize once when the module is loaded


// Function to request single account
export const requestAccount = async () => {
  try {
    const accounts = await provider.send("eth_requestAccounts", []);
    return accounts[0]; // Return the first account
  } catch (error) {
    console.error("Error requesting account:", error.message);
    return null;
  }
};

// Function to get contract balance in ETH
export const getContractBalanceInETH = async (provider) => {
  const balanceWei = await provider.getBalance(CONTRACT_ADDRESS);
  const balanceEth = formatEther(balanceWei); // Convert Wei to ETH string
  return balanceEth; // Convert ETH string to number
};

// Function to deposit funds to the contract
export const depositFund = async (depositValue,contract) => {
  const ethValue = parseEther(depositValue);
  const deposit = await contract.deposit({ value: ethValue });
  await deposit.wait();
};

// Function to withdraw funds from the contract
export const withdrawFund = async (contract) => {
  const withdrawTx = await contract.withdraw();
  await withdrawTx.wait();
  console.log("Withdrawal successful!");
};



// // Fonction pour valider une action
async function validateAction(userAddress, actionIndex, contract) {

    try {
        const tx = await contract.validateAction(userAddress, actionIndex);
        await tx.wait();

        console.log("Action validée avec succès :", tx.hash);
    } catch (error) {
        console.error("Erreur lors de la validation de l'action :", error);
    }
}

export const declareAction = async (description, points, userAddress,contract) => {
  try {
  
      const tx = await contract.declareAction(description, points, userAddress);
      console.log(tx)
      await tx.wait();

      console.log('Action déclarée avec succès :', tx.hash);
  } catch (error) {
      console.error('Erreur lors de la déclaration de l\'action :', error);
  }
};


export const getUserActions = async (userAddress, contract) => {
  try {
    
      const actions = await contract.getUserActions(userAddress);
      return actions;
  } catch (error) {
      console.error("Erreur lors de la récupération des actions :", error);
      throw error;
  }
};


export const checkRewardsBalance = async (userAddress,contract) => {
  try {
      const balance = await contract.checkRewardsBalance(userAddress);
      return ethers.formatUnits(balance, 2); // Retourne un nombre avec 2 décimales
  } catch (error) {
      console.error("Erreur lors de la consultation du solde de récompenses :", error);
      throw error;
  }
};