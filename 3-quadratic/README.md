# Quadratic Circuit Examples

There are two Quadratic circuit examples in `circuits/`:

* [`quadratic.circom`](./circuits/quadratic.circom)
  * Proves that x is known in: `x^2 + x + 5 = 11`
* [`circuits/Abcx.circom`](./circuits/abcx.circom)
  * Proves that x is known in: `ax^2 + bx + c = right`
  * a, b, c, and right are public inputs
  * x is private input

## Learnings

1. Signals can only be positive. Negative inputs underflow.
2. "Not Quadratic" errors from the circom compiler mean you have more than one multiplication in a single constraint. Break the constraints up so that there is one multiplication per constraint. See [`circuits/Abcx.circom`](./circuits/abcx.circom) for an example of this.

## Installation

```
yarn
```

## Compilation

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