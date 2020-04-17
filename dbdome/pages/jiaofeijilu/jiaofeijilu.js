// pages/jiaofeijilu/jiaofeijilu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[
      {
        id: 0,
        Ispay: false,
        productid: 47328752837465833,
        creacttime: '2020/2/14 21:30',
        prize: 200,
        payment_state: '选缴-待缴',
        chilelist:[
          {
            goods_id: 1,
            name: '学杂费',
            sx: 'vhruie'
          },
          {
            goods_id: 2,
            name: '学杂费',
            sx: 'vhruie'
          },
          {
            goods_id: 3,
            name: '学杂费',
            sx: 'vhruie'
          },
        ]
      },
      {
        id: 1,
        Ispay: true,
        productid: 47328752837465833,
        creacttime: '2020/2/14 21:30',
        prize: 200,
        chilelist:[
          {
            goods_id: 1,
            name: '学杂费',
            sx: 'vhruie'
          },
          {
            goods_id: 2,
            name: '学杂费',
            sx: 'vhruie'
          },
          {
            goods_id: 3,
            name: '学杂费',
            sx: 'vhruie'
          },
        ]
      }
    ],

    lsid: "",//订单对应的流水订单
    which:"",//标记支付的是那一笔订单
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
     wallets_password: 1,
     payment_mode: 1,//默认支付方式 微信支付
     isFocus: false,//控制input 聚焦
     balance:100,//余额
     wallets_password_flag: false//密码输入遮罩
  },


  radioChange: function(e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },

  showModal1: function (e){
    var that = this;    
    that.setData({
      hideModal1: false,
      which: e.currentTarget.dataset.id
    })
    console.log(this.data.which)
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

  goModel: function(e){
    console.log(e)
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

    wallet_pay(this.data.wallets_password, this.data.list[this.data.which].productid, this.data.lsid)
    
    this.setData({
      isFocus: false
  });
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
   wallets_password: ""

  })

 },

 pay() {//去支付

  pay(this)

 },

 modalConfirm:function(e){
    var app = getApp();
    var _this = this;
    var data_string = {
      ID: app.data.ID,
      credential: app.data.credential,
      bill_id: _this.data.list[_this.data.which].productid
    },
    data_json = JSON.stringify(data_string)
    wx.request({
      url: 'http://114.115.222.89:8080/pay',
      method: 'POST',
      data: data_json,
      header: {
        "Content-Type": "application/json"
      },
      success: function(res){
        console.log(res.data)
        _this.setData({
          lsid: res.data,
          isFocus: true,//失去焦点
          wallets_password_flag: true,
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
      url: 'http://114.115.222.89:8080/queryPaymentRecord',
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
            cancelColor: '暂无缴费记录！',
            showCancel: false
          })          
        }
        else{
          for (let index1 = 0; index1 < list.length; index1++) {
            var element = []
            for (let index = 0; index < list[index1].subBillList.length; index++) {
              element.push({
                name:list[index1].subBillList[index].product_name,
                sx: list[index1].subBillList[index].remark + "      ￥" + list[index1].subBillList[index].product_price, 
                goods_id: list[index1].subBillList[index].product_id
              })
            }
            Blist.push({
              id: index1,
              Ispay: list[index1].isPaid,
              payment_state: list[index1].payment_state,
              prize: list[index1].bill_price,
              productid: list[index1].bill_id,
              creacttime: list[index1].create_timestamp,
              chilelist: element
            })
          }
          _this.setData({
            list: Blist
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
  onReady: function () {

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
 
 function wallet_pay(_this, tradeID, lsid) {
  var app = getApp()
  var data_string = {
    method: "支付交易",
    tradeID: tradeID,      // 由后端生成的订单号
    username: "测试账户1",            // 付款账户的用户名
    password: "123456",               // 付款账户的密码
  }
  var data_json = JSON.stringify(data_string)
  wx.request({
    url: 'http://114.115.222.89:20056/PaySim',
    method: 'POST',
    data: data_json,
    header: {
      "Content-Type": "application/json"
    },
    success: function(res){
      var result = res.data.result
      if ( result == '支付成功'){
        var data1_string = {
          ID: app.data.ID,
          credential: app.data.credential,
          odd_number: lsid,
          tradeID: tradeID
        }
        console.log(data1_string)
        var data1_json = JSON.stringify(data1_string)
        wx.request({
          url: 'http://114.115.222.89:8080/checkpay',
          method: 'POST',
          data: data1_json,
          header: {
            "Content-Type": "application/json"
          },
          success: function(res){
            console.log(res)
          }
        })
        wx.navigateTo({
          url: '/pages/zhifuchenggong/zhifuchenggong',
        })
      }
      else{
        wx.navigateTo({
          url: '/pages/zhifushibai/zhifushibai',
        })
      }

    },
    fail: function(){

    }
  })
 
  /*
 
  1.支付成功
 
  2.支付失败：提示；清空密码；自动聚焦isFocus:true，拉起键盘再次输入
 
  */
 
 }
