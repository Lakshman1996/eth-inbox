const fs = require('fs');
const path = require('path');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf-8');


module.exports = solc.compile(source, 1).contracts[':Inbox']; // 1 refers the no of contracts we are compiling, in this case it is 1.