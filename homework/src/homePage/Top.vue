<template>
  <div class="top">
    <div class="title">
      <img src="../assets/library.png" alt="图书馆">
      <span style="font-size: 30px;color: white">图书馆座位管理系统</span>
    </div>
  <!--    <div class="menu">
        <a href="#">首页</a>
        <a href="#">座位预约</a>
        <a href="#">预约规则</a>
      </div>-->
    <div class="login">
      <a href="#" @click="showModal" class="nav">登录</a>
      <img src="../assets/user-pictures.png" alt="用户">
    </div>
    <!-- 模态框 -->
    <div class="modal" id="login-modal">
      <div class="modal-content">
        <div class="modal-header">
          <span class="close" @click="closeModal">&times;</span>
          <h2>Login</h2>
        </div>
        <div class="modal-body">
          <form>
            <label for="username">账号：</label>
            <input type="text" id="username" v-model="username" placeholder="请输入账号">
            <label for="password">密码：</label>
            <input type="password" id="password" v-model="password" placeholder="请输入密码">
            <button type="button" @click.prevent="login" class="btn">登录</button>
          </form>
          <span><a href="#" style="color: blue">忘记密码？</a> </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {onMounted} from "vue";

const router=useRouter();

//使用dom元素要用钩子调用 否则会出问题
let modal;
onMounted(()=>{
  modal=document.getElementById('login-modal')
})
// 获取关闭模态框的 <span> 元素
let span;
onMounted(()=>{
  span= document.getElementsByClassName("close");
})

//获取账号密码

var username=""
var password=""



// 当用户点击超链接时，显示模态框
function showModal() {
  modal.style.display = "block";
}

// 当用户点击关闭模态框的 <span> 元素时，关闭模态框
function closeModal() {
  modal.style.display = "none";
  event.stopPropagation();
}


function login(){
  if(username==='admin'&&password==='123456')
  {
    alert("登陆成功！");
    router.push('/Admin');
    modal.style.display='none';
  }
  else {
    alert("账号或密码错误！请重新输入！");
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
}
.top{

  display: flex;
  height: 70px;
  width: 100%;
  background-color: darkslategray;
  position: relative;
  z-index: 100;

  top: 0;
}
.top img{
  position: relative;
  top: 12px;
}

.login{
  float: right;
  margin-left: 840px;
  padding-top: 10px;

}
.login a{
  text-decoration: none;
  text-align: center;
  line-height: 40px;
  color: white;
  font-size: 18px;
}
/* 遮罩层样式 */
.modal {
  display: none; /* 默认隐藏 */
  position: fixed; /* 固定定位，使其覆盖其他内容 */
  z-index: 1; /* 放在最上层 */
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.4); /* 半透明背景 */
}

/* 模态框样式 */
.modal-content {
  background-color: #fff;
  margin: 10% auto; /* 上下居中 */
  padding: 20px;
  border: 1px solid #888;
  width: 30%; /* 宽度可自行调整 */
  border-radius: 5px;
}

/* 模态框头部样式 */
.modal-header {
  margin: 10px 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 关闭按钮样式 */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

/* 模态框内容样式 */
.modal-body input[type=text],
.modal-body input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
  border-radius: 5px;
}
/* 按钮样式 */
.btn {
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  text-align: center;
  cursor: pointer;
}
</style>