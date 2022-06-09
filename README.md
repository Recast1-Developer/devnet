# Recastx Smart Contract
[![Build Status](https://camo.githubusercontent.com/e688fadcdf711f67f38d87f6a3f61ef80c6f52722f717dc1155fb16e5529f241/68747470733a2f2f7472617669732d63692e636f6d2f7472617669732d63692f7472617669732e72622e7376673f6272616e63683d6d6173746572)]
[![Coverage Status](https://coveralls.io/repos/fog/fog/badge.svg?branch=master)]

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
