// miniprogram/pages/order/order.js
const app = getApp();
const db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: undefined,
    hasAddress: false,
    totalPrice: 0,
    goodsList: [],
    userInfo: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(app.globalData.selectedGoods);
    let data = app.globalData.selectedGoods;
    let price = 0;
    data.forEach(element => {
      price += element.price * element.num;
    });
    this.setData({
      goodsList: data,
      totalPrice: price
    });
  },
  /**选择地址 */
  chooseAddress() {
    const self = this;
    wx.chooseAddress({
      success(res) {
        console.log(res);
        let userInfo = {};
        userInfo.name = res.userName;
        userInfo.telNumber = res.telNumber;
        userInfo.address =
          res.provinceName + res.cityName + res.countyName + res.detailInfo;
        self.setData({
          address: res,
          userInfo: userInfo,
          hasAddress: true
        });
      }
    });
  },
  /**提交订单 */
  onSubmit() {
    db.collection("orders")
      .add({
        data: {
          goods: this.data.goodsList,
          createTime: new Date(),
          paid: false, //默认未支付,
          userInfo: this.data.userInfo,
          addressObj: this.data.address
        }
      })
      .then(res => {
        console.log("提交订单成功", res);
      });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {}
});
