// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    mapping(address => bool) public hasVoted;

    mapping(string => uint) public candidateVotes;

    event VoteCasted(address indexed voter, string indexed candidateId);

    modifier hasNotVoted() {
        require(!hasVoted[msg.sender], "You have already voted");
        _;
    }

    function vote(string memory _candidateId) external hasNotVoted {
        // You can add more validations here, like checking if the candidate exists
        // For simplicity, I'm assuming that any string can be a valid candidate

        hasVoted[msg.sender] = true;
        candidateVotes[_candidateId]++;

        emit VoteCasted(msg.sender, _candidateId);
    }

    function getVotes(string memory _candidateId) external view returns (uint) {
        return candidateVotes[_candidateId];
    }

    function hasUserVoted() external view returns (bool) {
        return hasVoted[msg.sender];
    }
}
