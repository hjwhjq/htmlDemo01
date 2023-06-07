<template>
<!--  <canvas id="myChart"></canvas>-->
  <div class="m-4">
    <div >
      <el-cascader v-model="value" :options="options1" @change="handleChange1" size="large"></el-cascader>
    </div>
    <div>
<!--      给出意见类型，以免用户在输入时导致不匹配而出错-->
      <el-cascader v-if="show" v-model="value" :options="options2" @change="handleChange2" size="large"></el-cascader>
    </div>
  </div>

<!--  第一个表格：意见类型和其数量-->
  <el-table
      v-if="isVisible1"
      :data="tempData"
      :header-cell-style="{background:'#f6f9fa'}" style="width: 100%"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange">
    <el-table-column prop="num"  label="序号" width="70px"></el-table-column>
    <el-table-column prop="sno" label="提意见学生id" width="130px"></el-table-column>
    <el-table-column prop="type" label="意见类型" width="170px"></el-table-column>
    <el-table-column prop="date" label="意见提出时间" width="250px"></el-table-column>
    <el-table-column prop="content" label="意见具体内容"></el-table-column>
  </el-table>

<!--  第二个表格：所有的意见，包括其详细的信息-->
  <el-table
      v-else-if="isVisible2"
      :data="tempData"
      :header-cell-style="{background:'#f6f9fa'}" style="width: 100%"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange"
      >
    <el-table-column prop="type"  label="意见类型"></el-table-column>
    <el-table-column prop="count" label="提意见人数" sortable></el-table-column>
  </el-table>


<!--  第三个表格:某一个意见类型的具体内容-->
  <el-table
      v-else
      :data="tempData"
      :header-cell-style="{background:'#f6f9fa'}" style="width: 100%"
      @sort-change="handleSortChange"
      empty-text="暂无数据"
      @selection-change="handleSelectionChange">
    <el-table-column prop="type" label="意见类型" width="200px"></el-table-column>
    <el-table-column prop="date" label="意见提出时间" width="250px"></el-table-column>
    <el-table-column prop="content" label="意见具体内容"></el-table-column>
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

</template>

<script setup>
import {onMounted, ref} from 'vue';
import axios from "axios";
import axiosInstance from "../axiosInstance.js";

let dataList=ref([]);//用来存储意见类型和其数量

//查看所有意见信息
onMounted(()=>{
  getAllData()
})
function getAllData(){
  axios.get("http://localhost:8080/stuopinion/getAllTable")
      .then(response=>{
        Data.value=response.data
        fetchPageData()// 更新分页数据
        total.value=Data.value.length//获得总数据条数
        //console.log(allData)
      }).catch(error=>{
    console.log(error)
  })
}
//查看所有的意见信息，包括意见时间，意见序号，意见人，意见类型，意见内容等

//处理第一个下拉框，用法为选择查看方式
// const value1=ref([])
let isVisible1=true
let isVisible2=false
let show=ref(false)//如果选择查看某一意见类型的所有内容，显示第二个下拉框
const handleChange1=(value1)=>{
  //console.log(options1)
  //console.log(value1.toString())
  //console.log(options1[0].value)
  if (value1.toString()===options1[0].value){
    show.value=false//第二个下拉框不显示
    isVisible1=true
    isVisible2=false
    getAllData()
  } else if (value1.toString()===options1[1].value){
    show.value=false//第二个下拉框不显示
    isVisible1=false
    isVisible2=true
    axios.get("http://localhost:8080/stuopinion/getTableData")
        .then(response=>{
          // dataList.value=response.data
          Data.value=response.data
          fetchPageData()// 更新分页数据
          total.value=Data.value.length//获得总数据条数
          console.log(dataList)
        }).catch(error=>{
      console.log(error)
    })
  }else {//查看某一意见类型的所有内容
    show.value=true
    isVisible1=false
    isVisible2=false
  }
}
const options1=[
  {
    value:'查看所有意见信息',
    label:'查看所有意见信息',
  },
  {
    value: '查看各意见信息人数',
    label: '查看各意见信息人数',
  },
  {
    value: '查看某一意见类型的所有内容',
    label: '查看某一意见类型的所有内容',
  },
]

//处理第二个下拉框，用法为，选择具体的意见类型，查看其具体内容
//根据传递的参数：意见类型，来查询
const handleChange2=(val)=>{
  console.log(val.toString())
  axios.get("http://localhost:8080/stuopinion/getTableDetail"+val.toString())
      .then(response=>{
        // console.log(response.data)
        // certainData.value=response.data
        Data.value=response.data
        fetchPageData()// 更新分页数据
        total.value=Data.value.length//获得总数据条数
      })
      .catch(error=>{
        console.log(error)
      })
}
const options2=[
  {
    value:'图书馆藏书',
    label:'图书馆藏书',
  },
  {
    value: '学习空间和设施',
    label:'学习空间和设施',
  },
  {
    value: '图书馆开放时间',
    label: '图书馆开放时间',
  },
  {
    value: '图书馆环境',
    label: '图书馆环境',
  },
  {
    value: '图书馆开放时间',
    label: '图书馆开放时间',
  },
  {
    value: '图书馆服务质量',
    label: '图书馆服务质量',
  },
  {
    value: '预定系统的易用性',
    label: '预定系统的易用性',
  },
  {
    value: '预定规则的公平性',
    label: '预定规则的公平性',
  },
  {
    value: '预定座位的灵活性',
    label: '预定座位的灵活性',
  },
  {
    value: '座位分配的合理性',
    label: '座位分配的合理性',
  },
  {
    value: '座位预定的公告和通知',
    label: '座位预定的公告和通知',
  },
  {
    value: '预定系统的可靠性',
    label: '预定系统的可靠性',
  },
  {
    value: '座位设施和设备',
    label: '座位设施和设备',
  },
  {
    value: '座位预定的限制和滥用',
    label: '座位预定的限制和滥用',
  },
  {
    value: '座位环境的安静程度',
    label: '座位环境的安静程度',
  },
]


//处理分页
const currentPage = ref(1);//当前页
const pageSize = ref(10);//每页显示多少条
const total = ref(0);//总共条数
let tempData=ref([])
//因为该组件中涉及到3张表，而监听页码变化的方法中又涉及到数据的获取，所以我们这里用一个Data来根据选择来获取三张表中的某一个
let Data=ref([])
function handleCurrentChange(newPage){
  console.log("newPage="+newPage)
  currentPage.value=newPage;
  console.log("currentPage="+currentPage.value)
  fetchPageData();
}
//监听页码变化
function fetchPageData() {
  const startIndex=(currentPage.value-1)*pageSize.value;//获得开始索引
  tempData.value=Data.value.slice(startIndex,startIndex+pageSize.value);//得到数据
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
// onMounted(() => {
//   const ctx = document.getElementById('myChart');
//   ctx.width=400;
//   ctx.height=200;
//   const labels = ['图书馆藏书','学习空间和设施','图书馆开放时间','图书馆环境','图书馆服务质量',
//     '预定系统的易用性','预定规则的公平性','预定座位的灵活性','座位分配的合理性','座位预定的公告和通知',
//     '预定系统的可靠性','座位设施和设备','座位预定的限制和滥用','座位环境的安静程度'];
//   const data = {
//     labels: labels,
//     datasets: [{
//       label: '学生意见类型统计分析',
//       data: [14, 15, 20, 34, 12, 50, 43, 30, 31, 47, 11, 17, 31, 45],
//       backgroundColor: 'rgba(153, 102, 255, 0.2)',
//       borderWidth: 1
//     }]
//   };
//   const config = {
//     type: 'bar',// 指定图表类型为条形图
//     data: data,// 指定图表的数据
//     options: {
//       scales: {//配置图表的刻度轴
//         y: {
//           beginAtZero: true// Y轴从零开始显示
//         }
//       },
//       legend:{
//         display:true,// 显示图例
//         position:'top',// 图例位置（可选值：top, bottom, left, right）
//         labels:{
//           fontColor:'black',
//           fontSize:12
//         }
//       },
//     }
//   };
//   new Chart(ctx, config);
// });

</script>

<style scoped>
.m-4{
  display: flex;
  justify-content: space-around;
  margin: 15px;
}
</style>