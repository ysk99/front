<template>
  <v-container>
    <navbar></navbar>
  <v-layout align-start justify-center row wrap>
      <v-flex xs12 lg4 md3 class="text-xs-center">
        <v-layout align-start justify-center row wrap>
          <v-flex xs12 lg7 md3></v-flex>
          <v-flex xs12 lg5 md9 class="text-xs-center">
            <a @click="gorouter('home')"><img :src="require('../assets/logo.png')" height="53" alt="爱影——影视聚合搜索"></a>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 lg4 md6 v-if="query_leixing">
          <v-combobox
            v-model="keywd"
              :items="items"
              :loading="loading"
              :search-input.sync="search"
              append-icon="search"
              hide-no-data
              auto-select-first
              @click:append="postQuery"
              outline
              background-color="#FFA500"
              @keyup.enter.native="postQuery"
              single-line
              no-filter
              placeholder="请输入关键词(支持拼音、缩写)"
          >
          </v-combobox>
          <v-alert
            :value="error1"
            color="error"
            icon="warning"
            outline
          >
            This is a error alert.
          </v-alert>
          <!-- <v-btn outline color="indigo" type="button" :pressed.sync="query_leixing" @click="postQuery">在线</v-btn>&nbsp;&nbsp;
        <v-btn outline color="indigo" type="button"  :pressed.sync="query_leixing_down" @click="postQuery_download">下载</v-btn> -->
      </v-flex>
      <v-flex xs12 lg4 md6 v-else>
          <v-combobox
            v-model="keywd"
              :items="items"
              :loading="loading"
              :search-input.sync="search"
              append-icon="search"
              hide-no-data
              auto-select-first
              @click:append="postQuery_download"
              outline
              background-color="#FFA500"
              @keyup.enter.native="postQuery_download"
              single-line
              no-filter
              placeholder="请输入关键词(支持拼音、缩写)"
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
      <v-flex xs12 lg4 md3>
      </v-flex>
      </v-layout>
      <v-layout align-center justify-center row wrap>
        <v-flex xs12 lg8 md8 class="text-xs-center">
          <v-btn outline color="orange accent-3" small type="button" :input-value="query_leixing" @click="postQuery">在线</v-btn>&nbsp;&nbsp;
          <v-btn outline color="orange accent-3" small type="button"  :input-value="query_leixing_down" @click="postQuery_download">下载</v-btn>
        </v-flex>
        <v-layout align-center justify-center row wrap pt-5 v-if="!this.total">
          <v-flex xs12 md8 lg8 class="text-xs-center">
            <p>Sorry！暂时没有收录该视频，我们会抓紧寻找，您可以试试<router-link to="/vipjx">VIP在线解析</router-link></p>
          </v-flex>
        </v-layout>
        <v-flex xs12 lg6 md8 class="text-xs-center" v-if="this.total">
          <p><i class="fa fa-search"></i> 关于 “<span class="highlight">{{ keywd }}</span>” 的<span class="highlight" v-if="query_leixing">在线视频资源</span><span class="highlight" v-else>下载资源</span>搜索结果, 共 {{ total }} 条
</p>

        <v-list two-line>
          <template v-for="result in results">
            <v-list-tile
              :key="result.title"
              avatar
              ripple
              @click="toggle(result.href)"
            >
              <v-list-tile-content>
                <v-list-tile-title class="highlight">{{ result.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ result.others }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ result.website }}</v-list-tile-action-text>
              <!-- <v-icon
                  v-if="selected.indexOf(index) < 0"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow darken-2"
                >
                  star
                </v-icon> -->
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
            ></v-divider>
          </template>
        </v-list>
        <!-- <div class="panel panel-default list-panel search-results" v-if="query_leixing">
                  <pagination :data="pagedata" @pagination-change-page="postQuery"></pagination>
                </div>
                <div class="panel panel-default list-panel search-results" v-else>
                  <pagination :data="pagedata" @pagination-change-page="postQuery_download"></pagination>
                </div> -->
                <v-pagination
                    v-model="pagination.current"
                    :length="pagination.total"
                    @input="onPageChange"
                ></v-pagination>

        </v-flex>
        </v-layout>
</v-container>
</template>
<script>
import { query,query_download } from '@/api/search'
import { Navbar } from './components'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
export default {
  inject: ['reload'],
  components: {
  Navbar
},
  data() {
    return {
      total:0 ,
      keywd:'null',
      error1:false,
      items:[],
      query_leixing:true,
      query_leixing_down:false,
      loading: false,
      search: null,
      page: 1,
      gradient: 'to top, #7B1FA2, #E1BEE7',
      states: [],
      results:{
        title:'',
        id:null,
        website:'',
        href:'',
        others:'',
        updated_at:''
      },
      pagination: {
        current:1,
        total:1
      },
      pagedata:{
      }
    }
  },
  mounted() {
       // Fetch initial results
       // this.getResults();
   },
  methods: {
    querykeywdions (v) {
      this.loading = true
      // Simulated ajax query
      this.$jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', { wd: v, callbackQuery: 'cb', callbackName: 'sug'}).then(json => {
        // Success.
      // console.log("成功")
      this.loading = false
      // console.log(json)
      this.items = json.s
      // console.log(this.items)
      }).catch(err => {
        // console.log("失败")
      })
    },
    sug(data) {
            this.items = data.s;
            // console.log(this.myData)
    },
    toggle(index){
      // window.location.href = index;
      window.open(index)
      // console.log(index)
    },
    gorouter(url){
      this.$router.push({ name: url})
    },
    postQuery(page) {
      if (typeof page === 'undefined') {
  				page = 1;
  			}
        this.query_leixing = true,
        this.query_leixing_down = false
        NProgress.start()
        if(this.keywd){
          query(this.keywd, this.pagination.current).then(response => {
              console.log(response.data),
              NProgress.done(),
              window.localStorage.setItem("pagedata",JSON.stringify(response.data));
              window.localStorage.setItem("keywd",JSON.stringify(this.keywd));
              window.localStorage.setItem("query_leixing",JSON.stringify(this.query_leixing));
              window.localStorage.setItem("query_leixing_down",JSON.stringify(this.query_leixing_down));
              this.reload(),
               this.pagedata = response.data,
              this.results = response.data.data,
              this.pagination.current = response.data.current_page,
              this.pagination.total = response.data.last_page,
              this.total = response.data.total
          })
        }else {
          // this.dismissCountDown = this.dismissSecs,
          NProgress.done()
        }

    },
    postQuery_download(page) {
      // if (typeof page === 'undefined') {
  		// 		page = 1;
  		// 	}
        this.query_leixing = false,
        this.query_leixing_down = true
        NProgress.start()
        if(this.keywd){
          query_download(this.keywd, this.pagination.current).then(response => {
              console.log(response.data),
              NProgress.done(),
              window.localStorage.setItem("pagedata",JSON.stringify(response.data)),
              window.localStorage.setItem("keywd",JSON.stringify(this.keywd)),
              window.localStorage.setItem("query_leixing",JSON.stringify(this.query_leixing));
              window.localStorage.setItem("query_leixing_down",JSON.stringify(this.query_leixing_down));
              this.reload(),
               this.pagedata = response.data,
              this.results = response.data.data,
              this.pagination.current = response.data.current_page,
              this.pagination.total = response.data.last_page,
              this.total = response.data.total
          })
        }else {
          // this.dismissCountDown = this.dismissSecs,
          NProgress.done()
        }
    },
    onPageChange() {
      if(this.query_leixing_down){
        this.postQuery_download();
      }else {
        this.postQuery();
      }
        }
  },
  watch: {
    search (val) {
      val && val !== this.keywd && this.querykeywdions(val)
    }
  },
  created(){
    this.pagedata = JSON.parse(window.localStorage.getItem("pagedata")),
    this.keywd = JSON.parse(window.localStorage.getItem("keywd")),
    this.query_leixing = JSON.parse(window.localStorage.getItem("query_leixing")),
    this.query_leixing_down = JSON.parse(window.localStorage.getItem("query_leixing_down"))
    if(!(this.query_leixing||this.query_leixing_down)){
      this.query_leixing = true;
      this.query_leixing_down = false;
    }
    this.results = this.pagedata.data,
    this.pagination.current = this.pagedata.current_page,
    this.pagination.total = this.pagedata.last_page,
    this.total = this.pagedata.total
    // console.log(this.pagedata),
    // console.log(this.total)
  }
}
</script>
<style scoped>
/* .logo{} */
/* body{background-color:#f5f5f5;} */
.result{background-color:#FCFCFC;}
.highlight{color: #F72F05;}
.logo{width:194px; height:66px;}
.hotword{margin:6px;color:#4d555d;}
.hotword:hover{margin:6px;color:#0099ff;}
</style>
