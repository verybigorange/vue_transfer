<template>
    <div class="transfer">
        <div class="left">
            <div class="title">
                {{titleleft}}
            </div>
            <div class="content-body">
                <slot name="search1"></slot>
                <check-block v-for="(item,index) in transferData_left" :key="item[showFlied]" :transferData="transferData_left" :parentText="item[showFlied]" :childData="item[childFlid]" :showFlied="showFlied" :childFlid="childFlid" @checkBoxChange="checkBoxChange1" @getCheckArr="getCheckArr">
                </check-block>
            </div>
            <div class="foot">

            </div>
        </div>
        <div class="center">
            <el-button class="el-icon-arrow-right toright" type="primary" :disabled="btn_toright" @click="toright"></el-button>
            <el-button class="el-icon-arrow-left toleft" type="primary" :disabled="btn_toleft" @click="toleft"></el-button>
        </div>
        <div class="right">
            <div class="title">
                {{titleright}}
            </div>
            <div class="content-body">
                <slot name="search2"></slot>
                <check-block v-for="(item,index) in transferData_right" :key="item[showFlied]" :transferData="transferData_right" :parentText="item[showFlied]" :childData="item[childFlid]" :showFlied="showFlied" :childFlid="childFlid" @checkBoxChange="checkBoxChange2">
                </check-block>
            </div>
            <div class="foot">

            </div>
        </div>
    </div>
</template>

<script>
import CheckBlock from '@/components/CheckBlock'

//取两个数组的差集
Array.prototype.diff = function(a) {
    return this.filter(function(i) { return a.indexOf(i) < 0; });
};
//简单的深拷贝,未完成，后面更新
function deepclone(obj) {
    var newobj = {}
    for (var key in obj) {
        if (Object.prototype.toString.call(obj[key]).slice(8, -1).toLocaleLowerCase() == "object") {

        }
        else if (Object.prototype.toString.call(obj[key]).slice(8, -1).toLocaleLowerCase() == "array") {
            var arr = [];
            for (var i = 0; i < obj[key].length; i++) {
                arr[i] = obj[key][i]
            }
            newobj[key] = arr;
        }
        else {
            newobj[key] = obj[key]
        }
    }
    return newobj
}

export default {
    components: {
        CheckBlock
    },
    props: {
        //左边的title
        titleleft: {
            type: String,
            default: function() {
                return ""
            }
        },
        //右边的title
        titleright: {
            type: String,
            default: function() {
                return ""
            }
        },
        //穿梭框左边的数据
        transferData_left: {
            type: Array,
            default: function() {
                return []
            }
        },
        //穿梭框右边的数据
        transferData_right: {
            type: Array,
            default: function() {
                return []
            }
        },
        //穿梭框需要显示的字段
        showFlied: {
            type: String,
            default: function() {
                return "text"
            }
        },
        //子字段的名字
        childFlid: {
            type: String,
            default: function() {
                return "children"
            }
        },
        //回调的请求事件
        callback: {
            type:Function,
            default:function(){}
        }

    },
    data() {
        return {
            //左边选中的
            checkBlock1: [],
            //右边边选中的
            checkBlock2: [],
            //所有被选中的值
            allChecked: []

        }
    },
    computed: {
        //向右的按钮状态
        btn_toright() {
            return !this.checkBlock1.length > 0;
        },
        //向左的按钮状态
        btn_toleft() {
            return !this.checkBlock2.length > 0;
        },

    },
    methods: {
        // 监听左边选框改变事件
        checkBoxChange1(val) {
            
           this.handleCheckData(this.checkBlock1, val)

        },
        // 监听右边选框改变事件
        checkBoxChange2(val) {
            if(val) this.handleCheckData(this.checkBlock2, val)
        },
        //处理选框数据
        handleCheckData(oldarr, newval) {
            let tag = true;
            let i = 0;
            for (let item of oldarr) {
                //找到相同的父
                if (item[this.showFlied] == newval[this.showFlied]) {
                    //如果返回的数据没有选中的，则在选框中移除有关的所有信息
                    if (newval[this.childFlid].length == 0) {
                        oldarr.splice(i,1);
                    }else{
                        item[this.childFlid] = newval[this.childFlid];
                    }

                    tag = false
                    break;
                }
                i++;
            }
            //选框中不存在父信息，直接直接添加进去
            if (tag) {
                oldarr.push(newval);
            }
        },
        //删除当前数据，添加到对面选框,参数1：选中的数据，参数2：需要删除的数组，参数3：需要增加的数组。
        moveData(checkData, delArr, addArr) {

            for (let i = 0; i < checkData.length; i++) {
                let name = checkData[i][this.showFlied];
                let check = checkData[i];

                //处理被删除的数组
                for (let j = 0; j < delArr.length; j++) {
                    let del = delArr[j]
                    //找到父，比较子
                    if (name === del[this.showFlied]) {
                        //取子的差集
                        let diffArr = del[this.childFlid].diff(check[this.childFlid]);
                        if (diffArr.length == 0) {
                            delArr.splice(j, 1);
                        } else {
                            del[this.childFlid] = diffArr;
                        }
                        break;
                    }
                }

                //处理被添加的数组
                let flag = true;
                for (let k = 0; k < addArr.length; k++) {
                    let add = addArr[k];
                    //如果有父亲，则直接添加子
                    if (name === add[this.showFlied]) {

                        let newArr = add[this.childFlid].concat(check[this.childFlid]);
                        add[this.childFlid] = []
                        for (let i of newArr) {
                            add[this.childFlid].push(i)
                        }
                        flag = false
                        break;
                    }
                }
                //没有父级，则把整个选中字段添加过去
                if (flag) {
                    addArr.push(deepclone(check))
                }


                //处理选中数组
                for (let i = 0; i < this.allChecked.length; i++) {
                    let ck = this.allChecked[i]
                    if (name === ck[this.showFlied]) {
                        for (let k = 0; k < check[this.childFlid].length; k++) {
                            let child = check[this.childFlid][k];
                            //找到需要删除的元素并且删除
                            let index = ck.checked.indexOf(child[this.showFlied]);
                            ck.checked.splice(index, 1);
                            if (ck.checked.length == 0) {
                                this.allChecked.splice(i, 1);
                            }
                        }
                        break;
                    }
                }
            }
            //把需要删除的列表清空
            checkData.splice(0,checkData.length);

            //移动数据后促发回调函数
            this.callback()
        },
        //点击向右的按钮
        toright() {
            this.moveData(this.checkBlock1, this.transferData_left, this.transferData_right)
        },
        toleft() {
            this.moveData(this.checkBlock2, this.transferData_right, this.transferData_left)
        },
        //获取选中的数组值
        getCheckArr(obj) {
            let i = 0;
            let tag = true
            for (let item of this.allChecked) {
                if (item[this.showFlied] === obj[this.showFlied]) {
                    this.allChecked.splice(i, 1, obj);
                    tag = false;
                    break;
                }
                i++
            }
            if (tag) this.allChecked.push(obj)
        }

    }

}





</script>

<style scoped>
.transfer {
    width: 625px;
    margin: 0 auto;
}

.transfer:after {
    content: "";
    clear: both;
    height: 0;
}

.left,
.center,
.right {
    float: left;
    box-sizing: border-box;
}

.left,
.right {
    width: 270px;
    height: 400px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    border: 1px solid #d1dbe5;
}

.center .toright,
.center .toleft {
    width: 45px;
    height: 30px;
    border-radius: 4px;
    margin: 5px 20px;
    display: block;
}

.transfer .center {
    margin-top: 150px;
}

.transfer .title {
    height: 36px;
    line-height: 36px;
    background: #fbfdff;
    padding-left: 20px;
    border-bottom: 1px solid #d1dbe5;
}

.transfer .content-body {
    height: 328px;
    overflow-y: auto;
    box-sizing: border-box;
    padding: 10px 20px;
}

.transfer .foot {
    height: 36px;
    line-height: 36px;
    padding-left: 20px;
    border-top: 1px solid #d1dbe5;
}
</style>