// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {UltraVerifier} from "./plonk_vk.sol";

contract EntryPoint {

    error InvalidProof();
    
    UltraVerifier public immutable i_verifier;

    constructor(){
        i_verifier = new UltraVerifier();
    }

    function verifyProof(
        bytes calldata proof, bytes32[] calldata y
    ) public view {
        if(!i_verifier.verify(proof, y)) revert InvalidProof();
    }
}