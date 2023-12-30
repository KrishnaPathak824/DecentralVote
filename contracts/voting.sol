// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Election {
    struct Candidate {
        string id;
        string name;
        uint votes;
    }

    struct Voter {
        bool hasVoted;
        bool hasRegistered;
        string votedFor; // Candidate ID the voter voted for
    }

    mapping(string => Candidate) public candidates;
    mapping(string => Voter) public voters;

    event VoteCasted(string indexed voterId, string indexed candidateId);

    modifier hasNotVoted(string memory _voterId) {
        require(voters[_voterId].hasRegistered && !voters[_voterId].hasVoted, "Voter has already voted");
        _;
    }

    function addCandidate(string memory _candidateId, string memory _name) external {
        candidates[_candidateId] = Candidate(_candidateId, _name, 0);
    }

    function registerVoter(string memory _voterId) external {
        require(!voters[_voterId].hasRegistered, "Voter already registered");
        voters[_voterId].hasRegistered = true;
    }

    function vote(string memory _voterId, string memory _candidateId) external hasNotVoted(_voterId) {
        require(voters[_voterId].hasRegistered, "Voter not registered");
        voters[_voterId].hasVoted = true;
        voters[_voterId].votedFor = _candidateId;
        candidates[_candidateId].votes++;
        emit VoteCasted(_voterId, _candidateId);
    }

    function getVotes(string memory _candidateId) external view returns (uint) {
        return candidates[_candidateId].votes;
    }

    function getVoterVote(string memory _voterId) external view returns (bool hasVoted, string memory votedFor) {
        Voter storage voter = voters[_voterId];
        return (voter.hasVoted, voter.votedFor);
    }
}
