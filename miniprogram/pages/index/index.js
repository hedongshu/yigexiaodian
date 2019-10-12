//index.js


// 引入接口配置文件urlconfig
const interfaces = require('../../utils/urlconfig.js');

const db = wx.cloud.database()
const app = getApp()

Page({
    data: {
        swipers: [],
        logos: [],
        quicks: [],
        pageRow: [],
        indicatorDots: true, //轮播图配置
        autoplay: false,
        interval: 5000,
        duration: 1000,
        imageURL: '/image/quick2.jpg'
    },

    onLoad: function () {
        wx.showLoading({
            title: '加载中...',
        })

        this.loadData()

    },
    /**加载数据 */
    loadData() {
        db.collection('profiles-homepage').get().then(res => {
            console.log('res', res)
            var data = res.data
            this.setData({
                swipers: data[0].swipers,
                logos: data[0].logos,
                quicks: data[0].quicks,
                pageRow: data[0].pageRow
            })
            wx.hideLoading()
        })

    },

    toDetail(e) {
        const id = e.currentTarget.dataset.gid
        wx.navigateTo({
            url: '/pages/detail/detail?id=' + id,
        })
    },
})
