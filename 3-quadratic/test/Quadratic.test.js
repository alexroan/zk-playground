const hre = require("hardhat");
const {ethers} = require("hardhat");
const { assert } = require("chai");
const snarkjs = require("snarkjs");

describe("quadratic circuit", () => {
  let circuit;

  const sampleInput = {
    x: "2",
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("quadratic");
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
      assert.propertyVal(witness, "main.x", sampleInput.x);
      assert.propertyVal(witness, "main.right", "11");
    });
  
    it("has the correct output", async () => {
      const expected = { right: 11 };
      const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
      await circuit.assertOut(witness, expected);
    });
  })

  describe('verifier tests', () => {
    let verifier;
    let jsonCalldata;

    beforeEach(async () => {
      const VerifierFactory  = await ethers.getContractFactory("Verifier");
      verifier = await VerifierFactory.deploy();
      const {proof, publicSignals} = await snarkjs.groth16.fullProve(sampleInput, "circuits/quadratic.wasm", "circuits/quadratic.zkey");
      const rawcalldata = await snarkjs.groth16.exportSolidityCallData(proof, publicSignals);
      jsonCalldata = JSON.parse("["+rawcalldata+"]")
    })

    it("proves the proof", async () => {
      assert.isTrue(await verifier.verifyProof(jsonCalldata[0], jsonCalldata[1], jsonCalldata[2], jsonCalldata[3]));
    })

    it("fails to prove if the public signals are wrong", async () => {
      assert.isFalse(await verifier.verifyProof(jsonCalldata[0], jsonCalldata[1], jsonCalldata[2], [12]))
    })
  })
});