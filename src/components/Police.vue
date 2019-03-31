<template>
	<div class="police">
		<h1>交警</h1>
		<div class="welcome">
			<Alert v-bind:message="alert"></Alert>
		</div>
		<div class="container" :class="{showing:one}">
			<div>
				<h2 @click="clickOne">处理事故</h2>

				<div v-if="!one" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>您的主要职责</h4>
				</div>

				<div v-if="one">
					<br>
					<h3 class="form-signin-heading">待处理列表：</h3><br>
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
					<table class="table table-striped">
					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌照</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地点</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车速</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;损伤</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;责任</th>
					          <th></th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in accidents" v-rainbow>
					          <td>{{item.carId}}</td>
					          <td>{{item.carName}}</td>
					          <td>{{item.time}}</td>
					          <td>{{item.site}}</td>
					          <td>{{item.speed}}</td>
					          <td>{{item.damage}}</td>
					          <td>{{item.responsibility}}</td>				          
					          <td><router-link class="btn btn-defaule" v-bind:to="{path:'/accidents/'+item.id,query:{type:'police',policeId:user.id}}">详情</router-link></td>
					        </tr>
					    </tbody>
					</table>
					<button @click="one=!one" class="btn btn-lg btn-secondary btn-block">返回</button>
				 </div>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:two}">
			<div>
				<h2 @click="clickTwo">重置密码</h2>

				 <div v-if="!two" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>您可以修改登录密码</h4>
				</div>

				<div v-if="two">
					<br>
					<br>
					<form class="form-signin" style="width: 45%;">
				        <h2 class="form-signin-heading">修改密码</h2><br>
			        				        	
				        <input type="Password" id="inputEmail" class="form-control" placeholder="原始密码" required autofocus v-model="oldPassword">
				        <input type="Password" id="inputEmail" class="form-control" placeholder="新密码" required autofocus v-model="newPassword">
				        <input type="Password" id="inputEmail" class="form-control" placeholder="确认密码" required autofocus v-model="confirmPassword">
				      
				        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updatePassword">确定更改</button>						
				        <br>				        
				        <button class="btn btn-lg btn-secondary btn-block" @click.prevent="two=!two">返回</button>
     				 </form>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:three}">
			<div>
				<h2 @click="clickThree">正在施工</h2>

				 <div v-if="!three" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>道路千万条</h4>
				</div>


			</div>
		</div><div class="container" :class="{showing:four}">
			<div>
				<h2 @click="clickFour">正在施工</h2>

				 <div v-if="!four" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>安全第一条</h4>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:five}">
			<div>
				<h2 @click="clickFive">正在施工</h2>

				 <div v-if="!five" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>行车不规范</h4>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:six}">
			<div>
				<h2 @click="clickSix">正在施工</h2>

				 <div v-if="!six" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>亲人两行泪</h4>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import Alert from './Alert'
	export default{
		name:'police',
		components:{
   			 Alert,
  		},
		data(){
			return{
				one:false,
				two:false,
				three:false,threee:false,//修改密码div
				four:false,
				five:false,
				six:false,
				car:{},
				user:{},
				
				alert:'',
				cars:{},
				greeting:'',
				
				updateUser:{},
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',//这四个是改密码的
				
				accidents:{},

			}
		},created(){
			//console.log("this is created hook");
			this.$http.get("http://localhost:3000/users/"+this.$route.params.id)
		      .then(function(response){
		      	this.user=response.body;
		        this.updateUser=this.user;		      
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
		        this.alert+=this.user.name;
		        this.alert+='警官';
		        this.greeting=this.alert;
		        
		      })
		},
		methods:{
			clickOne(){
				this.one=!this.one;
				if (this.one) {
					this.alert=this.greeting;
				}
				this.$http.get("http://localhost:3000/accidents?policeId="+'')
				.then(function(response){
					this.accidents=response.body;
					console.log(this.accidents);
				})
				
			},
			clickTwo(){
				this.two=!this.two;
				
			},
			clickThree(){
				this.three=!this.three;
				
			},
			clickFour(){
				this.four=!this.four;
				
			},
			clickFive(){
				this.five=!this.five;
				
			},
			clickSix(){
				this.six=!this.six;
				
			},
			updatePassword(){
				this.updateUser=this.user;
				if (!this.newPassword||!this.confirmPassword) {
					alert("不能为空哦");
				}
				else if (this.newPassword!=this.confirmPassword) {
					alert("两个新密码不一致哦");
				}
				else if (this.oldPassword!=this.updateUser.password) {
					alert("原始密码错误，请重新输入");
				}
				else{
					
					this.updateUser.password=this.newPassword;
					this.$http.put("http://localhost:3000/users/"+this.updateUser.id,this.updateUser)
					.then(function(response){
						console.log(response.body);
						this.four=!this.four;
						
						alert('更新成功啦');
					})
				}
			},
		}
	}
</script>

<style>
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
		size: 120%
	}

	.showing{

		height: 600px;
		width:100%;
		background-color: #00925f;
		/*float: left;*/
		float: fixed;
		z-index: 5;
	}

	.form-signin{
		width: 70%;
		margin:  auto auto;
	}
</style>