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
      <el-menu-item index="/CurSeat">座位入座查看</el-menu-item>
    </el-sub-menu>


    <el-sub-menu index="2">
      <template #title>
        <el-icon><Postcard /></el-icon>
        <span>读者管理</span>
      </template>
      <el-menu-item index="/Table_Reader">读者列表</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><Grid /></el-icon>
        <span>座位管理</span>
      </template>
      <el-menu-item index="/Hello">座位列表</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="4">
      <template #title>
        <el-icon><User /></el-icon>
        <span>个人中心</span>
      </template>
      <el-menu-item index="/Hello">个人信息修改</el-menu-item>
    </el-sub-menu>


    <!--进行系统配置和管理，例如设置开放时间、规则、通知-->
    <el-sub-menu index="5">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>系统设置</span>
      </template>
      <el-menu-item index="/SettingRules">设置预定规则</el-menu-item>
      <el-menu-item index="/SettingMessages">设置阅览室通知</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="7">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>操作日志管理</span>
      </template>
      <el-menu-item index="/AdminOperationLog">管理员操作日志</el-menu-item>
      <el-menu-item index="/StuOperationLog">学生操作日志</el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="8">
      <template #title>
        <el-icon><Tools /></el-icon>
        <span>学生评价与反馈</span>
      </template>
      <el-menu-item index="/stuopinion">学生评价与反馈 </el-menu-item>
    </el-sub-menu>

    <el-sub-menu index="6">
      <template #title>
        <el-icon><Histogram /></el-icon>
        <span>统计分析</span>
      </template>
      <el-menu-item index="/Chart">统计分析表</el-menu-item>
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
