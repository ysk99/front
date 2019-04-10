<template>
    <v-app id="app">
      <!-- <v-container> -->
        <!-- <v-layout align-end justify-end row wrap pt-0>
          <v-flex xs12 md12 lg12 class="text-xs-right">
            <router-link to="/">首页</router-link> |
            <router-link to="/douban">豆瓣TOP250</router-link>
          </v-flex>
        </v-layout> -->
        <router-view v-if="isRouterAlive"/>
    <!-- </v-container> -->
    <v-footer
   height="auto"
 >
   <v-layout
     justify-center
     row
     wrap
   >
     <!-- <v-btn
       v-for="link in links"
       :key="link"
       color="white"
       flat
       round
     >
       {{ link }}
     </v-btn> -->
     <v-flex
       py-1
       white
       text-xs-center
       black--text
       xs12
     >
     <!-- <share :config="config"></share> -->
     <p class="footertext" pr-1>本站资源更新于{{date}}</p>
     </v-flex>
     <v-flex
       white
       py-1
       text-xs-center
       black--text
       xs12
     >
       <a class="footertext">本站提供优质影视聚合搜索服务，不提供任何资源存储服务</br>&copy;2019 — <strong>爱影影视搜索</strong></a>
     </v-flex>
   </v-layout>
 </v-footer>
    </v-app>
</template>
<script>
import { formatDate } from '@/utils/date.js'
  export default {
    provide (){
      return {
        reload: this.reload
      }
    },
    data: () => ({
      date:'',
      isRouterAlive: true,
      // config:{
      //   url                 : 'http://iying.online', // 网址，默认使用 window.location.href
      //   // source              : '', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
      //   title               : '爱影聚合——全网影视搜索神器', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
      //   description         : '一个聚合式影视搜索网站，更新快、资源好，欢迎分享使用', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
      //   // image               : '', // 图片, 默认取网页中第一个img标签
      //   sites               : ['wechat', 'weibo', 'qq', 'douban'], // 启用的站点
      //   // disabled            : [],
      //   wechatQrcodeTitle   : '微信扫一扫：分享', // 微信二维码提示文字
      //   wechatQrcodeHelper  : '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      // },
      icons: [
        'fab fa-facebook',
        'fab fa-twitter',
        'fab fa-google-plus',
        'fab fa-linkedin',
        'fab fa-instagram'
      ]
    }),
    mounted() {
     // 获取当前日期，函数从date.js 引入
     this.date = formatDate(new Date(), 'yyyy-MM-dd')
   },
   methods: {
     reload (){
       this.isRouterAlive = false
       this.$nextTick(function(){
         this.isRouterAlive = true
       })
     }
   }
  }
</script>
<style lang="stylus" scope>
#app
  background: #fff
#container
  max-width: 550px
  padding: 8px
</style>
<style scope>
.footertext{font-size:12px;color:#4d555d;}
.navclass{height: 25px;}
</style>
