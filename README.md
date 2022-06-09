# Recastx Smart Contract
[![Build Status](https://travis-ci.org/devresearch/devnetwork-token.svg?branch=master)](https://travis-ci.org/devresearch/devnetwork-token)
[![Coverage Status](https://coveralls.io/repos/fog/fog/badge.svg?branch=master)

# Overview

## RecastX Devnet Token

The Recastnetwork Token smart contract `RecastToken.sol` is ERC20-compatible and has the following additional characteristics:

1. A fixed supply of pre-minted tokens
2. The ability to burn tokens by a user, removing the tokens from the supply

The token contract includes the following constants:

```javascript
    name             = "RecastToken";
    symbol           = "RXY";
    decimals         = 18;
    INITIAL_SUPPLY   = 400 million RXY
```
