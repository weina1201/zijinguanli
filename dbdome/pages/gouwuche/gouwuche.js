// pages/xuanjiaodingdan/xuanjiaodingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sum: 0,
    list:[
      {
        id: 0,
        title: "商品名商品名商品名商品名商品名商品名商品名商品名",
        beizhu: "无",
        prize: 200,
        goods_id: 1,
        Ischoice: false,//本次是否选中
        num: 1,
        IsInall: false//是否已经位于购物车
      },
      {
        id: 1,
        title: "商品名",
        beizhu: "无",
        prize: 200,
        goods_id: 2,
        Ischoice: false,
        num: 1,
        IsInall: false//是否已经位于购物车
      },
      {
        id: 2,
        title: "商品名",
        beizhu: "无",
        prize: 200,
        goods_id: 3,
        Ischoice: false,
        num: 1,
        IsInall: false//是否已经位于购物车
      }
    ]
  },

  //删除商品
  deleteDd: function(e){
    var _this = this
    let id = e.currentTarget.dataset.id
    let list = this.data.list
    wx.getStorage({
      key: 'cart',
      success: function(res){
        let cart = res.data
        const index = list.findIndex((v)=>(v.id == id))
        list.splice(index, 1)
        cart[id].IsInall = false
        cart[id].num = 1
        let count = 0
        for (let index = 0; index < cart.length; index++) {
          if(cart[index].IsInall == true){
            count = count + cart[index].prize * cart[index].num
          }
        }
        _this.setData({
          list: list,
          sum: count
        })
        wx.setStorageSync('cart', cart)
      }
    })
  },

  handInDd: function(){
    var app = getApp()
    let _this = this
    var data_string = [
      {
        ID: app.data.ID,
        credential: app.data.credential,
        sum: _this.data.sum
      }
    ]
    this.data.list.forEach(function(item){
      data_string.push({
        goods_id: item.goods_id,
        prize: item.prize,
        num: item.num
      })
    })
    let data_json = JSON.stringify(data_string)
    wx.request({
      url: 'http://114.115.222.89:8080/createpayment',
      method: "POST",
      data: data_json,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res)
        if(res.data == 1){
        wx.switchTab({
          url: '/pages/jiaofeijilu/jiaofeijilu',
        })
      }
      else{
        wx.showToast({
          title: '订单创建失败',
          icon: 'none'
        })
      }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this= this
    wx.getStorage({
      key: 'cart',
      success: function(res){
        let cart = res.data
        let list = []
        let count = 0
        for (let index = 0; index < cart.length; index++) {
          if(cart[index].IsInall == true){
            list.push(cart[index])
            count = count + cart[index].prize * cart[index].num
          }
        }
        _this.setData({
          list: list,
          sum: count
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