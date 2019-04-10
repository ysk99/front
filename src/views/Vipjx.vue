<template>
  <v-container>
    <!-- <navbar></navbar> -->
    <navbar></navbar>
    <v-layout align-start justify-center row wrap pt-3>
      <v-flex xs12 lg3 md2 class="text-xs-center">
        <v-layout align-start justify-center row wrap>
          <v-flex xs12 lg7 md3></v-flex>
          <v-flex xs12 lg5 md9 class="text-xs-center">

          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs9 lg5 md6>
        <v-text-field
            label="输入视频地址"
            placeholder="https://www.iqiyi.com/v_19rsi5tllg.html"
            v-model="videourl"
            clearable
            outline
          ></v-text-field>
        </v-flex>
      <v-flex xs12 lg4 md3>
        <v-layout align-start justify-center row wrap>
          <v-flex xs12 lg4 md5 class="text-xs-center">
            <v-btn color="info" type="button" :input-value="isJiexi" @click="jiexi">解析</v-btn>
          </v-flex>
          <v-flex xs12 lg8 md7>
          </v-flex>
        </v-layout>

      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row wrap pt-0>
      <v-flex xs12 md12 lg12 class="text-xs-center">
        共有<a class="highlight">{{jk_list.length}}</a>个接口，当前为第<a class="highlight">{{ k }}</a>个接口，若无法观看？ 点我->
        <v-btn color="warning" small type="button" @click="change_api">一键切换接口</v-btn>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row wrap pt-0>
      <v-flex xs12 md10 lg10 class="text-xs-center">
        <vue-friendly-iframe :src="websitehref" ></vue-friendly-iframe>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row wrap pt-1 >
      <v-flex xs12 md10 lg8 class="text-xs-center shuoming1">
        <p>第 一 步 进入各大视频网站，找到想要观看的VIP视频vip会员，然后复制链接（浏览器上的视频地址）</p>
        <p>第 二 步 将复制的链接粘贴到本站播放地址，并点击开始解析</p>
        <p>第 三 步 等待解析完成，即可免费观看VIP视频vip会员</p>
      </v-flex>
    </v-layout>
    <v-layout align-center justify-center row wrap pt-2>
      <v-flex xs12 md12 lg12 class="text-xs-center">
        <a href="https://www.mgtv.com/" class="videowebsites" target="_blank"><img :src="require('../assets/hunantv.png')" height="38" alt="爱影——影视聚合搜索"></a>
        <a href="https://www.iqiyi.com/" class="videowebsites" target="_blank"><img :src="require('../assets/iqiyi.png')" height="38" alt="爱影——影视聚合搜索"></a>
        <a href="http://www.yinyuetai.com/" class="videowebsites" target="_blank"><img :src="require('../assets/yinyuetai.png')" height="38" alt="爱影——影视聚合搜索"></a>
        <a href="https://www.youku.com/" class="videowebsites" target="_blank"><img :src="require('../assets/youku.png')" height="38" alt="爱影——影视聚合搜索"></a>
      </v-flex>
    </v-layout>

  <!-- <vue-friendly-iframe :src="websitehref" @load="onLoad" @document-load="onDocumentLoad"></vue-friendly-iframe> -->
</v-container>
</template>

<script>
import { Navbar } from './components'
import { jiexiapi_query } from '@/api/suggest'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'

  export default {
    components: {
    Navbar
  },
    data () {
      return {
        loading: false,
        videourl:'',
        i:0,
        k:1,
        isJiexi:false,
        // jk_list:'https://660e.com/?url=',
        jk_list:[],
        // jk_list:'https://660e.com/?url=',http://jx.cesms.cn/?url=
        websitehref: 'http://jx.cesms.cn/?url='

      }
    },
    methods: {
      jiexi(){
        this.isJiexi = true,
        this.websitehref = null,
        this.websitehref = this.jk_list[0].url+this.videourl
      },
      change_api(){

        var length = this.jk_list.length - 1
        if(this.i == length){
          this.i=0,
          this.k =1
        }else {
          this.i = this.i+1,
          this.k = this.k+1
        }
        this.websitehref = this.jk_list[this.i].url+this.videourl

      }
    },
    created(){
      jiexiapi_query().then(response => {
          console.log(response.data),
          this.jk_list = response.data,
          this.isJiexi = true,
          this.websitehref = null,
          this.websitehref = this.jk_list[0].url+this.videourl
          // console.log(this.jk_list[0].url)
      })
    }
  }
</script>
<style>
.vue-friendly-iframe iframe{height: 500px;width: 100%;}
.highlight{color: #F72F05;}
.shuoming1{border:1px solid #F72F05}
.videowebsites{float:center;margin:5px;}
</style>
