// pages/xuanjiaodingdan/xuanjiaodingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
     
    ],
  },

  //商品选择
handChange: function(e){
  const goods_id = e.currentTarget.dataset.id
  let cart = this.data.list
  let index = cart.findIndex((v)=>(v.goods_id == goods_id));
  
  cart[index].Ischoice = !cart[index].Ischoice
  this.setData({
    list: cart
  })
},
//商品增减
handNum:function(e){
  const {operation,id}=e.currentTarget.dataset
  let cart = this.data.list
  const index =cart.findIndex((v)=>(v.goods_id == id));
  if(operation == -1 && cart[index].num >= 2){
    cart[index].num = cart[index].num-1
  }
  else if(operation == +1 ){
    cart[index].num = cart[index].num+1
  }
  else{
    wx.showToast({
      title: '该商品不能再减少了！',
      icon: 'none'
    })
  }
  this.setData({
    list: cart
  })
},

//点击加入购物车

handInCar(){
  let cart=wx.getStorageSync('cart', cart)
  let list = this.data.list
  let count = 0
  for (let index = 0; index < list.length; index++) {
    
    if(list[index].Ischoice == true && cart[index].IsInall == true){
      count = count + 1
      cart[index].num = cart[index].num + list[index].num
      list[index].Ischoice = false
      list[index].num = 1
    }
    else if(list[index].Ischoice == true && cart[index].IsInall == false){
      count = count + 1
      cart[index].num = list[index].num
      cart[index].IsInall = true
      list[index].Ischoice = false
      list[index].num = 1
    }
  }
  wx.setStorageSync('cart', cart)
  if(count > 0){
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    })
    this.setData({
      list:list
    })
  }
  else{
    wx.showToast({
      title: '请选择商品!',
      icon: 'none'
    })
  }

},



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    var _this = this;
    var data_string = {
      ID: app.data.ID,
      credential: app.data.credential,
    },
    data_json = JSON.stringify(data_string)
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'http://114.115.222.89:20113/queryProduct',
      method: 'POST',
      data: data_json,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        var list = res.data
        var element = []
        for (let index = 0; index < list.length; index++) {
          let x = ""
          for (let y = 5; y < 9; y++) {
            if(list[index][y] != null){
              x = x + list[index][y]
            }
          }
          element.push({
            id: index, 
            title:list[index][1],
            beizhu: x, 
            prize:list[index][2],
            productid:list[index][0],
            num: 1,
            IsInall: false,
            Ischoice: false,
            goods_id: list[index][0]
          })
        }
        _this.setData({
          list: element
        })
        let cart=_this.data.list
        wx.setStorageSync('cart', cart)
      },
      fail:function(){
        wx.showToast({
          title: '加载失败',
          icon: 'none'
        })
      },
      complete:()=>{
        wx.hideLoading({
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