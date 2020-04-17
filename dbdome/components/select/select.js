Component({
  behaviors: ['wx://form-field'], //支持表单获取组件值
  properties: {
    //组件的名称
    title: {
      type: String
    },
    //通过form获取组件的值
    name: {
      type: String
    },
    //下拉显示的数据集合
    options: {
      type: Array
    },
    //表单组件是否必填
    isRequired: {
      type: Boolean
    },
    //外部传递的动态变量
    showkey: {
      type: String
    }
  },

  data: {
    showOptions: false //组件默认的展开状态
  },
  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached: function() {
      var key = this.properties.showkey
      this.setData({
        value: this.properties.options[0][key] //默认选中第一个
      })
    },
  },
  methods: {
    selectToggle: function(e) {
      this.setData({
        showOptions: !this.data.showOptions
      })
    },
    hideSelect: function(e) {
      this.setData({
        showOptions: false
      })
    },
    selectItem: function(e) {
      var optionList = this.properties.options //外部传进来的数组对象
      var nowIdx = e.currentTarget.dataset.index //当前点击的索引
      var selectItem = optionList[nowIdx] //当前点击的内容
      this.setData({
        showOptions: false,
        value: selectItem[this.properties.showkey]
      });
      var eventOption = {} // 触发事件的选项
      this.triggerEvent("mySelectItem", selectItem) //组件选中回调
    }
  }
})