// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import {EntryPoint} from "../contract/EntryPoint.sol";

contract EntryPointTest is Test {
    EntryPoint public immutable i_entryPoint;

    constructor() {
        i_entryPoint = new EntryPoint();
    }

    function test_verifyProof_success() public view {
        i_entryPoint.verifyProof(_parseProof());
    }

    function _parseProof() internal view returns (bytes memory proofBytes) {
        string memory proof = vm.readLine("./proofs/main.proof");
        proofBytes = vm.parseBytes(proof);
    }
}
