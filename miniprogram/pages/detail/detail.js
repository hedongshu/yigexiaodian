// miniprogram/pages/detail.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo: {},
        showPopup: false,
        activeNames: ['2'],
        radio: '0'
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中...',
        })

        console.log('当前商品id', options.id)
        db.collection('goods')
            .where({
                _id: options.id
            })
            .get().then(res => {
                console.log(res)
                this.setData({
                    goodsInfo: res.data[0]
                })

                wx.hideLoading()
            })
    },
    onRadioChange(event) {
        this.setData({
            radio: event.detail
        })
    },
    toCart() {
        wx.navigateTo({
            url: '/pages/cart/cart'
        })
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
    // 折叠面板   数据详情
    collapseOnChange(e) {
        this.setData({
            activeNames: e.detail
        })
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