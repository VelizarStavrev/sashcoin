# sashcoin
Blockchain related course work for UNIBIT.

## Resources
1. https://ethereum.org - official ethereum site with docs  
2. https://trufflesuite.com - official truffle site with docs  
3. https://marketplace.visualstudio.com/items?itemName=JuanBlanco.solidity - a solidity plugin for .sol file styling and snippets  
4. https://trufflesuite.com/docs/truffle/getting-started/using-truffle-develop-and-the-console - truffle docs for using the develop console for testing  
5. https://github.com/trufflesuite/truffle/issues/943 - issue helping to understand how to use the truffle console  
6. https://trufflesuite.com/docs/truffle/reference/truffle-commands - truffle command breakdown  

## Creation process
1. We install the Truffle npm package (I prefer it's not global)  
```
npm i truffle
```

2. We get a coin template provided by Truffle  
```
npx truffle unbox metacoin
```

2. We change all of the names "MetaCoin" to the names of our coin  

3. We enter the develop console which starts a local server for testing  
```
npx truffle develop
```

- When starting the server, it generates addresses for testing, that look like the following:  
```
Truffle Develop started at http://localhost:9545/

Accounts:
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de

Private Keys:
(0) c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3
(1) ae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f
(2) 0dbbe8e4ae425a6d2687f1a7e3ba17bc98c673636790f1b8ad91193c05875ef1
(3) c88b703fb08cbea894b6aeff5a544fb92e78a18e19814cd85da83b71f772aa6c
(4) 388c684f0ba1ef5017716adb5d21a053ea8e90277d0868337519f97bede61418
(5) 659cbb0e2411a44db63778987b1e22153c086a95eb6b18bdf89de078917abc63
(6) 82d052c865f5763aad42add438569276c00d3d88a2d062d36b2bae914d58b8c8
(7) aa3680d5d48a8283413f7a108367c7299ca73f553735860a87b08f39395618b7
(8) 0f62d96d6675f32685bbdb8ac13cda7c23436f63efbb9d07700d8669ff12b7c4
(9) 8d5366123cb560bb606379f90a0bfd4769eecc0557f1b362dcae9012b548b1e5

Mnemonic: candy maple cake sugar pudding cream honey rich smooth crumble sweet treat
```

4. We enter the following command to create a build folder and use it in testing (in the develop console)  
```
truffle(develop) > migrate
```

5. We can get the instace of our built coin with the following  
```
truffle(develop)> let instance = await SashCoin.deployed()
truffle(develop)> instance
```
* Instance prints all the data of the contract, available methods and etc.  

6. Making a call (calls don't require gas fees)  
```
truffle(develop)> let balance = await instance.getBalance(accounts[0])
truffle(develop)> balance.toNumber()
truffle(develop)> let balance2 = await instance.getBalance(accounts[1])
truffle(develop)> balance2.toNumber()
```

* We can make a call to a specific address on the blockchain with the following  
```
truffle(develop)> let balance3 = await instance.getBalance('0x0f764073545a4fafdbe07c00004a44afdf63465f')
truffle(develop)> balance3.toNumber()
```

7. Making a transaction (transactions require gas fees)  
```
truffle(develop)> let accounts = await web3.eth.getAccounts()
truffle(develop)> instance.sendCoin(accounts[1], 10, {from: accounts[0]})
```

8. If we run the balance command again, we see the balance was changed  
```
truffle(develop)> balance = await instance.getBalance(accounts[0])
truffle(develop)> balance.toNumber()
truffle(develop)> balance2 = await instance.getBalance(accounts[1])
truffle(develop)> balance2.toNumber()
```

9. We can put the transaction in a variable to get a result  
```
truffle(develop)> let result = await instance.sendCoin(accounts[1], 10, {from: accounts[0]})
truffle(develop)> result
```

* The result includes the following
```
result.tx (string) - Transaction hash
result.logs (array) - Decoded events (logs)
result.receipt (object) - Transaction receipt (includes the amount of gas used)
```