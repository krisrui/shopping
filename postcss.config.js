module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, // 视口的宽度
            unitPrecision: 5, // 转化为vw时  保留几位
            viewportUnit: 'vw', //转化的视口单位
            selectorBlackList:['ignore',"tab-bar-item"], // 指定不需要转化的css类  类名上有ignore的也不转化  添加一个ignore就行 省事
                            // 类名中包含tab-bar-item就不会转化 类似正则
            minPixelValue:1, //小于或等于1px不转化为视口单位
            // exclude:[/TabBar/] // 包含TabBar的文件不转化其css
        }

    }
}