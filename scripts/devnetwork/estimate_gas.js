// Copyright (c) 2022 Recast
// license that can be found in the LICENSE file.

const { web3, contract, compiledContract } = require('./initial')

// For testrpc
// Need to unlock owner account first in testrpc or ganache
// Get average gas price 
web3.eth.getGasPrice()
  .then((averageGasPrice) => {
    console.log(`Average gas price: ${averageGasPrice}`)
    console.log(`Average gas price [ETH]: ${web3.utils.fromWei(averageGasPrice)}`)

    return {
      averageGasPrice
    }
  })
  .then((opts) => {
    // Get account for testing from testprc
    return web3.eth.getAccounts()
      .then((accounts) => {

        return {
          ...opts,
          owner: accounts[0],
          restContributor: accounts.slice(1)
        }
      })

  })
  .then((opts) => {
    // Estimate gas of contract
    return contract.deploy({
      data: compiledContract.bytecode
    })
      .estimateGas()
      .then((estimatedGas) => {
        console.log(`Estimated gas: ${estimatedGas}`)
        return {
          ...opts,
          estimatedGas
        }
      })
  })
  .then((opts) => {
    return contract.deploy({
      data: compiledContract.bytecode
    }).send({
      from: opts.owner,
      gasPrice: opts.averageGasPrice,
      gas: opts.estimatedGas
    }).then((instance) => {
      console.log(`Contract mined at ${instance.options.address}`)
      return {
        ...opts,
        devTokenInstance: instance,
        address: instance.options.address
      }
    })
  })
  .then((opts) => {
    // Estimate spreadForContributor function
    // address _to come from testrpc
    contract.options.address = opts.address

    contract.methods['spreadToken(address,uint256)'](opts.restContributor[0], web3.utils.toBN('1e21'))
      .estimateGas({ from: opts.owner })
      .then((gasAmount) => {
        console.log(`Estimated gas for spreadToken method: ${gasAmount}`)
      })

    return opts
  })
  .then((opts) => {
    // Maxmimum length than can handle array of address and amount is approximately 180
    contract.methods['spreadTokenAddresses(address[],uint256[])']
      (opts.restContributor, Array.from(new Array(opts.restContributor.length), (val, index) => web3.utils.toBN('1e22')))
      .estimateGas({ from: opts.owner })
      .then((gasAmount) => {
        console.log(`Estimated gas for spreadTokenAddresses method: ${gasAmount}`)
      })

    return opts
  })
  .then((opts) => {
    contract.methods.enableTransfer().send({ from: opts.owner }).
      then(() => {

        // Estimate gas for transfer function
        contract.methods['transfer(address,uint256)']
          (opts.restContributor[0], web3.utils.toBN('1e25'))
          .estimateGas({ from: opts.owner })
          .then((gasAmount) => {
            console.log(`Estimated gas for transfer method: ${gasAmount}`)
          })
      })
  })
  .catch(console.error)