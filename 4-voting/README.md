# Anonymous Ballot

## Tl;dr

The list of voters _is_ public, but the direction in which they vote is private.

## Example

- Patrick Collins is 1 of 5 public members of a DAO. The DAO want their individual voting directions to be kept hidden, but the final result to be public.
- **COMMITMENT PHASE**
- Patrick creates a `secret` and a `nullifier` locally, which he uses to generate a `commitment`. To register to vote, he sends this `commitment` to the contract from his known public address. The contract checks that the `commitment` is in fact sent from Patrick's known address, and stores it. Every DAO member does this.
- **VOTING PHASE**
- Using ZK proofs, each DAO member can now vote anonymously from anonymous accounts by proving that they know a `commitment` without having to provide that `commitment` to the contract. Instead, they just provide a ZK-proof that they know it, and their vote.

The link between Patrick's allow-listed address and the vote he casts is severed in the same way that the link between depositor and withdrawer is severed in Tornado.

## How?

Very similar to how Tornado Cash works (the [boilerplate code](https://github.com/TheBojda/zk-merkle-tree) is based on Tornado Cash).

1. The contract is deployed with an allowlist of voters (like a census).
2. Each allow-listed voter generates a random commitment from a secret and a nullifier.
3. The commitment is submitted to the contract to "register" the voter (like voter registration IRL voting). The nullifier and secret are kept by the voter.
4. Once the registration phase is over, each allow-listed address owner has a commitment that they can use to cast their vote.
5. Each registered voter uses the secret, nullifier and contract state to generate a proof that a commitment is known.
6. Using this proof, the registered voter can vote from an anonymous address not linked to the original allow-listed address to vote for an outcome.

## Open Questions

- How can we make this composable?
  - Idea: External allowlist (so that NFT balances can be used?)
- What are the best use-cases that we can tailor this to?
- Can we plug this into existing governance tools?
- How would a DAO/voting protocol use this?
- If we used token balances in place of the allowlist, how would we prevent Flashloan attacks given that the registration/commitment phase is the sensitive part? (flash loan tokens, make commitment, repay loan, then vote later even though you don't own coins anymore)

## Current limitations

- 1 round of votes. Once it's over, it's over.
- Allowlist is passed into constructor
- Treeheight is always 20, meaning it's expensive to prove for smaller allowlists
- Hardhat slow, wen ripped jesus?