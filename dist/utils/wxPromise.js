function chooseImage(obj={}){
  return new Promise(function(resolve,reject){
    wx.chooseImage({
      ...obj,
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
function chooseVideo(obj={}){
  return new Promise(function(resolve,reject){
    wx.chooseVideo({
      ...obj,
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
function getLocation(){
  return new Promise(function(resolve,reject){
    wx.getLocation({
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
function getSetting(){
  return new Promise(function(resolve,reject){
    wx.getSetting({
      success:function(res){
        resolve(res)
      },
      fail:function(err){
        reject(err)
      }
    })
  })
}
export default{
  chooseImage:chooseImage,
  chooseVideo:chooseVideo,
  getLocation:getLocation,
  getSetting:getSetting
}