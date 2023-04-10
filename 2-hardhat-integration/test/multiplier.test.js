const hre = require("hardhat");
const { assert } = require("chai");

describe("multiplier circuit", () => {
  let circuit;

  const sampleInput = {
    a: "13",
    b: "7",
  };
  const sanityCheck = true;

  before(async () => {
    circuit = await hre.circuitTest.setup("multiplier");
  });

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
    assert.propertyVal(witness, "main.c", "91");
  });

  it("has the correct output", async () => {
    const expected = { c: 91 };
    const witness = await circuit.calculateWitness(sampleInput, sanityCheck);
    await circuit.assertOut(witness, expected);
  });
});