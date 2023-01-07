import React from "react";
import { ethers } from "ethers";

const Poll = ({ creator, id, idea, votes, contractAddress, contractAbi }) => {
  const votePoll = async () => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum, "any");
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          contractAddress,
          contractAbi,
          signer
        );
        const voteTxn = await contract.votePoll(id);
        await voteTxn.wait();
        console.log("Vote added!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h4>By: {creator}</h4>
      <p>idea: {idea}</p>
      <p>votes: {votes.toString()}</p>
      <p>id: {id.toNumber()}</p>
      <button onClick={votePoll}>vote</button>
    </div>
  );
};

export default Poll;
