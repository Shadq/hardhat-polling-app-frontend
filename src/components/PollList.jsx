import React from "react";
import Poll from "./Poll";

const PollList = ({ pollsArray, contractAddress, contractAbi }) => {
  console.log(pollsArray);
  return (
    <div>
      {pollsArray.map((poll) => (
        <div>
          <Poll
            creator={poll.creator}
            id={poll.id}
            idea={poll.idea}
            votes={poll.votes}
            contractAddress={contractAddress}
            contractAbi={contractAbi}
          />
        </div>
      ))}
    </div>
  );
};

export default PollList;
