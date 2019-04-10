<template>
    <v-layout align-end justify-end row wrap pt-0 v-if="isMobile">
      <v-flex xs12 md12 lg12 class="text-xs-right">
        <router-link to="/">首页</router-link> |
        <router-link to="/douban">豆瓣TOP250</router-link> |
        <router-link to="/maoyan">猫眼TOP100</router-link> |
        <router-link to="/vipjx">VIP在线解析</router-link>
      </v-flex>
    </v-layout>
    <Slide right v-else>
          <a id="home" @click="gorouter('home')">
            <span>首页</span>
          </a>
          <a id="douban" @click="gorouter('Douban')">
            <span>豆瓣TOP250</span>
          </a>
          <a id="maoyan" @click="gorouter('Maoyan')">
            <span>猫眼TOP100</span>
          </a>
          <a id="vipjx" @click="gorouter('Vipjx')">
            <span>VIP在线解析</span>
          </a>
        </Slide>
</template>
<script>
import { Slide } from 'vue-burger-menu'
export default {
  name: 'Navbar',
  components: {
        Slide // Register your component
    },
   data(){
         return{
           isMobile:true
         }
     },
     created(){
       if(document.documentElement.clientWidth<=800){
         this.isMobile=false
       }
       console.log(document.documentElement.clientWidth)
     },
     methods: {
       gorouter(url){
         this.$router.push({ name: url})
       }
     }
 }
</script>
