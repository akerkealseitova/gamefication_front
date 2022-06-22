<template>
  <div class="course-comments" v-if="routeToEndPoint[currentPath]">
    <div class="course-comments-header">
      <p class="course-comments-header-discussion">Discussion</p>
      <!-- <img :src="user" class="course-comments-header-messages" alt=""> -->
    </div>
    <div class="loader-wrapper" v-if="!comments">
      <!-- <loading-component ></loading-component> -->
    </div>
    <div>
      <div class="course-comments-section">
        <div 
          class="course-comments-section-users"
          v-for="(comment, index) in comments"
          :key="index"
        >
            <div class="course-comments-section-users-photo">
              <a :href="'mailto:' + comment.author.email" target="_blank">
                <img :src="userOne" class="course-comments-section-users-photo-picture" alt="">
              </a>
            </div>
            <div class="course-comments-section-users-name">
              <p class="course-comments-section-users-name-surname">
                {{comment.author.username}} 
                <a :href="'mailto:' + comment.author.email" target="_blank" class="author-email"> 
                  {{comment.author.email}} 
                </a>
              </p>
              <p class="course-comments-section-users-name-message">{{comment.comment}}</p>
              <h2 class="course-comments-section-users-name-date">{{parseDate(comment.created_at)}}</h2>  
            </div>
        </div>
        <v-scroll-paginate :fetch="fetchComments" :key="currentPath">
          <template #spinner>
              <!-- Loading... -->
              <div class="spinner-border" role="status">
                <beat-loader :loading="true" :color="'#f79a2e'" :size="'12px'"></beat-loader>
              </div>
          </template>
          <template #nomore>
              <!-- No more data -->
          </template>
        </v-scroll-paginate>
      </div>
      <div class="course-comments-bottom">
        <div class="course-comments-bottom-boxtype">
          <input 
            v-model="commentToAdd" 
            type="input" 
            class="course-comments-bottom-boxtype-field" 
            placeholder="Your Comment" 
            name="name" 
            id='name' 
            @keyup.enter="sendComment"
            required 
          />
          <button class="course-comments-bottom-boxtype-send" @click="sendComment" :disabled="!commentToAdd">
            <img :src="telegram" class="course-comments-bottom-boxtype-send-icon" alt="">
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {api as ApiService} from '../services/api.service'
import BeatLoader from 'vue-spinner/src/BeatLoader.vue'

export default {
  name: "CourseComments",
  data() {
    return {
      user: require("@/assets/images/User-icon3.png"),
      userOne: require("@/assets/images/User-icon.png"),
      userTwo: require("@/assets/images/User-icon1.png"),
      userThree: require("@/assets/images/User-icon2.png"),
      telegram: require("@/assets/images/Vector1.png"),
      routeToEndPoint: {
        'quiz': 'quizzes',
        "theory": 'theories',
        "minitests": 'minitests',
        'project': "courses",
        "contest": "contests"
      },
      comments: null,
      commentToAdd: '',
      offset: 0,
      status: ''
    }
  },
  created() {
    // this.fetchComments()
  },
  methods: {
    fetchComments(status){
      if( !this.url ) return
      ApiService.get(this.url + '?limit=5' + '&offset=' + this.offset)
        .then(({data}) => {
          if( !this.comments )
            this.comments = []
          
          // console.log(data.results)
          this.comments = this.comments.concat(data.results)

          this.offset = Math.min(this.offset + 5, data.count)

          if( status && !this.status )
            this.status = status

          if (!data.next){
            this.status.COMPLETED = 1;
            this.status.LOADING = 0;
          }
          else
            this.status.LOADING = 0;
        })
    },
    sendComment(){
      if( !this.url || !this.commentToAdd ) return
      ApiService.post(this.url, {
        "comment": this.commentToAdd
      })
        .then(() => {
          this.$toast.success(`Comment added`, {position: 'top', duration: 3000});
          this.commentToAdd = ''
          if( this.status.COMPLETED ){
            this.status.LOADING = 1
            this.status.COMPLETED = 0
            this.fetchComments()
          }
        })
        .catch(() => this.$toast.error(`Error`, {position: 'top', duration: 3000}))
    },
    parseDate(date) {
      return new Date(date).toLocaleString("en-US")
      // return new Date(date)
    }
  },
  computed: {
    ...mapState('course', ['module']),    
    currentPath(){
      let currentPath = ''
      let curRoute = this.$route.path.split('/')
      while( currentPath === '' || Number.isInteger(+currentPath) ){
        currentPath = curRoute.pop()
      }
      return currentPath
    },
    url(){
      let routeEndPoint = this.routeToEndPoint[this.currentPath]
      if( routeEndPoint === undefined ) 
        return null
      let url = 'comments/' + routeEndPoint + '/'
      return url
    },
  },
  watch: {
    currentPath(){
      this.comments = null
      this.offset = 0
      this.status = null
    }
  },
  components: {
    BeatLoader
  }
};
</script>

<style lang="scss">
  .loader-wrapper{
    height: 200px;
  }
  .spinner-border {
    padding: 24px 0;
    text-align: center;
  }
  .course-comments{
    width: 100%;
    min-width: 300px;
    background: #F1F4F3;
    border-radius: 5px;

    &-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0;
      width: calc(100%-40px);
      padding: 0 20px;
      height: 64px;
      background: #A8E741;
      border-radius: 5px 5px 0px 0px;

      &-discussion{
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 34px;
        color: #FFFFFF;
      }

      &-messages{
        height: 70px;
        width: 70px;
      }
    }

    &-section{
      box-shadow: 
        inset 0px -11px 8px -10px #CCC;
      background: #F1F4F3;
      margin: 0;
      padding: 10px 0px;
      height: 300px;
      width: 100%;
      overflow-y: scroll;

      &-users{
        display: flex;
        &-photo{
          width: 80px;
          height: 80px;
          margin-top: 20px;
          margin-left: 20px;
          &-picture{
            width: 80px;
            height: 80px;
          }

        }
        &-name{
          margin-top: 20px;
          margin-left: 20px;
          display: grid;
          grid-column-gap: 20px;

          &-surname{
            font-style: normal;
            font-weight: bold;
            font-size: 16px;
            line-height: 20px;
            color: #505050;
            .author-email {
              font-weight: normal;
              // color: #A8E741;
            }
          }

          &-message{
            font-family: Montserrat;
            font-style: italic;
            font-weight: 500;
            font-size: 18px;
            line-height: 22px;
            color: #505050;
          }

          &-date{
            font-family: Montserrat;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 20px;
            color: #C6D2D2;
          }

        }
      }

    }

    &-bottom{
      //box-shadow: inset 0px 10px 10px -10px #CCC;
      padding-top:1px; 
      margin-top:-1px;
      //margin: 40px;
      width: 100%;
      height: 100px;
      background: #F1F4F3;


      &-boxtype{
        display: flex;
        margin-top: 20px;
        margin-left:  20px;
        width: calc(100% - 40px);
        height: 60px;
        background: #FFFFFF;
        border-radius: 5px;
        &-field{
          margin: 10px 0 0 15px;
          //margin-left: 15px;
          padding: 0; 
          width: 100%;
          height: 40px;
          border: none;
          border-radius: 5px;
          background: #FFFFFF;
          font-style: italic;
          font-weight: 500;
          font-size: 18px;
          line-height: 22px;
          color: #505050;
          
        }

        &-send{
          // padding: 0;
          // margin: 0;
          margin: 10px 5px 0px 0px;
          width: 100%;
          max-width: 80px;
          height: 40px;
          background: #000;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          &:disabled {
            background: rgb(112, 111, 111);
          }
          &-icon{
            margin: auto;
            height: 25px;
            width: 25px;
          }
        }

      }

    }
    input{
      &:focus { 
        outline: none !important;
      }
    }
  }
</style>
