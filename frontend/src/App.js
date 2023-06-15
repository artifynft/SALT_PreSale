import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import * as myConstants from "./constants/index";

import PreSaleBuy from "./components/dApp/PreSaleBuy";
import NavbarMain from "./components/Navbar/NavbarMain";
import KRToken_Contract from "./contracts/KRToken";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [signer, setSigner] = useState();
  const [fcContract, setFcContract] = useState();
  const [txData, setTxData] = useState();

  const connectWallet = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        /* get provider */
        const provider = new ethers.providers.Web3Provider(window.ethereum);

        /* get account */
        const accounts = await provider.send("eth_requestAccounts", []);

        /* get signer */
        setSigner(provider.getSigner());
        console.log("This is signer" + signer);
        // alert(JSON.stringify(signer));

        /* creating contract instance */
        setFcContract(KRToken_Contract(provider));
        console.log("This is contract", fcContract);

        /* setting active wallet address */
        setWalletAddress(accounts[0]);
        console.log("This is address" + walletAddress);
      } catch (e) {
        console.log("Error in connecting MetaMask" + e);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };
  useEffect(() => {
    getCurrentWalletConnected();
  });
  /* getCurrentWalletConnected will conect to the metamask wallet automatically
  when the page refreshs */

  const getCurrentWalletConnected = async () => {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_accounts", []);

        if (accounts.length > 0) {
          setSigner(provider.getSigner());

          setFcContract(KRToken_Contract(provider));

          setWalletAddress(accounts[0]);
        } else {
          console.log("Connect to MetaMask using Connect Wallet button");
        }
      } catch (e) {
        console.log("Error in getCurrentWalletConnected", e);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const time = new Date("06-06-2024 03:00 pm");
  time.setSeconds(time.getSeconds() + 0); // 10 minutes timer
  return (
    <div className="app">
      <NavbarMain connectWallet={connectWallet} walletAddress={walletAddress} />
      <PreSaleBuy
        expiryTimestamp={time}
        connectWallet={connectWallet}
        walletAddress={walletAddress}
        contractAddress={myConstants.CONTRACTADDRESS}
        contractABI={myConstants.TOKENABI}
      ></PreSaleBuy>
    </div>
  );
};

export default App;
