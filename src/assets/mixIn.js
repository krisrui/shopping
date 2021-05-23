/* 混入 */
import BackTop from "components/content/backTop/BackTop";
export const itemListenerMixin = {
    mounted() {
        this.itemListener = () => {
            // 需要防抖
            clearTimeout(this.timer);
            this.timer = setTimeout(() => {
                this.$refs.scroll.scroll.refresh();
                console.log("防抖");
            }, 500);
        };
        this.$bus.$on("itemImageLoad", this.itemListener);
    },
    data() {
        return {
            timer: undefined,
            itemListener: null,
        }
    }
}


export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isBackToShow: false,
        }
    },
    methods: {
        backTop() {
            //  获得到子组件 再获得到子组件的属性
            this.$refs.scroll.scroll.scrollTo(0, 0, 500);
        },
    }
}