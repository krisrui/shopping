import {request} from './request';
export function getDetailDatas(iid) {
    return request({
        url:'/detail',
        params :{
            iid
        }
    })
}

export class goodsInfo{
    constructor(itemInfo,columns,services){
        this.title = itemInfo.title
        this.desc = itemInfo.desc
        this.columns = columns
        this.services = services
    }
}

export function getRecommends(){
    return request({
        url:'/recommend',
    })
}