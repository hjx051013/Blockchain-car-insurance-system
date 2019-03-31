<template>
  <div class="login">
    <div>
      <Alert v-if="alert" v-bind:message="alert" v-on:removeAlert="alert=''"></Alert>
    </div>
    <div>
      <Alert v-if="alert1" v-bind:message="alert1" v-on:removeAlert="alert1=''"></Alert>
    </div>
    <div class="container">

      <form class="form-signin">
        <h2 class="form-signin-heading">在此登录</h2>

        <input type="email" class="form-control" placeholder="您的用户名" required autofocus v-model="user.userName">

        <input type="password" class="form-control" placeholder="您的密码" required v-model="user.password">

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
        <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="userLogin">Start！！</button>
        <br>
        <router-link to='/registry'>没有账户？去注册</router-link>

      </form>

    </div> <!-- /container -->

  </div>
</template>

<script>
import Contracts from '../../libs/contracts';
import web3 from '../../libs/web3';
import Alert from './Alert';

export default {
  name: 'login',
  components: {
    Alert,
  },
  data () {
    return {
      user:{
        userName: '',
        password: '',
        type:'车主',
      },
      types: ['车主','保险公司','交警'],
      alert:'',
      alert1:'',
    }
  },
  methods:{
    async userLogin(e){

      //alert(this.user);
      //console.log(this.user);
      if (!(this.user.userName&&this.user.password&&this.user.type)) {
        alert("请把信息补充完整！");
      }
      else {
        const carOwnerList = Contracts['CarOwnerList'];
        const companyList = Contracts['CompanyList'];
        const policerList = Contracts['PolicerList'];
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];

        let pwdRight = false;
        debugger
        try {
          if(this.user.type=='车主') {
            pwdRight = await carOwnerList.methods.verifyPwd(this.user.userName,this.user.password).call({from: owner});
            console.log(pwdRight);
            if(pwdRight) {
              let ownerAddr = await carOwnerList.methods.creatorOwnerMap(owner).call();
              this.$router.push("/owner/"+ownerAddr);
            }
          } else if(this.user.type=='保险公司') {
            pwdRight = await companyList.methods.verifyPwd(this.user.userName,this.user.password).call({from: owner});
            console.log(pwdRight);
            if(pwdRight) {
              let companyAddr = await companyList.methods.creatorCompanyMap(owner).call();
              this.$router.push("/company/"+companyAddr);
            }
          } else {
            pwdRight = await policerList.methods.verifyPwd(this.user.userName,this.user.password).call({from: owner});
            console.log(pwdRight);
            if(pwdRight) {
              let policerAddr = await policerList.methods.creatorPolicerMap(owner).call();
              this.$router.push("/police/"+policerAddr);
            }
          }
        } catch (err) {
          console.log(err.message);
          this.alert = err.message;
          pwdRight = true;
        }
        if(!pwdRight) {
          this.alert1 = "密码错误！";
        }
      }
      e.preventDefault();
    },
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
  padding-top: 20px;
  color: #42b983;
}

form{
  width: 300px;
  margin: 10px auto;

}

</style>
