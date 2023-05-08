// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.17;

import "../node_modules/zk-merkle-tree/contracts/ZKTree.sol";

/// @dev An anonymous ballot with a single round of voting.
/// 2 phases: register and vote.
/// During the register phase, voters register by submitting their commitments.
/// Once all voters have registered commitments, the voting phase begins.
/// During the voting phase, anonymous addresses can send the vote and proof that a commitment is known.
/// Once all voters have revealed their votes, the ballot is closed.
contract AnonymousBallot is ZKTree {

    // COMMITMENT / REGISTRATION PHASE
    // Voters
    mapping(address => bool) public isVoter;
    uint256 public immutable numVoters;
    mapping(address => bool) public hasCommitted;
    uint256 public commitmentTally;

    // Vote options
    uint256 constant public OPTION_A = 99;
    uint256 constant public OPTION_B = 98;

    // VOTE PHASE
    mapping(uint256 => uint256) public voteTally;

    constructor(
        address[] memory voters,
        uint32 levels,
        IHasher hasher,
        IVerifier verifier
    ) ZKTree(levels, hasher, verifier) {
        for (uint256 i = 0; i < voters.length; i++) {
            isVoter[voters[i]] = true;
        }
        numVoters = voters.length;
    }

    function registerCommitment(
        uint256 commitment
    ) external {
        require(isVoter[msg.sender], "Not a registered voter");
        require(!hasCommitted[msg.sender], "Already registered");
        require(commitment != 0, "Invalid registration commitment");

        _commit(bytes32(commitment));
        hasCommitted[msg.sender] = true;
        commitmentTally++;
    }

    function vote(
        uint256 option,
        uint256 nullifier,
        uint256 root,
        uint[2] calldata proof_a,
        uint[2][2] calldata proof_b,
        uint[2] calldata proof_c
    ) external {
        require(commitmentTally == numVoters, "Commitment phase not over");
        require(option == OPTION_A || option == OPTION_B, "Invalid option");

        _nullify(
            bytes32(nullifier),
            bytes32(root),
            proof_a,
            proof_b,
            proof_c
        );

        voteTally[option]++;
    }
}