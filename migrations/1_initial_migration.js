// Copyright (c) 2022 Recast
// license that can be found in the LICENSE file.

const Migrations = artifacts.require("./Migrations.sol");

module.exports = (deployer) => {
  deployer.deploy(Migrations);
};
