const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const mocha = require('mocha');
const {interface, bytecode } = require('../compile');

let accounts;
let inbox;
beforeEach(async () => {
    // Get a list of all accounts, ganache will create some unlocked accounts for us
    accounts = await web3.eth.getAccounts()

    // Use one of the accounts to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface)) // inbox variable references what is deployed on the blockchain, and we can call methods on that contract using inbox
        .deploy({data: bytecode, arguments: ['Hi there']}) // initializes the object
        .send({from: accounts[0], gas: '1000000'}) // deploys
});


describe('Inbox', () => {
    // check if deployment is success
    it('Deploys contract', () => {
        assert.ok(inbox.options.address);
    });

    // check for intital message
    it('has initial message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'Hi there');
    });

    // check for set message change
    it('can change message', async () => {
        await inbox.methods.setMessage('bye').send({ from: accounts[0] }); // since we are changing some data on blockchain we have to send a transaction, which costs money
        const message = await inbox.methods.message().call();
        assert.equal(message, 'bye');
    })
});