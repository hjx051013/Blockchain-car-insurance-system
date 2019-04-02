pragma solidity ^0.4.17;

contract Utils {

    function stringToBytes32(string memory source)  internal pure  returns (bytes32 result) {
        assembly {
            result := mload(add(source, 32))
        }
    }

    function bytes32ToString(bytes32 x)  internal pure returns (string memory) {
        bytes memory bytesString = new bytes(32);
        uint charCount = 0;
        for (uint j = 0; j < 32; j++) {
            byte char = byte(bytes32(uint(x) * 2 ** (8 * j)));
            if (char != 0) {
                bytesString[charCount] = char;
                charCount++;
            }
        }
        bytes memory bytesStringTrimmed = new bytes(charCount);
        for (j = 0; j < charCount; j++) {
            bytesStringTrimmed[j] = bytesString[j];
        }
        return string(bytesStringTrimmed);
    }
    function compareStrings (string memory a, string memory b) internal pure returns (bool) {
       return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
   }
}

contract CarOwnerList is Utils{
    address[] public carOwnerList;//store the address of contract
    mapping(address=>address) public creatorOwnerMap;//map the creator's address to the CarOwner contract's address
    function createCarOwner(address _AccidentRecordList,address _BuyRecordList,string userName,string password,bool gender,string phone)
    public {
        address ownerAccount = msg.sender;
        require(isNotRegistered(ownerAccount));
        address newCarOwner = new CarOwner(_AccidentRecordList,_BuyRecordList,ownerAccount,userName,password,gender,phone);
        carOwnerList.push(newCarOwner);
        creatorOwnerMap[ownerAccount] = newCarOwner;
    }

    function isNotRegistered(address account) internal view returns (bool) {
        return creatorOwnerMap[account]==0;//if account hasn't create contract,the mapping's default value is 0
    }

    function verifyPwd(string userName,string password) public view returns (bool) {
        address creator = msg.sender;
        require(!isNotRegistered(creator));
        address contractAddr = creatorOwnerMap[creator];
        CarOwner carOwner = CarOwner(contractAddr);
        return compareStrings(carOwner.userName(),userName)&&carOwner.pwdRight(password);
    }
    function getCarownerList() public view returns (address[]) {
        return carOwnerList;
    }

    function isCarOwner(address ownerAddr) public view returns (bool) {
        for(uint i = 0; i < carOwnerList.length; i++) {
            if(ownerAddr==carOwnerList[i]) return true;
        }
        return false;
    }
}

contract CarOwner is Utils{
    address public owner;//who create the contract through register
    address public AccidentRecordList;
    address public BuyRecordList;
    string public userName;
    bytes32 private password;
    uint private nowBalance;
    bool public gender;
    string public phone;


    struct Car {
        uint carId;
        string carNumber;
        string carName;
        uint8 carAge;
        uint buyRecordId;//the buying record id array of this car
        bool isValid;// used for mapping to judge if the key has the corresponding value
    }

    modifier ownerOnly {
        require(msg.sender==owner);
        _;
    }

    modifier ownerOrSystemOnly {
        require(msg.sender==owner||msg.sender==AccidentRecordList||msg.sender==BuyRecordList);
        _;
    }

    uint[] public cars;//store cars' carId
    mapping(uint=>Car) carMap;//get the car according to its id

    constructor(address _AccidentRecordList,address _BuyRecordList,address _owner,string _userName,string _pwd,bool _gender,string _phone) public {
        owner = _owner;
        AccidentRecordList = _AccidentRecordList;
        BuyRecordList = _BuyRecordList;
        userName = _userName;
        password = stringToBytes32(_pwd);
        nowBalance = 10000;
        gender = _gender;
        phone = _phone;
    }

    function pwdRight(string _pwd) public view returns (bool) {
        return password==stringToBytes32(_pwd);
    }

    function getBalance() public view ownerOrSystemOnly returns (uint) {
        return nowBalance;
    }

    function modifyOwnerInfo(string _userName,bool _gender,string _phone) public ownerOnly {
        userName = _userName;
        gender = _gender;
        phone = _phone;
    }

    function updateBalance(int increment) public ownerOrSystemOnly {
        require((int(nowBalance)+increment)>=0);
        nowBalance = uint(int(nowBalance) + increment);
    }

    function updatePassword(string newPwd) public ownerOnly {
        password = stringToBytes32(newPwd);
    }

    function getOwnerInfo() public view returns(string,bool,string){
        return (userName,gender,phone);
    }



    //add a car by carNumber,carName,carAge, the default buyRecordId is zero
    function addCar(string carNumber,string carName,uint8 carAge)  public ownerOnly{
        require(notRepeated(carNumber));
        uint nowCarId = cars.length>0?cars[cars.length-1]+1:1;
        cars.push(nowCarId);
        carMap[nowCarId].carId = nowCarId;
        carMap[nowCarId].carNumber = carNumber;
        carMap[nowCarId].carName = carName;
        carMap[nowCarId].carAge = carAge;
        carMap[nowCarId].buyRecordId = 0;//represents hasn't join insurance
        carMap[nowCarId].isValid = true;
    }

    function notRepeated(string carNumber) internal view returns (bool) {
        for(uint i = 0; i < cars.length; i++) {
            if(compareStrings(carMap[i].carNumber,carNumber)) return false;
        }
        return true;
    }

    function getCarIds() public view returns (uint[]) {
        return cars;
    }

    function getCarInfoById(uint id) public view returns (uint,string,string,uint8,uint) {
        Car storage target = carMap[id];
        return (target.carId,target.carNumber,target.carName,target.carAge,target.buyRecordId);
    }



    function buyInsurance(uint carId,uint buyRecordId)  public ownerOrSystemOnly{
        require(carMap[carId].isValid);
        carMap[carId].buyRecordId = buyRecordId;
    }



}

contract CompanyList is Utils {
    address[] public companyList;
    mapping(address=>address) public creatorCompanyMap;//in web3.js get the corresponding contract addr through CompanyList(account)
    function createCompany(address _AccidentRecordList,address _BuyRecordList,string userName,string password,string phone,string companyNo) public {
        address companyAccount = msg.sender;
        require(isNotRegistered(companyAccount));
        address newCompany = new Company(_AccidentRecordList,_BuyRecordList,companyAccount,userName,password,phone,companyNo);
        companyList.push(newCompany);
        creatorCompanyMap[companyAccount] = newCompany;
    }

    function getCompanyList() public view returns (address[]){
        return companyList;
    }

    function isNotRegistered(address account) internal view returns (bool) {
        return creatorCompanyMap[account]==0;//if account hasn't created contract,the mapping's default value is 0
    }

    function isCompany(address companyAddr) public view returns (bool) {
        for(uint i = 0; i < companyList.length; i++) {
            if(companyAddr==companyList[i]) return true;
        }
        return false;
    }

    function verifyPwd(string userName,string password) public view returns (bool) {
        address creator = msg.sender;
        require(!isNotRegistered(creator));
        address contractAddr = creatorCompanyMap[creator];
        Company company = Company(contractAddr);
        return compareStrings(company.userName(),userName)&&company.pwdRight(password);
    }
}

contract Company is Utils {
    address public owner; //who create the company by registering as a company
    address public AccidentRecordList;
    address public BuyRecordList;
    string public userName;
    bytes32 private password;
    uint private nowBalance;
    string public phone;
    string public companyNo;

    constructor(address _AccidentRecordList,address _BuyRecordList,address _owner,string _userName,string _password,string _phone,string _companyNo) public {
        owner = _owner;
        AccidentRecordList = _AccidentRecordList;
        BuyRecordList = _BuyRecordList;
        userName = _userName;
        password = stringToBytes32(_password);
        nowBalance = 10000;
        phone = _phone;
        companyNo = _companyNo;
    }

    modifier ownerOnly {
        require(owner==msg.sender);
        _;
    }

     modifier ownerOrSystemOnly {
        require(msg.sender==owner||msg.sender==AccidentRecordList||msg.sender==BuyRecordList);
        _;
    }

    function modifyCompanyInfo(string _userName,string _phone,string _companyNo) public ownerOnly {
        userName = _userName;
        phone = _phone;
        companyNo = _companyNo;
    }

    function updatePassword(string newPwd) public ownerOnly{
        password = stringToBytes32(newPwd);
    }

    function pwdRight(string _pwd) public view returns (bool) {
        return password==stringToBytes32(_pwd);
    }

    function updateBalance(int increment) public ownerOrSystemOnly{
        require((int(nowBalance)+increment) > 0);
        nowBalance = uint(int(nowBalance) + increment);
    }

    function getBalance() public view ownerOrSystemOnly returns (uint){
        return nowBalance;
    }

    function getCompanyInfo() public view returns (string,string,string) {
        return (userName,phone,companyNo);
    }


    uint[] public schemeIds;
    mapping(uint=>Scheme) schemes;
    struct Scheme {
        uint Id;
        string schemeName;
        uint lastTime;
        uint price;
        uint payOut;
        bool onSale;
        bool isValid;
    }

    function addScheme(string schemeName,uint lastTime,uint price,uint payOut) public ownerOnly{
        uint nowSchemeId = schemeIds.length>0?schemeIds[schemeIds.length-1]+1:1;
        schemeIds.push(nowSchemeId);
        schemes[nowSchemeId].Id = nowSchemeId;
        schemes[nowSchemeId].schemeName = schemeName;
        schemes[nowSchemeId].lastTime = lastTime;
        schemes[nowSchemeId].price = price;
        schemes[nowSchemeId].payOut = payOut;
        schemes[nowSchemeId].onSale = true;
        schemes[nowSchemeId].isValid = true;
    }

    function setOnSale(uint schemeId,bool onSale) public ownerOnly{
        require(existScheme(schemeId));
        schemes[schemeId].onSale = onSale;
    }

    function getSchemeIds() public view returns (uint[]) {
        return schemeIds;
    }

    function getSchemeInfoById(uint schemeId) public view returns (uint,string,uint,uint,uint,bool){
        require(existScheme(schemeId));
        Scheme storage scheme = schemes[schemeId];
        return (scheme.Id,scheme.schemeName,scheme.lastTime,scheme.price,scheme.payOut,scheme.onSale);
    }

    function existScheme(uint schemeId) internal view returns (bool) {
        return schemes[schemeId].isValid;
    }
}

contract PolicerList is Utils{
    address[] public policerList;
    mapping(address=>address) public creatorPolicerMap;
    function createPolicer(string userName,string password,string policerNumber,string phone,bool gender) public {
        address policerAccount = msg.sender;
        require(isNotRegistered(policerAccount));
        address newPolicer = new Policer(policerAccount,userName,password,policerNumber,phone,gender);
        policerList.push(newPolicer);
        creatorPolicerMap[policerAccount] = newPolicer;
    }

    function isNotRegistered(address account) internal view returns (bool) {
        return creatorPolicerMap[account]==0;//if account hasn't create contract,the mapping's default value is 0
    }

    function verifyPwd(string userName,string password) public view returns (bool) {
        address creator = msg.sender;
        require(!isNotRegistered(creator));
        address contractAddr = creatorPolicerMap[creator];
        Policer policer = Policer(contractAddr);
        return compareStrings(policer.userName(),userName)&&policer.pwdRight(password);
    }

    function isPolice(address policerAddr) public view returns(bool){
        for(uint i = 0; i < policerList.length; i++) {
            if(policerList[i]==policerAddr) return true;
        }
        return false;
    }
    function getPolicerList() public view returns (address[]){
        return policerList;
    }
}

contract Policer is Utils {
    address public owner;//who create the contract by registering as a policer
    string public userName;
    bytes32 private password;
    string public policerNo;
    string public phone;
    bool public gender;

    modifier ownerOnly {
        require(owner==msg.sender);
        _;
    }
    constructor(address _owner,string _name,string _pwd,string _policerNo,string _phone,bool _gender) public {
        owner = _owner;
        userName = _name;
        password = stringToBytes32(_pwd);
        policerNo = _policerNo;
        phone = _phone;
        gender = _gender;
    }

    function modifyPolicerInfo(string newName,string _phone,bool _gender) public ownerOnly {
        userName = newName;
        phone = _phone;
        gender = _gender;
    }

    function updatePassword(string newPwd) public ownerOnly {
        password = stringToBytes32(newPwd);
    }

    function pwdRight(string _pwd) public view returns (bool){
        return password==stringToBytes32(_pwd);
    }

    function getPolicerInfo() public view returns (string,string,string,bool){
        return (userName,policerNo,phone,gender);
    }

}

contract BuyRecordList {
    uint[] recordList;
    mapping(uint=>BuyRecord) buyRecords;

    struct BuyRecord {
        uint Id;
        address carOwner;
        uint carId;
        address company;
        uint schemeId;
        uint startTime;
        uint processState;//0 is waiting for process, 1 is approve, 2 is reject
        uint Balance;//store the money temporerily from carOwner or from company for accident payout
        bool isValid;
    }

    function getRecordList() public view returns (uint[]){
        return recordList;
    }

     function getBuyRecordById(uint recordId) public view returns (uint,address,uint,address,uint,uint,uint,uint){
             require(existRecord(recordId));
             BuyRecord storage buyRecord = buyRecords[recordId];
             return (buyRecord.Id,buyRecord.carOwner,buyRecord.carId,buyRecord.company
                     ,buyRecord.schemeId,buyRecord.startTime,buyRecord.processState,buyRecord.Balance);
     }

    // find the BuyRecord ids according to the company address
    function getBuyRecordIdsByCompany(address company) public view returns (uint[]){
        uint k = 0;
        for(uint i = 0; i < recordList.length; i++) {
            if(buyRecords[recordList[i]].company==company) k++;
        }
        uint[] memory recordIds = new uint[](k);
        k = 0;
        for(i = 0; i < recordList.length; i++) {
            if(buyRecords[recordList[i]].company==company) {
                recordIds[k++] = recordList[i];
            }
        }
        return recordIds;
    }

    function existRecord(uint recordId) internal view returns (bool) {
        return buyRecords[recordId].isValid;//isValid==true means such record exists
    }

    function addBuyRecord(address carOwnerListAddr,address carOwner,uint carId,address company,uint schemeId,uint startTime,uint price) public{
        CarOwner carOwnerContract = CarOwner(carOwner);
        require(msg.sender==carOwnerContract.owner());
        CarOwnerList carOwnerList = CarOwnerList(carOwnerListAddr);
        require(carOwnerList.isCarOwner(carOwner));
        require(carOwnerContract.getBalance()>price);
        carOwnerContract.updateBalance(-int(price));//substract carOwner's balance
        uint nowBuyRecordId = recordList.length>0?recordList[recordList.length-1]+1:1;
        recordList.push(nowBuyRecordId);
        buyRecords[nowBuyRecordId].Id = nowBuyRecordId;
        buyRecords[nowBuyRecordId].carOwner = carOwner;
        buyRecords[nowBuyRecordId].carId = carId;
        buyRecords[nowBuyRecordId].company = company;
        buyRecords[nowBuyRecordId].schemeId = schemeId;
        buyRecords[nowBuyRecordId].startTime = startTime;
        buyRecords[nowBuyRecordId].processState = 0;
        buyRecords[nowBuyRecordId].Balance = price;
        buyRecords[nowBuyRecordId].isValid = true;
        carOwnerContract.buyInsurance(carId,nowBuyRecordId);

    }

   //return the last buyRecord's id
     function getLastBuyRecordId() public view returns(uint) {
         return recordList[recordList.length-1];
     }

    function doBuyRecord(address companyListAddr,address companyAddr,uint recordId,bool approve,uint maxPayout) public {
        require(existRecord(recordId));
        Company companyContract = Company(companyAddr);
        require(companyContract.owner()==msg.sender);//Only company can do buyRecord
        CompanyList companyList = CompanyList(companyListAddr);
        require(companyList.isCompany(companyAddr));
        BuyRecord storage buyRecord = buyRecords[recordId];
        require(buyRecord.company==companyAddr); //the record's company address must equal to the companyAddr
        require(buyRecord.processState==0);//the record is unprocessed
        if(approve) {
            Company company = Company(companyAddr);
            company.updateBalance(int(buyRecord.Balance)-int(maxPayout));//transfer money to company
            buyRecord.Balance = maxPayout;
            buyRecord.processState = 1;
        } else {
            CarOwner carOwner = CarOwner(buyRecord.carOwner);
            carOwner.updateBalance(int(buyRecord.Balance));//return money to carOwner
            buyRecord.Balance = 0;
            buyRecord.processState = 2;
        }
    }

    function updateBuyRecordBalance(uint recordId,uint newBalance) public {
        BuyRecord storage buyRecord = buyRecords[recordId];
        buyRecord.Balance = newBalance;
    }

    //process the balance of those buy records who are out of date
    function cleanOutOfDate(uint recordId,address policerListAddr,address policerAddr) public{
        require(existRecord(recordId));
        Policer policer = Policer(policerAddr);
        require(policer.owner()==msg.sender);//Only policer can doAccidentRecord
        PolicerList policerList = PolicerList(policerListAddr);
        require(policerList.isPolice(policerAddr));
        BuyRecord storage buyRecord = buyRecords[recordId];

        Company targetCompany = Company(buyRecord.company);
        //send the balance of the butRecord to target company
        targetCompany.updateBalance(int(buyRecord.Balance));
        buyRecord.Balance = 0;
    }
}

contract AccidentRecordList {
    uint[] recordList;
    mapping(uint=>AccidentRecord) accidentRecords;

    struct AccidentRecord {
        uint Id;
        address carOwner;
        uint carId;
        //accident information
        uint time;
        string describe;//addr,damage,roadLevel,roadQuality,trafficDescribe,alchhol,speed,accelarate
        uint loss;//the carOwner's loss in the accident
        uint payout;//store how much is the payout in the accident

        address company;
        uint schemeId;

        address policer;
        //0:unprocessed; 1:100% responsiblity; 2: 75% responsiblity
        //3:50% responsiblity; 4: 25% responsiblity; 5: 0 responsiblity
        uint responsiblity;

        bool isValid;
    }

    function addAccidentRecord(address carOwnerListAddr,address carOwner,uint carId,uint time,string describe,
        address company,uint schemeId,uint loss) public {
        CarOwner carOwnerContract = CarOwner(carOwner);
        require(carOwnerContract.owner()==msg.sender);//Only carOwner can add AccidentRecord
        CarOwnerList carOwnerList = CarOwnerList(carOwnerListAddr);
        require(carOwnerList.isCarOwner(carOwner));
        uint nowAccidentRecordId = recordList.length>0?recordList[recordList.length-1]+1:1;
        recordList.push(nowAccidentRecordId);
        accidentRecords[nowAccidentRecordId].Id = nowAccidentRecordId;
        accidentRecords[nowAccidentRecordId].carOwner = carOwner;
        accidentRecords[nowAccidentRecordId].carId = carId;
        accidentRecords[nowAccidentRecordId].time = time;
        accidentRecords[nowAccidentRecordId].describe = describe;
        accidentRecords[nowAccidentRecordId].loss = loss;
        accidentRecords[nowAccidentRecordId].payout = 0;
        accidentRecords[nowAccidentRecordId].company = company;
        accidentRecords[nowAccidentRecordId].schemeId = schemeId;
        accidentRecords[nowAccidentRecordId].policer = 0;
        accidentRecords[nowAccidentRecordId].responsiblity = 0;//waiting for processed
        accidentRecords[nowAccidentRecordId].isValid = true;
    }

    function getRecordList() public view returns (uint[]){
        return recordList;
    }

    function getRecordIdsByOwnerAddr(address carOwnerAddr) public view returns (uint[]){
        uint k = 0;
        for(uint i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].carOwner==carOwnerAddr) k++;
        }
        uint[] memory recordIds = new uint[](k);
        k = 0;
        for(i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].carOwner==carOwnerAddr) {
                recordIds[k++] = recordList[i];
            }
        }
        return recordIds;
    }

    function getRecordIdsByCompanyAddr(address companyAddr) public view returns (uint[]) {
        uint k = 0;
        for(uint i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].company==companyAddr) k++;
        }
        uint[] memory recordIds = new uint[](k);
        k = 0;
        for(i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].company==companyAddr) {
                recordIds[k++] = recordList[i];
            }
        }
        return recordIds;
    }

    function getRecordIdsByPolicerAddr(address policerAddr) public view returns (uint[]) {
        uint k = 0;
        for(uint i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].policer==policerAddr) k++;
        }
        uint[] memory recordIds = new uint[](k);
        k = 0;
        for(i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].policer==policerAddr) {
                recordIds[k++] = recordList[i];
            }
        }
        return recordIds;
    }

    function getUndoRecordIds() public view returns(uint[]){
        uint k = 0;
        for(uint i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].responsiblity==0) k++;
        }
        uint[] memory recordIds = new uint[](k);
        k = 0;
        for(i = 0; i < recordList.length; i++) {
            if(accidentRecords[recordList[i]].responsiblity==0) {
                recordIds[k++] = recordList[i];
            }
        }
        return recordIds;
    }

    function getRecordInfoById(uint recordId) public view
    returns(uint,address,uint,uint,string,uint,address,uint,address,uint,uint){
        require(existRecord(recordId));
        AccidentRecord storage accidentRecord = accidentRecords[recordId];
        return (accidentRecord.Id,accidentRecord.carOwner,accidentRecord.carId,
                accidentRecord.time,accidentRecord.describe,accidentRecord.loss,
                accidentRecord.company,accidentRecord.schemeId,
                accidentRecord.policer,accidentRecord.responsiblity,accidentRecord.payout);
    }


    function existRecord(uint recordId) internal view returns (bool) {
        return accidentRecords[recordId].isValid;//isValid==true means such record exists
    }

    function doAccidentRecord(address policerListAddr,address BuyRecordListAddr,uint buyRecordId,uint accidentRecordId,
        address policerAddr,address carOwnerAddr,uint responsiblity,uint buyRecordAvail,uint loss) public {
        require(existRecord(accidentRecordId));
        Policer policer = Policer(policerAddr);
        require(policer.owner()==msg.sender);//Only policer can doAccidentRecord
        PolicerList policerList = PolicerList(policerListAddr);
        require(policerList.isPolice(policerAddr));
        AccidentRecord storage accidentRecord = accidentRecords[accidentRecordId];
        //compute the real payout according to buyRecordAvail,loss and responsiblity
        uint payOut = getPayout(buyRecordAvail,loss,responsiblity);
        BuyRecordList buyRecordList = BuyRecordList(BuyRecordListAddr);
        CarOwner carOwner = CarOwner(carOwnerAddr);
        //transfer payOut to carOwner
        carOwner.updateBalance(int(payOut));
        //updateBuyRecordBalance with new available balance
        buyRecordList.updateBuyRecordBalance(buyRecordId,buyRecordAvail-payOut);
        accidentRecord.policer = policerAddr;
        accidentRecord.responsiblity = responsiblity;
        accidentRecord.payout = payOut;
    }

    function getPayout(uint avail,uint loss,uint responsiblity) internal pure returns (uint){
        uint payOut = (responsiblity-1)*loss/4;
        return avail<payOut?avail:payOut;
    }
}
