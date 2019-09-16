<template>
    <div id="app">
        <!-- <vueCanvasNest :config="{color:'0,0,0',opacity:1}"></vueCanvasNest> -->
        <NavHeader v-if="isEditor">
            <div slot="web">
                <ul class="nav navbar-nav">
                    <li v-for="item in list" v-bind:key="item.id">
                        <router-link class="text-right" v-bind:to="item.link">{{ item.text }}</router-link>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    <li><router-link v-if="!isLogin" to="/Login" class="login-item">登录</router-link></li>
                    <li><router-link v-if="!isLogin" class="login-item border-white" to="/SignUp">注册</router-link></li>
                    <li><UserOperation v-if="isLogin" ></UserOperation></li>
                </ul>
            </div>
        </NavHeader>
        <AddTags></AddTags>
        <div class="container-fluid"><router-view/></div>
        <NavFooter v-if="isEditor" class="hidden-xs hidden-sm"></NavFooter>
    </div>
</template>

<script>
import NavHeader from './components/NavHeader'
import NavFooter from './components/NavFooter'
import vueCanvasNest from 'vue-canvas-nest'
import Login from './components/Login'
import EditOnline from './components/EditOnline'
import UserOperation from './components/userOperation'
import AddTags from './components/addTags'

export default {
  name: 'App',
  components: {
    NavHeader,
    NavFooter,
    vueCanvasNest,
    Login,
    EditOnline,
    UserOperation,
    AddTags
  },
  data() {
      return {
          list: [
              {id: 0, text: "编辑", link: '/EditOnline'},
              {id: 1, text: "其他",link: '/Other'},
              {id: 2, text: "关于", link: '/personal'}
          ]
      }
  },
  computed: {
      isLogin() {
          return this.$store.getters.certainLogin;
      },
      isEditor() {
          console.log(this.$store.getters.isEdit)
          return this.$store.getters.isEdit;
      }
  }
}
</script>
<style lang="scss" type="text/css">
    @import '~@/assets/css/index';
</style>


