<template>
	<div class="cars">
		<h2>这是您客户的车辆</h2>
		<Alert v-bind:message="alert"></Alert>
		<Alert v-bind:message="alert1" v-if="buyRecord.state!='待确认'"></Alert>
		<div class="left">

			<div>
				<h3>车辆信息</h3>
			
				<ul class="list-group">
			      <li class="list-group-item">车辆编号：
			        <span class="glyphicon glyphicon-phone">&nbsp;{{buyRecord.carId}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车牌号码：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.carNumber}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆名称：
			        <span class="glyphicon glyphicon-education">&nbsp;{{buyRecord.carName}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆年数：
			        <span class="glyphicon glyphicon-stats">&nbsp;{{buyRecord.carAge}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车主姓名：
			        <span class="glyphicon glyphicon-jpy">&nbsp;{{buyRecord.buyerName}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车主电话：
			        <span class="glyphicon glyphicon-modal-window">&nbsp;{{buyRecord.buyerPhone}}</span>			        
			      </li>
			    </ul>
			</div>
		</div>


		<div class="right" v-if="buyRecord">
			<div>
				<h3>保险信息</h3>

				<ul class="list-group">
			      <li class="list-group-item">订单编号：
			        <span class="glyphicon glyphicon-phone">&nbsp;{{buyRecord.id}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险名称：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.insuranceName}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险时长：
			        <span class="glyphicon glyphicon-education">&nbsp;{{buyRecord.insuranceDuration}}年</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险价格：
			        <span class="glyphicon glyphicon-stats">&nbsp;{{buyRecord.insurancePrice}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">赔偿金额：
			        <span class="glyphicon glyphicon-jpy">&nbsp;{{buyRecord.insuranceCompensation}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险名称：
			        <span class="glyphicon glyphicon-modal-window">&nbsp;{{buyRecord.insuranceName}}</span>
			       
			      </li>
			    </ul>
			</div>
		
		</div><!-- right jover-->

		<div class="right">
			<div>
				<h3>保险公司信息</h3>
			    <ul class="list-group">
			      <li class="list-group-item">公司法人：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.companyName}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">联系方式：
			        <span class="glyphicon glyphicon-education">&nbsp;{{buyRecord.companyPhone}}</span>
			      </li>
			    </ul>
			</div>		
		</div>

		<div class="right four">
			<div>
				<h3>其他信息</h3>
			    <ul class="list-group">
			      <li class="list-group-item">到期时间：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.overtime}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险状态：
			        <span class="glyphicon glyphicon-education">&nbsp;{{buyRecord.state}}</span>
			      </li>
			    </ul>
			</div>
		</div><!-- right jover-->
		<br>
		<div style="text-align: center;">
			<button class="btn btn-lg btn-primary btn-block btn1"  type="submit" @click.prevent="agree" v-if="buyRecord.state=='待确认'">同意</button>
			<button class="btn btn-lg btn-primary btn-block btn2" type="submit" @click.prevent="reject" v-if="buyRecord.state=='待确认'">拒绝</button>
		</div>
		<div>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="back">返回</button>
		</div>

	</div>
</template>

<script>
	import Alert from './Alert'
	export default{
		name:"cars",
		components:{
			Alert
		},
		data(){
			return{
				car:{},
				insurance:{},
				alert:'',
				alert1:'',
				buyRecord:{},
			}
		},
		created(){
			this.$http.get("http://localhost:3000/buyRecords/"+this.$route.params.id)
			.then(function(result){
				this.buyRecord=result.body;				
				console.log(this.buyRecord);
				this.alert="到期时间："+this.buyRecord.overtime+"     保险状态："+this.buyRecord.state;
				if (this.buyRecord.state=='已同意') {
					this.alert1="您同意这位客户购买保险。";
				}
				else if (this.buyRecord.state=='已拒绝') {
					this.alert1="您拒绝这位客户购买保险。";
				}
	
			})
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			agree(){
				this.buyRecord.state="已同意";
				this.$http.put("http://localhost:3000/buyRecords/"+this.buyRecord.id,this.buyRecord)
				.then(function(result){
					console.log(result);
					console.log(result.body.state);
					this.alert1="您同意这位客户购买保险。";
				})
			},
			reject(){
				this.buyRecord.state="已拒绝";
				this.$http.put("http://localhost:3000/buyRecords/"+this.buyRecord.id,this.buyRecord)
				.then(function(result){
					console.log(result.body.state);
					this.alert1="您拒绝这位客户购买保险。";
				})
			},
		}
}
</script>

<style>
	.left{
		width: 33%;
		float: left;
		background-color: #00925f;
		padding: 10px;
	}
	ul{
		width: 70%;
		margin: 10px auto;
	}
	.right{
		width: 33%;
		float: left;
		background-color: #00925f;
		padding: 10px;
		margin-left: 5px;
	}
	.four{
		margin-top: 48px;
	}
	.btn1{
		display: inline-block;
		width: 49%;
		float: left;
		margin: 5px auto;
		background-color: #00925f;
	}
	.btn2{
		display: inline-block;
		width: 49%;
		float: left;
		margin: 5px auto;
		background-color: #ff0000;
		margin-left: 5px;
	}
</style>