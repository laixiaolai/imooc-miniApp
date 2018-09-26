//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls: [
      '/img/banner1.jpg',
      '/img/banner2.jpg',
      '/img/banner3.jpg'
    ],
    indicatorDots: true,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    proList:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    this.getProList();

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  toDetail:function(e){
    console.log(e);
    var index=e.currentTarget.dataset.index;
    console.log(index);
    var proList=this.data.proList;
    var title=proList[index].title;
    //一种传值方式
    // wx.navigateTo({
    //   url: '/pages/detail/detail?title='+title,
    // })
    //一种传值方式

    //另一种传值方式需要 detail.js里面获取title缓存
    wx.setStorageSync('title', title)
    wx.navigateTo({
      url: '/pages/detail/detail?title=' + title,
    })
    //另一种传值方式

  },
  getProList:function(){
    var self=this;
    wx.request({
      url: app.globalData.host,
      method:'GET',
      success:function(res){
        self.setData({
          proList:res.data
        })
      }
    })
  },
  copy:function(){
    //低版本库支持
    if(wx.setClipboardData){
      wx.setClipboardData({
        data: '这是要复制的内容',
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              console.log(res.data)
            }
          })
        }
      })
    }
    else{
      wx.showModal({
        title: '提示',
        content: '您的微信版本太低，请升级！',
      })
    }
    
  }

})
