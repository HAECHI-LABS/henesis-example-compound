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
// amount는 출금할 token 양을 뜻합니다.
const amount = new BN('10000000000000000000');
async function repay(){
  const repay_encoded = ctoken.methods.redeemUnderlying(amount).encodeABI();
  console.log(repay_encoded);
  const repay_response = await userContractCall(ctoken_address,0,repay_encoded);
  console.log(repay_response);
  console.log(await getTransaction(repay_response.id));
}
repay();
