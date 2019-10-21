//index.js


// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');

const db = wx.cloud.database()
const app = getApp()

Page({
    data: {
        swipers: [],
        goodsList: [],
    },

    onLoad: function () {
        wx.showLoading({
            title: '加载中...',
        })

        this.loadData()
    },
    /**加载数据 */
    loadData() {
        const self = this
        db.collection('home_swipers').get().then(res => {
            console.log('顶栏图片', res)
            var data = res.data[0]
            this.setData({
                swipers: data.swipers
            })
            return console.log(this.data)
        }).then(res => {
            db.collection('goods').get().then(res => {
                console.log('商品列表', res)
                var data = res.data
                this.setData({
                    goodsList: data
                })
                wx.hideLoading()
            })
        })



    },

    toDetail(e) {
        const id = e.currentTarget.dataset.gid
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
        })
    },
})
