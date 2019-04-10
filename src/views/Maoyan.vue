<template>
  <v-container>
    <navbar></navbar>
  <v-layout align-center justify-center row wrap pb-3>
    <v-flex class="text-xs-center">
      <!-- <v-img class="mb-4 logo" href="https://iying.online" src="@/assets/logo.png" alt="爱影——影视聚合搜索"></v-img> -->
      <v-btn outline color="indigo" small type="button"   @click="routergo('Douban')">豆瓣TOP250推荐</v-btn>&nbsp;&nbsp;
      <v-btn outline color="indigo" small type="button"   :input-value="true" @click="routergo('Maoyan')">猫眼TOP100推荐</v-btn>
    </v-flex>
    </v-layout>
    <v-layout align-center justify-center row wrap pt-3>
        <v-flex xs12 lg8 md10>
          <v-data-table
           :headers="headers"
           :items="apidatas"
           hide-actions
           class="elevation-1"
         >
           <template v-slot:items="props">
             <td>{{ props.item.rank }}</td>
             <td ><a @click="hotSearch(props.item.title)">{{ props.item.title }}</a></td>
             <td class="text-xs-right">{{ props.item.year }}</td>
             <td class="text-xs-right">{{ props.item.rating }}</td>
             <td class="text-xs-right">{{ props.item.casts }}</td>
             <!-- <td class="text-xs-right">{{ props.item.quto }}</td> -->
             <!-- <td class="text-xs-right">{{ props.item.fat }}</td> -->
             <!-- <td class="text-xs-right">{{ props.item.carbs }}</td>
             <td class="text-xs-right">{{ props.item.protein }}</td>
             <td class="text-xs-right">{{ props.item.iron }}</td> -->
           </template>
         </v-data-table>
        </v-flex>
      </v-layout>
</v-container>
</template>

<script>
import { query, query_download } from '@/api/search'
import { Navbar } from './components'
import { maoyan100 } from '@/api/suggest'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'
  export default {
    components: {
    Navbar
  },
    data () {
      return {
        loading: false,
        apidatas: [],
        headers: [
               {
                 text: '排名',
                 align: 'center',
                 sortable: false,
                 value: 'title'
               },
               {
                 text: '片名',
                 align: 'center',
                 sortable: false,
                 value: 'title',
                 width: '139'
               },
               {
                 text: '年份',
                 align: 'center',
                 sortable: false,
                 value: 'year'
               },
               {
                 text: '评分',
                 align: 'center',
                 sortable: false,
                 value: 'rating'
               },
               {
                 text: '演员',
                 align: 'center',
                 sortable: false,
                 value: 'casts'
               }
               // {
               //   text: '评价',
               //   align: 'center',
               //   sortable: false,
               //   value: 'quto',
               //   width: '180'
               // },

               // { text: 'Fat (g)', value: 'fat' }
               // { text: 'Carbs (g)', value: 'carbs' },
               // { text: 'Protein (g)', value: 'protein' },
               // { text: 'Iron (%)', value: 'iron' }
             ],
        items: [],
        error1:false,
        search: null,
        keywd: '',
        page: 1,
        gradient: 'to top, #7B1FA2, #E1BEE7',
        states: []
      }
    },
    methods: {
      sug(data) {
              this.items = data.s;
              // console.log(this.myData)
      },
      hotSearch(hotword){
      this.keywd = hotword,
      this.postQuery()
    },
    routergo(url){
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
        // this.dismissCountDown = this.dismissSecs,
        // NProgress.done()
        this.error1 = true
        // this.error1 = false


      }

    }
  },
  created(){
    // getdouban(){
        NProgress.start(),
      maoyan100().then(response => {
        this.apidatas = response.data,
        console.log(response.data)
         // this.$router.push({ name: 'search_results', params:{ pagedata: response.data , keywd:this.keywd }})
      })
        // this.apidatas = response.data.subjects,
        // console.log(response.data),
        NProgress.done()

    // }
  }
  }
</script>
<style scoped>
.searchbtn{padding-left: 0px;}
.bar{padding-top: 10px;}
.hotword{margin:6px;color:#4d555d;}
.hotword:hover{margin:6px;color:#0099ff;}
</style>
