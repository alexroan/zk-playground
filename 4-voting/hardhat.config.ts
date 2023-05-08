import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
// require("hardhat-circom");

/** @type import('hardhat/config').HardhatUserConfig */
const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.6.11",
      },
      {
        version: "0.8.17",
      },
    ],
  },
  // circom: {
  //   inputBasePath: "./circuits",
  //   ptau: "https://hermezptau.blob.core.windows.net/ptau/powersOfTau28_hez_final_15.ptau",
  //   circuits: [
  //     {
  //       name: "quadratic",
  //       // No protocol, so it defaults to groth16
  //     },
  //     //   {
  //     //     name: "simple-polynomial",
  //     //     // Generate PLONK
  //     //     protocol: "plonk",
  //     //   },
  //     //   {
  //     //     name: "hash",
  //     //     // Explicitly generate groth16
  //     //     protocol: "groth16",
  //     //   },
  //   ],
  // },
};

export default config;
