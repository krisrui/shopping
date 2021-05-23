import {request} from './request';

//再次封装 关于home组件的数据都可以通过这里的方法直接拿到
export function getHomeMulData (){
    return request({
        url:"/home/multidata"
    })
}

export function getHomeGoods(type,page) {
    return request({
        url:"/home/data",
        params:{
            type, // type = type
            page
        }
    })
}