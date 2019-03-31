<template>
	<div class="company">
		<h1>保险公司</h1>
		<div class="welcome">
			<Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
		</div>
		<div class="container" :class="{showing:one}">
			<div>
				<h2 @click="clickOne">添加保险</h2>

				<div v-if="!one" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>在这里你可以添加保险方案。</h4>
				</div>
				<div v-if="one">
					<br>
					<form class="form-signin" style="width: 50%">
				        <h2 class="form-signin-heading">在此处添加保险信息</h2><br>

				        <input type="text" class="form-control" placeholder="保险名称" required v-model="schemeInfo.name">

				        <input type="text" class="form-control" placeholder="有效时长(年)" required v-model="schemeInfo.lastTime">

				        <input type="text" class="form-control" placeholder="价格" required v-model="schemeInfo.price">

				        <input type="text" class="form-control" placeholder="赔付金额" required v-model="schemeInfo.payOut">

				        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="addInsurance">点此添加</button>

				        <br>
				        <button class="btn btn-lg btn-secondary btn-block" @click.prevent="clickOne">返回</button>

     				 </form>

				</div>

			</div>
		</div>
		<div class="container" :class="{showing:two}">
			<div>
				<h2 @click="clickTwo">所有保险</h2>

				<div v-if="!two" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>在这里你可以查看公司的所有保险方案</h4>
				</div>

				<div v-if="two">
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
					<table class="table table-striped">
					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保险方案ID</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保险名称</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;有效时长（年）</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;售卖价格</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;赔付金额</th>
							  <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;保险状态</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in insurances" v-rainbow>
					          <!-- <td>{{item.id}}</td> -->
					          <td>{{item.schemeId}}</td>
					          <td>{{item.schemeName}}</td>
					          <td>{{item.lastTime}}</td>
					          <td>{{item.price}}</td>
					          <td>{{item.payOut}}</td>
					          <td v-if="item.onSale">在售</td>
                    <td v-else>已下架</td>
							  <td v-if="item.onSale"><button @click="invalid(item)" class="btn btn-defaule btn-primary btn-block">下架</button></td>
							  <td v-else><button @click="valid(item)" class="btn btn-defaule btn-primary btn-block">继续售卖</button></td>

					          <!-- <td v-if="item.insuranceId">{{item.insuranceId}}</td>
					          <td v-if="!item.insuranceId">暂无</td>

					          <td><router-link class="btn btn-defaule" v-bind:to="'/cars/'+item.id">详情</router-link></td> -->
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
				<h2 @click="clickThree">售卖保险</h2>

				<div v-if="!three" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>保险从这里卖出，你可以看到买家的车辆信息</h4>
				</div>

				<div v-if="three">
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
					<table class="table table-striped">
					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户姓名</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;客户电话</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆名称</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车辆年数</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;欲购保险</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;购买状态</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
					        </tr>
					      </thead>

					      <tbody>
					        <tr v-for="item in buyRecords" v-rainbow>
					          <!-- <td>{{item.id}}</td> -->
					          <td>{{item.buyerName}}</td>
					          <td>{{item.buyerPhone}}</td>
					          <td>{{item.carName}}</td>
					          <td>{{item.carAge}}</td>
					          <td>{{item.insuranceName}}</td>
					          <td>{{item.state}}</td>
							  <td><router-link class="btn btn-defaule" v-bind:to="'/sales/'+item.id">详情</router-link></td>

					        </tr>
					    </tbody>
					</table>
					<button @click="three=!three" class="btn btn-lg btn-secondary btn-block">返回</button>
				 </div>
				</div>

			</div>
		</div>
		<div class="container" :class="{showing:four}">
			<div>
				<h2 @click="clickFour">公司信息更新</h2>

				 <div v-if="!four" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>您可以修改公司信息</h4>
				</div>

        <div v-if="four&&!fourr" style="width: 50%;margin: auto auto;">
          <br>
          <br>
          <form class="form-signin">
            <h2 class="form-signin-heading">在此处更改公司信息</h2><br>


            <input type="email" class="form-control" placeholder="公司名字" required autofocus v-model="updateUser.name">

            <input type="email" class="form-control" placeholder="营业执照" required autofocus v-model="updateUser.companyNo">

            <input type="text" class="form-control" placeholder="联系方式" required v-model="updateUser.phone">

            <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updateCompany">确定更改</button>

            <div>
              <ul class="list-group" style="margin-top: 20px">
                <li class="list-group-item">账户余额：
                  <span class="glyphicon glyphicon-stats">&nbsp;{{companyInfo.balance}}</span>
                </li>
              </ul>

              <div class="row" style="display:flex;align-items: center;">
                <button class="btn btn-primary col-md-2 col-md-offset-1" @click.prevent="updateBalance(true)">充值</button><input class="col-md-3" type="text" placeholder="金额"  required v-model="increment">
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button class="btn btn-primary col-md-2" @click.prevent="updateBalance(false)">提现</button><input class="col-md-3" type="text" placeholder="金额"  required v-model="decrement">
              </div>
            </div>

            <br>
            <button class="btn btn-lg btn-secondary btn-block" @click.prevent="clickFour">返回</button>
          </form>
          <br>
          <button class="btn btn-lg btn-primary btn-block" type="submit"   @click="fourr=!fourr">换个密码</button>
        </div>
				<div v-if="fourr">
					<br>
					<br>
					<form class="form-signin" style="width: 45%;">
				        <h2 class="form-signin-heading">修改密码</h2><br>

				        <input type="Password" class="form-control" placeholder="原始密码" required autofocus v-model="oldPassword">
				        <input type="Password" class="form-control" placeholder="新密码" required autofocus v-model="newPassword">
				        <input type="Password" class="form-control" placeholder="确认密码" required autofocus v-model="confirmPassword">

				        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="updatePassword">确定更改</button>
				        <br>
				        <button class="btn btn-lg btn-secondary btn-block" @click.prevent="fourr=!fourr">返回</button>
     				 </form>
				</div>
			</div>
		</div>
		<div class="container" :class="{showing:five}">
			<div>
				<h2 @click="clickFive">事故理赔</h2>

				<div v-if="!five" style="width: 250px;margin: auto auto;">
					<br>
					<br>
					<h4>用来查看客户车辆的事故信息，和来自警方的责任判定</h4>
				</div>

				<div v-if="five">
					<br>
					<h3 class="form-signin-heading">在您公司投保的以下车辆发生了事故：</h3><br>
				 <div style="background-color: #ddd;width: 70%;margin: 30px auto;">
					<table class="table table-striped">
					    <thead>
					        <tr>
					          <!-- <th>系统识别号</th> -->
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;牌照</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;类型</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;时间</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;地点</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;车速</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;损伤</th>
					          <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;责任</th>
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
					          <td><router-link class="btn btn-defaule" v-bind:to="{path:'/accidents/'+item.id,query:{type:'company'}}">详情</router-link></td>
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
				<h2 @click="clickSix">正在施工</h2>
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
	import Alert from './Alert'
	export default{
		name:'company',
		components:{
   			 Alert,
  		},
		data(){
			return{
				one:false,
				two:false,
				three:false,
				four:false,fourr:false,//修改密码div
				five:false,
				six:false,

				car:{},
				user:{},
				updateUser:{},
				alert:'',
				cars:{},
				greeting:'',

				schemeInfo:{},//添加保险
				insurances:[],//所有保险
				buyRecords:{},//购买记录

				updateUser:{},
				oldPassword:'',
				newPassword:'',
				confirmPassword:'',//这四个是改密码的
				accidents:{},//这个是存放事故车辆的

        companyContract:'',//保险公司合约
        companyInfo:{
          userName:'',
          phone:'',
          companyNo:'',
          balance:'',
        },//公司信息
        increment:'',//充值金额
        decrement:'',//提现金额
        ownerAccount:'',//当前账户
			}
		},
		async created(){
			//console.log("this is created hook");
      //获得当前用户账号
      let accounts = await web3.eth.getAccounts();
      this.ownerAccount = accounts[0];
      let companyAddr = this.$route.params.addr;
      console.log(companyAddr);
      this.companyContract = Company(companyAddr);
      //获得公司信息
      debugger
      this.getCompanyInfo();
      //强烈注意，这里的不加from就会产生bug
      this.companyContract.methods.getBalance().call({
        from: this.ownerAccount
      }).then((result)=>{
        this.companyInfo.balance = parseInt(result);
      }).catch((err)=>{
        this.alert = err.message;
      });
      this.getSchemes();
		},
		methods:{
		  updateBalance(isInc) {
		    if(isInc) {
          this.companyContract.methods.updateBalance(this.increment).send({
            from: this.ownerAccount, gas: 5000000
          }).then(()=>{
            this.companyInfo.balance += parseInt(this.increment);
          }).catch((err)=>{
            this.alert = err.message;
          });
        } else {
          this.companyContract.methods.updateBalance(-this.decrement).send({
            from: this.ownerAccount, gas: 5000000
          }).then(()=>{
            this.companyInfo.balance -= parseInt(this.decrement);
          }).catch((err)=>{
            this.alert = err.message;
          });
        }
      },
		  getCompanyInfo() {
        this.companyContract.methods.getCompanyInfo().call().then((result) => {
          this.companyInfo.userName = result[0];
          this.companyInfo.phone = result[1];
          this.companyInfo.companyNo = result[2];
          console.log(this.companyInfo);
          this.displayAlert();
        }).catch((err)=>{
          this.alert(err.message);
        });
      },
      getSchemes() {
        this.companyContract.methods.getSchemeIds().call().then(async (schemeIds)=>{
          console.log(schemeIds);
          const schemeInfoList = await Promise.all(
            schemeIds.map((schemeId) =>
              this.companyContract
                .methods.getSchemeInfoById(schemeId)
                .call().catch((err)=>{
                this.alert = err.message;
              })
            )
          );
          console.log(schemeInfoList);
          this.insurances = [];
          for(var i = 0; i < schemeInfoList.length; i++) {
            let schemeInfo = {};
            schemeInfo.schemeId = schemeInfoList[i][0];
            schemeInfo.schemeName = schemeInfoList[i][1];
            schemeInfo.lastTime = schemeInfoList[i][2];
            schemeInfo.price = schemeInfoList[i][3];
            schemeInfo.payOut = schemeInfoList[i][4];
            schemeInfo.onSale = schemeInfoList[i][5];
            this.insurances.push(schemeInfo);
          }
        }).catch((err)=>{
          this.alert = err.message;
        })
      },
      updateCompany() {
        console.log(this.updateUser);
        debugger
        this.companyContract.methods.modifyCompanyInfo(this.updateUser.name,this.updateUser.phone,this.updateUser.companyNo).send({
          from: this.ownerAccount, gas: 5000000
        }).then(()=>{
          this.getCompanyInfo();
        }).catch((err)=>{
          this.alert = err.message;
        });
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
        this.alert+=this.companyInfo.userName;
        this.greeting = this.alert;
      },
			clickOne(){
				this.one=!this.one;
				if (this.one) {
					this.alert=this.greeting;
				}

			},
			clickTwo(){
				this.two=!this.two;
			},
			clickThree(){
				this.three=!this.three;
				if (this.three) {
					this.$http.get("http://localhost:3000/buyRecords?companyId="+this.user.id)
					.then(function(response){
						//console.log(response);
						this.buyRecords=response.body;
						console.log(this.buyRecords);
					})
				}


			},
			clickFour(){
				this.four=!this.four;
			},
			clickFive(){
				this.five=!this.five;
				this.$http.get("http://localhost:3000/accidents?companyId="+this.user.id)
				.then(function(response){
					this.accidents=response.body;
					console.log(this.accidents);
				})

			},
			clickSix(){
				this.six=!this.six;

			},
			addInsurance(){
				if (!this.schemeInfo.name||!this.schemeInfo.lastTime||!this.schemeInfo.price||!this.schemeInfo.payOut) {
					alert("请把信息补充完整");
				}
				else {
				  console.log(this.schemeInfo);
          this.companyContract.methods.addScheme(this.schemeInfo.name,this.schemeInfo.lastTime,this.schemeInfo.price,this.schemeInfo.payOut).send({
            from: this.ownerAccount, gas: 5000000
          }).then(()=>{
            this.alert = "添加方案成功";
            this.getSchemes();
          }).catch((err)=>{
            this.alert = err.message;
          })
					// this.insurance.companyId=this.user.id;
          //
          //
					// console.log(this.insurance);
					// this.$http.post("http://localhost:3000/insurances",this.insurance)
					// .then(function(result){
					// 	//console.log(result);
					// 	this.alert="新的保险添加成功！";
					// 	this.one=!this.one;
					// })
				}

			},
			invalid(item){
				//console.log(item);
        this.companyContract.methods.setOnSale(item.schemeId,false).send({
          from: this.ownerAccount, gas: 5000000
        }).then(()=>{
          alert("已将"+item.schemeName+"下架");
          item.onSale = false
        }).catch((err)=>{
          this.alert = err.message;
        });
			},
			valid(item){
				//console.log(item);
        this.companyContract.methods.setOnSale(item.schemeId,true).send({
          from: this.ownerAccount, gas: 5000000
        }).then(()=>{
          alert("已将"+item.schemeName+"重新上架销售");
          item.onSale = true;
        }).catch((err)=>{
          this.alert = err.message;
        });
			},
			updatePassword(){
        if (!this.newPassword||!this.confirmPassword) {
          alert("不能为空哦");
        }
        else if (this.newPassword!=this.confirmPassword) {
          alert("两个新密码不一致哦");
        }
        else{
          this.companyContract.methods.pwdRight(this.oldPassword).call().then((result)=>{
              if(!result) {
                alert("原密码错误！");
              } else {
                this.companyContract.methods.updatePassword(this.newPassword).send({
                  from: this.ownerAccount, gas: 5000000
                }).then(()=>{
                  this.fourr=!this.fourr;
                  this.four=!this.four;
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
