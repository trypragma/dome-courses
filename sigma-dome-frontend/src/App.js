import * as React from "react";
import './App.css';
import { ethers, utils } from "ethers";
import abi from "./utils/BoringCompany.json"
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
  const contractAddress = "0x2326b3c601e9627d48B2D4c3260A84EfFAf9b5Cb";
  const contractABI = abi.abi;
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const boringCompanyContract = new ethers.Contract(contractAddress, contractABI, signer);

  //Functions to pass down
  // 0. Check Ethereum
  // 1. ConnectWallet
  // 2. Add Employee
  // 3. Withdraw
  const connectWallet = () => {
    ethereum.request({method: 'eth_requestAccounts'})
    .then((accounts) => {
      setCurrAddress(accounts[0])
    })
  }

  const listenMMAccount = async () => {
    window.ethereum.on("accountsChanged", async function() {
      ethereum.request({method: 'eth_requestAccounts'})
      .then((accounts) => {
        setCurrAddress(accounts[0])
      })
    });
  }

  React.useEffect(() => {
    if(!ethereum){
       console.log("No Metamask");
    } else {
      connectWallet()
    }
    listenMMAccount();
  }, [currAddress, ethereum])

  // Function: Withdraw money from contract
  const withdrawAsEmployee = async () => {
    const withdrawAsEmployeeTxn = await boringCompanyContract.withdraw();
    try {
      console.log("Mining...", withdrawAsEmployeeTxn.hash)
      await withdrawAsEmployeeTxn.wait()
      console.log("Mined -- ", withdrawAsEmployeeTxn.hash)
      alert ('Successful Withdraw')
    } catch (err) {
      alert ('Error: Check console logs')
    }
  }

  // Function: Add Employee
  const addEmployeeSubmit = async (event) => {
    event.preventDefault();
    try {
      const addEmployeeTxn = await boringCompanyContract.addEmployee(employeeAddress, unlockTime, { value: ethers.utils.parseEther(amountToPay) })
      console.log("Mining...", addEmployeeTxn.hash)
      await addEmployeeTxn.wait()
      console.log("Mined -- ", addEmployeeTxn.hash)
      alert ('Successful Withdraw')
    } catch (err) {
      alert ('Error: Check console logs')
    }
  }

  return (
    <div className="App">
      <WalletHeader currAddress={currAddress}/>
      <div className="ModuleContainer">
        <div className="Module">
          <Heading contractAddress={contractAddress}/>
          <div className="AdminEmployeeContainer">
            <Admin
              addEmployeeSubmit={addEmployeeSubmit}
              employeeAddress={employeeAddress}
              setEmployeeAddress={setEmployeeAddress}
              unlockTime={unlockTime}
              setUnlockTime={setUnlockTime}
              amountToPay={amountToPay}
              setAmountToPay={setAmountToPay}
            />
            <Employee withdrawAsEmployee={withdrawAsEmployee}/>
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;
