import { ethers } from "ethers";
import React, { useState } from "react";

const PollForm = ({ contractAddress, contractAbi }) => {
  const [idea, setIdea] = useState("");

  const handleIdea = async (e) => {
    setIdea(e.target.value);
  };

  const createPoll = async (e) => {
    e.preventDefault();
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
        const newPoll = await contract.createPoll(idea);
        console.log("Youre poll has been created!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Create Poll</h2>
      <form>
        <div>
          <label>Idea</label>
          <textarea
            cols="30"
            rows="10"
            placeholder="what do you suggest to transform out society"
            value={idea}
            onChange={handleIdea}
          />
        </div>
        <button onClick={createPoll}>Create Poll</button>
      </form>
    </div>
  );
};

export default PollForm;
