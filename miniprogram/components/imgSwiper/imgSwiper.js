// components/imgSwiper.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        swipers: {
            type: Array,
            value: [],
            observer: function (newVal, oldVal) {
                this.setData({
                    swipers: newVal
                })
            }
        },
        height: {
            type: String,
            value: '325rpx'
        },
        indicatorDots: {
            type: Boolean,
            value: true
        },
        autoplay: {
            type: Boolean,
            value: true
        },
        circular: {
            type: Boolean,
            value: true
        },
        interval: {
            type: String,
            value: "5000"
        },
        duration: {
            type: String,
            value: "1000"
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        current: 0 // 索引值
    },

    /**
     * 组件的方法列表
     */
    methods: {
        change: function (e) {
            if ("touch" === e.detail.source || "autoplay" === e.detail.source) {  // 只在用户触发的情况下
                this.setData({
                    current: e.detail.current
                })
            }
        }
    }
})
