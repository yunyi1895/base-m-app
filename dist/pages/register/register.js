const app = getApp()

Page({
  data: {
    region: [],
    customItem: '全部',
    canSub: false,
    checkRule: false,
    phoneNum:"",
    sendText:'重新发送'
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {
    this.init()
  },
  bindReplaceInput: function (e) {
    var value = e.detail.value
    console.log(value)
    this.setData({
      phoneNum: String(value),
      canSub: String(value).length == 11 && this.data.region.length == 3 ? true : false
    })
  },
  goLogin() {
    wx.redirectTo({
      url: '../login/login'
    })
  },
  init() {
    var vm = this
    app.wxP.getLocation().then(ress => {
      app.qqMapWX.reverseGeocoder({
        location: {
          latitude: ress.latitude,
          longitude: ress.longitude
        },
        coord_type: 1,
        success: function (res) {
          if (res.status == 0) {
            var address_component = res.result.address_component
            vm.setData({
              region: [address_component.province, address_component.city, address_component.district]
            })
          }
        },
        fail: function (res) {
          console.log(res);
        },
        complete: function (res) {
          console.log(res);
        }
      });
    })
  },
  bindRegionChange(e) {
    this.setData({
      region: e.detail.value
    })
  },
  handleCheckboxChange(e) {
    this.setData({
      checkRule: e.detail
    })
  },
  handleGetCode() {

  },
  goReduxTest(){
    wx.redirectTo({
      url: '../reduxTest/reduxTest'
    })
  },
  goMapPage(){
    wx.redirectTo({
      url: '../map/map'
    })
  },
  clearInput(){
    this.setData({
      phoneNum:'',
    })
  }

})