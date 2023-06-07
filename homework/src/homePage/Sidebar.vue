<template>
  <div class="sidebar">
    <div class="right">
      <div class="inform-box1-title">
        <img src="../assets/inform.png" alt="最新通知">
        <span style="color: white;font-size: 15px;">最新通知</span>
      </div>
      <div class="inform-box1-next">
        <span>暂无通知</span>
      </div>
      <div class="inform-box1-title">
        <img src="../assets/questions.png" alt="常见问题">
        <span style="color: white;font-size: 15px;">常见问题</span>
      </div>
      <div class="inform-box1-next">
        <table>
          <tr>
            <a href="#">关于无法进行登录</a><br>
            <a href="#">出现密码忘记等情况</a><br>
            <a href="#">关于账号被禁止登陆问题</a>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script setup>
//侧边固定栏
//

import {onMounted} from "vue";

let sidebar ;
let sidebarTop ;

onMounted(()=>{
  sidebar=document.querySelector('.sidebar');
  sidebarTop=sidebar.offsetTop;

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > sidebarTop) {

      sidebar.classList.add('fixed');
    } else {
      sidebar.classList.remove('fixed');
    }
  });
})
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.sidebar{
  display: flex;
}
.right{
  display: block;
  background-color: white;
  width: calc(100% - 85%);
  height:100%;
  float: right;
  position: fixed;
  box-sizing: border-box;

}
.inform-box1-title{
  margin-top: 10px;
  padding-bottom: 15px;
  background-color: cadetblue;
  text-align: center;

}
.inform-box1-next{
  margin-top: 3px;
  height: 100px;
  text-align: center;
  background-color: lightgoldenrodyellow;
}
.inform-box1-next a{
  text-decoration: underline;
  font-size: 7px;
  color: #000;
  text-align: left;
}
.inform-box1-title img{
  position: relative;
  top: 10px;
}
</style>