<template>
  <div class="c-input">
    <el-input
        v-model="input1"
        class="m-2"
        size="large"
        placeholder="输入要搜索日志的学生id"
        :prefix-icon="Search"
        @input="handleSearch"
    />
  </div>
  <div class="c-table">
    <el-table
        :data="tempData"
        :header-cell-style="{background:'#f6f9fa'}" style="width: 100%"
        @sort-change="handleSortChange"
        empty-text="暂无数据"
        @selection-change="handleSelectionChange">
      <el-table-column prop="num" label="序号"></el-table-column>
      <el-table-column prop="sno" label="操作者id"></el-table-column>
      <el-table-column prop="operationTime" label="操作时间"></el-table-column>
      <el-table-column prop="operationType" label="操作类型"></el-table-column>
      <el-table-column prop="operationDetail" label="操作内容"></el-table-column>
    </el-table>
    <!--分页组件-->
    <el-pagination
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import {onMounted, ref} from "vue";
import axios from "axios";

let allData=ref([])
onMounted(()=>{
  getAllData()
})
//获得所有数据
function getAllData(){
  axios.get("http://localhost:8080/getAllStuLog")
      .then(response=>{
        allData.value=response.data
        fetchPageData()// 更新分页数据
        total.value=allData.value.length//获得总数据条数
        //console.log(allData)
      })
      .catch(error=>[
        console.log(error)
      ])
}

//搜索
const input1=ref('')
function handleSearch(){
  if (input1.value.length>0){
    console.log("input1"+input1.value)
    axios.get("http://localhost:8080/getOneStuLog" + parseInt(input1.value))
        .then(response=>{
          allData.value=response.data
          total.value=allData.value.length//获得总数据条数
          fetchPageData();
          //console.log(response.data)
        })
        .catch(error=>{
          console.log(error)
        })
  } else {
    getAllData()
  }
}
//分页处理
const currentPage = ref(1);//当前页
const pageSize = ref(6);//每页显示多少条
const total = ref(0);//总共条数
let tempData=ref([])
//处理分页方法
function handleCurrentChange(newPage){
  console.log("newPage="+newPage)
  currentPage.value=newPage;
  console.log("currentPage="+currentPage.value)
  fetchPageData();
}
//监听页码变化
function fetchPageData() {
  const startIndex=(currentPage.value-1)*pageSize.value;//获得开始索引
  tempData.value=allData.value.slice(startIndex,startIndex+pageSize.value);//得到数据
}

//处理字段排序
function handleSortChange(sortData){
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const {prop,order}=sortData;
  // 使用 sort 方法对 tempData 数组进行排序，并更新其值
  tempData.value=tempData.value.sort((a,b)=>{
    if (order==='ascending'){
      //升序
      return a[prop]>b[prop]?1:-1;
    } else {
      return a[prop]<b[prop]?1:-1
    }
  })
}
</script>

<style scoped>
.m-2 {
  width: 300px;
}
.c-input{
  margin: 15px;
}
.c-table{
  margin:15px;
}
</style>