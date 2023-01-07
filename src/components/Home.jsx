import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import PollList from "./PollList";
import PollForm from "./PollForm";

const Home = ({ address, contractAddress, contractAbi }) => {
  const [polls, setPolls] = useState([]);

  const _contractAddress = contractAddress;
  const _contractAbi = contractAbi;

  const getPollsFunction = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          _contractAddress,
          _contractAbi,
          signer
        );
        console.log("Getting polls from blockchain...");
        const pollsTxn = await contract.getPolls();
        setPolls(pollsTxn);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const becomePoller = async (e) => {
    e.preventDefault();
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          _contractAddress,
          _contractAbi,
          signer
        );
        const becomePollerTxn = await contract.becomePoller();
        console.log("You are a poller now!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPollsFunction();
  }, []);

  return (
    <div>
      <div className="home__greet">
        <h2>Welcome 👋, {address}</h2>
      </div>
      <div>
        {polls.length > 0 ? (
          <PollList
            pollsArray={polls}
            contractAddress={_contractAddress}
            contractAbi={_contractAbi}
          />
        ) : (
          <p>There are 0 polls...</p>
        )}
        <button onClick={becomePoller}>Become Poller</button>
      </div>
      <PollForm contractAddress={_contractAddress} contractAbi={_contractAbi} />
    </div>
  );
};

export default Home;
