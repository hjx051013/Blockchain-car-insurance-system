<template>
	<div class="police">
		<h1>交警</h1>
		<div class="welcome">
			<Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
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
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌照</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车名</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;描述</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;损失</th>
                    <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;处理状态</th>
					          <th></th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in accidents" v-rainbow>
					          <td>{{item.carNumber}}</td>
					          <td>{{item.carName}}</td>
					          <td>{{parseTime(item.time)}}</td>
					          <td>{{item.describe}}</td>
					          <td>{{item.loss}}</td>
					          <td>{{parseResponsibility(item.responsibility)}}</td>
					          <td><router-link class="btn btn-defaule" v-bind:to="{path:'/accidents/'+item.Id,query:{type:'police',policeAddr:$route.params.addr}}">详情</router-link></td>
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
				<h2 @click="clickTwo">个人信息修改</h2>

				 <div v-if="!two">
					<br>
					<br>
					<h4>您可以修改个人信息</h4>
				</div>

				<div v-if="two&&!twoo" style="width: 50%;margin: auto auto;">
          <br>
          <br>
          <form class="form-signin">
            <h2 class="form-signin-heading">在此处更改个人信息</h2><br>


            <input type="email" class="form-control" placeholder="您的名字" required autofocus v-model="updateUser.name">

            <div style="font-size: 20px">
              <label>您的性别：</label>
              &nbsp;&nbsp;&nbsp;&nbsp;
              男：<input type="radio" v-model="updateUser.gender" required="true" value="true">
              &nbsp;&nbsp;&nbsp;&nbsp;
              女：<input type="radio" v-model="updateUser.gender" required="true" value="false">
            </div>

            <input type="text" class="form-control" placeholder="您的电话" required v-model="updateUser.phone">

            <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updatePolice">确定更改</button>

            <br>
            <button class="btn btn-lg btn-secondary btn-block" @click.prevent="clickTwo">返回</button>
          </form>
          <br><br>
          <button class="btn btn-lg btn-primary btn-block" type="submit"   @click="twoo=!twoo">换个密码</button>
				</div>

        <div v-if="twoo">
          <br>
          <br>
          <form class="form-signin" style="width: 45%;">
            <h2 class="form-signin-heading">修改密码</h2><br>

            <input type="Password" class="form-control" placeholder="原始密码" required autofocus v-model="oldPassword">
            <input type="Password" class="form-control" placeholder="新密码" required autofocus v-model="newPassword">
            <input type="Password" class="form-control" placeholder="确认密码" required autofocus v-model="confirmPassword">

            <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updatePassword">确定更改</button>
            <br>
            <button class="btn btn-lg btn-secondary btn-block" @click.prevent="twoo=!twoo">返回</button>
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
  import CarOwner from '../../libs/carOwner';
  import Company from '../../libs/company';
  import Policer from '../../libs/policer';
  import Contracts from '../../libs/contracts';
  import web3 from '../../libs/web3';
  import Alert from './Alert';
  import AccidentDescribe from '../../libs/accidentDescribe';
  import CommonFuncs from '../../libs/commonFuncs';

	export default{
		name:'police',
		components:{
   			 Alert,
  		},
		data(){
			return{
				one:false,
				two:false,twoo:false,//修改密码idv
				three:false,
				four:false,
				five:false,
				six:false,
				car:{},
				user:{},

				alert:'',
				greeting:'',

				updateUser:{},//修改用户信息
        //修改密码
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',

				accidents:{},
        policeContract:'',//交警合约
        policeInfo:{},//交警信息
        ownerAccount:'',//当前使用的钱包账户
        accidentRecordListContract:'',//事故记录列表合约
			}
		},
    async created(){
			//console.log("this is created hook");
      let accounts = await web3.eth.getAccounts();
      this.ownerAccount = accounts[0];
      const policeAddr  = this.$route.params.addr;
      this.policeContract = Policer(policeAddr);
      this.accidentRecordListContract = Contracts['AccidentRecordList'];
      this.policeInfo = await CommonFuncs.getPoliceInfo(policeAddr);
      debugger
      this.displayAlert();
		},
		methods:{
      parseResponsibility(responsibility) {
        if(responsibility=='0') return "待判定";
        else if(responsibility=='1') return '全责';
        else if(responsibility=='2') return '主要责任';
        else if(responsibility=='3') return '同等责任';
        else if(responsibility=='4') return '部分责任';
        else if(responsibility=='5') return '无责';
        else return '';
      },
      parseTime(time) {
        let date = new Date(parseInt(time));
        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
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

        this.alert+=this.policeInfo.userName+"警官";

        this.greeting = this.alert;
      },
      updatePolice() {
        this.policeContract.methods.modifyPolicerInfo(this.updateUser.name,this.updateUser.phone,this.updateUser.gender).send({
          from: this.ownerAccount,gas:5000000
        }).then(()=>{
          this.alert = "更新信息成功";
          this.policeInfo.userName = this.updateUser.name;
          this.policeInfo.phone = this.updateUser.phone;
          this.policeInfo.gender = this.updateUser.gender;
        }).catch((err)=>{
          this.alert = err.message;
        })
      },
			async clickOne(){
				this.one=!this.one;
				if(this.one) {
          await this.getAccidents();
        }
			},
			clickTwo(){
				this.two=!this.two;
        this.updateUser = {};
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
				if (!this.newPassword||!this.confirmPassword) {
					alert("不能为空哦");
				}
				else if (this.newPassword!=this.confirmPassword) {
					alert("两个新密码不一致哦");
				}
				else{
				  this.policeContract.methods.pwdRight(this.oldPassword).call().then((pwdRight)=>{
				    if(pwdRight) {
              this.policeContract.methods.updatePassword(this.newPassword).send({
                from:this.ownerAccount,gas:5000000
              }).then(()=>{
                this.alert = "密码修改成功";
              }).catch((err)=>{
                this.alert = err.message;
              })
            } else {
				      alert("原密码错误！");
            }
          }).catch((err)=>{
            this.alert = err.message;
          });
				}
			},
      async getAccidents() {
        try {
          //获得由该交警处理的事故记录列表
          let accidentIds = await this.accidentRecordListContract.methods.getRecordIdsByPolicerAddr(this.$route.params.addr).call();
          //获得未处理的事故记录列表
          let undoAccidentIds = await this.accidentRecordListContract.methods.getUndoRecordIds().call();
          debugger
          accidentIds = accidentIds.concat(undoAccidentIds)
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
