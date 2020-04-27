// pages/bijiaodingdan/bijiaodingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    Blist:[
    ],
  },

  goBj:function(){
    wx.switchTab({
      url: '/pages/jiaofeidingdan/jiaofeidingdan',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    var app = getApp();
    var _this = this;
    var data_string = {
      ID: app.data.ID,
      credential: app.data.credential,
    },
    data_json = JSON.stringify(data_string)
    wx.request({
      url: 'http://114.115.222.89:20113/enquiry',
      method: 'POST',
      data: data_json,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res)
        var list = res.data
        var Blist=[]
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
          for (let index1 = 0; index1 < list.length; index1++) {
            var element = []
            for (let index = 0; index < list[index1].subBillList.length; index++) {
              element.push({
                id: index, 
                title:list[index1].subBillList[index].product_name,
                beizhu: list[index1].subBillList[index].remark, 
                prize:list[index1].subBillList[index].product_price,
                goods_id: list[index1].subBillList[index].product_id
              })
            }
            Blist.push({
              id: index1,
              list: element
            })
          }
          _this.setData({
            Blist: Blist
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
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onLoad: function () {

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

  },

})