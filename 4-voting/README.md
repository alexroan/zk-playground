# Anonymous Ballot

## Tl;dr

The list of voters _is_ public, but the direction in which they vote is private.

## Open Questions

- How can we make this composable?
- What are the best use-cases that we can tailor this to?
- Can we plug this into existing governance tools?
- How would a DAO/voting protocol use this?
- If we used token balances in place of the allowlist, how would we prevent Flashloan attacks given that the registration/commitment phase is the sensitive part? (flash loan tokens, make commitment, repay loan, then vote later even though you don't own coins anymore)

## Current limitations

- 1 round of votes. Once it's over, it's over.
- Allowlist is passed into constructor
- Treeheight is always 20, meaning it's expensive to prove for smaller allowlists
- Hardhat slow, wen ripped jesus?

## How Does This Work?

Very similar to how Tornado Cash works (the [boilerplate code](https://github.com/TheBojda/zk-merkle-tree) is based on Tornado Cash).

1. The contract is deployed with an allowlist of voters (like a census).
2. Each allow-listed voter generates a random commitment from a secret and a nullifier.
3. The commitment is submitted to the contract to register the voter. The nullifier and secret are kept by the voter.
4. Once the commitment stage is over, each allow-listed address owner has a commitment with which they can use to cast their vote.
5. Each registered voter uses the secret, nullifier and contract state to generate a proof that a commitment is known.
6. Using this proof, the registered voter can vote from an anonymous address not linked to the original allowlist to vote for an outcome.

The link between the original allowlist and the votes is severed in the same way that the link between depositor and withdrawer is severed in Tornado.