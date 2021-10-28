import * as React from "react";
import './App.css';
import { ethers, utils } from "ethers";
// Go to your smart contract folders + import your BoringCompany.json files
// This should be in artifacts/BoringCompany folder
// import abi from "./utils/BoringCompany.json"
import Heading from "./components/Heading";
import WalletHeader from "./components/Wallet";
import Admin from "./components/Admin";
import Employee from "./components/Employee";

function App() {
  const { ethereum } = window;

  //React States
  const [currAddress, setCurrAddress] = React.useState("")
  const [employeeAddress, setEmployeeAddress] = React.useState("")
  const [unlockTime, setUnlockTime] = React.useState("")
  const [amountToPay, setAmountToPay] = React.useState("")
 
    //Web3 Things
  // const contractAddress = "";
  // const contractABI = abi.abi;
  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const signer = provider.getSigner();
  // const boringCompanyContract = new ethers.Contract(contractAddress, contractABI, signer);

    //Functions to create
  // 0. Check Ethereum
  // 1. ConnectWallet
  // 2. Add Employee
  // 3. Withdraw

  return (
    <div className="App">
      <WalletHeader currAddress={currAddress}/>
      <div className="ModuleContainer">
        <div className="Module">
      </div>
      </div>
    </div>
  );
}

export default App;
