const hre = require("hardhat");
const {ethers} = require("hardhat");
const { assert } = require("chai");
const snarkjs = require("snarkjs");

describe("abcx circuit", () => {
  let circuit;

  // 2x^2 + 3x -5 = 0
  // or
  // 2x^2 + 3x = 5
  const sampleInput = {
    a: "2",
    b: "3",
    c: "0",
    right: "5",
    x: "1"
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("abcx");
  });

  describe('circuit tests', () => {
    it("produces a witness with valid constraints", async () => {
      const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
      await circuit.checkConstraints(witness);
    });
  
    it("has expected witness values", async () => {
      const witness = await circuit.calculateLabeledWitness(
        sampleInput,
        sanityCheck
      );
      assert.propertyVal(witness, "main.a", sampleInput.a);
      assert.propertyVal(witness, "main.b", sampleInput.b);
      assert.propertyVal(witness, "main.c", sampleInput.c);
      assert.propertyVal(witness, "main.right", sampleInput.right);
      assert.propertyVal(witness, "main.x", sampleInput.x);
    });
  })

  describe('verifier tests', () => {
    let verifier;
    let jsonCalldata;

    beforeEach(async () => {
      const VerifierFactory  = await ethers.getContractFactory("contracts/AbcxVerifier.sol:Verifier");
      verifier = await VerifierFactory.deploy();
      const {proof, publicSignals} = await snarkjs.groth16.fullProve(sampleInput, "circuits/abcx.wasm", "circuits/abcx.zkey");
      const rawcalldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
      jsonCalldata = JSON.parse("["+rawcalldata+"]")
    })

    it("proves the proof", async () => {
      assert.isTrue(await verifier.verifyProof(jsonCalldata[0], jsonCalldata[1], jsonCalldata[2], jsonCalldata[3]));
    })

    it("fails to prove if the public signals are wrong", async () => {
      assert.isFalse(await verifier.verifyProof(jsonCalldata[0], jsonCalldata[1], jsonCalldata[2], [12,1,2,3]))
    })
  })
});