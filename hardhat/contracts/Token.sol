// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./ERC721A/ERC721A.sol";
import "./Ownable/Ownable.sol";

contract Token is ERC721A, Ownable {
    constructor(string memory name, string memory symbol) ERC721A(name, symbol) Ownable(tx.origin, msg.sender) {}

    function mint(address to) onlyOwner shouldCalledFromFactory external returns (uint256 tokenId, string memory tokenUri) {
        tokenId = _nextTokenId();
        _safeMint(to, 1);
        tokenUri = tokenURI(tokenId);
    }
}