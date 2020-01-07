//app.js
App({
  onLaunch: function() {
    if (!wx.cloud) {
      console.error("请使用 2.2.3 或以上的基础库以使用云能力");
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        traceUser: true
      });
    }

    this.globalData = {
      openid: "",
      appid: "",
      cartsSetId: "", //购物车表的_id
      carts: [],
      selectedGoods: [] // 从购物车选中结算的商品
    };
  },
  /**获取购物车远程数据 */
  loadCartsData() {
    const db = wx.cloud.database();
    return db
      .collection("carts")
      .orderBy("createTime", "asc")
      .get()
      .then(res => {
        console.log("购物车", res);
        if (res.data.length == 0) {
          db.collection("carts").add({
            data: {
              currentList: []
            },
            success: res => {
              console.log("新建购物车表", res);
              this.loadCartsData();
            }
          });
        } else {
          this.globalData.cartsSetId = res.data[0]._id;
          this.globalData.carts = res.data[0].currentList;

          //   // 设置购物车角标数字
          //   if (this.globalData.carts.length > 0) {
          //     wx.setTabBarBadge({
          //       index: 1,
          //       text: this.globalData.carts.length.toString()
          //     });
          //   }
          return "done";
        }
      });
  },
  // 判断购物车中是否有重复后添加购物车
  isNotRepeteToCart(newCartItem) {
    var self = this;
    var flag = false;
    self.globalData.carts.forEach(v => {
      if (v._id === newCartItem._id && v.version == newCartItem.version) {
        flag = true;
      }
    });

    if (flag) {
      wx.showToast({
        title: "已经添加过的商品,帮你增加了数量~"
      });
      this.globalData.carts.forEach(v => {
        if (v._id === newCartItem._id) {
          v.num += 1;
        }
      });
    } else {
      this.globalData.carts.push(newCartItem);
    }

    const db = wx.cloud.database();
    return db
      .collection("carts")
      .doc(this.globalData.cartsSetId)
      .update({
        // data 传入需要局部更新的数据
        data: {
          currentList: this.globalData.carts
        }
      });
  },
  /**根据传入的新数据,直接更新购物车数据库 */
  updateCartsFromNewData(newData, success) {
    const db = wx.cloud.database();

    db.collection("carts")
      .doc(this.globalData.cartsSetId)
      .update({
        // data 传入需要局部更新的数据
        data: {
          currentList: newData
        },
        success: function(res) {
          success(res);
        }
      });
  },
  // 上传图片
  doUpload: function() {
    // 选择图片
    wx.chooseImage({
      count: 1,
      sizeType: ["compressed"],
      sourceType: ["album", "camera"],
      success: function(res) {
        wx.showLoading({
          title: "上传中"
        });

        const filePath = res.tempFilePaths[0];

        // 上传图片
        const cloudPath = "my-image" + filePath.match(/\.[^.]+?$/)[0];
        wx.cloud.uploadFile({
          cloudPath,
          filePath,
          success: res => {
            console.log("[上传文件] 成功：", res);

            app.globalData.fileID = res.fileID;
            app.globalData.cloudPath = cloudPath;
            app.globalData.imagePath = filePath;

            wx.navigateTo({
              url: "../storageConsole/storageConsole"
            });
          },
          fail: e => {
            console.error("[上传文件] 失败：", e);
            wx.showToast({
              icon: "none",
              title: "上传失败"
            });
          },
          complete: () => {
            wx.hideLoading();
          }
        });
      },
      fail: e => {
        console.error(e);
      }
    });
  }
});
