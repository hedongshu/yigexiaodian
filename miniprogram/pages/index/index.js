//index.js

// 引入接口配置文件urlconfig
const interfaces = require("../../utils/urlconfig.js");

const db = wx.cloud.database();
const app = getApp();

Page({
  data: {
    swipers: [],
    goodsList: []
  },

  onLoad: function() {
    wx.showLoading({
      title: "加载中..."
    });
    this.wxInit();
    this.loadData();
  },
  wxInit() {
    // 获取openid  appid
    wx.cloud.callFunction({
      name: "login",
      complete: res => {
        app.globalData.openid = res.result.openid;
        app.globalData.appid = res.result.appid;
      }
    });

    app.loadCartsData();
  },
  /**加载数据 */
  loadData() {
    const self = this;
    db.collection("home_swipers")
      .get()
      .then(res => {
        console.log("顶栏图片", res);
        var data = res.data[0];
        this.setData({
          swipers: data.swipers
        });
        return console.log(this.data);
      })
      .then(res => {
        db.collection("goods")
          .orderBy("createTime", "desc")
          .get()
          .then(res => {
            console.log("商品列表", res);
            var data = res.data;
            this.setData({
              goodsList: data
            });
            wx.hideLoading();
          });
      });
  },

  toDetail(e) {
    const id = e.currentTarget.dataset.gid;
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + id
    });
  },
  onSearch(e) {
    wx.navigateTo({
      url: "/pages/searchResults/searchResults?search=" + e.detail
    });
  }
});
