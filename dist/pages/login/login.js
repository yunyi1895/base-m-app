const app = getApp()
import { api_checkMobileIsExist } from '../../utils/api.js';
import { watch, computed } from '../../utils/vuefy.js';
Page({
  data: {
    phoneNum: '',
    canSub: false
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onShow() {
    this.setData({
      phoneNum: app.globalData.loginPhoneNum
    })
    if (app.globalData.loginPhoneNum.length == 11) {
      this.setData({
        canSub: true
      })
    }
  },
  onLoad: function () {

  },
  bindReplaceInput: function (e) { // change事件
    var value = e.detail.value
    console.log(value)
    this.setData({
      phoneNum: String(value),
      canSub: String(value).length == 11 ? true : false
    })
    console.log(this.data.canSub)

  },
  toRegister() {
    wx.redirectTo({
      url: '../register/register'
    })
  },
  handleGetCode() {// 获取验证码

    let isEx = app.ajax.post(api_checkMobileIsExist, { //检验已注册
      mobilePhone: this.data.phoneNum
    }).then(res => {
      console.log(res)
    })
    if (this.data.canSub == false) {
      return
    }
    app.setGlobalData('loginPhoneNum', this.data.phoneNum)
    wx.navigateTo({
      url: '../getCode/getCode?phoneNum=' + this.data.phoneNum + '&type=5'
    })
  },
  clearInput() {
    this.setData({
      phoneNum: '',
    })
  }


})