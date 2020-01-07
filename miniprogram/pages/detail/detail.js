// miniprogram/pages/detail.js
const db = wx.cloud.database()
const app = getApp()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo: {},
        _id: '',
        showPopup: false,
        activeNames: ['2'],
        radio: '0',  //商品的版本
        buyType: '',
        num: 1, //商品数量
        cartsNum: undefined  //购物车数量
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '加载中...',
        })
        if (app.globalData.carts.length > 0) {
            this.setData({
                cartsNum: app.globalData.carts.length
            })
        }

        console.log('当前商品id', options.id)
        this.data._id = options.id
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
    determine() {
        if (this.data.buyType === 'buy') {
            console.log('立即购买')
        } else {
            console.log('加入购物车')
            let newItem = {
                _id: this.data._id,
                img: this.data.goodsInfo.img,
                name: this.data.goodsInfo.name,
                price: this.data.goodsInfo.price,
                version: this.data.goodsInfo.versions[this.data.radio],
                num: this.data.num,
                createId: new Date()
            }
            app.isNotRepeteToCart(newItem).then(res => {
                console.log(res)
                this.setData({
                    cartsNum: app.globalData.carts.length,
                    showPopup: false,
                })
            })
        }
    },
    onRadioChange(event) {
        this.setData({
            radio: event.detail
        })
    },
    toCart() {
        wx.switchTab({
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

    onClickButton(e) {
        console.log('点击按钮', e);
        this.setData({
            showPopup: true,
            buyType: e.target.dataset.type
        })
    },
    onClose() {
        this.setData({
            showPopup: false
        })
    },
    onChange(event) {
        this.setData({
            num: event.detail
        })
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
        if (app.globalData.carts.length > 0) {
            this.setData({
                cartsNum: app.globalData.carts.length
            })
        }
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