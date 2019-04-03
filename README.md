# 基于以太坊区块链的车险理赔系统——icbc


## 安装运行配置
1. 环境要求
    - [nodejs环境](https://nodejs.org/zh-cn/download/)
    - npm包管理器，随nodejs一同安装
    - chrome浏览器和[metamask插件](https://github.com/MetaMask/metamask-extension/releases)
    - [ganache区块链测试软件](https://truffleframework.com/ganache)
2. 在`npm run start`后的源码结构
![Xnip2019-04-02_14-31-28.png](http://hjx-markdown-images.test.upcdn.net/2019/04/02/4b571dbcb264f7e9c65d664f3c9aa141.png)

3. 如何运行
    - 配置`config/default.js`，
    ```
    module.exports = {
      // infuraUrl: 'https://rinkeby.infura.io/v3/3a3c20c6d72d48149469c4174d0f573e',
      infuraUrl: 'http://127.0.0.1:7545',
      hdwallet: 'mixed daughter charge earn hold boost recall life grace liar token hidden',
    }; 
    ```
    `infuraUrl`是要部署的区块链的网络地址，
    `hdwallet`是部署账户的助记词
    - 配置`libs/web3.js`，
      ```
      import Web3 from 'web3';
      
      let web3;
      // 浏览器环境且已经安装了 Metamask
      if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
        web3 = new Web3(window.web3.currentProvider);
        console.log("装了metamask");
        // 服务器环境或者没有安装 Metamask
      } else {
        web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));
        console.log("没有装metamask");
      }
      
      export default web3;
      ```
      保证`infuraUrl`与`web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));`网络地址一致。
    - 开启gannache软件，获取其助记词填入`config/default.js`的`hdwallet`。
    - 开启chrome的metamask软件，导入ganache软件的所有账户，首先用助记词登录ganache的第一个账户
      ，然后创自定义RPC,保证url和chainID与gannache上的一致。通过私钥导入ganache上的所有其他账户。
      
      ![Xnip2019-04-02_14-54-21.png](http://hjx-markdown-images.test.upcdn.net/2019/04/02/4488531ce3dcf732a3aa718464c67993.png)
      
      ![Xnip2019-04-02_14-55-11.png](http://hjx-markdown-images.test.upcdn.net/2019/04/02/9a63fba8408fd2d1853db77047f2805f.png)
      
      ![Xnip2019-04-02_14-56-38.png](http://hjx-markdown-images.test.upcdn.net/2019/04/02/908ce9ac633bb366a9bbab012488ca7b.png)
      
      ![Xnip2019-04-02_14-57-40.png](http://hjx-markdown-images.test.upcdn.net/2019/04/02/2e654bbf5389f656a8dcea9e2ab674ba.png)
      
      因为在gananche测试链上账户余额都被初始化为100，有了这些余额，我们可以很轻松的与链上的合约对象进行交互，而且不需要
      额外的挖矿，很适合测试dapp的功能
    - 在根路径下，先
    `npm install`，安装好所有的依赖包，再`npm run start`启动系统。
     根据`package.json`文件可以发现`npm run start`先是调用`npm run compile`编译区块链合约代码，
     然后调用`mocha tests/`使用mocha模块进行测试，测试无错后调用`npm run deploy`部署区块链合约到指定的
     区块链上。
    
4. 系统功能展示视频
    - [优酷地址](https://v.youku.com/v_show/id_XNDEyMjU3NjE2NA==.html?spm=a2h3j.8428770.3416059.1)
    - [youtube地址](https://www.youtube.com/watch?v=Aje2sdwKY0k&feature=youtu.be)
    
