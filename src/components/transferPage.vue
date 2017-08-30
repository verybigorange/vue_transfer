<template>
    <div>
        <transfer 
            :transferData_left = "transferData_left"
            :transferData_right = "transferData_right" 
            showFlied="text" 
            childFlid="children" 
            titleleft="列表1" 
            titleright="列表2"
            :callback="callback">
             <el-input
                    slot = "search1"
                    placeholder="请输入搜索内容"
                    icon="search"
                    v-model="search1"
                    :on-icon-click="search1Click">
            </el-input>
             <el-input
                    slot = "search2"
                    placeholder="请输入搜索内容"
                    icon="search"
                    v-model="search2"
                    :on-icon-click="search2Click">
            </el-input>
        </transfer>
    </div>
</template>

<script>
import transfer from '@/components/transfer'
    export default {
        beforeMount(){
         let data = [{
                    "children": [{
                            "id": "cbbaef4333b548ecbb32b7fd13dae0a1",
                            "text": "默认"
                        },
                        {
                            "id": "bcacd50a1fc147799e04c833a0d892b8",
                            "text": "刪除"
                        },
                        {
                            "id": "dd6d1fadd38040ca944caba4c1cc6503",
                            "text": "修改"
                        },
                        {
                            "id": "b426745673ec40adb93d7cbff6db0b8c",
                            "text": "查看"
                        },
                        {
                            "id": "701e9e1eb3ff43cb9dda390bdf82ea4a",
                            "text": "添加"
                        },
                        {
                            "id": "48b00cfa20974943b21ada21ad25e97d",
                            "text": "发布"
                        },
                        {
                            "id": "2a200cf6807841118daf0193d443c618",
                            "text": "撤回"
                        },
                        {
                            "id": "0ed206e15deb418dbf75e15cf329f89b",
                            "text": "下载"
                        }
                    ],
                    "text": "公文发布",
                    "id": "aed53ff0e486477d88752b4de1339748"
                },
                {
                    "children": [
                    ],
                    "text": "test",
                    "id": "cb5697d5457e8afb2cf799ddef50"
                },
                {
                    "children": [{
                            "id": "df35ed8a5e15436aa7fb43fc2b357f33",
                            "text": "默认"
                        },
                        {
                            "id": "f7cfb07c5bad469fb21229ca3fc86c66",
                            "text": "修改"
                        },
                        {
                            "id": "8f72105a1d4e43ca9e73c9158f5a7394",
                            "text": "查看"
                        },
                        {
                            "id": "6650c234a8fd4a458504addb607beaa6",
                            "text": "提交"
                        },
                        {
                            "id": "777c4e32de054a20be1e6744b573b4b1",
                            "text": "添加"
                        },
                        {
                            "id": "80b397d3062b4d6286beb6ef65bc1f5c",
                            "text": "发布"
                        }
                    ],
                    "text": "三小巡查",
                    "id": "cbb27e5697d5457e8afb2cf799ddef50"
                },
                {
                    "children": [
                    ],
                    "text": "test1",
                    "id": "cb5697d5457e8afb2cf799ddef50"
                },
            ]

            this.transferData_left = data;
        },
        components:{
            transfer
        }
        ,data(){
            return {
                search1:"",
                search2:"",
                transferData_left:[],
                transferData_right:[],
                //可以在回调函数中进行提交操作以及数据操作。
                callback:function () {
                    console.log(this.transferData_left)
                    console.log(this.transferData_right)
                }
            }
        },
        methods:{
            search1Click(){

            },
            search2Click(){

            }
        },
    }
</script>

<style scoped>
</style>