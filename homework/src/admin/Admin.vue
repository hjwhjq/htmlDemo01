<script setup>
import Menu from '../components/Menu.vue'
import Title from '../components/Title.vue'
import Photo from "../components/Photo.vue";
import MenuCheak from "../components/MenuCheak.vue";
</script>

<template>
  <el-container class="container">
    <el-aside className="sidebar">
      <div class="photo">
        <Photo/>
      </div>
      <div class="menu">
        <Menu/>
      </div>
    </el-aside>
    <el-container>
      <el-header>
        <Title/>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>


</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.container {
  /*background-color: pink;*/
  /*flex-direction: row;*/
  height: 100vh;
}

.photo {
  margin: 15px 12px 0 0;
}
</style>
