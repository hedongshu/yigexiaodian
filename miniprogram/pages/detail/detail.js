// miniprogram/pages/detail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        title: '商品标题',
        price: '100',
        showPopup: false
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('当前商品id', options.id)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },
    onClickIcon() {
        console.log('点击图标');
    },

    onClickButton() {
        console.log('点击按钮');
        this.setData({
            showPopup: true
        })
    },
    onClose() {
        this.setData({
            showPopup: false
        })
    },
    onChange(event) {
        console.log(event.detail);
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