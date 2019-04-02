import CarOwner from './carOwner';
import Company from './company';
import Policer from './policer';


let getOwnerInfo =
  async function getOwnerInfo(carOwnerAddr) {
    let carOwnerContract = CarOwner(carOwnerAddr);
    let ownerInfo = await carOwnerContract
      .methods.getOwnerInfo()
      .call();
    let owner = {}
    owner.ownerName = ownerInfo[0];
    owner.gender = ownerInfo[1];
    owner.phone = ownerInfo[2];
    return owner;
  }
let getCarInfo =
  async function getCarInfo(carOwnerAddr,carId) {
    let carOwnerContract = CarOwner(carOwnerAddr);
    let carInfo = await carOwnerContract.methods.getCarInfoById(carId).call();
    let car = {};
    car.carId = carInfo[0];
    car.carNumber = carInfo[1];
    car.carName = carInfo[2];
    car.carAge = carInfo[3];
    car.buyRecordId = carInfo[4];
    return car;
  }
let getCompanyInfo =
  async function getCompanyInfo(companyAddr) {//获得公司信息
    let companyContract = Company(companyAddr);
    let companyInfo = await companyContract.methods.getCompanyInfo().call();
    let company = {};
    company.userName = companyInfo[0];
    company.phone = companyInfo[1];
    company.companyNo = companyInfo[2];
    return company;
  }
let getSchemeInfo =
  async function getSchemeInfo(companyAddr,schemeId) {//获得方案信息
    let companyContract = Company(companyAddr);
    let schemeInfo = await companyContract.methods.getSchemeInfoById(schemeId).call();
    //返回scheme.Id,scheme.schemeName,scheme.lastTime,scheme.price,scheme.payOut,scheme.onSale共6个值
    let scheme = {};
    scheme.schemeId = schemeInfo[0];
    scheme.schemeName = schemeInfo[1];
    scheme.lastTime = schemeInfo[2];
    scheme.price = schemeInfo[3];
    scheme.payOut = schemeInfo[4];
    scheme.onSale = schemeInfo[5];
    return scheme;
  }
let getBuyRecordInfo =
  async function getBuyRecordInfo(buyRecordListContract,buyRecordId) {
    //返回结果顺序为buyRecord.Id,buyRecord.carOwner,buyRecord.carId,buyRecord.company
    //,buyRecord.schemeId,buyRecord.startTime,buyRecord.processState,buyRecord.Balance。共8个返回值
    let buyRecordInfo = await buyRecordListContract.methods.getBuyRecordById(buyRecordId).call();
    let buyRecord = {};
    buyRecord.Id = buyRecordInfo[0];
    buyRecord.carOwnerAddr = buyRecordInfo[1];
    buyRecord.carId = buyRecordInfo[2];
    buyRecord.companyAddr = buyRecordInfo[3];
    buyRecord.schemeId = buyRecordInfo[4];
    buyRecord.startTime = buyRecordInfo[5];
    buyRecord.processState = buyRecordInfo[6];
    buyRecord.balance = buyRecordInfo[7];
    return buyRecord;
  }

let parseBookInfo =
  async function parseBookInfo(buyRecord) {
    let bookInfo = {};
    bookInfo.balance = buyRecord.balance;//获得订单剩余最多赔付金额
    bookInfo.bookId = buyRecord.Id;//获得订单编号
    let result = await this.overTime(buyRecord.companyAddr,buyRecord.schemeId,buyRecord.startTime);//返回结果形式[true/false,逾期Date]
    let isOverTime = result[0];
    let overTimeDate = result[1];
    bookInfo.overTime = overTimeDate.getFullYear()+"/"+(overTimeDate.getMonth()+1)+"/"+overTimeDate.getDate();
    if(buyRecord.processState==0) bookInfo.state="待处理";
    else if(buyRecord.processState==2) bookInfo.state="已拒绝";
    else if(buyRecord.processState==1) {//已经同意，判断是否逾期
      if(isOverTime) bookInfo.state = "逾期";
      else bookInfo.state = "在保";
    }
    return bookInfo;
  }

let overTime =
  async function overTime(companyAddr,schemeId,startTime) {//根据订单记录判断是否逾期
    let companyContract = Company(companyAddr);
    let schemeInfo = await companyContract.methods.getSchemeInfoById(schemeId).call();
    let lastTime = parseInt(schemeInfo[2]);//以年为单位
    console.log("订单持续时间："+lastTime);
    let date = new Date(parseInt(startTime));
    date.setFullYear(date.getFullYear()+lastTime);//逾期年月日
    if(new Date().valueOf()>date.valueOf()) return [true,date];//逾期时间与当前时间比较，如果大于就逾期
    else return [false,date];
  }
let getAccidentRecordInfo =
  async function getAccidentRecord(accidentRecordListContract,accidentId) {
    let accidentInfo = await accidentRecordListContract
      .methods.getRecordInfoById(accidentId)
      .call();
    let accidentRecord = {};
    accidentRecord.Id = accidentInfo[0];
    accidentRecord.carOwnerAddr = accidentInfo[1];
    accidentRecord.carId = accidentInfo[2];
    accidentRecord.time = accidentInfo[3];
    accidentRecord.describe = accidentInfo[4];
    accidentRecord.loss = accidentInfo[5];
    accidentRecord.companyAddr = accidentInfo[6];
    accidentRecord.schemeId = accidentInfo[7];
    accidentRecord.policeAddr = accidentInfo[8];
    accidentRecord.responsibility = accidentInfo[9];
    accidentRecord.payOut = accidentInfo[10];
    return accidentRecord;
  }
let getPoliceInfo =
  async function getPoliceInfo(policeAddr) {
    let policeContract = Policer(policeAddr);
    let policeInfo = await policeContract.methods.getPolicerInfo().call();
    let police = {};
    police.userName = policeInfo[0];
    police.policerNo = policeInfo[1];
    police.phone = policeInfo[2];
    police.gender = policeInfo[3];
    return police;
  }

export default {
  getOwnerInfo:getOwnerInfo,
  getCarInfo:getCarInfo,
  getCompanyInfo:getCompanyInfo,
  getSchemeInfo:getSchemeInfo,
  getBuyRecordInfo:getBuyRecordInfo,
  parseBookInfo:parseBookInfo,
  overTime:overTime,
  getAccidentRecordInfo:getAccidentRecordInfo,
  getPoliceInfo:getPoliceInfo,
}
