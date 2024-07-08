// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "./Token.sol";

contract TokenFactory {

    event CollectionCreated(address collection, string name, string symbol);

    event TokenMinted(
        address collection,
        address recipient,
        uint256 tokenId,
        string tokenUri
    );

    function createCollection(
        string memory name,
        string memory symbol
    ) external {
        Token newToken = new Token(name, symbol);

        emit CollectionCreated(address(newToken), name, symbol);
    }

    function mint(address collection, address to) external {
        Token token = Token(collection);

        (uint256 tokenId, string memory tokenUri) = token.mint(to);

        emit TokenMinted(collection, to, tokenId, tokenUri);
    }
}
