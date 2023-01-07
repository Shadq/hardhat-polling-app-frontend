import React, { useState } from "react";
import { useEffect } from "react";
import Home from "./components/Home";
import abi from "./utils/Polling.json";

const App = () => {
  const contractAddress = "0xf5C8BE65d76B73C40222EEd418250E1fc0503809";
  const contractAbi = abi.abi;

  const [address, setAddress] = useState("");

  const connectWallet = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Please install metamask");
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      setAddress(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const isWalletConnected = async () => {
    try {
      const { ethereum } = window;
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length > 0) {
        console.log("Wallet is connected");
      } else {
        console.log("Wallet isnt connected");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    isWalletConnected();
  });

  return (
    <div>
      {address.length === 0 ? (
        <div className="connectWallet">
          <button onClick={connectWallet}>Connect Wallet</button>
          <p className="details">
            You need to be on Chrome
            <br /> to run this app.
          </p>
        </div>
      ) : (
        <Home
          address={address}
          contractAddress={contractAddress}
          contractAbi={contractAbi}
        />
      )}
    </div>
  );
};

export default App;
