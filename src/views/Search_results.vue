<template>
  <v-content>
  <v-layout align-center justify-start row wrap pt-2 class="grey lighten-4">
      <v-flex xs11 lg1 md2 class="text-xs-center">
        <a @click="gorouter('home')"><img :src="require('../assets/logo.png')" height="43" alt="爱影——影视聚合搜索"></a>
      </v-flex>
      <v-flex xs11 lg5 md6 v-if="query_leixing">
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
          </v-flex>
      <v-flex xs11 lg5 md6 v-else>
          <v-combobox
              v-model="keywd"
                :items="items"
                :loading="loading"
                :search-input.sync="search"
                append-icon="search"
                hide-no-data
                @click:append="postQuery_download()"

                clearable
                @keyup.enter.native="postQuery_download"
                no-filter
                placeholder="请输入关键词(支持拼音、缩写)"
                hide-details
                hide-selected
                solo
            >
            </v-combobox>
      </v-flex>
      <v-flex xs11 lg6 md4>
        <navbar></navbar>
      </v-flex>
      </v-layout>
      
      <v-layout align-start justify-center row wrap class="grey lighten-4"  pt-1>
      <v-flex xs11 lg1 md2 class="text-xs-center">

      </v-flex>
      <v-flex xs11 lg5 md6 class="text-lg-left text-xs-center text-md-left">
          <v-btn-toggle v-model="query_leixing">
              <v-btn flat value="trur" @click="postQuery">
                在线观看
              </v-btn>
              <v-btn flat value="false" @click="postQuery_download">
                下载资源
              </v-btn>
            </v-btn-toggle>
      </v-flex>
      <v-flex xs11 lg6 md4>

      </v-flex>
      </v-layout>
<hr>
      <v-layout align-start justify-center row wrap>
      <v-flex xs11 lg1 md2 class="text-xs-center">

      </v-flex>
      <v-flex xs11 lg5 md6>
        <v-layout align-start justify-center row wrap>
        <!-- <v-layout align-center justify-center row wrap pt-3 > -->
          <v-flex xs12 md8 lg12 class="text-lg-left text-xs-center text-md-left" v-if="!this.total" pt-2>
            <p>Sorry！暂时没有收录该视频，我们会抓紧寻找，您可以试试<router-link to="/vipjx">VIP在线解析</router-link></p>
          </v-flex>
        <!-- </v-layout> -->

        <v-flex xs11 lg12 md12 class="text-xs-center text-lg-left text-md-left" v-if="this.total" pt-2>
          <h5><i class="fa fa-search"></i> 关于 “<span class="highlight">{{ keywd }}</span>” 的<span class="highlight" v-if="query_leixing">在线视频资源</span><span class="highlight" v-else>下载资源</span>搜索结果, 共 {{ total }} 条</h5>
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
            <v-divider></v-divider>
          </template>
        </v-list>
        

        </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 lg6 md4 pt-4>
        <v-layout>
          <v-flex xs11 md6 lg5 offset-sm2>
            <!-- <v-card>
            <v-img
              :src='this.douban.images.medium'
              aspect-ratio="2.75"
            ></v-img>

            <v-card-title primary-title>
              <div>
                <h4 class="headline mb-0">{{this.douban.title}}[{{this.douban.year}}]</h4>
                <h5 class="title mb-0">{{this.douban.rating.average}}</h5>
                <div>{{this.douban.summary}}</div>
              </div>
            </v-card-title>

            <v-card-actions>
              <v-btn flat color="orange">Share</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card> -->

          <v-card color="purple" class="white--text">
              <v-layout row>
                <v-flex xs7>
                  <v-card-title primary-title>
                    <div>
                      <div class="headline">{{this.douban.title}}-({{this.douban.year}})</div>
                      <!-- <div></div> -->
                      <div class="caption">{{this.douban.summary}}</div>
                    </div>
                  </v-card-title>
                </v-flex>
                <v-flex xs5>
                  <v-img
                    :src='this.douban.images.medium'
                    height="200px"
                    contain
                  ></v-img>
                </v-flex>
              </v-layout>
              <v-divider light></v-divider>
              <v-card-actions class="pa-3">
                {{this.douban.countries[0]}}
                <v-spacer></v-spacer>
                豆瓣评分
                <v-icon>star_border</v-icon>
                {{this.douban.rating.average}}
              </v-card-actions>
            </v-card>
        
          </v-flex>
        </v-layout>
      </v-flex>
      </v-layout>

      <v-layout align-start justify-center row wrap v-if="this.total">
      <v-flex xs12 lg1 md2 class="text-xs-center">

      </v-flex>
      <v-flex xs12 lg5 md6>
         <v-pagination
            v-model="pagination.current"
            :length="pagination.total"
            @input="onPageChange"
        ></v-pagination>
      </v-flex>
      <v-flex xs12 lg6 md4>

      </v-flex>
      </v-layout>
        
  </v-content>
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
      douban:{},
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
    },
    doubanapi() {
      this.$jsonp('https://api.douban.com/v2/movie/search', { q: this.keywd , count: 5}).then(json => {
      this.loading = false
      // console.log(json)
      // this.items = 
      // this.douban = json.subjects[0]
      // console.log(json.subjects)
      // console.log(this.douban.images.medium)
      this.$jsonp('https://api.douban.com/v2/movie/subject/'+json.subjects[0].id).then(json => {
      this.loading = false
      this.douban = json
      console.log(json)
      // console.log(this.douban.images.medium)
      }).catch(err => {
        // console.log("失败")
      })
      
      }).catch(err => {
        // console.log("失败")
      })
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
    this.doubanapi(),
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
