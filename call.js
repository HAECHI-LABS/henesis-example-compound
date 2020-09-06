const axios = require('axios');
const {enclaveUrl, masterWalletId, userWalletId} = require('./config.json');
const {secret, accessToken, password} = require('./credentials.json');
const BN = require('bn.js');
const enclave = axios.create({
  baseURL: enclaveUrl,
  timeout: 300000,
  headers: {
    'X-Henesis-Secret': secret,
    'Authorization': `Bearer ${accessToken}`
  }
});

async function userContractCall(contractAddress, value, data) {
  const callData = {
    contractAddress: contractAddress,
    value: "0x" + new BN(value).toString(16),
    data: data,
    passphrase: password
  };
  try{
    const result = await enclave.post(
      `/api/v2/eth/wallets/${masterWalletId}/user-wallets/${userWalletId}/contract-call`,
      callData
    );
    return result.data;
  } catch(e) {
    console.log(e);
    return e;
  }
}

async function getTransaction(txId) {
  try{
    const result = await enclave.get(`/api/v2/eth/transactions/${txId}`);
    return result.data;
  } catch(e) {
    console.log(e);
    return e;
  }
}

module.exports = {
  userContractCall,
  getTransaction
}
