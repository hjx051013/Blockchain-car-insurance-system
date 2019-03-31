import web3 from './web3';
import Company from '../compiled/Company.json';

const getCompany = address => new web3.eth.Contract(JSON.parse(Company.interface), address);

export default getCompany;
