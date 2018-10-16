var conf = {
  // 神策分析注册在APP全局函数中的变量名，在非app.js中可以通过getApp().sensors(你这里定义的名字来使用)
  name: 'sensors',
  appid: 'wxdb77d23a263a06a2',
  // 神策分析数据接收地址
  server_url: 'https://test-syg.datasink.sensorsdata.cn/sa.gif?project=xubo&token=27f1e21b78daf376',
  // 传入的字符串最大长度限制
  max_string_length: 300,
  // 发送事件的时间使用客户端时间还是服务端时间
  use_client_time: false,
  show_log: true,
  // 是否自动采集如下事件
  autoTrack:{
    //$MPLaunch 
    appLaunch:true,
    //$MPShow
    appShow:true,
    //$MPHide
    appHide:true,
    //$MPViewScreen
    pageShow:true
  }
};

module.exports = conf;