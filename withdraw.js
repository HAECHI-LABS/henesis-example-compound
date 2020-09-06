const {BN} = require('bn.js');
//env :2 == testnet
//env :3 == mainnet
const {userContractCall,getTransaction} = require('./call.js');
const Web3 = require('web3');
const web3 = new Web3(``);

const token_abi = require('./abis/token.json');;
const ctoken_abi = require('./abis/ctoken.json');

// ex. dai address  0x6b175474e89094c44da98b954eedeac495271d0f
const token_address = '0xc2118d4d90b274016cb7a54c03ef52e6c537d957';

// ex. cdai address 
const ctoken_address = '0xdb5ed4605c11822811a39f94314fdb8f0fb59a2c';

const token = new web3.eth.Contract(token_abi, token_address);
const ctoken = new web3.eth.Contract(ctoken_abi, ctoken_address);

// ex. 1 dai = 10**18 = 1000000000000000000
// amount는 출금할 dai 양을 뜻합니다.
const amount = new BN('10000000000000000000');
async function repay(){
  const repay_encoded = ctoken.methods.redeemUnderlying(amount).encodeABI();
  console.log(repay_encoded);
  const repay_response = await userContractCall(ctoken_address,0,repay_encoded);
  console.log(repay_response);
  console.log(await getTransaction(repay_response.id));
}
repay();
