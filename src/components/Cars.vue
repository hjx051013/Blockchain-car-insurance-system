<template>
	<div class="cars">
		<h2>这是您的某辆车</h2>
		<Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
		<div class="left">
			<div>
				<h3>车辆信息</h3>

			    <ul class="list-group">
			      <li class="list-group-item">车牌号码：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{car.number}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆名称：
			        <span class="glyphicon glyphicon-education">&nbsp;{{car.name}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆年数：
			        <span class="glyphicon glyphicon-stats">&nbsp;{{car.age}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车主名字：
			        <span class="glyphicon glyphicon-jpy">&nbsp;{{car.ownerName}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险购买状态：
			        <span class="glyphicon glyphicon-modal-window" v-if="car.buyed">&nbsp;已购 </span>
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
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{schemeInfo.name}}</span>
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
			        <span class="glyphicon glyphicon-jpy">&nbsp;{{schemeInfo.maxPayout}}</span>
			      </li>
			    </ul>

			</div>

		</div><!-- right jover-->

		<div class="right" v-if="companyInfo">
			<div>
				<h3>保险公司信息</h3>
			    <ul class="list-group">
			      <li class="list-group-item">公司法人：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{companyInfo.name}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">营业执照号：
			        <span class="glyphicon glyphicon-education">&nbsp;{{companyInfo.number}}</span>
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
			      <li class="list-group-item">保险状态：
			        <span class="glyphicon glyphicon-education">&nbsp;{{bookInfo.state}}</span>
			      </li>
			    </ul>
			</div>
		</div><!-- right jover-->
		<br>
		<div>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="back">返回</button>
		</div>

	</div>
</template>

<script>
  import CarOwner from '../../libs/carOwner';
  import Company from '../../libs/company';
  import Policer from '../../libs/policer';
  import Contracts from '../../libs/contracts';
  import web3 from '../../libs/web3';
	import Alert from './Alert'
	export default{
		name:"cars",
		components:{
			Alert
		},
		data(){
			return{
				car:{
				  number:'',
				  name:'',
          age:'',
          ownerName:'',
          buyed: false,
        },
				companyInfo:{},
				alert:'',
        schemeInfo:{},
        bookInfo:{},
        carOwnerContract:'',
        carOwnerAddr:'',
        carId:'',
			}
		},
    async created(){
      this.carOwnerAddr = this.$route.params.addr;
		  this.carId = this.$route.params.carId;
      this.carOwnerContract = CarOwner(this.carOwnerAddr);
      await this.getCarInfo();
      if(this.car.buyed) {//只有当车买了车险，才会有保险、订单、公司信息

      }
			// this.$http.get("http://localhost:3000/cars/"+this.$route.params.id)
			// .then(function(result){
			// 	this.car=result.body;
			// 	console.log(this.car);
			// 	if (this.car.insuranceId) {
			// 		//去请求保险
			// 		this.$http.get("http://localhost:3000/buyRecords?carId="+this.$route.params.id)
			// 		.then(function(result){
			// 			//this.buyRecord=result.body;
			// 			//console.log(result);
			// 			this.buyRecord=result.body[0];
			// 			console.log(this.buyRecord);
			// 			this.alert="到期时间："+this.buyRecord.overtime+"     保险状态："+this.buyRecord.state;
			// 		})
      //
			// 	}
			// 	else{
			// 		this.alert="您的车辆还未投保哦！"
			// 	}
			// })
		},
		methods:{
			back(){
				this.$router.go(-1);
			},

			async getCarInfo() {
			  let carInfo;
			  try {
          carInfo = await this.carOwnerContract
            .methods.getCarInfoById(this.carId)
            .call();
          this.car.number = carInfo[1];
          this.car.name = carInfo[2];
          this.car.age = carInfo[3];
          this.car.buyed = carInfo[4]!=0?true:false;
          debugger
          let userName = await this.carOwnerContract
            .methods.userName()
            .call();
          this.car.ownerName = userName;

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
