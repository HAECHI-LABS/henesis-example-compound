# Compound Example

## Environment

**node 10.16을 이용하여 작성되었습니다**

node를 설치하시고, 프로젝트 폴더에서 npm install을 실행합니다

## Configuration

config.json에 enclave URL, masterWalletId와 userWalletId를 채워넣습니다

credentials.json에 henesis dashboard에서 제공하는 secret, accessToken을 각각 secret, token에 넣고,

masterWallet의 비밀번호를 password에 입력합니다


## Token Setting

사용할 함수에 해당하는 js파일(ex. borrow.js)에 token과 ctoken의 주소를 입력합니다

해당 함수에서 사용할 토큰의 양을 amount에 입력합니다.

amount는 decimal을 반영한 값이어야 합니다

ex. 1 dai = 1*10**18 = 1000000000000000000

## 실행

사용할 함수에 해당하는 파일을 실행합니다

ex. node borrow.js
