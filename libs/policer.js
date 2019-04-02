import web3 from './web3';
import Policer from '../compiled/Policer.json';

const getPolicer = address => new web3.eth.Contract(JSON.parse(Policer.interface), address);

export default getPolicer;
