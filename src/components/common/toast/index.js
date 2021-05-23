//默认必须为index.js文件才能文件夹直接读取
import Toast from './Toast.vue';
const obj ={};
obj.install = function(Vue){
    // document.body.appendChild(Toast.$el) 这时候Toast.$el还没挂载
    // 1.创建组件构造器
    const constructor = Vue.extend(Toast)
    // 2.new的方式 根据组件构造器 创建一个组件对象
    const toast = new constructor();
   
    // 3.将组件对象,手动挂载到某一个元素上
    toast.$mount(document.createElement('div'));
    // 4.toast.$el对应的就是div 需要 djv显示
    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;
}
export default obj