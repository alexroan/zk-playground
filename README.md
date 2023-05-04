# Circom Playground

Learning ZK circuits with Circom.

## [1. Multiplier](./1-multiplier/)

This is a raw manual version of the following steps:

1. Compiling the circuit using circom
2. Long-winded trusted setup using Groth-16 and Powers of Tau
3. Generating the proof
4. Verifying the proof locally
5. Generating a smart contract verifier
6. Generating raw call to the verifier contract to copy-paste into a Remix call

## [2. Hardhat Integration](./2-hardhat-integration/)

This is a simplified version of the many manual steps above, integrated into a hardhat project, using the same circuit.

It has a hardhat test file that tests the constraints of the circuit.

## [3. Quadratic Equation Proofs](./3-quadratic/)

A hardhat project with quadratic equation provers. Prove that you know the root of an equation without revealing it.