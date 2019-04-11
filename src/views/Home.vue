<template>
  <v-container>
  <navbar></navbar>
  <v-layout align-center justify-center row wrap pt-4>
    <v-flex class="text-xs-center">
      <!-- <v-img class="mb-4 logo" href="https://iying.online" src="@/assets/logo.png" alt="爱影——影视聚合搜索"></v-img> -->
         <a @click="gorouter('home')"><img :src="require('../assets/logo.png')" height="56" alt="爱影——影视聚合搜索"></a>
    </v-flex>
    </v-layout>
    <v-layout align-center justify-center row wrap pt-4>
        <v-flex xs12 lg6 md7>
            <v-combobox
              v-model="keywd"
                :items="items"
                :loading="loading"
                :search-input.sync="search"
                append-icon="search"
                hide-no-data
                @click:append="postQuery()"
                clearable
                @keyup.enter.native="postQuery"
                no-filter
                placeholder="请输入关键词(支持拼音、缩写)"
                hide-details
                hide-selected
                solo
            >
            </v-combobox>
            <!-- <v-alert
              :value="error1"
              color="error"
              icon="warning"
              outline
            >
              This is a error alert.
            </v-alert> -->
        </v-flex>
      </v-layout>
      <v-layout align-center justify-center row wrap pt-3>
          <v-flex xs11 lg5 md7 class="text-xs-center">
            <p><热搜></p>
            <ul id="hotsearch">
                <li v-for="hotsearch in hotsearchs">
                  <a class="hotword" @click="hotSearch(hotsearch.name)">{{hotsearch.name}}
                  </a>
                </li>
            </ul>
        <!-- <a class="hotword" @click="hotSearch('疯狂的外星人')" >疯狂的外星人</a>
        <a class="hotword" @click="hotSearch('海王')" >海王</a>
        <a class="hotword" @click="hotSearch('极限职业')" >极限职业</a>
        <a class="hotword" @click="hotSearch('大人物')" >大人物</a>
        <a class="hotword" @click="hotSearch('无敌破坏王2')" >无敌破坏王2</a>
        <a class="hotword" @click="hotSearch('神奇动物：格林德沃之罪')" >神奇动物：格林德沃之罪</a>
        <a class="hotword" @click="hotSearch('神探蒲松龄')" >神探蒲松龄</a>
        <a class="hotword" @click="hotSearch('波西米亚狂想曲')" >波西米亚狂想曲</a>
        <a class="hotword" @click="hotSearch('惊奇队长')" >惊奇队长</a>
        <a class="hotword" @click="hotSearch('神奇乐园历险记')" >神奇乐园历险记</a> -->
          </v-flex>
        </v-layout>
</v-container>
</template>

<script>
import { Navbar } from './components'
import { query, query_download } from '@/api/search'
import { hotsearchs_query } from '@/api/suggest'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'

  export default {
    components: {
    Navbar
  },
    data () {
      return {
        loading: false,
        items: [],
        error1:false,
        search: null,
        hotsearchs:{
          uid:'',
          name:''
        },
        keywd: '',
        page: 1,
        gradient: 'to top, #7B1FA2, #E1BEE7',
        states: []
      }
    },
   //  components:{
   //     navbar: Navbar
   // },
    watch: {
      search (val) {

        val && val !== this.keywd && this.querykeywdions(val)
        // this.keywd = val
        // val && val !== this.keywd && this.querykeywdions(val)
      }
    },
    created(){
      hotsearchs_query().then(response => {
          // console.log(response.data),
          this.hotsearchs = response.data
          // console.log(this.hotsearchs[0].name)
      })
    },
    methods: {
      querykeywdions (v) {
        this.loading = true
        // this.keywd = v
        // Simulated ajax query
        this.$jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', { wd: v, callbackQuery: 'cb', callbackName: 'sug'}).then(json => {
          // Success.
        console.log("成功")
        this.loading = false
        // console.log(json)
        this.items = json.s
        console.log(this.items)
        }).catch(err => {
          // console.log("失败")
        })
      },
      sug(data) {
              this.items = data.s;
              // console.log(this.myData)
      },
      hotSearch(hotword){
      this.keywd = hotword,
      this.postQuery()
    },
    gorouter(url){
      this.$router.push({ name: url})
    },
    postQuery() {
        NProgress.start()
      // this.error1 = true
      // this.keywd = v
      if(this.keywd){
        query(this.keywd ,this.page).then(response => {
            window.localStorage.setItem("pagedata",JSON.stringify(response.data)),
            window.localStorage.setItem("keywd",JSON.stringify(this.keywd)),
              // console.log(response.data),
              NProgress.done(),
           this.$router.push({ name: 'Search_results', params:{ pagedata: response.data , keywd:this.keywd }})
        })
      }else {
        NProgress.done()


      }

    },
    }
  }
</script>
<style scoped>
.searchbtn{padding-left: 0px;}
.bar{padding-top: 10px;}
.hotword{margin:6px;color:#4d555d;}
.hotsearch{text-decoration: none;list-style: none;display: inline;margin:0px;}
#hotsearch {
font:14px verdana, arial, sans-serif; /* 设置文字大小和字体样式 */
}
#hotsearch, #hotsearch li {
list-style:none; /* 将默认的列表符号去掉 */
padding:0; /* 将默认的内边距去掉 */
margin:0; /* 将默认的外边距去掉 */
}
#hotsearch li {
float:left; /* 往左浮动 */
}
.hotword:hover{margin:6px;color:#0099ff;}
</style>
