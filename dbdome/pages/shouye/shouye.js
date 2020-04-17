// pages/shouye/shouye.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image: "/pages/image/sy8.png",
    list:[
      {
        id: '1',
        title: '姓名：',
        src: '/pages/image/sy1.png',
        data: '刘晓明',
      },
      {
        id: '2',
        title: '学号：',
        src: '/pages/image/sy2.png',
        data: '160740001',
      },
      {
        id: '3',
        title: '学校：',
        src: '/pages/image/sy3.png',
        data: '苏州大学',
      },
      {
        id: '4',
        title: '学院：',
        src: '/pages/image/sy4.png',
        data: '数学科学学院',
      },
      {
        id: '5',
        title: '专业：',
        src: '/pages/image/sy5.png',
        data: '信息与计算科学',
      },
      {
        id: '6',
        title: '年级：',
        src: '/pages/image/sy6.png',
        data: '16',
      },
      {
        id: '7',
        title: '在读状态：',
        src: '/pages/image/sy7.png',
        data: '在读',
      }
    ]
  },

  goToMm:function(){
    wx.navigateTo({
      url: '/pages/mimaxiugai/mimaxiugai',
    })
  },

  goIndex:function(){
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var _this = this;
    var data_string = {
      title: 1,
      ID: app.data.ID,
      credential: app.data.credential,
    },
    data_json = JSON.stringify(data_string)
    console.log(data_json)
    wx.request({
      url: 'http://114.115.222.89:8080/index',
      method: 'POST',
      data: data_json,
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success: function(res){
        var x = "在读"
        if(res.data[7] == 1){
          x = "在读"
        }
        else{
          x = "不在读"
        }
        _this.setData({
          ["list[0].data"] : res.data[2],
          ["list[1].data"]: res.data[0],
          ["list[2].data"]: res.data[1],
          ["list[3].data"]: res.data[3],
          ["list[4].data"]: res.data[4],
          ["list[5].data"]: res.data[6],
          ["list[6].data"]: x,
        })
      },
      fail:function(){
        wx.showToast({
          title: '加载中',
          icon: 'none'
        })
      }
    })
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