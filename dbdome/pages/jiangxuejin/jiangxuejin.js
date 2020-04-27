// pages/bijiaodingdan/bijiaodingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        list:[
         
        ],
  },

  goBj: function(){
    wx.switchTab({
      url: '/pages/jiaofeidingdan/jiaofeidingdan',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady: function (options) {
    var app = getApp();
    var _this = this;
    var data_string = {
      ID: app.data.ID,
      credential: app.data.credential,
    },
    data_json = JSON.stringify(data_string)
    console.log(data_json)
    wx.request({
      url: 'http://114.115.222.89:20113/scholarship',
      method: 'POST',
      data: data_json,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res.data)
        var list = res.data
        var element = []
        if(list == []){
          _this.setData({
            list: element
          })
          wx.showModal({
            cancelColor: '暂无必缴订单！',
            showCancel: false
          })          
        }
        else{
          for (let index = 0; index < list.length; index++) {
            element.push({
              id: list[index][0], 
              title:list[index][2],
              name:list[index][3],
              grade:list[index][4], 
              prize:list[index][5],
              time:list[index][6],
              method:list[index][7]
            })
          }
          _this.setData({
            list: element
          })
      }
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
  onLoad: function () {

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
    console.log("yemianchudi")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("yemianchudi")
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

})