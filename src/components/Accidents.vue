<template>
	<div class="cars">
		<h2>这里是事故的详细信息</h2>
		<Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
		<div class="left">

			<div>
				<br>
				<h3>车辆信息</h3>
				<br>

			    <ul class="list-group">
			      <li class="list-group-item">车牌号码：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{carInfo.carNumber}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆名称：
			        <span class="glyphicon glyphicon-education">&nbsp;{{carInfo.carName}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆年数：
			        <span class="glyphicon glyphicon-stats">&nbsp;{{carInfo.carAge}}</span>
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
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{ownerInfo.ownerName}}</span>
			      </li>
			    </ul>

			     <ul class="list-group">
			      <li class="list-group-item">联系方式：
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{ownerInfo.phone}}</span>
			      </li>
			    </ul>
			</div>
      <br>
      <hr>
      <br>
      <div>
        <h3>保险公司信息</h3>
        <br>

        <ul class="list-group">
          <li class="list-group-item">公司法人：
            <span class="glyphicon glyphicon-envelope">&nbsp;{{companyInfo.userName}}</span>
          </li>
        </ul>

        <ul class="list-group">
          <li class="list-group-item">联系方式：
            <span class="glyphicon glyphicon-education">&nbsp;{{companyInfo.phone}}</span>
          </li>
        </ul>
      </div>

		</div>


		<div class="right">
			<div>
				<br>
				<h3>保险信息</h3>
				<br>

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
      <br>
      <hr>
      <br>
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
        <ul class="list-group">
          <li class="list-group-item">剩余最多可赔：
            <span class="glyphicon glyphicon-envelope">&nbsp;{{bookInfo.balance}}</span>
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
			        <span class="glyphicon glyphicon-envelope">&nbsp;{{parseTime(accident.time)}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">事故地点：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.site}}</span>
			      </li>
			    </ul>

        <ul class="list-group">
          <li class="list-group-item">天气状况：
            <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.weather}}</span>
          </li>
        </ul>

			    <ul class="list-group">
			      <li class="list-group-item">受损情况：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.damage}}</span>
			      </li>
			    </ul>


			    <ul class="list-group">
			      <li class="list-group-item">道路等级：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.roadLevel}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">道路情况：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.roadSituation}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">交通状况：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.trafficSituation}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">车辆速度：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.speed}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">加速度：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.acceleration}}</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">酒精检测：
			        <span class="glyphicon glyphicon-education">&nbsp;{{accidentDescribe.alcohol}}</span>
			      </li>
			    </ul>

          <ul class="list-group">
            <li class="list-group-item">事故损失：
              <span class="glyphicon glyphicon-education">&nbsp;{{accident.loss}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">事故赔偿：
              <span class="glyphicon glyphicon-education">&nbsp;{{accident.payOut}}</span>
            </li>
          </ul>

          <ul class="list-group">
            <li class="list-group-item">责任认定：
              <span class="glyphicon glyphicon-education">{{parseResponsibility(accident.responsibility)}}</span>
            </li>
          </ul>

			    <ul class="list-group">
			      <li class="list-group-item">交通警察：
			        <span class="glyphicon glyphicon-education" v-if="policeInfo">&nbsp;{{policeInfo.userName}}</span>
			        <span class="glyphicon glyphicon-education" v-else>&nbsp;暂无</span>
			      </li>
			    </ul>

			    <ul class="list-group">
			      <li class="list-group-item">联系方式：
			        <span class="glyphicon glyphicon-education" v-if="policeInfo">&nbsp;{{policeInfo.phone}}</span>
			        <span class="glyphicon glyphicon-education" v-else>&nbsp;暂无</span>
			      </li>
			    </ul>
			</div>
		</div>
		<br>
		<br>
		<div style="height: 2px;"></div>
		<div v-if="queryType=='police'&&accident.responsibility==0" class="selection" style="text-align: center;">
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility(5)">无责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility(4)">次要责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility(3)">同等责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility(2)">主要责任</button>
			<button class="btn btn-lg btn-primary btn-block" type="submit" @click="setResponsibility(1)">全部责任</button>
		</div>
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
  import CommonFuncs from '../../libs/commonFuncs';
  import web3 from '../../libs/web3';
  import Alert from './Alert';
	export default{
		name:"cars",
		components:{
			Alert
		},
		data(){
			return{
				carInfo:{},
        ownerInfo:{},
				schemeInfo:{},
        companyInfo:{},
				bookInfo:{},
        policeInfo:{},//如果事故被处理了，会对应一个处理的交警

				accident:{},//记录当前事故记录的数据
				curPolice:{},//记录当前处理的交警信息
        buyRecordInfo:'',//订单记录信息
        alert:'',
        accidentId:'',//事故记录编号
        queryType:'',//用户角色

        accidentRecordList:'',//事故记录列表合约
        buyRecordList:'',//订单记录列表合约
        policerList:'',//交警列表合约
        //carOwnerContract:'',//事故对应车主合约
        ownerAccount:'',//当前用户账号
			}
		},
    computed:{
      accidentDescribe: function(){
        if(this.accident.describe) {
          let describeArray = this.accident.describe.split(',');
          return {
            site:describeArray[0],
            weather:describeArray[1],
            roadLevel:describeArray[2],
            roadSituation:describeArray[3],
            trafficSituation:describeArray[4],
            damage:describeArray[5],
            speed:describeArray[6],
            acceleration:describeArray[7],
            alcohol:describeArray[8]
          }
        } else {
          return {
            site:"",
            weather:"",
            roadLevel:"",
            roadSituation:"",
            trafficSituation:"",
            damage:"",
            speed:"",
            acceleration:"",
            alcohol:""
          }
        }
     },//事故描述信息
    },
		async created(){

		  this.accidentId = this.$route.params.id;
		  this.queryType = this.$route.query.type;
      let accounts = await web3.eth.getAccounts();
      this.ownerAccount = accounts[0];
		  this.accidentRecordList = Contracts['AccidentRecordList'];
		  this.buyRecordList = Contracts['BuyRecordList'];
		  this.policerList = Contracts['PolicerList'];
		  debugger
		  this.accident = await CommonFuncs.getAccidentRecordInfo(this.accidentRecordList,this.accidentId);
		  this.carInfo = await CommonFuncs.getCarInfo(this.accident.carOwnerAddr,this.accident.carId);
		  this.ownerInfo = await CommonFuncs.getOwnerInfo(this.accident.carOwnerAddr);
		  this.schemeInfo = await CommonFuncs.getSchemeInfo(this.accident.companyAddr,this.accident.schemeId);
      this.companyInfo = await CommonFuncs.getCompanyInfo(this.accident.companyAddr);
      this.buyRecordInfo = await CommonFuncs.getBuyRecordInfo(this.buyRecordList,this.carInfo.buyRecordId);
      this.bookInfo = await CommonFuncs.parseBookInfo(this.buyRecordInfo);
      if(this.accident.responsibility!=0) {
        this.policeInfo = await CommonFuncs.getPoliceInfo(this.accident.policeAddr);
      }
      debugger
      await this.roleProcess();
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
      async roleProcess() {
			  if(this.queryType=='carOwner') {
          this.alert = "很不幸您的爱车发生了这样的事故：";
        } else if(this.queryType=='company') {
			    this.alert = "您的客户车辆发生了一起事故，详情如下";
        } else if(this.queryType=='police') {
			    let policeAddr = this.$route.query.policeAddr;
			    this.curPolice = await CommonFuncs.getPoliceInfo(policeAddr);
          if(this.accident.responsibility!=0&&this.accident.policeAddr!=0) {//不为0代表事故已经有交警处理，可以获得交警信息
            this.alert="该起交通事故已经被处理";
            this.policeInfo = await CommonFuncs.getPoliceInfo(this.accident.policeAddr);
          } else {
            this.alert="发生了一起交通事故，请前往处理，您可以为车主做出五种责任判定：";
          }
        }
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
      parseTime(time) {
        let accidentDate = new Date(parseInt(time));
        return accidentDate.getFullYear()+"/"+(accidentDate.getMonth()+1)+"/"+accidentDate.getDate();
      },
			async setResponsibility(responsibility){
			  try {
          await this.accidentRecordList.methods.doAccidentRecord(this.policerList.options.address,
            this.buyRecordList.options.address,this.buyRecordInfo.Id,this.accident.Id,this.$route.query.policeAddr,
            this.accident.carOwnerAddr,responsibility,this.buyRecordInfo.balance,this.accident.loss).send({
            from: this.ownerAccount
          });
          this.accident.responsibility=responsibility;
          this.policeInfo = this.curPolice;
          this.bookInfo = await CommonFuncs.parseBookInfo(this.buyRecordInfo);
          alert("处理完毕，感谢！");
        } catch (e) {
          this.alert = e.message;
        }
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
