import web3 from './web3';
import contractAddrArray from '../address.json';
import AccidentRecordList from '../compiled/AccidentRecordList.json';
import BuyRecordList from '../compiled/BuyRecordList.json';
import CompanyList from '../compiled/CompanyList.json';
import CarOwnerList from '../compiled/CarOwnerList';
import PolicerList from '../compiled/PolicerList.json';

const accidentRecordList = new web3.eth.Contract(JSON.parse(AccidentRecordList.interface), contractAddrArray[0]);

const buyRecordList = new web3.eth.Contract(JSON.parse(BuyRecordList.interface), contractAddrArray[1]);

const carOwnerList = new web3.eth.Contract(JSON.parse(CarOwnerList.interface), contractAddrArray[2]);

const companyList = new web3.eth.Contract(JSON.parse(CompanyList.interface), contractAddrArray[3]);

const policerList = new web3.eth.Contract(JSON.parse(PolicerList.interface), contractAddrArray[4]);

export default {
  "AccidentRecordList": accidentRecordList,
  "BuyRecordList": buyRecordList,
  "CarOwnerList": carOwnerList,
  "CompanyList": companyList,
  "PolicerList": policerList
}
