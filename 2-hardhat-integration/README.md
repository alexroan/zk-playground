# Circom Hardhat Example

Based on 0xPARC's [circom-starter](https://github.com/0xPARC/circom-starter) repo.

## Installation

```
yarn
```

## Compile the Circuit

This runs a trusted setup, compiles the circuit and generates a Solidity verifier contract.

```
yarn circom:dev
```

## Test

```
yarn test
```

## Production Compilation

Uses `Date.now()` as entropy in the trusted setup.

```
yarn circom:prod
```