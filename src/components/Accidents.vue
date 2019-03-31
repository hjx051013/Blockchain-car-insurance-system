<template>
	<div class="cars">
		<h2>{{buyRecord.carNumber}}&nbsp;&nbsp;&nbsp;{{buyRecord.carName}}</h2>
		<Alert v-bind:message="alert"></Alert>
		<div class="left">

			<div>
				<br>
				<h3>车辆信息</h3>
				<br>
				
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
			      <li class="list-group-item">车主识别号：
			        <span class="glyphicon glyphicon-jpy">&nbsp;{{buyRecord.buyerId}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">保险名称：
			        <span class="glyphicon glyphicon-modal-window">&nbsp;{{buyRecord.insuranceName}}</span>
			      </li>
			    </ul>

			     <ul class="list-group">
			      <li class="list-group-item">保险到期时间：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.overtime}}</span>
			      </li>
			    </ul>
			</div>
			<br>
			<br>
			<hr>
			<br>
			<div>
				<h3>车主信息</h3>
				<br>
				
			    <ul class="list-group">
			      <li class="list-group-item">车主姓名：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.buyerName}}</span>
			      </li>
			    </ul>

			     <ul class="list-group">
			      <li class="list-group-item">联系方式：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{buyRecord.buyerPhone}}</span>
			      </li>
			    </ul>

			</div>


		</div>


		<div class="right" v-if="buyRecord">
			<div>
				<br>
				<h3>保险信息</h3>
				<br>
				
				<ul class="list-group">
			      <li class="list-group-item">订单编号：
			        <span class="glyphicon glyphicon-phone">&nbsp;{{buyRecord.insuranceId}}</span>
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

			    <ul class="list-group">
			      <li class="list-group-item">保险状态：
			        <span class="glyphicon glyphicon-education">&nbsp;{{buyRecord.state}}</span>
			      </li>
			    </ul>

			</div>
			<br>
			<br>
			<hr>
			<br>
			<div>
				<h3>保险公司信息</h3>
				<br>
				
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


		
		</div><!-- right jover-->

		<div class="right">
			<div style="border-bottom: 1px solid #00925f;">
				<br>
				<h3>事故信息</h3>
				<br>
			    <ul class="list-group">
			      <li class="list-group-item">事故时间：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{accident.time}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">事故地点：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.site}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">受损情况：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.damage}}</span>
			      </li>
			    </ul>


			    <ul class="list-group">
			      <li class="list-group-item">道路等级：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.roadLevel}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">道路情况：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.roadSituation}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">交通状况：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.trafficSituation}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆速度：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.speed}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">加速度：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.acceleration}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">酒精检测：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.alcoholDetection}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">交通警察：
			        <span class="glyphicon glyphicon-education" v-if="accident.policeName">&nbsp;{{accident.policeName}}</span>
			        <span class="glyphicon glyphicon-education" v-if="!accident.policeName">&nbsp;暂无</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">联系方式：
			        <span class="glyphicon glyphicon-education" v-if="accident.policePhone">&nbsp;{{accident.policePhone}}</span>
			        <span class="glyphicon glyphicon-education" v-if="!accident.policePhone">&nbsp;暂无</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">责任认定：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accident.responsibility}}</span>
			      </li>
			    </ul>

			</div>		
		</div>
		<br>
		<br>
		<div style="height: 2px;"></div>
		<div v-if="policeId&&accident.responsibility=='等待处理'" class="selection" style="text-align: center;">
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility('无责任')">无责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility('次要责任')">次要责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility('同等责任')">同等责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility('主要责任')">主要责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility('全部责任')">全部责任</button>
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
				buyRecord:{},
				accident:[],
				police:{},
				policeId:'',

			}
		},
		created(){
			this.$http.get("http://localhost:3000/accidents/"+this.$route.params.id)
			.then(function(result){
				this.accident=result.body;
				console.log("即将打印accident信息");
				console.log(this.accident);

				
					//去请求保险
					this.$http.get("http://localhost:3000/buyRecords?id="+this.accident.insuranceRecordId)
					.then(function(result){
						this.buyRecord=result.body[0];
						console.log("即将打印buyrecord信息");
						console.log(this.buyRecord);
						if (this.$route.query.type=='owner') {
							this.alert="很不幸您的爱车发生了这样的事故：";
						}
						else if (this.$route.query.type=='company') {
							this.alert="您的客户车辆发生了一起事故，详情如下";
						}
						else if (this.$route.query.type=='police') {
							this.alert="发生了一起交通事故，请前往处理，您可以为车主做出五种责任判定：";

							this.policeId=this.$route.query.policeId;
							console.log("即将打印取得的交警id");
							console.log(this.policeId);

							this.$http.get("http://localhost:3000/users/"+this.policeId)
							.then(function(result){
								console.log("即将打印取得的交警信息");
								console.log(result);
								this.police=result.body;
							})

						}
						
					})

			})
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			setResponsibility(responsibility){
				this.accident.responsibility=responsibility;
				this.accident.policeName=this.police.name;
				this.accident.policePhone=this.police.phone;
				this.accident.policeId=this.police.id;				
				
				this.$http.put("http://localhost:3000/accidents/"+this.accident.id,this.accident)
				.then(function(result){
					console.log("即将打印更新的信息");
					this.alert="您处理了这场事故，车主责任判定为 "+responsibility;
					console.log(result);
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
	.selection button{
		display: inline-block;
		width: 19%;
		float: left;
		border-radius: 0px;
		margin: 5px 5px;
	}

</style>