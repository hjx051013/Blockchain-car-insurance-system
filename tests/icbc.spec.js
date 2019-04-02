const AccidentDescribe = require("./accidentDescribe");
const TestFuncs = require('./TestFuncs');
const assert = require('assert');
const path = require('path');
const web3 = require('./web3')

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

function randomNum(minNum,maxNum){
  return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
}
function randomVal(valArr) {
  let index = randomNum(0,valArr.length-1);
  return valArr[index];
}

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
    //验证getOwnerInfo js接口方法
    ownerInfo = await TestFuncs.getOwnerInfo(carOwner.options.address);
    console.log("验证getOwnerInfo js接口方法：")
    console.log(ownerInfo);

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
    assert.equal(balance,10000);
    await carOwner.methods.updateBalance(20000).send({
      from: accounts[0], gas: '5000000'
    });
    balance = await carOwner.methods.getBalance().call();
    assert.equal(balance,30000);

    //add a car
    await carOwner.methods.addCar("浙A541","bmw",2).send({
      from: accounts[0], gas: '5000000'
    });
    await carOwner.methods.addCar("浙A542","Ford",1).send({
      from: accounts[0], gas: '5000000'
    });
    const carIds = await carOwner.methods.getCarIds().call();
    console.log(carIds);
    //验证getCarInfo接口方法
    let cars = [];
    for(var i = 0; i < carIds.length; i++) {
      let carInfo = await TestFuncs.getCarInfo(carOwner.options.address,carIds[i]);
      cars.push(carInfo);
    }
    console.log("验证getCarInfo接口方法：")
    console.log(cars);

    const carInfoList = await Promise.all(
      carIds.map((carId) =>
        carOwner
          .methods.getCarInfoById(carId)
          .call()
      )
    );
    cars = carInfoList.map((carId,i) => {
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
    //验证getCompanyInfo js接口方法
    companyInfo = await TestFuncs.getCompanyInfo(company.options.address);
    console.log("验证getCompanyInfo js接口方法：")
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
    let schemes = [];
    for(var i = 0; i < schemeIds.length; i++) {
      let schemeInfo = await TestFuncs.getSchemeInfo(company.options.address,schemeIds[i]);
      schemes.push(schemeInfo);
    }
    console.log("验证getSchemeInfo查询方案信息接口：")
    console.log(schemes);
    const schemeInfoList = await Promise.all(
      schemeIds.map((schemeId) => {
        return company.methods.getSchemeInfoById(schemeId)
          .call();
      })
    );
    schemes = schemeInfoList.map((schemeId,i)=> {
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
    //验证getPoliceInfo接口方法
    policerInfo = await TestFuncs.getPoliceInfo(policer.options.address);
    console.log("验证getPoliceInfo接口方法");
    console.log(policerInfo);

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

    //验证addBuyRecord方法
    await buyRecordList.methods.addBuyRecord(carOwnerList.options.address,carOwner.options.address,1,company.options.address,1,new Date("2018/02/03").valueOf(),1200).send({
      from:accounts[0], gas: '5000000'
    });
    var balance = await carOwner.methods.getBalance().call();
    assert.equal(balance,8800);
    var lastRecordId = await buyRecordList.methods.getLastBuyRecordId().call();
    assert.equal(lastRecordId,1);
    let carInfo = await carOwner.methods.getCarInfoById(1).call();
    assert(carInfo[4],1);

    await buyRecordList.methods.addBuyRecord(carOwnerList.options.address,carOwner.options.address,2,company.options.address,2,new Date("2017/04/03").valueOf(),800).send({
      from:accounts[0], gas: '5000000'
    });
    balance = await carOwner.methods.getBalance().call();
    assert.equal(balance,8000);
    lastRecordId = await buyRecordList.methods.getLastBuyRecordId().call();
    assert.equal(lastRecordId,2);
    carInfo = await carOwner.methods.getCarInfoById(2).call();
    assert(carInfo[4],2);
    //验证确实插入了两条记录
    const recordIds = await buyRecordList.methods.getRecordList().call();
    console.log(recordIds);
    assert.equal(recordIds[0],1);
    assert.equal(recordIds[1],2);

    //验证getBuyRecordInfo接口方法
    let recordInfos = [];
    let bookInfos = []
    for(var i = 0; i < recordIds.length; i++) {
      let recordInfo = await TestFuncs.getBuyRecordInfo(buyRecordList,recordIds[i]);
      recordInfos.push(recordInfo);
      let bookInfo = await TestFuncs.parseBookInfo(recordInfo);
      bookInfos.push(bookInfo);
    }
    console.log("验证getBuyRecordInfo接口方法：")
    console.log(recordInfos);
    console.log("验证parseBookInfo接口方法：");
    console.log(bookInfos);

    let buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert.equal(buyRecord1[0],1);
    assert.equal(buyRecord1[1],carOwner.options.address);
    assert.equal(buyRecord1[2],1);
    assert.equal(buyRecord1[3],company.options.address);
    assert.equal(buyRecord1[4],1);
    assert.equal(buyRecord1[5],new Date("2018/02/03").valueOf());
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
    assert.equal(buyRecord2[5],new Date("2017/04/03").valueOf());
    assert.equal(buyRecord2[6],0);
    assert.equal(buyRecord2[7],800);

    // await buyRecordList.methods.updateBuyRecordBalance(2,700).send({
    //   from:accounts[0], gas: '5000000'
    // });
    // buyRecord2 = await buyRecordList.methods.getBuyRecordById(2).call();
    // assert.equal(buyRecord2[7],700);

    //验证doBuyRecord方法
    //验证approve参保
    await buyRecordList.methods.doBuyRecord(companyList.options.address,company.options.address,1,true,5000).send({
      from:accounts[1],gas:5000000
    });

    let companyBalance = await company.methods.getBalance().call({
      from: accounts[1]
    });
    assert.equal(companyBalance,6200);//10000+1200-5000
    buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert.equal(buyRecord1[7],5000);//订单绑定金额为最大赔付
    assert.equal(buyRecord1[6],1);//订单处理状态变为1
    let ownerBalance = await carOwner.methods.getBalance().call({
      from:accounts[0]
    });
    assert.equal(ownerBalance,8000);//车主余额不发生变化
    let recordInfo = await TestFuncs.getBuyRecordInfo(buyRecordList,1);
    let bookInfo = await TestFuncs.parseBookInfo(recordInfo);
    console.log("同意参保后的getBuyRecordInfo和parseBookInfo方法验证");
    console.log(recordInfo);
    console.log(bookInfo);
    //
    //验证reject参保
    await buyRecordList.methods.doBuyRecord(companyList.options.address,company.options.address,2,false,4000).send({
      from:accounts[1],gas:5000000
    });
    companyBalance = await company.methods.getBalance().call({
      from: accounts[1]
    });
    assert(companyBalance,10000);//不扣也不增
    buyRecord2 = await buyRecordList.methods.getBuyRecordById(2).call();
    assert.equal(buyRecord2[7],0);//订单绑定金额变为0
    assert.equal(buyRecord2[6],2);//订单处理状态变为2
    ownerBalance = await carOwner.methods.getBalance().call({
      from:accounts[0]
    });
    assert(ownerBalance,8800);//保险费退还给车主
    recordInfo = await TestFuncs.getBuyRecordInfo(buyRecordList,2);
    bookInfo = await TestFuncs.parseBookInfo(recordInfo);
    console.log("拒绝参保后的getBuyRecordInfo和parseBookInfo方法验证");
    console.log(recordInfo);
    console.log(bookInfo);

    // 验证cleanOutOfDate方法
    let companyBalance1 = await company.methods.getBalance().call({
      from: accounts[1]
    });
    await buyRecordList.methods.cleanOutOfDate(1,policerList.options.address,policer.options.address).send({
      from:accounts[2],gas:5000000
    })
    let companyBalance2 = await company.methods.getBalance().call({
      from: accounts[1]
    });
    buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert.equal(buyRecord1[7],0);//订单绑定金额已被清空
    assert.equal(companyBalance2-companyBalance1,5000);//公司账户退还5000
    //
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
    //为车主的第一辆车绑定公司的第一项保险
    await buyRecordList.methods.addBuyRecord(carOwnerList.options.address,carOwner.options.address,1,company.options.address,1,120000,1200).send({
      from:accounts[0], gas: '5000000'
    });
    //公司同意
    await buyRecordList.methods.doBuyRecord(companyList.options.address,company.options.address,1,true,5000).send({
      from:accounts[1],gas:5000000
    });
    //为车主的第二辆车绑定公司的第二项保险
    await buyRecordList.methods.addBuyRecord(carOwnerList.options.address,carOwner.options.address,2,company.options.address,2,120000,800).send({
      from:accounts[0], gas: '5000000'
    });
    //公司同意
    await buyRecordList.methods.doBuyRecord(companyList.options.address,company.options.address,2,true,4000).send({
      from:accounts[1],gas:5000000
    });


    let accidentTime = new Date().valueOf();
    let describe = randomVal(AccidentDescribe.site)+","+randomVal(AccidentDescribe.weather)
      +","+randomVal(AccidentDescribe.roadLevel)+","+randomVal(AccidentDescribe.roadSituation)
      +","+randomVal(AccidentDescribe.trafficSituation)+","+randomVal(AccidentDescribe.damage)
      +","+randomVal(AccidentDescribe.speed)+","+randomVal(AccidentDescribe.acceleration)
      +","+randomVal(AccidentDescribe.alcohol);
    await accidentRecordList.methods.addAccidentRecord(carOwnerList.options.address,carOwner.options.address,1,accidentTime,describe,
            company.options.address,1,1000).send({
      from:accounts[0], gas: '5000000'
    });
    describe = randomVal(AccidentDescribe.site)+","+randomVal(AccidentDescribe.weather)
      +","+randomVal(AccidentDescribe.roadLevel)+","+randomVal(AccidentDescribe.roadSituation)
      +","+randomVal(AccidentDescribe.trafficSituation)+","+randomVal(AccidentDescribe.damage)
      +","+randomVal(AccidentDescribe.speed)+","+randomVal(AccidentDescribe.acceleration)
      +","+randomVal(AccidentDescribe.alcohol);
    await accidentRecordList.methods.addAccidentRecord(carOwnerList.options.address,carOwner.options.address,2,accidentTime,describe,
      company.options.address,2,1500).send({
      from:accounts[0], gas: '5000000'
    });
    //验证getRecordList和getRecordInfoById
    let recordIds = await accidentRecordList.methods.getRecordList().call();
    assert.equal(recordIds[0],1);
    assert.equal(recordIds[1],2);
    let recordInfo = await accidentRecordList.methods.getRecordInfoById(1).call();
    assert.equal(recordInfo[0],1);
    assert.equal(recordInfo[1],carOwner.options.address);
    assert.equal(recordInfo[2],1);
    assert.equal(recordInfo[3],accidentTime);
    console.log(recordInfo[4]);
    assert.equal(recordInfo[5],1000);
    assert.equal(recordInfo[6],company.options.address);
    assert.equal(recordInfo[7],1);
    assert.equal(recordInfo[8],0);
    assert.equal(recordInfo[9],0);
    recordInfo = await accidentRecordList.methods.getRecordInfoById(2).call();
    assert.equal(recordInfo[0],2);
    assert.equal(recordInfo[1],carOwner.options.address);
    assert.equal(recordInfo[2],2);
    assert.equal(recordInfo[3],accidentTime);
    console.log(recordInfo[4]);
    assert.equal(recordInfo[5],1500);
    assert.equal(recordInfo[6],company.options.address);
    assert.equal(recordInfo[7],2);
    assert.equal(recordInfo[8],0);
    assert.equal(recordInfo[9],0);

    recordInfo = await TestFuncs.getAccidentRecordInfo(accidentRecordList,1);
    console.log(recordInfo);
    recordInfo = await TestFuncs.getAccidentRecordInfo(accidentRecordList,2);
    console.log(recordInfo);

    recordIds = await accidentRecordList.methods.getRecordIdsByOwnerAddr(carOwner.options.address).call();
    assert(recordIds[0],1);
    assert(recordIds[1],2);
    recordIds = await accidentRecordList.methods.getRecordIdsByCompanyAddr(company.options.address).call();
    assert(recordIds[0],1);
    assert(recordIds[1],2);
    recordIds = await accidentRecordList.methods.getRecordIdsByPolicerAddr(policer.options.address).call();
    assert.equal(recordIds.length,0);
    recordIds = await accidentRecordList.methods.getUndoRecordIds().call();
    assert(recordIds[0],1);
    assert(recordIds[1],2);

    let buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert.equal(buyRecord1[7],5000);//订单绑定金额为最大赔付
    let ownerBalance1 = await carOwner.methods.getBalance().call({
      from: accounts[0]
    });
    //交警判定事故责任比例
    await accidentRecordList.methods.doAccidentRecord(policerList.options.address,buyRecordList.options.address,
          1,1,policer.options.address,carOwner.options.address,2,buyRecord1[7],1000).send({
      from:accounts[2],gas:5000000
    });
    let ownerBalance2 = await carOwner.methods.getBalance().call({
      from: accounts[0]
    });
    assert.equal(ownerBalance2-ownerBalance1,250);//车主账户多了250
    buyRecord1 = await buyRecordList.methods.getBuyRecordById(1).call();
    assert(buyRecord1[7],4750);//订单记录余额变为4500
    let accidentRecord1 = await accidentRecordList.methods.getRecordInfoById(1).call();
    assert.equal(accidentRecord1[8],policer.options.address);//事故记录的policer属性编程policer的address
    assert.equal(accidentRecord1[9],2);//事故记录的responsiblity属性发生变化
    assert.equal(accidentRecord1[10],250);

    recordInfo = await TestFuncs.getAccidentRecordInfo(accidentRecordList,1);
    console.log(recordInfo);

  });


});
