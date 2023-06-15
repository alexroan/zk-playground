// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UltraVerifier} from "./plonk_vk.sol";

contract EntryPoint {
    error InvalidProof();

    UltraVerifier public immutable i_verifier;

    constructor() {
        i_verifier = new UltraVerifier();
    }

    function verifyProof(bytes calldata proof) public view {
        bytes32[] memory y = new bytes32[](0);
        if (!i_verifier.verify(proof, y)) revert InvalidProof();
    }
}
