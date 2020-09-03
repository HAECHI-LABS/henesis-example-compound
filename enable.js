const {SDK} = require("@haechi-labs/henesis-wallet-core");
const {BN} = require('bn.js');
const {tnClientId, secret,accessToken,password} = require('./credentials.json');
//env :2 == testnet
//env :3 == mainnet
const {env, masterWalletId, userWalletId} = require('./config.json');
const sdk = new SDK({secret:secret, accessToken:accessToken, env:env});

const Web3 = require('web3');
const web3 = new Web3(`https://tn.henesis.io/ethereum/mainnet?clientId=${tnClientId}`);

const token_abi = require('./abis/token.json');;
const ctoken_abi = require('./abis/ctoken.json');

// ex. dai address  0x6b175474e89094c44da98b954eedeac495271d0f
const token_address = '';

// ex. cdai address 0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643
const ctoken_address = '';

const token = new web3.eth.Contract(token_abi, token_address);
const ctoken = new web3.eth.Contract(ctoken_abi, ctoken_address);

// ex. 1 dai = 10**18 = 1000000000000000000
const amount = new BN('');
const approve_amount = new BN('FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', 16);
async function approve(){
  const master = await sdk.eth.wallets.getMasterWallet(masterWalletId);
  console.log(master.getAddress());
  const user = await master.getUserWallet(userWalletId);
  const approve_encoded = token.methods.approve(ctoken_address, approve_amount).encodeABI();
  console.log(approve_encoded);
  const approve_response = await user.contractCall(token_address,0,approve_encoded,password);
  console.log(await sdk.eth.transactions.getTransaction(approve_response.id));
}
approve();
