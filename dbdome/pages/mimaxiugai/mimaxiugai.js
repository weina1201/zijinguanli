// pages/mimaxiugai/mimaxiugai.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

xg:function(e){
  var app = getApp();
  var yuanmm = e.detail.value.yuanmm;
  var xinmm = e.detail.value.xinmm;
  var zaimm = e.detail.value.zaimm;
  if(yuanmm == ''){
    wx.showToast({
      title: '请输入原密码',
      icon: 'none'
    })
  }
  else if(xinmm == ''){
    wx.showToast({
      title: '请输入新密码！',
      icon: 'none'
    })
  }
  else if(xinmm == yuanmm){
    wx.showToast({
      title: '新密码不可与原密码相同！',
      icon: 'none'
    })
  }
  else if(zaimm == ''){
    wx.showToast({
      title: '请再次输入新密码！',
      icon: 'none'
    })
  }
  else if(xinmm != zaimm){
    wx.showToast({
      title: '两次新密码不同！请重新输入',
      icon: 'none'
    })
  }
  else{
    var data_string = {
      title: 3,
      ID: app.data.ID,
      credential: app.data.credential,
      oldpassword: yuanmm,
      newpassword: xinmm,
    },
    data_json = JSON.stringify(data_string)
    console.log(data_json)
    wx.request({
      url: 'http://114.115.222.89:8080/reset',
      method: "POST",
      data: data_json,
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success:function(res){
        if(res.data == 1){
          wx.showToast({
            title: '密码修改成功',
            icon: 'none'
          })
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
        else {
          wx.showToast({
            title: '原密码错误',
            icon: 'none'
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '无法连接网络',
          icon: 'none'
        });
      }
    })
  
    
  }
},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})