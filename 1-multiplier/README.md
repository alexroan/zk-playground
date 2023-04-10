# Installation

[Install Rust and snarkjs](https://github.com/iden3/circom/blob/master/mkdocs/docs/getting-started/installation.md).

# Compilation

```
circom multiplier.circom --r1cs --wasm --sym
```

- --r1cs: it generates the file `multiplier.r1cs` that contains the R1CS constraint system of the circuit in binary format.
- --wasm: it generates the directory `multiplier_js` that contains the Wasm code (`multiplier.wasm`) and other files needed to generate the **witness**.
- --sym : it generates the `file multiplier.sym`, a symbols file required for debugging or for printing the constraint system in an annotated mode.

[More options](https://github.com/iden3/circom/blob/master/mkdocs/docs/getting-started/compilation-options.md)

# Compute the Witness

- Add an `input.json` file which describes the values `a` and `b`
- run: 
    ```
    node multiplier_js/generate_witness.js multiplier_js/multiplier.wasm input.json witness.wtns
    ```

# Trusted Setup

Using [Groth-16](https://eprint.iacr.org/2016/260), [Powers of Tau](https://zeroknowledge.fm/the-power-of-tau-or-how-i-learned-to-stop-worrying-and-love-the-setup/#:~:text=The%20first%20we%20now%20refer,manage%20messages%20between%20the%20participants.) ceremony.

```
mkdir trusted_setup
```

Start the ceremony and contribute:
```
snarkjs powersoftau new bn128 12 trusted_setup/pot12_0000.ptau -v
```
```
snarkjs powersoftau contribute trusted_setup/pot12_0000.ptau trusted_setup/pot12_0001.ptau --name="First contribution" -v
```

Circuit-specific phase:
```
snarkjs powersoftau prepare phase2 trusted_setup/pot12_0001.ptau trusted_setup/pot12_final.ptau -v
```
```
snarkjs groth16 setup multiplier.r1cs trusted_setup/pot12_final.ptau trusted_setup/multiplier_0000.zkey
```
```
snarkjs zkey contribute trusted_setup/multiplier_0000.zkey trusted_setup/multiplier_0001.zkey --name="1st Contributor Name" -v
```
```
snarkjs zkey export verificationkey trusted_setup/multiplier_0001.zkey trusted_setup/verification_key.json
```

This phase creates both the prover key and verifier key.

# Gebnerating a Proof

```
mkdir proof
```

```
snarkjs groth16 prove trusted_setup/multiplier_0001.zkey witness.wtns proof/proof.json proof/public.json
```

# Verifying Locally

```
snarkjs groth16 verify trusted_setup/verification_key.json proof/public.json proof/proof.json
```

# Verifying in a Smart Contract

## Generate `Verifier.sol`

```
snarkjs zkey export solidityverifier trusted_setup/multiplier_0001.zkey multiplier_verifier.sol
```

Paste this into Remix.

## Generate the Call

```
cd proof
snarkjs generatecall
```