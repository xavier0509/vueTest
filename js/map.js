if(typeof Map2 == 'undefined'){

!(function (window) {

    function Map() {
        var map = function(key, value) {//键值对
            this.key = key;
            this.value = value;
        }
        var set = function(key, value) {//添加键值对
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].key === key) {
                    this.arr[i].value = value;
                    return;
                }
            }
            this.arr[this.arr.length] = new map(key, value);
        }
        var remove = function(key) {//删除key="key"的键值对，返回value值
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].key === key) {
                    return this.arr.splice(i, 1);
                }
            }
            return null;
        }
        var getKey = function(value) {//返回key对应的value值
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].value === value)
                    return this.arr[i].key;
            }
            return null;
        }
        var get = function(key) {//返回value对应的key值
            for (var i = 0; i < this.arr.length; i++) {
                if (this.arr[i].key === key)
                    return this.arr[i].value;
            }
            return null;
        }
        var getSize = function() {//返回容器大小
            return this.arr.length;
        }
        var show = function() {//打印容器内容
            var string = "";
            for (var i = 0; i < this.arr.length; i++) {
                string += (this.arr[i].key + ":" + this.arr[i].value + "\n");
            }
            alert(string);
        }
        this.arr = new Array();
        this.delete = remove;
        this.set = set;
        this.get = get;
        this.getSize = getSize;
    }

    window.Map2 = Map;
})(window);
}