<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
    <el-radio-button :label="true">expand</el-radio-button>
    <el-radio-button :label="false">collapse</el-radio-button>
  </el-radio-group>

  <el-menu
      router unique-opened
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
  >

    <el-sub-menu index="1">
      <template #title>
        <el-icon><document /></el-icon>
        <span>预约管理</span>
      </template>
      <el-menu-item index="/Table_Order">预约列表</el-menu-item>
      <el-menu-item index="/CurSeat">座位入座情况查看</el-menu-item>
    </el-sub-menu>


    <el-sub-menu index="2">
      <template #title>
        <el-icon><User /></el-icon>
        <span>读者管理</span>
      </template>
      <el-menu-item index="/Table_Reader">读者列表</el-menu-item>
    </el-sub-menu>


  </el-menu>
</template>

<script setup>
import {
  Document, User, Grid,Tools,Histogram,Postcard
} from '@element-plus/icons-vue'//局部引用
import {ref} from "vue";

const isCollapse = ref(true)
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

//menu的数组


</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
