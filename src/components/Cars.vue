<template>
	<div class="cars">
		<h2>这是您的某辆车</h2>
		<Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
    <div class="row">
      <div class="left">
        <div>
          <h3>车辆信息</h3>

          <ul class="list-group">
            <li class="list-group-item">车牌号码：
              <span class="glyphicon glyphicon-envelope">&nbsp;{{car.carNumber}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">车辆名称：
              <span class="glyphicon glyphicon-education">&nbsp;{{car.carName}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">车辆年数：
              <span class="glyphicon glyphicon-stats">&nbsp;{{car.carAge}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">车主名字：
              <span class="glyphicon glyphicon-jpy">&nbsp;{{carOwner.ownerName}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">保险购买状态：
              <span class="glyphicon glyphicon-modal-window" v-if="car.buyRecordId!=0">&nbsp;已购 </span>
              <span class="glyphicon glyphicon-modal-window" v-else>&nbsp;未购 </span>
            </li>
          </ul>
        </div>
      </div>


      <div class="right" v-if="schemeInfo">
        <div>
          <h3>保险信息</h3>

          <ul class="list-group">
            <li class="list-group-item">保险名称：
              <span class="glyphicon glyphicon-envelope">&nbsp;{{schemeInfo.schemeName}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">保险时长：
              <span class="glyphicon glyphicon-education">&nbsp;{{schemeInfo.lastTime}}年</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">保险价格：
              <span class="glyphicon glyphicon-stats">&nbsp;{{schemeInfo.price}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">最大赔付：
              <span class="glyphicon glyphicon-jpy">&nbsp;{{schemeInfo.payOut}}</span>
            </li>
          </ul>

        </div>

      </div><!-- right jover-->

      <div class="right" v-if="companyInfo">
        <div>
          <h3>保险公司信息</h3>
          <ul class="list-group">
            <li class="list-group-item">公司法人：
              <span class="glyphicon glyphicon-envelope">&nbsp;{{companyInfo.userName}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">营业执照号：
              <span class="glyphicon glyphicon-education">&nbsp;{{companyInfo.companyNo}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">联系方式：
              <span class="glyphicon glyphicon-education">&nbsp;{{companyInfo.phone}}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="right" v-if="bookInfo">
        <div>
          <h3>订单信息</h3>
          <ul class="list-group">
            <li class="list-group-item">订单编号：
              <span class="glyphicon glyphicon-envelope">&nbsp;{{bookInfo.bookId}}</span>
            </li>
          </ul>
          <ul class="list-group">
            <li class="list-group-item">到期时间：
              <span class="glyphicon glyphicon-envelope">&nbsp;{{bookInfo.overTime}}</span>
            </li>
          </ul>
          <ul class="list-group">
            <li class="list-group-item">订单状态：
              <span class="glyphicon glyphicon-education">&nbsp;{{bookInfo.state}}</span>
            </li>
          </ul>
          <ul class="list-group" v-if="bookInfo.state=='在保'">
            <li class="list-group-item">剩余最多可赔：
              <span class="glyphicon glyphicon-envelope">&nbsp;{{bookInfo.balance}}</span>
            </li>
          </ul>
        </div>
      </div><!-- right jover-->
    </div>

		<br>
    <div v-if="queryType=='company'&&bookInfo.state=='待处理'" style="text-align: center;">
      <button class="btn btn-lg btn-primary col-md-5"  type="submit" @click.prevent="doBuyRecord(true)">同意</button>
      <button class="btn btn-lg btn-primary col-md-5 col-md-offset-2" type="submit" @click.prevent="doBuyRecord(false)">拒绝</button>
    </div>
    <br>
		<div>
			<button class="btn btn-lg btn-primary col-md-12" type="submit" @click.prevent="back">返回</button>
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
	import CommonFuncs from '../../libs/commonFuncs';

	export default{
		name:"cars",
		components:{
			Alert
		},
		data(){
			return{
				car:{},
        carOwner:{},
				companyInfo:{
				  name:'',
          number:'',
          phone:'',
        },
        schemeInfo:{
				  id:'',
				  name:'',
          lastTime:'',
          price:'',
          payOut:'',
          onSale:'',
        },
        bookInfo:{
				  bookId:'',
          overTime:'',
          state:'',
        },
        alert:'',
        carOwnerContract:undefined,//车主合约
        carId:'',
        schemeId:'',//如果该车辆投保了，就会有一个对应的保险方案id

        buyRecordListContract:'',//订单列表合约
        companyListContract:'',//公司列表合约
        buyRecordInfo:{},//订单记录
        queryType:'',//访问该页面的用户角色
        ownerAccount:'',//当前用户账号
			}
		},
    async created(){
		  this.queryType = this.$route.query.type;
      this.buyRecordListContract = Contracts['BuyRecordList'];
      this.companyListContract = Contracts['CompanyList'];
      let accounts = await web3.eth.getAccounts();
      this.ownerAccount = accounts[0];
      debugger
		  if(this.queryType=="carOwner"){
        let carOwnerAddr = this.$route.params.addr;
        this.carId = this.$route.params.Id;
        this.carOwnerContract = CarOwner(carOwnerAddr);

        this.car = await CommonFuncs.getCarInfo(carOwnerAddr,this.carId);
        this.carOwner = await CommonFuncs.getOwnerInfo(carOwnerAddr);
        debugger
        if(this.car.buyRecordId!=0) {//只有当车投了保险，才会有保险、订单、公司信息
          try {
            this.buyRecordInfo = await CommonFuncs.getBuyRecordInfo(this.buyRecordListContract,this.car.buyRecordId);
            this.bookInfo = await CommonFuncs.parseBookInfo(this.buyRecordInfo);
            this.schemeInfo = await CommonFuncs.getSchemeInfo(this.buyRecordInfo.companyAddr,this.buyRecordInfo.schemeId);
            this.companyInfo = await CommonFuncs.getCompanyInfo(this.buyRecordInfo.companyAddr);
          } catch (e) {
            this.alert = e.message;
          }

        }
      } else if(this.queryType=="company") {
		    let buyRecordId = this.$route.params.Id;//获得订单记录id
        try {
          this.buyRecordInfo = await CommonFuncs.getBuyRecordInfo(this.buyRecordListContract,buyRecordId);
          this.car = await CommonFuncs.getCarInfo(this.buyRecordInfo.carOwnerAddr,this.buyRecordInfo.carId);
          this.carOwner = await CommonFuncs.getOwnerInfo(this.buyRecordInfo.carOwnerAddr);
          this.bookInfo = await CommonFuncs.parseBookInfo(this.buyRecordInfo);
          this.companyInfo = await CommonFuncs.getCompanyInfo(this.buyRecordInfo.companyAddr);
          this.schemeInfo = await CommonFuncs.getSchemeInfo(this.buyRecordInfo.companyAddr,this.buyRecordInfo.schemeId);

        } catch (e) {
          this.alert = e.message;
        }
      }
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
      async doBuyRecord(approve) {
			  try {
          await this.buyRecordListContract.methods.doBuyRecord(this.companyListContract.options.address,
            this.buyRecordInfo.companyAddr,this.car.buyRecordId,approve,this.schemeInfo.payOut).send({
            from: this.ownerAccount,gas:5000000
          });
          if(approve) {
            this.alert = "已同意";
          } else {
            this.alert = "已拒绝";
          }
          this.buyRecordInfo = await CommonFuncs.getBuyRecordInfo(this.buyRecordListContract,this.$route.params.Id);
          this.bookInfo = await CommonFuncs.parseBookInfo(this.buyRecordInfo);
        } catch (e) {
          this.alert = e.message;
        }
      },
		}
}
</script>

<style>
	.left{
		width: 24%;
		float: left;
		background-color: #00925f;
		padding: 10px;
	}
	ul{
		width: 70%;
		margin: 10px auto;
	}
	.right {
    width: 24%;
    float: left;
    background-color: #00925f;
    padding: 10px;
    margin-left: 5px;
  }
</style>
