<template>
  <div class="container">
    <div class="change-form">
      <div>
        <el-input v-model="sname" placeholder="请输入姓名搜索"
                  @input="handleSearchName" :prefix-icon="Search" >
        </el-input>
        <el-button type="primary" :icon="Plus" @click="handleAdd"
                   style="margin-left: 20px;">添加数据</el-button>
        <el-button type="danger" :icon="Delete" @click="handleDelList"
                   v-if="multipleSelection.length>0">删除选中数据</el-button>
      </div>

      <hr>
      <div class="table">

        <!--el-table数据表格组件-->
        <el-table
            :data="displayedItems"
            :header-cell-style="{ background: '#f6f9fa'}" style="width: 100%"
            @sort-change="handleSortChange"
            empty-text="暂无数据"
            @selection-change="handleSelectionChange">
          <el-table-column type="selection"/>
          <!--el-table-column列-->
          <el-table-column prop="id" label="学号"  sortable/>
          <el-table-column prop="name" label="姓名"  />
          <el-table-column prop="gender" label="性别" />
          <el-table-column prop="college" label="学院" />
          <el-table-column label="操作" min-width="180">
            <template #default="{ row }">
              <el-button type="primary" size="small" icon="Edit"
                         @click="handleEdit(row)">编辑</el-button>
              <el-button type="danger" size="small" :icon="Delete"
                         @click="handleDel(row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--页码-->
        <el-pagination
            background
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
        />
      </div>

      <!--对话框-->
      <el-dialog v-model="dialogFormVisible" :title="dialogTitle">
        <el-form :model="tableform">
          <el-form-item label="学号" :label-width="100">
            <el-input v-model="tableform.id" autocomplete="off" style="width: 250px"/>
          </el-form-item>
          <el-form-item label="姓名" :label-width="100" >
            <el-input v-model="tableform.name" autocomplete="off" style="width: 250px"/>
          </el-form-item>
          <el-form-item label="性别" :label-width="100" >
            <el-select v-model="tableform.gender" placeholder="请输入要添加的学生的性别" style="width: 250px">
              <el-option
                  v-for="item in genders"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="学院" :label-width="100">
            <el-select v-model="tableform.college" placeholder="请输入预定信息学生的学院" style="width: 250px">
              <el-option
                  v-for="item in colleges"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
              />
            </el-select>
          </el-form-item>

        </el-form>
        <template #footer>
    <span class="dialog-footer">
      <el-button type="primary" @click="dialogOk">
        确定
      </el-button>
    </span>
        </template>
      </el-dialog>

    </div>
  </div>
</template>



<script setup>
import {ref, reactive, computed} from "vue";//响应式
import { ElMessageBox, ElMessage } from 'element-plus'
import {Plus,Edit,Delete,Search} from "@element-plus/icons-vue";

const colleges=[
  {
    value: '软件学院',
    label: '软件学院',
  },
  {
    value: '美术学院',
    label: '美术学院',
  },
  {
    value: '土木学院',
    label: '土木学院',
  },
  {
    value: '旅游管理学院',
    label: '旅游管理学院',
  },
  {
    value: '预科学院',
    label: '预科学院',
  }]

const genders=[
  {
    label:'男',
    value:'男'
  },
  {
    label: '女',
    value: '女'
  }
]
const readerInfo=reactive([
  {id:20210001,name:'张三',college:'软件学院',gender: '男'},
  {id:20210002,name:'李四',college:'软件学院',gender: '男'},
  {id:20210003,name:'王五',college:'软件学院',gender: '男'},
  {id:20210004,name:'甜甜',college:'美术学院',gender: '女'},
  {id:20210005,name:'阿兰',college:'土木学院',gender: '女'},
  {id:20210006,name:'王七',college:'美术学院',gender: '女'},
  {id:20210007,name:'阿兰',college:'软件学院',gender: '女'},
  {id:20210008,name:'娜娜',college:'软件学院',gender: '女'},
  {id:20210009,name:'小天',college:'软件学院',gender: '男'},
  {id:20210010,name:'阿南',college:'软件学院',gender: '男'},
  {id:20210011,name:'俊尼',college:'美术学院',gender: '男'},
  {id:20210012,name:'窝努',college:'土木学院',gender: '男'},
])
let currentPage = 1;// 定义当前页码初始值为1
const pageSize = 10;// 定义每页显示的数据条数为10
let total = ref(readerInfo.length);// 初始化数据总条数
let displayedItems = ref(readerInfo.slice(0, pageSize));//初始化当前页显示数据

// 存储当前页数据副本，方便清空搜索框还原当前页数据，副本哈哈
let itemsCopy = displayedItems.value;
let sname=ref('')

//初始化弹窗
const dialogFormVisible=ref(false)//初始化弹窗不可见
let tableform=ref({})//初始化弹窗表格数据
let dialogType=ref('add')//初始化弹窗类型为增加
const dialogTitle = computed(() => {//设置弹窗的标题
  return dialogType.value === 'add' ? '新增数据' : '编辑数据'
})

//页码单击事件
function handleCurrentChange(newPage) {
  currentPage=newPage
  const startIndex=(newPage-1)*pageSize
  displayedItems.value=readerInfo.slice(startIndex,startIndex+pageSize)
  itemsCopy=displayedItems.value
}



function handleEdit(row) { // row 为当前行的数据
  dialogFormVisible.value=true
  tableform.value={...row}
  dialogType.value='edit'
}

const delrow = (row) => { // 定义一个函数，用于删除某行数据
  let index=null;
  if(currentPage===1)
  {
    index=displayedItems.value.findIndex(item=>item.id===row.id)
  }
  else
  {
    index=displayedItems.value.findIndex(item=>item.id===row.id)+(currentPage-1)*10
  }
  readerInfo.splice(index,1)
  total.value=total.value-1
  handleCurrentChange(currentPage)
}

function handleDel(row) {
  ElMessageBox.confirm("此操作~","提示",{
    confirmButtonText:"确定",
    cancelButtonText:"取消",
    type:"warning"
  }).then(()=>{
    delrow(row)
    ElMessageBox.succsee("删除成功")
  }).catch(()=>{
    ElMessageBox.info("已取消")
  })
}

function handleAdd(){
  dialogFormVisible.value=true
  tableform.value={}
  dialogType.value='add'
}
const dialogOk=()=>{
  dialogFormVisible.value=false
  if(dialogType.value==='add'){
    readerInfo.push({
      ...tableform.value
    })
    total.value=readerInfo.length
    displayedItems.value=readerInfo.splice(0,pageSize)
  }
  else {
    let index=displayedItems.value.findIndex(item=>item.id===tableform.value.id)
    displayedItems.value[index]=tableform.value
  }
}

// 定义 handleSortChange 方法，接收 sortData 参数
const handleSortChange = (sortData) => {
  // 解构 sortData 参数，得到 prop 和 order 两个属性
  const { prop, order } = sortData;
  // 使用 sort 方法对 displayedItems 数组进行排序，并更新其值
  displayedItems.value = displayedItems.value.sort((a, b) => {
    if (order === 'ascending') { // 升序排序
      return a[prop] > b[prop] ? 1 : -1;
    } else { // 降序排序
      return a[prop] < b[prop] ? 1 : -1;
    }
  });
}


const handleSearchName=(val)=>{
  if(val.length>0){
    displayedItems.value=readerInfo.filter(items=>items.name.match(val))
  }
  else {
    displayedItems.value=itemsCopy
  }
}

// 创建响应式变量multipleSelection，用于存储当前选中的数据行
let multipleSelection = ref([])
// 处理表格行选中状态变化的方法，val是当前选中的数据行数组
const handleSelectionChange = (val) => {
  multipleSelection.value=[]
  val.forEach(item=>{
    multipleSelection.value.push(item)
  })
}
const handleDelList = () => {
  ElMessageBox.confirm("此操作~","提示",{
    confirmButtonText:"确定",
    cancelButtonText:"取消",
    type:"warning"
  }).then(()=>{
    multipleSelection.value.forEach(item=>{
      delrow(item)
    })
    ElMessageBox.succsee("删除成功")
  }).catch(()=>{
    ElMessageBox.info("已取消")
  })
}






</script>

<style>
template{
  text-align: center;
}
.container{
  text-align: center;
  align-content: center;
}
.table{
  display: flex;
  width: 100%;
  text-align: center;
}
table {
  width: 100%;
  margin: 0 auto;
  text-align: center;
}
.change-form {
  width: 100%;
}
el-pagination {/*选择分页组件，默认采取Flex布局*/
  justify-content: center;/*水平方向居中对齐*/
  margin-top: 8px;
}
.topTool{
  display: flex;justify-content: space-between;margin-bottom: 8px;
}

</style>