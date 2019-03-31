import web3 from './web3';
import CarOwner from '../compiled/CarOwner.json';

const getCarOwner = address => new web3.eth.Contract(JSON.parse(CarOwner.interface), address);

export default getCarOwner;
