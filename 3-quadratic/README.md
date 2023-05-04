# Quadratic Circuit Examples

There are two Quadratic circuit examples in `circuits/`:

* `quadratic.circom`
  * Proves that x is known in: `x^2 + x + 5 = 11`
* `abcx.circom`
  * Proves that x is known in: `ax^2 + bx + c = right`
  * a, b, c, and right are public inputs
  * x is private input

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