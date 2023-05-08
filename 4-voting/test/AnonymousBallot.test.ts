import { ethers } from "hardhat";
import { mimcSpongecontract } from 'circomlibjs'
import { AnonymousBallot } from "../typechain-types";
import { generateCommitment, calculateMerkleRootAndZKProof } from 'zk-merkle-tree';
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { assert } from "chai";


const SEED = "mimcsponge";
// the default verifier is for 20 levels, for different number of levels, you need a new verifier circuit
const TREE_LEVELS = 20;

const OPTION_A = 99;
const OPTION_B = 98;

describe("AnonymousBallot", () =>  {
    let signers: SignerWithAddress[]
    let voters: SignerWithAddress[]
    let ballot: AnonymousBallot

    // Register a voter and return the random commitment
    async function register(signer: SignerWithAddress) {
        const commitment = await generateCommitment()
        await ballot.connect(signer).registerCommitment(commitment.commitment)
        return commitment;
    }

    // Vote for an option from a random signer, using a registered commitment
    // The commitment is used to generate the nullifier and the merkle root
    // Impossible to link the vote to the signer of the original commitment
    async function vote(randomSigner: SignerWithAddress, option: number, commitment: any) {
        const cd = await calculateMerkleRootAndZKProof(ballot.address, randomSigner, TREE_LEVELS, commitment, "keys/Verifier.zkey")
        await ballot.connect(randomSigner).vote(option, cd.nullifierHash, cd.root, cd.proof_a, cd.proof_b, cd.proof_c)
    }

    before(async () => {
        signers = await ethers.getSigners()
        const MiMCSponge = new ethers.ContractFactory(mimcSpongecontract.abi, mimcSpongecontract.createCode(SEED, 220), signers[0])
        const mimcsponge = await MiMCSponge.deploy()
        const Verifier = await ethers.getContractFactory("Verifier");
        const verifier = await Verifier.deploy();
        voters = signers.slice(0, 5)
        const AnonymousBallot = await ethers.getContractFactory("AnonymousBallot");
        ballot = await AnonymousBallot.deploy(voters.map(v => v.address), TREE_LEVELS, mimcsponge.address, verifier.address);
    });

    it("Test voting one way", async () => {
        let commitments = []

        // register voters
        for (let i = 0; i < voters.length; i++) {
            commitments.push(await register(voters[i]))
        }

        // votes
        for (let i = 0; i < voters.length; i++) {
            await vote(signers[i+5], OPTION_A, commitments[i])
        }

        assert((await ballot.voteTally(OPTION_A)).toString() == voters.length.toString(), "OPTION_A tally not correct")
        assert((await ballot.voteTally(OPTION_B)).toString() == "0", "OPTION_B tally not correct")
    });
});