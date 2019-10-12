// components/imgSwiper.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        imgUrls: [
            'cloud://weixinshangcheng-45ee6c.7765-weixinshangcheng-45ee6c/swiperimg/jd1.jpg',
            'cloud://weixinshangcheng-45ee6c.7765-weixinshangcheng-45ee6c/swiperimg/jd2.jpg',
          'cloud://weixinshangcheng-45ee6c.7765-weixinshangcheng-45ee6c/swiperimg/jd3.jpg'
        ],
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 5000,
        duration: 1000
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})
