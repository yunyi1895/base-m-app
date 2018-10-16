const app = getApp()
import { api_getSMSVerifyCode } from '../../utils/api.js';
Page({
  data: {
    phoneNum: '',
    canSub: false,
    Length: 6,        //输入框个数
    isFocus: true,    //聚焦
    Value: "",        //输入的内容
    ispassword: true, //是否密文显示 true为密文， false为明文。
    sendText: 60,
    type: 0, //获取验证码类型
    hasSendCode: false, //已经发送true验证码
    countdownInterval:null
  },
  onUnload() {
    this.data.countdownInterval&&clearInterval(this.data.countdownInterval)
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function (query) {
    console.log(query)
    this.setData({
      phoneNum: query.phoneNum,
      type: query.type
    })
    this.init()
  },
  init() {

    this.sendCode()
  },
  toRegister() {
    wx.navigateTo({
      url: '../register/register'
    })
  },
  disposeCode(){ //code码输入到6后
    wx.showToast({
      title: "请输入正确的验证码",
      icon: "none",
    })
    if(this.data.type==5){//登录
      wx.showToast({
        title: "去登陆",
        icon: "none",
      })
    }else { //注册
      wx.reLaunch({
        url: '../setPassword/setPassword'
      })
    }
    
  },
  Focus(e) {   // change事件
    var that = this;
    console.log(e.detail.value);
    var inputValue = e.detail.value;
    that.setData({
      Value: inputValue,
    })
    if (String(inputValue).length == 6) {
      this.disposeCode()
    }
  },
  Tap() {
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  handleSendCode() { //重新发送

  },
  changeCountdown() { //开始倒计时
    var countdownInterval = setInterval(() => {
      console.log(this.data.sendText - 1)
      this.setData({
        sendText: this.data.sendText - 1
      })

      if (this.data.sendText <= 0) {
        console.log('clear')
        clearInterval(countdownInterval)
      }
    }, 1000)
    this.setData({
      hasSendCode: true,
      countdownInterval:countdownInterval
    })
  },
  sendCode() { //发送验证码
    app.ajax.post(api_getSMSVerifyCode, {
      mobilePhone: this.data.phoneNum,
      type: this.data.type,
      verifyCodeType: 0
    }).then(res => {
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 1000,
        mask: false,
      });
      if (res.status == 0) {
        this.changeCountdown()
      } else {

      }

      console.log(res)
    })
  }





})