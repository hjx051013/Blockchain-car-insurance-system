<template>
	<div class="owner">
		<h1>车主</h1>
		<div class="welcome">
			<Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
		</div>
		<div class="container" :class="{showing:one}">
			<div>
				<h2 @click="clickOne">添加车辆</h2>
				<div v-if="!one" style="width: 250px;margin: auto auto;">

					<br>
					<br>
					<h4>在这里你可以添加车辆信息，以便为其购买保险。</h4>

				</div>
				<div v-if="one">
					<br>
					<form class="form-signin">
				        <h2 class="form-signin-heading">在此处添加车辆信息</h2><br>
				        <input type="email" class="form-control" placeholder="车辆牌照" required autofocus v-model="carInfo.number">
				        <input type="text" class="form-control" placeholder="车辆名称" required v-model="carInfo.name">
				        <input type="text" class="form-control" placeholder="车辆年数" required v-model="carInfo.age">
				        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="addCar">点此添加</button>
				        <br>
				        <button class="btn btn-lg btn-secondary btn-block" @click.prevent="clickOne">返回</button>
          </form>
				</div>
			</div>
		</div>
		<div class="container clickTwo" :class="{showing:two}">
			<div>
				<h2 @click="clickTwo">所有车辆</h2>

				<div v-if="!two" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>在这里你可以查看你的所有车辆，以及为她们购买的保险信息。</h4>
				</div>

				<div v-if="two">
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
					<table class="table table-striped">
					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车牌号码</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆名称</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆年数</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保险购买</th>
					          <th></th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in cars" v-rainbow>
					          <!-- <td>{{item.id}}</td> -->
					          <td>{{item.carNumber}}</td>
					          <td>{{item.carName}}</td>
					          <td>{{item.carAge}}</td>
					          <td v-if="item.buyRecordId==0">未购</td>
					          <td v-else>已购</td>

					          <td><router-link class="btn btn-default" v-bind:to="{path:'/cars/'+$route.params.addr+'/'+item.carId,query:{type:'carOwner'}}">详情</router-link></td>
					        </tr>
					    </tbody>
					</table>
					<button @click="two=!two" class="btn btn-lg btn-secondary btn-block">返回</button>
				 </div>
				</div>
			</div>
		</div>
		<div class="container" :class="{showing:three}">
			<div>
				<h2 @click="clickThree">信息完善</h2>
				<div v-if="!three" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>在这里你可以更正个人信息，包括密码，甚至是性别</h4>
				</div>
				<div v-if="three&&!threee" style="width: 50%;margin: auto auto;">
					<br>
					<br>
					<form class="form-signin">
				        <h2 class="form-signin-heading">在此处更改个人信息</h2><br>


				        <input type="email" class="form-control" placeholder="你的名字" required autofocus v-model="updateUser.name">

				        <div style="font-size: 20px">
					        <label>您的性别：</label>
					        &nbsp;&nbsp;&nbsp;&nbsp;
					        男：<input type="radio" v-model="updateUser.gender" required="true" value="true">
					        &nbsp;&nbsp;&nbsp;&nbsp;
					        女：<input type="radio" v-model="updateUser.gender" required="true" value="false">
					     </div>

				        <input type="text" class="form-control" placeholder="您的电话" required v-model="updateUser.phone">

				        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updateOwner">确定更改</button>

                <div>
                  <ul class="list-group" style="margin-top: 20px">
                    <li class="list-group-item">账户余额：
                      <span class="glyphicon glyphicon-stats">&nbsp;{{ownerInfo.balance}}</span>
                    </li>
                  </ul>

                  <div class="row" style="display:flex;align-items: center;">
                    <button class="btn btn-primary col-md-2 col-md-offset-1" v-on:click="updateBalance(true)">充值</button><input class="col-md-3" type="text" placeholder="金额"  required v-model="increment">
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="btn btn-primary col-md-2" v-on:click="updateBalance(false)">提现</button><input class="col-md-3" type="text" placeholder="金额"  required v-model="decrement">
                  </div>
                </div>

				        <br>
				        <button class="btn btn-lg btn-secondary btn-block" @click.prevent="clickThree">返回</button>
     				 </form>
     				 <br><br><br><br><br>
					<button class="btn btn-lg btn-primary btn-block" type="submit"   @click="threee=!threee">换个密码</button>
				</div>
				<div v-if="threee">
					<br>
					<br>
					<form class="form-signin">
				        <h2 class="form-signin-heading">修改密码</h2><br>


				        <input type="Password" class="form-control" placeholder="原始密码" required autofocus v-model="oldPassword">



				        <input type="Password" class="form-control" placeholder="新密码" required autofocus v-model="newPassword">
				        <input type="Password" class="form-control" placeholder="确认密码" required autofocus v-model="confirmPassword">

				        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updatePassword">确定更改</button>
				        <br>
				        <button class="btn btn-lg btn-secondary btn-block" @click.prevent="threee=!threee">返回</button>
     				 </form>

				</div>
			</div>
		</div>
		<div class="container" :class="{showing:four}">
			<div>
				<h2 @click="clickFour">购买保险</h2>

				<div v-if="!four" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>在这里你可以为爱车投保，只能投一个哦</h4>
				</div>

				<div v-if="four&&!fourr">
					<br>
					<br>
					<h2 class="form-signin-heading">您有这些车辆还未投保哦</h2><br>
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">

					<table class="table table-striped">

					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆ID</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车牌号码</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆名称</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆年数</th>
					          <th></th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in unInsurancedCars" v-rainbow v-if="item.buyRecordId">
					          <!-- <td>{{item.id}}</td> -->
                    <td>{{item.carId}}</td>
					          <td>{{item.carNumber}}</td>
					          <td>{{item.carName}}</td>
					          <td>{{item.carAge}}</td>


					          <td><button @click="BuyButton1(item)" class="btn btn-defaule btn-primary btn-block">选择</button></td>


					        </tr>
					    </tbody>
					</table>
					<button @click="four=!four" class="btn btn-lg btn-secondary btn-block">返回</button>
				 </div>
				</div>

				<div v-if="fourr">
					<br>
					<h2 class="form-signin-heading">您可以选择这些保险方案</h2><br>
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">

					<table class="table table-striped">

					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保险名称</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;所属公司</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效时长（年）</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;售卖价格</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;最高赔付</th>
					          <th></th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in allInsurances" v-rainbow v-if="item.onSale==true">
					          <!-- <td>{{item.id}}</td> -->
					          <td>{{item.schemeName}}</td>
					          <td>{{item.companyName}}</td>
					          <td>{{item.lastTime}}</td>
					          <td>{{item.price}}</td>
					          <td>{{item.payOut}}</td>
					          <td><button @click="BuyButton2(item)" class="btn btn-defaule btn-primary btn-block">购买</button></td>
					        </tr>
					    </tbody>
					</table>
					<button @click="fourr=!fourr" class="btn btn-lg btn-secondary btn-block">返回上一页</button>
				 </div>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:five}">
			<div>
				<h2 @click="clickFive">事故理赔</h2>

				<div v-if="!five" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>希望您永远不会用到</h4>
				</div>

				<div v-if="five">
					<br>
					<h3 class="form-signin-heading">很不幸地通知您，发生了下面的事故</h3><br>
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
					<table class="table table-striped">
					    <thead>
                <tr>
                  <!-- <th>系统识别号</th> -->
                  <th>牌照</th>
                  <th>车名</th>
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;时间</th>
                  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述</th>
                  <th>损失</th>
                  <th>处理状态</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in accidents" v-rainbow>
                  <!-- <td>{{item.id}}</td> -->
                  <td>{{item.carNumber}}</td>
                  <td>{{item.carName}}</td>
                  <td>{{parseTime(item.time)}}</td>
                  <td>{{item.describe}}</td>
                  <td>{{item.loss}}</td>
                  <td>{{parseResponsibility(item.responsibility)}}</td>
                  <td><router-link class="btn btn-default" v-bind:to="{path:'/accidents/'+item.Id,query:{type:'owner'}}">详情</router-link></td>
                </tr>
            </tbody>
					</table>
					<button @click="five=!five" class="btn btn-lg btn-secondary btn-block">返回</button>
				 </div>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:six}">
			<div>
				<h2 @click="clickSix">事故提交</h2>
        <div v-if="!six" style="width: 250px;margin: auto auto;">
          <div>✧*｡٩(ˊᗜˋ*)و✧*｡</div>
          <div style="width: 250px;margin: auto auto;">
            <br>
            <br>
            <h4>道路千万条</h4>
          </div>
        </div>
				<div v-if="six">
          <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
            <table class="table table-striped">
              <thead>
              <tr>
                <!-- <th>系统识别号</th> -->
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车牌号码</th>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆名称</th>
                <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆年数</th>
                <th></th>
              </tr>
              </thead>

              <tbody>
              <tr v-for="item in insurancedCars" v-rainbow>
                <!--只有已经参保且获得通过且未逾期的车辆才会有提交事故的资格-->
                <!-- <td>{{item.id}}</td> -->
                <td>{{item.carNumber}}</td>
                <td>{{item.carName}}</td>
                <td>{{item.carAge}}</td>
                <td><button class="btn btn-primary" @click="submitAccident(item)">提交事故</button></td>
              </tr>
              </tbody>
            </table>
            <button @click="six=!six" class="btn btn-lg btn-secondary btn-block">返回</button>
          </div>
        </div>
			</div>
		</div>
	</div>
</template>


<script>

  import CarOwner from '../../libs/carOwner';
  import Company from '../../libs/company';
  import Policer from '../../libs/policer';
  import Contracts from '../../libs/contracts';
  import web3 from '../../libs/web3';
	import Alert from './Alert';
	import AccidentDescribe from '../../libs/accidentDescribe';
	import CommonFuncs from '../../libs/commonFuncs';

	export default{
		name:'owner',
		components:{
   			 Alert,
  		},
		data(){
			return{
				one:false,
				two:false,
				three:false,threee:false,//修改密码div
				four:false,fourr:false,//买保险用div
				five:false,
				six:false,

				carInfo:{},//待添加的车辆

				updateUser:{},//更新用户信息时
        ownerInfo:{},//车主信息

				alert:'',//消息框

				cars:[],//查询所有车辆信息时存放车辆们的信息
        insurancedCars:[],//车主所有已经投保并且获得通过且没有逾期的车辆
        unInsurancedCars:[],//车主所有没有投保或者参保逾期或者投保被拒绝的车辆
				greeting:'',//早上好、中午好、下午好
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',//这三个是改密码的

				targetCar:{},//买保险时选择的车辆

				accidents:{},//事故表单

        ownerAccount:'',//用户账户地址
        increment: '',//充值金额
        decrement: '',//提现金额
        allInsurances: [],//所有保险方案
        carOwnerContract:'',//车主合约
        carOwnerListContract:'',//车主列表合约
        companyListContract:'',//公司列表合约
        buyRecordListContract:'',//订单记录合约
        accidentRecordListContract:'',//事故记录合约
			}
		},
    async created(){

			//console.log("this is created hook");
      //获得当前用户账号
      let accounts = await web3.eth.getAccounts();
      this.ownerAccount = accounts[0];
      let carOwnerAddr = this.$route.params.addr;
      console.log(carOwnerAddr);
      this.carOwnerContract = CarOwner(carOwnerAddr);
      //获得提示信息
      this.ownerInfo = await CommonFuncs.getOwnerInfo(carOwnerAddr);
      let balance = await this.carOwnerContract.methods.getBalance().call({
        from: this.ownerAccount
      });
      this.ownerInfo.balance = parseInt(balance);
      this.displayAlert()
      this.carOwnerListContract = Contracts['CarOwnerList']
      this.companyListContract = Contracts['CompanyList'];
      this.buyRecordListContract = Contracts['BuyRecordList'];
      this.accidentRecordListContract = Contracts['AccidentRecordList'];
      debugger
      await this.getNowCars();
		},
		methods:{
		  parseTime(time) {
        let date = new Date(parseInt(time));
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
      },
      parseResponsibility(responsibility) {
        if(responsibility=='0') return "待判定";
        else if(responsibility=='1') return '全责';
        else if(responsibility=='2') return '主要责任';
        else if(responsibility=='3') return '同等责任';
        else if(responsibility=='4') return '部分责任';
        else if(responsibility=='5') return '无责';
        else return '';
      },
		  async getAccidents() {
        try {
          let accidentIds = await this.accidentRecordListContract.methods.getRecordIdsByOwnerAddr(this.carOwnerContract.options.address).call();
          console.log(accidentIds);
          this.accidents = [];
          for(var i = 0; i < accidentIds.length; i++) {
            let accidentInfo = await CommonFuncs.getAccidentRecordInfo(this.accidentRecordListContract,accidentIds[i]);
            let carInfo = await CommonFuncs.getCarInfo(accidentInfo.carOwnerAddr,accidentInfo.carId);
            accidentInfo.carNumber = carInfo.carNumber;
            accidentInfo.carName = carInfo.carName;
            this.accidents.push(accidentInfo);
          }
        } catch (e) {
          this.alert = e.message;
        }
      },
		  async getCompanySchemes(companyAddr) {
		    try {
          let companyContract = Company(companyAddr);
          debugger
          let companyName = await companyContract.methods.userName().call()
          console.log(companyName);
          let schemeIds = await companyContract.methods.getSchemeIds().call()
          console.log(schemeIds);
          for(var i = 0; i < schemeIds.length; i++) {
            let schemeInfo = await CommonFuncs.getSchemeInfo(companyAddr,schemeIds[i]);
            if(schemeInfo.onSale) {
              schemeInfo.companyName = companyName;
              schemeInfo.companyAddr = companyAddr;
              this.allInsurances.push(schemeInfo);
            }
          }
        } catch (e) {
          this.alert = e.message;
        }
      },
      async getAllSchemes() {
		    try {
          debugger
          this.allInsurances = [];
          let companyAddrList = await this.companyListContract.methods.getCompanyList().call();
          console.log(companyAddrList);
          for(var i = 0; i < companyAddrList.length; i++) {
            this.getCompanySchemes(companyAddrList[i]);
          }
        } catch (e) {
          this.alert = e.message;
        }

      },
      updateBalance(isInc) {
        debugger
        if(isInc) {
          this.carOwnerContract.methods.updateBalance(this.increment).send({
            from: this.ownerAccount, gas: 5000000
          }).then(()=>{
            this.ownerInfo.balance += parseInt(this.increment);
          }).catch((err)=>{
            this.alert = err.message;
          });
        } else {
          this.carOwnerContract.methods.updateBalance(-this.decrement).send({
            from: this.ownerAccount, gas: 5000000
          }).then(()=>{
            this.ownerInfo.balance -= parseInt(this.decrement);
          }).catch((err)=>{
            this.alert = err.message;
          });
        }
      },
		  async getOwnerInfo() {
		    try {
          this.ownerInfo = await CommonFuncs.getOwnerInfo(this.carOwnerContract.options.address);
          this.displayAlert();
          let balance = await this.carOwnerContract.methods.getBalance().call({
            from: this.ownerAccount
          });
          this.ownerInfo.balance = parseInt(balance);
        }catch(err){
          this.alert = err.message;
        };
      },
		  async getNowCars() {
		    try {
          this.cars = [];
          let carIds = await this.carOwnerContract.methods.getCarIds().call();
          for(var i = 0; i < carIds.length; i++) {
            let carInfo = await CommonFuncs.getCarInfo(this.$route.params.addr,carIds[i]);
            this.cars.push(carInfo);
          }
        } catch (e) {
          this.alert = e.message;
        }
      },

      async getInsuranceAboutCars() {
        this.insurancedCars = [];
        this.unInsurancedCars = [];
        //挑出所有已经参保并且通过审批的车辆信息(包含订单信息)，和未参保或者参保被拒绝或者参保逾期的车辆信息
        for(var i = 0; i < this.cars.length; i++) {
          if(this.cars[i].buyRecordId!=0) {
            try {
              let buyRecord = await CommonFuncs.getBuyRecordInfo(this.buyRecordListContract,this.cars[i].buyRecordId);
              if(buyRecord.processState==1) {//已经获得同意并且没有逾期才可以提交事故
                let overtime = await CommonFuncs.overTime(buyRecord.companyAddr,buyRecord.schemeId,buyRecord.startTime);//根据buyRecordId就能判断该条保险记录有无逾期
                if(!overtime[0]) {//overtime[0]为true代表逾期,没有逾期的车辆进入insurancedCars数组
                  let insurancedCarInfo = this.cars[i];
                  insurancedCarInfo.carOwnerAddr = buyRecord.carOwnerAddr;
                  insurancedCarInfo.carId = buyRecord.carId;
                  insurancedCarInfo.companyAddr = buyRecord.companyAddr;
                  insurancedCarInfo.schemeId = buyRecord.schemeId;
                  this.insurancedCars.push(insurancedCarInfo);
                } else {//已经逾期的订单对应车辆可以购买保险
                  this.unInsurancedCars.push(this.cars[i]);
                }
              } else if(buyRecord.processState==2) {//已经被拒绝订单的车辆可以购买保险
                this.unInsurancedCars.push(this.cars[i]);
              }
            } catch (e) {
              this.alert = e.message;
            }
          } else {//未投保的车辆可以购买保险
            this.unInsurancedCars.push(this.cars[i]);
          }
        }
      },
		  displayAlert() {
        var time=new Date().getHours();
        if(time<12){
          this.alert='上午好，';
        }
        else if (time<19) {
          this.alert='下午好，';
        }
        else{
          this.alert='晚上好，';
        }

        this.alert+=this.ownerInfo.ownerName;
        this.alert+=this.ownerInfo.gender?'先生':'女士';
        this.greeting = this.alert;
      },
			clickOne(){
				this.one=!this.one;
				if(!this.one) {
				  this.alert = this.greeting;
        }
			},
			async clickTwo(){
				this.two=!this.two;
				if(this.two) {
          await this.getNowCars();
          debugger
        }
			},
			async clickThree(){
				this.three=!this.three;
				if(this.three) {
          this.increment='';
          this.decrement='';
          let balance = await this.carOwnerContract.methods.getBalance().call({
            from: this.ownerAccount
          });
          this.ownerInfo.balance = parseInt(balance);
        }
			},
			async clickFour(){
				this.four=!this.four;
				if(this.four) {
          await this.getInsuranceAboutCars();
        }
			},
      async clickFive(){
        this.five=!this.five;
        if(this.five) {
          await this.getAccidents();
        }
      },
			async clickSix(){
				this.six=!this.six;
        if(this.six) {
          await this.getInsuranceAboutCars();
        }
			},
      async overTime(buyRecordInfo) {//根据订单记录判断是否逾期
		    let companyAddr = buyRecordInfo[3],schemeId = buyRecordInfo[4],startTime = parseInt(buyRecordInfo[5]);
		    let companyContract = Company(companyAddr);
		    let schemeInfo = await companyContract.getSchemeInfoById(schemeId).call();
        let lastTime = parseInt(schemeInfo[3]);//以年为单位
        let date = new Date(startTime);
        date.setFullYear(date.getFullYear()+lastTime);//逾期年月日
        if(new Date().valueOf()>date.valueOf()) return [true,date];//逾期时间与当前时间比较，如果大于就逾期
        else return [false,date];
      },
			async addCar(){
			  debugger
				if (!this.carInfo.number||!this.carInfo.name||!this.carInfo.age) {
					alert("请把信息补充完整");
				}else{
				  try {
            console.log(this.carInfo);
            await this.carOwnerContract.methods.addCar(this.carInfo.number,this.carInfo.name,this.carInfo.age).send({
              from: this.ownerAccount, gas: 5000000
            });
            this.alert = "车辆信息添加成功";
            await this.getNowCars();//在添加车辆后更新车辆信息
            await this.getInsuranceAboutCars();//在添加车辆后更新insurancediCars和unInsurancedCars
          } catch (e) {
            console.log(e.message);
            this.alert = e.message;
          }
				}
			},
			updateOwner(){
				if (!this.updateUser.name||!this.updateUser.phone||!this.updateUser.gender) {
					alert('请把信息补充完整');
				}else{
				  console.log(this.updateUser);
				  debugger
				  this.carOwnerContract.methods.modifyOwnerInfo(this.updateUser.name,this.updateUser.gender,this.updateUser.phone).send({
            from: this.ownerAccount, gas: 5000000
          }).then(()=>{
            this.getOwnerInfo();
          }).catch((err)=>{
            this.alert = err.message;
          });
				}
			},
			updatePassword(){
				if (!this.newPassword||!this.confirmPassword) {
					alert("不能为空哦");
				}
				else if (this.newPassword!=this.confirmPassword) {
					alert("两个新密码不一致哦");
				}
				else{
          this.carOwnerContract.methods.pwdRight(this.oldPassword).call().then((result)=>{
              if(!result) {
                alert("原密码错误！");
              } else {
                this.carOwnerContract.methods.updatePassword(this.newPassword).send({
                  from: this.ownerAccount, gas: 5000000
                }).then(()=>{
                  this.threee=!this.threee;
                  this.three=!this.three;
                  this.alert = "密码更新成功";
                }).catch((err)=>{
                  this.alert = err.message;
                });
              }
            }
          ).catch((err)=>{
            this.alert = err.message;
          });
				}
			},
			BuyButton1(item){
		    this.fourr = !this.fourr;
		    this.getAllSchemes();
		    this.targetCar = item;
			},
			BuyButton2(item){
        //此处item记录了保险方案的信息如schemeId,schemeName,price,payOut,lastTime,companyName,companyAddr
        let startTime = String(new Date().valueOf());
        console.log(item);
        debugger
        console.log(this.carOwnerContract.options.address+","+this.targetCar.carId+","+item.companyAddr+","+item.schemeId+","+startTime+","+item.price);
		    this.buyRecordListContract.methods.addBuyRecord(this.carOwnerListContract.options.address,this.carOwnerContract.options.address,
              this.targetCar.carId,item.companyAddr,item.schemeId,startTime,item.price).send({
          from:this.ownerAccount,gas:5000000
        }).then(async ()=>{
            this.alert = "投保成功";
            //在修改车辆的buyRecordId后需要更新cars,insurancedCars,unInsurancedCars
            await this.getNowCars();
            this.getInsuranceAboutCars();
          }).catch((err)=>{
            this.alert = err.message;
        })
			},
      //生成从minNum到maxNum的随机数,随机区间为[minNum,maxNum]
      randomNum(minNum,maxNum){
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
      },
      randomVal(valArr) {
		    let index = this.randomNum(0,valArr.length-1);
		    return valArr[index];
      },
      async submitAccident(item) {
		    //此item包含有车辆信息和订单，如carId,carNumber,carName,carAge,buyRecordId,carOwnerAddr,companyAddr,schemeId
        //随机生成事故信息
        let describe = this.randomVal(AccidentDescribe.site)+","+this.randomVal(AccidentDescribe.weather)
                      +","+this.randomVal(AccidentDescribe.roadLevel)+","+this.randomVal(AccidentDescribe.roadSituation)
                      +","+this.randomVal(AccidentDescribe.trafficSituation)+","+this.randomVal(AccidentDescribe.damage)
                      +","+this.randomVal(AccidentDescribe.speed)+","+this.randomVal(AccidentDescribe.acceleration)
                      +","+this.randomVal(AccidentDescribe.alcohol);
        let curTime = new Date().valueOf();
        let loss = this.randomVal(AccidentDescribe.loss);//事故损失
        debugger
        this.accidentRecordListContract.methods.addAccidentRecord(this.carOwnerListContract.options.address,item.carOwnerAddr,
          item.carId,curTime,describe,item.companyAddr,item.schemeId,loss).send({
          from:this.ownerAccount,gas:5000000
        }).then(()=>{
            alert("已将事故信息上传！");
          }).catch((err)=>{
            this.alert = err.message;
        });
      },


		}
	}
</script>

<style>
.owner{

}



	.container{
		height: 300px;
		width: 400px;
		background-color: #ccc;
		float: left;
		margin: 10px 10px;
		transition: all 0.5s;
	}
	h2{
		margin: 15px auto;
				transition: all 0.5s;
	}


	.container:hover{
		transform: translateY(-10px);
		border-bottom: 2px solid #00925f;

	}
	.container:hover h2{
		size: 120%;
	}



	.showing{

		height: 800px;
		width:100%;
		background-color: #00925f;
		/*float: left;*/
		float: fixed;
		z-index: 5;
	}
	.form-signin{
		width: 420px;
		margin:  auto auto;
	}


	. two form{
		border:2px solid #333;
	}
</style>
