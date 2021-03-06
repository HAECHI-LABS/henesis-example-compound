# Compound Example

## Environment

**node 10.16을 이용하여 작성되었습니다**

node를 설치하시고, 프로젝트 폴더에서 npm install을 실행합니다

### Enclave

다음 명령어로 enclave api를 실행합니다

`docker pull haechi/sdk-enclave:stable`

`docker run --name enclave -p 3000:3000 -e NODE_ENV=production -d haechi/sdk-enclave:stable`

## Configuration

config.json에 enclave URL, 사용할 token_address, ctoken_address 그리고 트랜잭션 발생에 활용할 masterWalletId와 userWalletId를 채워넣습니다

credentials.json에 henesis dashboard에서 제공하는 secret, accessToken을 각각 secret, accessToken에 넣고,

masterWallet의 비밀번호를 password에 입력합니다


## Token Setting

해당 함수에서 사용할 토큰의 양을 amount에 입력합니다.

amount는 decimal을 반영한 값이어야 합니다

ex. 1 usdc = 1*10**18 = 1000000000000000000

## 실행

사용할 함수에 해당하는 파일을 실행합니다

ex. node borrow.js

### 용어 설명

- ctoken: compound 토큰을 의미합니다(ex. ctoken)

- token : ctoken의 underlying asset에 해당합니다(ex.token)

### 파일 설명

> 모든 파일에 대해 사용할 때 token_address 값과 ctoken_address 값을 변경하여야 합니다
> ctoken의 주소는 [https://compound.finance/docs#networks](https://compound.finance/docs#networks)에서 확인하실 수 있습니다

- enable.js : supply를 진행하기 위해 token을 ctoken이 사용할 수 있도록 ERC20#approve()함수를 호출하는 스크립트입니다. 샘플 스크립트에서는 token을 ctoken에게 무한히 enable 시키는 스크립트가 작성되어있습니다.

- supply.js : token을 이용하여 ctoken을 생성하기 위한 스크립트 입니다. 파일의 `amount`값에 해당하는 token을 ctoken에게 전송하여 ctoken을 생성합니다. 샘플 스크립트에서는 10 token을 이용하여 ctoken를 생성하도록 작성되어있습니다.

- withdraw.js : ctoken을 소각하고 token을 돌려받기 위한 스크립트 입니다. 파일의 `amount`값에 해당하는 token을 ctoken에게서 받습니다. 샘플 스크립트에서는 10 token를 돌려받도록 작성되어있습니다.

- borrow.js : 보유한 ctoken을 담보로 token을 빌리는 스크립트 입니다. 파일의 `amount`값에 해당하는 token을 ctoken에게서 빌립니다. 샘플 스크립트에서는 10 token를 빌리도록 작성되어있습니다.

- redeem.js : 빌린 token을 상환하는 스크립트입니다. 파일의 `amount`값에 해당하는 token을 ctoken에게 상환합니다. 샘플 스크립트에서는 10 token를 상환하도록 작성되어있습니다.
