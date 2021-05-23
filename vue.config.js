module.exports = {
    configureWebpack: {
        resolve: {
            // extensions:[], vue/js
            alias: {
                // '@':'src'
                'assets':'@/assets',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    }
}