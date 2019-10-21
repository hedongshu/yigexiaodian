// pages/cart/cart.js
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageURL: '/image/quick2.jpg',
        num: 1,
        allChecked: false,
        isNone: true,
        currentList: []
    },
    allClickedOnChange(e) {
        this.setData({
            allChecked: e.detail
        })
    },
    updateCarts() {

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.loadData()
    },
    loadData() {
        db.collection('carts').get()
            .then(res => {
                console.log(res)
                if (res.data.length == 0) {
                    db.collection('carts').add({
                        // data 字段表示需新增的 JSON 数据
                        data: {
                            currentList: []
                        },
                        success: function (res) {
                            // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
                            console.log("新用户创建购物车表", res)
                        }
                    })
                } else {
                    this.setData({
                        currentList: res.data.currentList
                    })
                    console.log('购物车内有', res.data.currentList)
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