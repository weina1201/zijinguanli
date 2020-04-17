Page({

  /**
   * 页面的初始数据
   */
  data: {
    optionArry: [{
       "name": "苏州大学",
            "id": "1"
          }, {
            "name": "南京大学",
            "id": "2"
          }, {
            "name": "苏州职业大学",
            "id": "3"
          }, {
            "name": "南京职业大学",
            "id": "4"
          }],
      yzm: "",
      sr: ''
  },

createCode:function(){
  var app = getApp();
  var code="";
	var codeLength = 4; 
	var random = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R",
		"S", "T", "U", "V", "W", "X", "Y", "Z");
	for(var i = 0; i < codeLength; i++){
    var charIndex = Math.floor(Math.random() * 36);
    code += random[charIndex];
  }
  this.setData({
    yzm: code,
    sr: ''
  })
  app.data.code = code;
},

yanzheng:function(e){
  var app = getApp();
  var newcode = e.detail.value.toUpperCase();
  var code = app.data.code;
  
  if(newcode.length <= 3) {}
	else if(newcode != code) 
  { //若输入的验证码与产生的验证码不一致时   
    console.log(newcode);
    console.log(code)
		wx.showToast({
      title: '验证码错误！',
      icon: 'none'
    }); //则弹出验证码输入错误   
    this.createCode(); //刷新验证码   
		//return false;
	}
	else
	{
		wx.showToast({
      title: '验证码正确！',
      icon: 'none'
    });
	}
},

load:function(e){
  var ID = e.detail.value.ID;
  var password = e.detail.value.password;
  var yz = e.detail.value.yz;
  if(ID == null || ID == ''){
    wx.showToast({
      title: '请输入学号',
      icon: 'none'
    });
  }
  else if(password == null || password == ''){
    wx.showToast({
      title: '请输入密码',
      icon: 'none'
    });
  }
  else if(yz.length != 4){
    wx.showToast({
      title: '验证码错误',
      icon: 'none'
    });
    this.createCode();
  }
  else{
    var app = getApp()
    var data_string = {
      title: 1,
      school: 1,
      ID: ID,
      password: password,
    },
    data_json = JSON.stringify(data_string)
    wx.request({
      url: 'http://114.115.222.89:8080/logging',
      method: "POST",
      data: data_json,
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      success:function(res){
        if(res.data[0] == 1){
          app.data.credential = res.data.substring(2,res.data.length)
          app.data.ID = ID
          wx.switchTab({
            url: '/pages/shouye/shouye',
          })
        }
        else {
          wx.showToast({
            title: '用户名或密码错误'
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
    this.createCode();
    /**const db = wx.cloud.database();
    db.collection('jiaofei').get().then(res=>{
      console.log(res);
    })*/
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

