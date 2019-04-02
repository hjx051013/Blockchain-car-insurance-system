<template>
	<div class="body">
	<!-- 顶部部分 -->
	<div id="header">
		<div class="container">
			<div class="header_left left">
				<div class="xlwb"></div>
				<div class="txwb"></div>
				<div class="tel">联系电话：188 1234 5678<span>&nbsp;&nbsp;&nbsp;</span> by浙江大学软件学院</div>
			</div>
			<div class="header_right right">
				<ul>
					<li>	<router-link to='/login'>登录</router-link></li>
					<li>		<router-link to='/registry'>注册</router-link></li>
					<li><a href="#">用户中心</a></li>
					<li><a href="#">帮助</a></li>
					<li class="shop_car"><span></span><a href="#">购物车</a></li>
				</ul>
			</div>
		</div>
	</div>
	<!-- 导航部分 -->
	<div id="nav">
		<div class="container">
			<div class="logo left">
				<img src="../img/logo.jpg" alt="">
			</div>
			<ul class="right">
				<li><a href="index.html">首页</a></li>
				<li><a href="javascript:;" id="to2">介绍</a></li>
				<li><a href="javascript:;" id="to3">方案</a></li>
				<li><a href="javascript:;" id="to4">服务</a></li>
			</ul>
		</div>
	</div>
	<!-- banner部分 -->
	<div id="banner">
		<!-- <div class="container"></div> -->
		<div class="swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-show="this.turns[0]"><img src="../img/banner11.jpg" width="100%" height="450px" alt=""></div>
				<div class="swiper-slide" v-show="this.turns[1]"><img src="../img/banner22.jpg" width="100%" height="450px" alt=""></div>
				<div class="swiper-slide" v-show="this.turns[2]"><img src="../img/banner3.jpg" width="100%" height="450px" alt=""></div>
				<div class="swiper-slide" v-show="this.turns[3]"><img src="../img/banner4.jpg" width="100%" height="450px" alt=""></div>
			</div>
			<!-- add pagination -->
			<div class="swiper-pagination"></div>
			<div class="swiper-button-next" @click="addBanner"></div>
			<div class="swiper-button-prev" @click="subBanner"></div>
		</div>
		<div class="banner-nav-bg"></div>
	</div>
	<!-- 链式反应 介绍部分 -->
	<div id="introduce">
		<div class="container">
			<div class="introduce_top">
				<img src="../img/introduce.jpg" alt="">
			</div>
			<ul>
				<div class="a1 fade">
					<li class="left">
						<div><img src="../img/introduce1.jpg" alt=""></div>
						<dd>采用区块链解决方案</dd>
						<dt>大幅度降低信任成本</br>减少人力资源消耗</br>使得保险公司在理赔</br>时从现场勘查中解脱</dt>
					</li>
				</div>
				<div class="a2 fade">
					<li class="left">
						<div><img src="../img/introduce2.jpg" alt=""></div>
						<dd>一定量的传统设计</dd>
						<dt>部分不必要的数据仍然</br>存储于传统服务器后端</br>减少区块链系统的运算</br>和读写压力</dt>
					</li>
				</div>
				<div class="a3 fade">
					<li class="left">
						<div><img src="../img/introduce3.jpg" alt=""></div>
						<dd>交通警察作为第三方</dd>
						<dt>理赔时根据交警的</br>处理结果和车辆的</br>历史记录，确保结果</br>真实、合理、有效</dt>
					</li>
				</div>
			</ul>
		</div>
	</div>
	<!-- 车险方案 -->
	<div id="product">
		<div class="container">
			<div class="product_top">
				<img src="../img/product.jpg" alt="">
			</div>
			<ul>
				<li class="left"><img src="../img/product1.jpg" alt=""></li>
				<li class="left"><img src="../img/product2.jpg" alt=""></li>
				<li class="left clear_right"><img src="../img/product3.jpg" alt=""></li>
				<li class="right"><img src="../img/product4.jpg" alt=""></li>
				<li class="right"><img src="../img/product5.jpg" alt=""></li>
				<li class="right"><img src="../img/product6.jpg" alt=""></li>
			</ul>
		</div>
	</div>
	<!-- 服务部分 -->
	<div id="service">
		<div class="container">
			<ul>
				<li>
					<ol>
						<li><a href="#">关于我们</a></li>
						<li><a href="#">关于链式反应</a></li>
						<li><a href="#">新闻中心</a></li>
						<li><a href="#">人才招聘</a></li>
					</ol>
				</li>
				<li>
					<ol>
						<li><a href="#">推荐方案</a></li>
						<li><a href="#">交强险</a></li>
						<li><a href="#">综合险</a></li>
						<li><a href="#">涉水险</a></li>
					</ol>
				</li>
				<li>
					<ol>
						<li><a href="#">服务</a></li>
						<li><a href="#">车险购买</a></li>
						<li><a href="#">车险理赔</a></li>
						<li><a href="#">到期续保</a></li>
					</ol>
				</li>
				<li>
					<ol>
						<li><a href="#">商务合作</a></li>
						<li><a href="#">知识产权</a></li>
						<li><a href="#">开放平台</a></li>
						<li><a href="#">采购相关</a></li>
					</ol>
				</li>
				<li>
					<ol>
						<li><a href="#">动态</a></li>
						<li><a href="#">新浪微博</a></li>
						<li><a href="#">腾讯微博</a></li>
						<li><a href="#">微信公众号</a></li>
					</ol>
				</li>
			</ul>
		</div>
	</div>
	<!-- 页脚部分 -->
	<div id="footer">
		<div class="container">
			<p>
				<span>@ 2015 - 2019 ICBC 版权所有 浙ICP备xxxxxxxx号-1 </span>
				<a href="#">版权说明</a>
				<a href="#">用户使用协议</a>
				<a href="#">隐私政策</a>
				<a href="#">网站地图</a>
				<a href="https://www.hyperchain.cn/">友情链接</a>
			</p>
		</div>
	</div>
	<!-- 返回顶部 -->
	<div id="top">
		<div class="container">
			<a href="javascript:;" id="btn"></a>
		</div>
	</div>









	</div>

</template>

<script>


	export default{
		name:'index',
		data(){
			return {
				turn:2000,
				turns:[1,0,0,0],
			}
		},
		methods:{
			addBanner(){
				this.turn++;
				if (this.turn%4==0) {
					this.turns=[1,0,0,0];
				}
				else if (this.turn%4==1) {
					this.turns=[0,1,0,0];
				}
				else if (this.turn%4==2) {
					this.turns=[0,0,1,0];
				}else if (this.turn%4==3) {
					this.turns=[0,0,0,1];
				}
			},
			subBanner(){
				this.turn--;
				if (this.turn%4==0) {
					this.turns=[1,0,0,0];
				}
				else if (this.turn%4==1) {
					this.turns=[0,1,0,0];
				}
				else if (this.turn%4==2) {
					this.turns=[0,0,1,0];
				}else if (this.turn%4==3) {
					this.turns=[0,0,0,1];
				}
			},

		}
	}
</script>

<style>
@import '../css/index.css';
@import '../css/swiper.css';
@import '../css/animate.min.css';
 /*引入公共样式*/







/*banner*/

.body {
            background: #eee;
            font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
            font-size: 14px;
            color: #000;
            margin: 0;
            padding: 0;
        }
        #banner{
        	height:450px;
        }

        .swiper-container {
            width: 100%;
            height: 460px;
            transition: all .3s;
        }

        .swiper-slide {
            text-align: center;
            font-size: 18px;
            background: #fff;

            /* Center slide text vertically */
            display: -webkit-box;
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            -webkit-align-items: center;
            align-items: center;
        }





</style>
