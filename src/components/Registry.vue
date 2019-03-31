<template>
  <div class="registry">
    <div>
      <Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
    </div>
    <div class="container">

        <form class="form-signin">
            <h2 class="form-signin-heading">欢迎注册</h2>

            <div v-if="user.type=='车主'">
                <input type="text"  class="form-control" placeholder="您的名字" required  v-model="user.userName">
                <label>您的性别：</label>
                男：<input type="radio" v-model="user.gender" required="true" value="true">
                女：<input type="radio" v-model="user.gender" required="true" value="false">
                <input type="text"  class="form-control" placeholder="您的电话" required v-model="user.phone">
                <input type="password" class="form-control" placeholder="您的密码" required v-model="user.password">
                <input type="password" class="form-control" placeholder="确认密码" required v-model="user.confirm">
            </div>

            <div v-if="user.type=='保险公司'">
                <input type="text"  class="form-control" placeholder="公司名字" required  v-model="user.userName">
                <input type="text"  class="form-control" placeholder="公司营业证号" required  v-model="user.companyNo">
                <input type="text"  class="form-control" placeholder="您的电话" required v-model="user.phone">
                <input type="password" class="form-control" placeholder="您的密码" required v-model="user.password">
                <input type="password" class="form-control" placeholder="确认密码" required v-model="user.confirm">
            </div>

            <div v-if="user.type=='交警'">
                <input type="text"  class="form-control" placeholder="您的名字" required  v-model="user.userName">
                <input type="text"  class="form-control" placeholder="交警证号" required  v-model="user.policerNo">
                <input type="text"  class="form-control" placeholder="您的电话" required v-model="user.phone">
                <input type="password" class="form-control" placeholder="您的密码" required v-model="user.password">
                <input type="password" class="form-control" placeholder="确认密码" required v-model="user.confirm">
            </div>

            <div>
                <label>您的身份:</label>
                <select v-model="user.type">
                    <optgroup label="角色">
                      <option v-for="type in types">{{type}}</option>
                    </optgroup>
                </select>
            </div>

            <div class="checkbox">
                <label>
                    <input type="checkbox" value="remember-me"> Remember me
                </label>
            </div>

            <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="addUser">成为新用户</button>

            <br>
            <router-link to="/login">已有账户？去登录</router-link>

        </form>

    </div> <!-- /container -->
  </div>
</template>

<script>
import Contracts from '../../libs/contracts';
import web3 from '../../libs/web3';
import Alert from './Alert';

export default {
  name: 'registry',
  components: {
    Alert,
  },
  data () {
    return {
      user:{
        userName:'',
        gender:true,//默认true为男性
        companyNo:'',
        policerNo:'',
        phone:'',
        password:'',
        confirm:'',
        type:'车主',
      },
      types:['车主','保险公司','交警'],
      alert:'',
    }
  },
  methods:{
      async addUser(e){
          //alert(this.user);
          console.log(this.user);
          if (!(this.user.userName&&this.user.phone&&this.user.password&&this.user.confirm&&this.user.type
            &&(this.user.type!='保险公司'?this.user.gender:true)&&(this.user.type=='保险公司'?this.user.companyNo:true)
            &&(this.user.type=='交警'?this.user.policerNo:true))) {
                alert("请把信息补充完整！");
          }
          else if (this.user.password!=this.user.confirm) {
            alert("两次密码输入不一致");
          }
          else{
              const accounts = await web3.eth.getAccounts();
              const owner = accounts[0];
              console.log(owner);
              const accidentRecordList = Contracts['AccidentRecordList'];
              const buyRecordList = Contracts['BuyRecordList'];
              const carOwnerList = Contracts['CarOwnerList'];
              const companyList = Contracts['CompanyList'];
              const policerList = Contracts['PolicerList'];

              let newUser={
                  name:this.user.userName,
                  phone:this.user.phone,
                  password:this.user.password,
              };
              let success = false;
              debugger
              if(this.user.type=='车主') {
                  newUser.gender = this.user.gender;
                  console.log(carOwnerList.options.address);
                  try {
                      await carOwnerList.methods.createCarOwner(accidentRecordList.options.address,buyRecordList.options.address,
                        newUser.name,newUser.password,newUser.gender,newUser.phone).send({
                        from: owner ,gas: '5000000'
                      });
                      success = true;
                  } catch (err) {
                      console.log(err.message);
                      this.alert = err.message;
                  }
              } else if(this.user.type=='保险公司') {
                  newUser.companyNo = this.user.companyNo;
                  try {
                    await companyList.methods.createCompany(accidentRecordList.options.address,buyRecordList.options.address,
                      newUser.name,newUser.password,newUser.phone,newUser.companyNo).send({
                      from: owner,gas: '5000000'
                    });
                    success = true;
                  } catch (err) {
                    console.log(err.message);
                    this.alert = err.message;
                  }
              } else {
                  newUser.gender = this.user.gender;
                  newUser.policerNo = this.user.policerNo;
                  try {
                    await policerList.methods.createPolicer(newUser.name,newUser.password,newUser.policerNo,newUser.phone,newUser.gender).send({
                      from: owner,gas: '5000000'
                    });
                    success = true;
                  } catch (err) {
                    console.log(err.message);
                    this.alert = err.message;
                  }
              }
              if(success) {
                alert("信息添加成功！");
                this.$router.push({path:'/login'});
              }
            //this.$router.push({path:"/",query:{alert:"用户信息添加成功！"}});
          // })
          }
      e.preventDefault();
  }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
form{
  width: 300px;
  margin: 10px auto;

}
</style>
