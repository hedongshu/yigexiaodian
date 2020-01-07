// pages/cart/cart.js
const db = wx.cloud.database();
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "/image/quick2.jpg",
    num: 1,
    allChecked: false,
    carts: [],
    totalPrice: 0,
    subdisabled: false, //结算按钮是否禁用,
    deleteAbled: false, //删除按钮是否禁用
    isEditor: false, //编辑状态,
    editorItems: [] // 编辑状态下要删除的
  },
  /** 进入编辑状态*/
  editor() {
    if (!this.data.isEditor) {
      let newData = this.data.carts;
      newData.forEach(element => {
        element.selected = false;
      });
      this.setData({
        isEditor: true,
        carts: this.data.carts,
        deleteAbled: true
      });
    } else {
      this.loadData();
      this.setData({
        isEditor: false
      });
    }
  },
  /**删除购物车某项 */
  deleteCart() {
    const self = this;
    wx.showModal({
      title: "提示",
      content: "真的要删除这些商品吗?",
      success(res) {
        if (res.confirm) {
          console.log("用户点击确定");
          let newData = [];
          //   把未选中复制到另一个数组
          self.data.carts.forEach((item, index) => {
            if (!item.selected) {
              newData.push(item);
            }
          });
          console.log("删除", newData);
          app.updateCartsFromNewData(newData, res => {
            console.log("删除后", res);
            self.setData({
              isEditor: false
            });
            self.loadData();
          });
        } else if (res.cancel) {
          console.log("用户点击取消");
          this.setData({
            isEditor: false
          });
          this.loadData();
        }
      }
    });
  },
  /**步进器变化 */
  stepperChange(e) {
    let index = e.target.dataset.index;
    this.data.carts[index].num = e.detail;
    this.getTotalPrice();
  },
  /**选中某项 */
  selectItem(e) {
    if (!this.data.isEditor) {
      let newData = this.data.carts;
      newData[e.target.dataset.index].selected = e.detail;
      this.setData({
        carts: newData
      });
      this.updateCarts();
      this.getTotalPrice();
    } else {
      // 编辑模式
      let newData = this.data.carts;
      let deleteAbled = true;
      newData[e.target.dataset.index].selected = e.detail;
      newData.forEach(item => {
        if (item.selected) deleteAbled = false;
      });
      this.setData({
        carts: newData,
        deleteAbled: deleteAbled
      });
    }
  },
  /**选中所有 */
  selectAll() {
    if (!this.data.allChecked) {
      let newData = this.data.carts;
      newData.forEach(element => {
        element.selected = true;
      });
      this.setData({
        carts: newData,
        allChecked: true
      });
    } else {
      let newData = this.data.carts;
      newData.forEach(element => {
        element.selected = false;
      });
      this.setData({
        carts: newData,
        allChecked: false
      });
    }

    this.updateCarts();
    this.getTotalPrice();
  },
  /**计算价格 */
  getTotalPrice() {
    let isAllCheck = true;
    let isDisabled = true;
    let carts = this.data.carts; // 获取购物车列表
    let total = 0;
    for (let i = 0; i < carts.length; i++) {
      // 循环列表得到每个数据
      if (carts[i].selected) {
        // 判断选中才会计算价格
        total += carts[i].num * carts[i].price; // 所有价格加起来
      } else {
        isAllCheck = false;
      }
    }
    console.log("总价", total);
    if (total > 0) {
      isDisabled = false;
    }
    this.setData({
      // 最后赋值到data中渲染到页面
      totalPrice: total,
      allChecked: isAllCheck,
      subdisabled: isDisabled
    });
  },
  /**修改购物车内商品 */
  updateCarts(e) {
    // let carts = this.data.carts;
    // let newData = [];
    // carts.forEach(element => {
    //   newData.push({
    //     _id: element._id,
    //     img: element.img,
    //     name: element.name,
    //     num: element.num,
    //     price: element.price,
    //     version: element.version
    //   });
    // });
    app.updateCartsFromNewData(this.data.carts, res => {
      console.log("更新数据成功", res);
    });
  },

  /**结算 */
  settlement() {
    let selectedGoods = [];
    this.data.carts.forEach(element => {
      if (element.selected) {
        selectedGoods.push({
          _id: element._id,
          img: element.img,
          name: element.name,
          num: element.num,
          price: element.price,
          version: element.version
        });
      }
    });
    app.globalData.selectedGoods = selectedGoods;
    wx.navigateTo({
      url: "/pages/order/order?id="
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.loadData();
  },
  loadData() {
    app.loadCartsData().then(res => {
      let data = app.globalData.carts;
      this.setData({
        carts: data
      });
      this.getTotalPrice();
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.loadData();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.updateCarts();
  },

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
