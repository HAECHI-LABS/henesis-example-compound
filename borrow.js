const {BN} = require('bn.js');
const {userContractCall, getTransaction} = require('./call.js');
const Web3 = require('web3');
const web3 = new Web3(``);

const token_abi = require('./abis/token.json');;
const ctoken_abi = require('./abis/ctoken.json');

const {token_address, ctoken_address} = require('./config.json');

const token = new web3.eth.Contract(token_abi, token_address);
const ctoken = new web3.eth.Contract(ctoken_abi, ctoken_address);

// ex. 1 usdc = 10**18 = 1000000000000000000
// amount는 빌릴 token 양을 뜻합니다.
const amount = new BN('10000000000000000000');
async function borrow(){
  const borrow_encoded = ctoken.methods.borrow(amount).encodeABI();
  console.log(borrow_encoded);
  const borrow_response = await userContractCall(ctoken_address,0,borrow_encoded);
  console.log(borrow_response);
  console.log(await getTransaction(borrow_response.id));
}
borrow();
