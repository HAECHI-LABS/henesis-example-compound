const {SDK} = require("@haechi-labs/henesis-wallet-core");
const {BN} = require('bn.js');
const {secret,token,password} = require('./credentials.json');
//env :2 == testnet
//env :3 == mainnet
const sdk = new SDK({secret:secret, accessToken:token, env:3});

const Web3 = require('web3');
const web3 = new Web3('https://tn.henesis.io/ethereum/mainnet?clientId=a481485a958f1b82ac310ec4eea27943');

const dai_abi = require('./abis/dai.json');;
const cdai_abi = require('./abis/cdai.json');

const dai_address = '0x6b175474e89094c44da98b954eedeac495271d0f';
const cdai_address = '0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643';

const dai = new web3.eth.Contract(dai_abi, dai_address);
const cdai = new web3.eth.Contract(cdai_abi, cdai_address);

// 1 dai
const amount = new BN('1000000000000000000');
async function mint(){
  //get user wallet
  const master = await sdk.eth.wallets.getMasterWallet('ae40b1b3dd953e5592c21e58be30d807');
  const user = await master.getUserWallet('e7b042cef9b3e7c7da182071bb77fe95');
  //mint cdai
  const mint_encoded = cdai.methods.mint(amount).encodeABI();
  console.log(mint_encoded);
  const mint_response = await user.contractCall(cdai_address, 0, mint_encoded,password);
  console.log(mint_response);
  console.log(await user.transactions.getTransaction(mint_response.id));
}
mint();
