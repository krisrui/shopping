import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getters'
// 1.安装插件
Vue.use(Vuex) //调用Vuex.install方法

//2.创建对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations,
    actions: {
        addToCart(context, payload) {
            return new Promise((resolve, reject) => {
                // context.cartList.push(payload)
                let oldProduct = null;
                for (let item of context.state.cartList) {
                    if (item.iid === payload.iid) {
                        oldProduct = item
                    }
                }
                if (oldProduct) {
                    oldProduct.count += 1
                    resolve('商品数量+1')
                } else {
                    payload.count = 1;
                    payload.checked = true; //对象模型
                    context.state.cartList.push(payload)
                    resolve('添加商品成功')
                    // 这里应该再发送给commit 来处理
                }
            })
        }
    },
    getters,
    modules: {

    }
})

export default store