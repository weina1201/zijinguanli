// pages/dingdanqueren/dingdanqueren.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      {name: 'USA', value: '微信支付', src: '/pages/image/wx.png', checked: 'true'},
      {name: 'CHN', value: '支付宝支付', src: '/pages/image/zfb.png',},
      {name: 'BRA', value: '银联支付', src: '/pages/image/yl.png',},
    ],
     hideModal1: true, //模态框的状态  true-隐藏  false-显示
     animationData: {},
     showModal: false,
     ID: 1234567890,
     time: "2019/3/15 9:13",
     mother: "微信支付",
     money: 300,

     payment_mode: 1,//默认支付方式 微信支付
 
     isFocus: false,//控制input 聚焦
   
     balance:100,//余额
   
     actual_fee: 30000,//待支付
   
     wallets_password_flag: false//密码输入遮罩

     
  },   // 显示遮罩层  

  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  showModal1: function (){
    var that = this;    
    that.setData({
      hideModal1: false
    })
    var animation = wx.createAnimation({
      duration: 600,//动画的持续时间 默认600ms   数值越大，动画越慢   数值越小，动画越快      
      timingFunction: 'ease',//动画的效果 默认值是linear
    })    
    this.animation = animation
    setTimeout(function () {
        that.fadeIn();//调用显示动画    
    }, 200)
  },   // 隐藏遮罩层  
  hideModal1: function () {    
    var that = this;    
    var animation = wx.createAnimation({      
      duration: 800,//动画的持续时间 默认800ms   数值越大，动画越慢   数值越小，动画越快
      timingFunction: 'ease',//动画的效果 默认值是linear
    })    
    this.animation = animation    
    that.fadeDown();//调用隐藏动画       
    setTimeout(function () {      
      that.setData({        
        hideModal1: true      
      })    
    }, 720)//先执行下滑动画，再隐藏模块
  },   //动画集  
  fadeIn: function () {    
    this.animation.translateY(0).step()    
    this.setData({      
      animationData: this.animation.export()//动画实例的export方法导出动画数据传递给组件的animation属性
    })  
  },  
  fadeDown: function () {    
    this.animation.translateY(300).step()    
    this.setData({      
      animationData: this.animation.export(),    
    }) 
  },

  goModel: function(){
    this.hideModal1(),
    this.setData({
      showModal: true,
    })
  },

wx_pay() {//转换为微信支付
 
  this.setData({

   payment_mode: 1

  })

 },

 offline_pay() {//转换为转账支付

  this.setData({

   payment_mode: 0

  })

 },

 wallet_pay() {

  this.setData({//转换为钱包支付

   payment_mode: 2

  })

 },

 set_wallets_password(e) {//获取钱包密码

  this.setData({

   wallets_password: e.detail.value

  });

  if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果

   wallet_pay(this)

  }

 },

 set_Focus() {//聚焦input

  console.log('isFocus', this.data.isFocus)

  this.setData({

   isFocus: true

  })

 },

 set_notFocus() {//失去焦点

  this.setData({

   isFocus: false

  })

 },

 close_wallets_password () {//关闭钱包输入密码遮罩

  this.setData({

   isFocus: false,//失去焦点

   wallets_password_flag: false,

  })

 },

 pay() {//去支付

  pay(this)

 },

 modalConfirm:function(){
  this.setData({

    isFocus: true,//失去焦点
 
    wallets_password_flag: true,
 
   })
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

/*-----------------------------------------------*/
 
 /*支付*/
 
 function pay(_this) {
 
  let apikey = _this.data.apikey;
 
  let id = _this.data.id;
 
  let payment_mode = _this.data.payment_mode
 
  if (payment_mode == 1) {
 
  // 微信支付
 
  // 微信自带密码输入框
 
   console.log('微信支付')
 
  } else if (payment_mode == 0) {
 
  // 转账支付 后续跳转至传转账单照片
 
   console.log('转账支付')
 
  } else if (payment_mode == 2) {
 
   // 钱包支付 输入密码
 
   console.log('钱包支付')
 
   _this.setData({
 
    wallets_password_flag: true,
 
    isFocus: true
 
   })
 
  }
 
 }
 
 // 钱包支付
 
 function wallet_pay(_this) {
 
  console.log('钱包支付请求函数')
  wx.switchTab({
    url: '/pages/jiaofeijilu/jiaofeijilu',
  })
 
  /*
 
  1.支付成功
 
  2.支付失败：提示；清空密码；自动聚焦isFocus:true，拉起键盘再次输入
 
  */
 
 }