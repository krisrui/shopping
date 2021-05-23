import axios from 'axios';
// 库里面不止一个网络请求函数

export function request(config){
    const instance = axios.create({
        baseURL:'http://152.136.185.210:7878/api/m5',
        timeout:5000
    })

    // instance 实例的意思
    instance.interceptors.request.use(config=>{
        // console.log(config);
        return config
    },err=>{

    });

      
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{
        console.log(err);
    })

    // 返回的为promise
    return instance(config)
}