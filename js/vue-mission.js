Vue.mixin({
    methods: {
        itemClick: function(data) {
            this.$emit('item-click', this.getItemClickData());
        },
        exit: function() {
            this.$emit('exit');
        },
        itemFocus: function(focusDom) {
            this.$emit('item-focus', focusDom);
        },
        getItemClickData: function() {

        },
        handlerKeyDownEvent: function() {
            var _this = this;
            console.log(this);
            console.log("触发了绑定按键事件");
            this.$nextTick(function() {
                var focus = _this.map ? _this.map.curLink : $(_this.$el).find(".focus");
                console.log("coocaamap========" + focus)
                _this.map = new coocaakeymap($(_this.$el).find(".coocaa_btn"), focus, "btn-focus");
            });
        }
    }
});

var vueDomRef = new Map2();
Vue.component('coocaa-btn', {
    template: "<div class='coocaa_btn'><slot></slot></div>",
    methods: {
        addDomRef: function(el) {
            vueDomRef.set(el, this);
        },
        removeDomRef: function(el) {
            vueDomRef.delete(el);
        }
    },
    mounted: function() {
        //关联起来，将元素与vue对象关联关系保存在全局对象中。
        this.addDomRef(this.$el, this);
    },
    destroyed: function() {
        console.log('销毁了');
        this.removeDomRef(this.$el);
    }
});

Vue.component('createimg', {
    template: "<img v-bind:src='imgsrc' v-show='showimg===showimgself' @item-click='exit'>",
    props: ['imgsrc','showimg','showimgself'],
    methods: {
    exit: function () {
      console.log("回到列表页");
    }}
})


var webapp = new Vue({
    el: '#deviceready',
    data: {
        missions: [],
        lists: [],
        firstpageshow: true,
        secondpageshow: false,
        showImg123:0,
    },

    methods: {
        exit: function() {
            console.log("退出了");
            navigator.app.exitApp();
        },
        exitImg:function(){
            console.log("回到列表页");
        },
        loadLists: function() {
            this.lists = [{
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170426/20170426200635227529.jpg"
                ],
                "question": "应用圈无法升级怎么办？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170303/20170303112728289288.jpg"
                ],
                "question": "提示“服务器又开小差了”是怎么回事？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170908/20170908150857889240.jpg"
                ],
                "question": "电视用久了卡顿怎么办？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170426/20170426200749857730.jpg"
                ],
                "question": "应用一直在“等待中”,不下载也无法取消？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170303/20170303113033907980.jpg"
                ],
                "question": "应用圈闪退、打开后白屏？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170303/20170303113117089466.jpg"
                ],
                "question": "应用安装失败？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170303/20170303145428897244.jpg"
                ],
                "question": "第三方应用使用体验问题？"
            }, {
                "answerList": [
                    "http://img.sky.fs.skysrt.com/uploads/20170303/20170303113220268547.jpg"
                ],
                "question": "各知名影视应用及其名字"
            }]
        },
        getAnswer: function(index) {
            
            this.firstpageshow = false,
            this.secondpageshow = true,
            this.showImg123 = index,
            this.handlerKeyDownEvent();
        }
    },
    watch: {
        lists: function() {
            this.handlerKeyDownEvent();
        }
    }
})