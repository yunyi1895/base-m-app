//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    baseData: 10443571200000
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
     wx.redirectTo({
      url: '../register/register?from=index'
    })
  },
  change(res) {
    console.log(res)
  },
  bindDateChange(e) {
    console.log(e)
  },
  launchAppError(err) {
    console.log(err)
  }

})
