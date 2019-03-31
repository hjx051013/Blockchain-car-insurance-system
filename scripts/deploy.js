const fs = require('fs-extra');
const path = require('path');
const config = require('config');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');

// 1. 拿到 bytecode
const AccidentRecordList = require(path.resolve(__dirname, '../compiled/AccidentRecordList.json'));
const BuyRecordList = require(path.resolve(__dirname, '../compiled/BuyRecordList.json'));
const CarOwnerList = require(path.resolve(__dirname,"../compiled/CarOwnerList.json"));
const CompanyList = require(path.resolve(__dirname,"../compiled/CompanyList.json"));
const PolicerList = require(path.resolve(__dirname,"../compiled/PolicerList.json"));


let contractList = [
  AccidentRecordList,BuyRecordList,CarOwnerList,CompanyList,PolicerList
];

let contractsName = [
  "AccidentRecordList","BuyRecordList","CarOwnerList","CompanyList","PolicerList"
];
// 2. 配置 provider
const provider = new HDWalletProvider(
    config.get('hdwallet'),
    config.get('infuraUrl'),
);

// 3. 初始化 web3 实例
const web3 = new Web3(provider);
contractAddrArray = [];
(async () => {
    // 4. 获取钱包里面的账户
    const accounts = await web3.eth.getAccounts();
    console.log('合约部署账户:', accounts[0]);

    // 5. 创建合约实例并且部署
   for(var i = 0; i < contractList.length; i++) {
     console.log("部署合约" + contractsName[i]);
     console.time('合约部署耗时');
     const result = await new web3.eth.Contract(JSON.parse(contractList[i].interface))
       .deploy({data: contractList[i].bytecode})
       .send({from: accounts[0], gas: '5000000'});
     console.timeEnd('合约部署耗时');

     const contractAddress = result.options.address;

     console.log('合约部署成功:', contractAddress);


     contractAddrArray.push(contractAddress)
   }
    console.log(contractAddrArray);
  // 6. 合约地址写入文件系统
    const addressFile = path.resolve(__dirname, '../address.json');
    fs.writeFileSync(addressFile, JSON.stringify(contractAddrArray));
    console.log('地址写入成功:', addressFile);
    process.exit();
})();
