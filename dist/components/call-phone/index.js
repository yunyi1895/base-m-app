
Component({
  behaviors: [],
  properties: {

  },
  data: {
    myData: {}
  },
  attached: function () { },
  methods: {
    myMethod: function () { },
    callPhone() {
      wx.showModal({
        title: "拨打客服电话",
        content: "400-920-8050",
        confirmText: "拨打",
        success: function (res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: '400-920-8050'
            })
          }

        },
        fail: function () {

        }

      })

    }
  }
})