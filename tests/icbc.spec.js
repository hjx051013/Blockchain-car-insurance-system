const assert = require('assert');
const path = require('path');
const ganache = require('ganache-cli');
const Web3 = require('web3');

const web3 = new Web3(ganache.provider());

const AccidentRecordList = require(path.resolve(__dirname, '../compiled/AccidentRecordList.json'));
const BuyRecordList = require(path.resolve(__dirname, '../compiled/BuyRecordList.json'));
const CarOwnerList = require(path.resolve(__dirname,"../compiled/CarOwnerList.json"));
const CompanyList = require(path.resolve(__dirname,"../compiled/CompanyList.json"));
const PolicerList = require(path.resolve(__dirname,"../compiled/PolicerList.json"));

const CarOwner = require(path.resolve(__dirname,"../compiled/CarOwner.json"));
const Company = require(path.resolve(__dirname,"../compiled/Company.json"));
const Policer = require(path.resolve(__dirname,"../compiled/Policer.json"));

let accounts;
let accidentRecordList;
let buyRecordList;
let carOwnerList;
let companyList;
let policerList;
let carOwner;
let company;
let policer;

describe('icbc contract',() => {
  beforeEach(async () => {
      // 1.1 拿到 ganache 本地测试网络的账号
      accounts = await web3.eth.getAccounts();
      // 1.2 部署 AccidentRecordList 合约

      accidentRecordList = await new web3.eth.Contract(JSON.parse(AccidentRecordList.interface))
        .deploy({ data: AccidentRecordList.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
      buyRecordList = await new web3.eth.Contract(JSON.parse(BuyRecordList.interface))
        .deploy({ data: BuyRecordList.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
      carOwnerList = await new web3.eth.Contract(JSON.parse(CarOwnerList.interface))
        .deploy({ data: CarOwnerList.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
      companyList = await new web3.eth.Contract(JSON.parse(CompanyList.interface))
        .deploy({ data: CompanyList.bytecode })
        .send({ from: accounts[0], gas: '5000000' });
      policerList = await new web3.eth.Contract(JSON.parse(PolicerList.interface))
        .deploy({ data: PolicerList.bytecode })
        .send({ from: accounts[0], gas: '5000000' });

      await carOwnerList.methods.createCarOwner(accidentRecordList.options.address,buyRecordList.options.address,
        "hjx","123",true,"15700122326").send({
        from: accounts[0],gas: '5000000'
      });
      const [carOwnerAddr] = await carOwnerList.methods.getCarownerList().call();
      carOwner = await new web3.eth.Contract(JSON.parse(CarOwner.interface), carOwnerAddr);

      await companyList.methods.createCompany(accidentRecordList.options.address,buyRecordList.options.address,
        "hyk","123","14562","ABCD").send({
        from: accounts[1],gas: '5000000'
      });
      const [companyAddr] = await companyList.methods.getCompanyList().call();
      company = await new web3.eth.Contract(JSON.parse(Company.interface), companyAddr);

      await policerList.methods.createPolicer("hzz","123","18888","1234",true).send({
        from: accounts[2],gas: '5000000'
      });
      const [policerAddr] = await policerList.methods.getPolicerList().call();
      policer = await new web3.eth.Contract(JSON.parse(Policer.interface), policerAddr);

      console.log(carOwnerAddr+","+companyAddr+","+policerAddr);
  });

  it('carOwner should have correct properties',async () => {
    /*carOwner 属性验证
    * 方法验证
    * */
    const ownerAddr = await carOwner.methods.owner().call();
    const accidentRecordListAddr = await carOwner.methods.AccidentRecordList().call();
    const buyRecordListAddr = await carOwner.methods.BuyRecordList().call();
    const userName = await carOwner.methods.userName().call();
    const gender = await carOwner.methods.gender().call();
    const phone = await carOwner.methods.phone().call();
    var ownerInfo = await carOwner.methods.getOwnerInfo().call();

    assert.equal(ownerAddr,accounts[0]);
    assert.equal(accidentRecordListAddr,accidentRecordList.options.address);
    assert.equal(buyRecordListAddr,buyRecordList.options.address);
    assert.equal(userName,"hjx");
    assert.equal(gender,true);
    assert.equal(phone,"15700122326");
    console.log("name is "+ownerInfo[0]+",gender is "+(ownerInfo[1]?"man":"women")+",phone is "+phone);

    await carOwner.methods.modifyOwnerInfo("hyk",false,"234567").send({
      from: accounts[0], gas: '5000000'
    });
    ownerInfo = await carOwner.methods.getOwnerInfo().call();
    console.log(ownerInfo);

    var pwdRight = await carOwner.methods.pwdRight("123").call();
    assert.equal(pwdRight,true);
    await carOwner.methods.updatePassword("234").send({
      from: accounts[0], gas: '5000000'
    });
    pwdRight = await carOwner.methods.pwdRight("234").call();
    assert.equal(pwdRight,true);

    var balance = await carOwner.methods.getBalance().call();
    assert(balance,10000);
    await carOwner.methods.updateBalance(20000).send({
      from: accounts[0], gas: '5000000'
    });
    balance = await carOwner.methods.getBalance().call();
    assert(balance,30000);

    //add a car
    await carOwner.methods.addCar("浙A541","bmw",2).send({
      from: accounts[0], gas: '5000000'
    });
    await carOwner.methods.addCar("浙A542","Ford",1).send({
      from: accounts[0], gas: '5000000'
    });
    const carIds = await carOwner.methods.getCarIds().call();
    console.log(carIds);
    const carInfoList = await Promise.all(
      carIds.map((carId) =>
        carOwner
          .methods.getCarInfoById(carId)
          .call()
      )
    );
    const cars = carInfoList.map((carId,i) => {
      return Object.values(carInfoList[i])
    });
    console.log(cars);
    //验证carOwnerList方法
    pwdRight = await carOwnerList.methods.verifyPwd("hyk","234").call({from:accounts[0]});
    assert(pwdRight,true);
    var carOwnerAddr = await carOwnerList.methods.creatorOwnerMap(accounts[0]).call();
    assert(carOwnerAddr,carOwner.options.address);
  });

  it('company should have correct properties', async () => {
    /*company 属性验证
    * 方法验证
    * */
    const ownerAddr = await company.methods.owner().call({from:accounts[1]});
    const accidentRecordListAddr = await company.methods.AccidentRecordList().call({from:accounts[1]});
    const buyRecordListAddr = await company.methods.BuyRecordList().call({from:accounts[1]});
    const userName = await company.methods.userName().call({from:accounts[1]});
    const companyNo = await company.methods.companyNo().call({from:accounts[1]});
    const phone = await company.methods.phone().call({from:accounts[1]});
    var companyInfo = await company.methods.getCompanyInfo().call({from:accounts[1]});

    assert.equal(ownerAddr,accounts[1]);
    assert.equal(accidentRecordListAddr,accidentRecordList.options.address);
    assert.equal(buyRecordListAddr,buyRecordList.options.address);
    assert.equal(userName,"hyk");
    assert.equal(companyNo,"ABCD");
    assert.equal(phone,"14562");
    console.log(companyInfo);
    //验证信息修改查询方法
    try {
      await company.methods.modifyCompanyInfo("hyk1","14563","ABCDE").send({
        from: accounts[1], gas: '5000000'
      });
    } catch (err) {
      console.error(err.message);
    }
    companyInfo = await company.methods.getCompanyInfo().call();
    console.log(companyInfo);
    //验证密码
    var pwdRight = await company.methods.pwdRight("123").call();
    assert(pwdRight,true);
    try {
      await company.methods.updatePassword("234").send({
        from: accounts[1], gas: '5000000'
      })
    } catch (e) {
      console.log(e.message);
    }
    pwdRight = await company.methods.pwdRight("234").call();
    assert(pwdRight,true);
    //验证修改查询余额方法
    var balance = await company.methods.getBalance().call({
      from: accounts[1]
    });
    assert(balance,10000);
    await company.methods.updateBalance(20000).send({
      from: accounts[1], gas: '5000000'
    });
    balance = await company.methods.getBalance().call({
      from: accounts[1]
    });
    assert(balance,30000);

    //验证方案添加方法
    await company.methods.addScheme("scheme1",2,1200,5000).send({
      from: accounts[1], gas: '5000000'
    });
    await company.methods.addScheme("scheme2",1,100,4000).send({
      from: accounts[1], gas: '5000000'
    });
    const schemeIds = await company.methods.getSchemeIds().call();
    console.log(schemeIds);
    const schemeInfoList = await Promise.all(
      schemeIds.map((schemeId) => {
        return company.methods.getSchemeInfoById(schemeId)
          .call();
      })
    );
    const schemes = schemeInfoList.map((schemeId,i)=> {
      return Object.values(schemeInfoList[i])
    })
    console.log(schemes);

    //验证CompanyList的方法
    pwdRight = await companyList.methods.verifyPwd("hyk1","234").call({from:accounts[1]});
    assert(pwdRight,true);
    var companyAddr = await companyList.methods.creatorCompanyMap(accounts[1]).call();
    assert(companyAddr,company.options.address);
  })

  it("policer should have correct property",async ()=>{
    const ownerAddr = await policer.methods.owner().call();
    const userName = await policer.methods.userName().call();
    const policerNo = await policer.methods.policerNo().call();
    const phone = await policer.methods.phone().call();
    const gender = await policer.methods.gender().call();
    var policerInfo = await policer.methods.getPolicerInfo().call();

    assert.equal(ownerAddr,accounts[2]);
    assert.equal(userName,"hzz");
    assert.equal(gender,true);
    assert.equal(phone,"1234");
    assert.equal(policerNo,"18888");
    console.log("name is "+policerInfo[0]+",policerNo is "+policerInfo[1]+",gender is "+(policerInfo[3]?"man":"women")+",phone is "+policerInfo[2]);

    await policer.methods.modifyPolicerInfo("hyk1","14563",false).send({
      from: accounts[2], gas: '5000000'
    });
    policerInfo = await policer.methods.getPolicerInfo().call();
    console.log("name is "+policerInfo[0]+",policerNo is "+policerInfo[1]+",gender is "+(policerInfo[3]?"man":"women")+",phone is "+policerInfo[2]);

    let pwdRight = await policer.methods.pwdRight("123").call();
    assert.equal(pwdRight,true);
    await policer.methods.updatePassword("234").send({
      from: accounts[2], gas: '5000000'
    });
    pwdRight = await policer.methods.pwdRight("234").call();
    assert.equal(pwdRight,true);
  });

  it("BuyRecordList should have correct property",async ()=>{
    await carOwner.methods.addCar("浙A541","bmw",2).send({
      from: accounts[0], gas: '5000000'
    });
    await carOwner.methods.addCar("浙A542","Ford",1).send({
      from: accounts[0], gas: '5000000'
    });
    await company.methods.addScheme("scheme1",2,1200,5000).send({
      from: accounts[1], gas: '5000000'
    });
    await company.methods.addScheme("scheme2",1,800,4000).send({
      from: accounts[1], gas: '5000000'
    });

    //验证addButRecord方法
    await buyRecordList.methods.addBuyRecord(carOwner.options.address,1,company.options.address,1,120000,1200).send({
      from:accounts[0], gas: '5000000'
    });
    var balance = await carOwner.methods.getBalance().call();
    assert.equal(balance,8800);
    var lastRecordId = await buyRecordList.methods.getLastBuyRecordId().call();
    assert.equal(lastRecordId,1);
    await buyRecordList.methods.addBuyRecord(carOwner.options.address,2,company.options.address,2,120000,800).send({
      from:accounts[0], gas: '5000000'
    });
    balance = await carOwner.methods.getBalance().call();
    assert.equal(balance,8000);
    lastRecordId = await buyRecordList.methods.getLastBuyRecordId().call();
    assert.equal(lastRecordId,2);
    //验证确实插入了两条记录
    const recordIds = await buyRecordList.methods.getRecordList().call();
    console.log(recordIds);
    assert.equal(recordIds[0],1);
    assert.equal(recordIds[1],2);

    let buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert.equal(buyRecord1[0],1);
    assert.equal(buyRecord1[1],carOwner.options.address);
    assert.equal(buyRecord1[2],1);
    assert.equal(buyRecord1[3],company.options.address);
    assert.equal(buyRecord1[4],1);
    assert.equal(buyRecord1[5],120000);
    assert.equal(buyRecord1[6],0);
    assert.equal(buyRecord1[7],1200);
    // await buyRecordList.methods.updateBuyRecordBalance(1,1000).send({
    //   from:accounts[0], gas: '5000000'
    // });
    // buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    // assert.equal(buyRecord1[7],1000);

    let buyRecord2 = await buyRecordList.methods.getBuyRecordById(2).call();
    assert.equal(buyRecord2[0],2);
    assert.equal(buyRecord2[1],carOwner.options.address);
    assert.equal(buyRecord2[2],2);
    assert.equal(buyRecord2[3],company.options.address);
    assert.equal(buyRecord2[4],2);
    assert.equal(buyRecord2[5],120000);
    assert.equal(buyRecord2[6],0);
    assert.equal(buyRecord2[7],800);
    // await buyRecordList.methods.updateBuyRecordBalance(2,700).send({
    //   from:accounts[0], gas: '5000000'
    // });
    // buyRecord2 = await buyRecordList.methods.getBuyRecordById(2).call();
    // assert.equal(buyRecord2[7],700);

    //验证doBuyRecord方法
    //验证approve参保
    await buyRecordList.methods.doBuyRecord(company.options.address,1,true,5000).send({
      from:accounts[1],gas:5000000
    });
    let companyBalance = await company.methods.getBalance().call({
      from: accounts[1]
    });
    assert.equal(companyBalance,6200);//10000+1200-5000
    buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert.equal(buyRecord1[7],5000);//订单绑定金额为最大赔付
    let ownerBalance = await carOwner.methods.getBalance().call({
      from:accounts[0]
    });
    assert.equal(ownerBalance,8000);//车主余额不发生变化
    //
    //验证reject参保
    await buyRecordList.methods.doBuyRecord(company.options.address,2,false,4000).send({
      from:accounts[1],gas:5000000
    });
    companyBalance = await company.methods.getBalance().call({
      from: accounts[1]
    });
    assert(companyBalance,10000);//不扣也不增
    buyRecord2 = await buyRecordList.methods.getBuyRecordById(2).call();
    assert.equal(buyRecord2[7],0);//订单绑定金额变为0
    ownerBalance = await carOwner.methods.getBalance().call({
      from:accounts[0]
    });
    assert(ownerBalance,8800);//保险费退还给车主

    //验证getBuyRecordIdsByCompany方法
    result = await buyRecordList.methods.getBuyRecordIdsByCompany(company.options.address).call();
    assert(result[0],1);
    assert(result[1],2);
  });

  it("AccidentRecordList should have correct property",async ()=>{
    await carOwner.methods.addCar("浙A541","bmw",2).send({
      from: accounts[0], gas: '5000000'
    });
    await carOwner.methods.addCar("浙A542","Ford",1).send({
      from: accounts[0], gas: '5000000'
    });
    await company.methods.addScheme("scheme1",2,1200,5000).send({
      from: accounts[1], gas: '5000000'
    });
    await company.methods.addScheme("scheme2",1,800,4000).send({
      from: accounts[1], gas: '5000000'
    });

    //分别为车主的两辆车购买保险
    await buyRecordList.methods.addBuyRecord(carOwner.options.address,1,company.options.address,1,120000,1200).send({
      from:accounts[0], gas: '5000000'
    });
    await buyRecordList.methods.addBuyRecord(carOwner.options.address,1,company.options.address,1,120000,1200).send({
      from:accounts[0], gas: '5000000'
    });

    await accidentRecordList.methods.addAccidentRecord(carOwner.options.address,1,)
  });


});
