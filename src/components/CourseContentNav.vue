<template>
    <div class="syllabus">
        <!-- <div class="syllabus-head">Your syllabus here: </div> -->
        <div class="syllabus-topic">
            <router-link 
                to="/course/theory"
                class="link"
                :class="textColor"
            >
                <img :src="teacherChalk" alt="" class="link-icon">
                <h2 class="link-txt">{{moduleTitle}}</h2>
            </router-link>
            <ul class="syllabus-video-links">
                <li
                    v-for="(video, index) in videoLinks"
                    :key="index" 
                    class="link"
                >
                    <router-link class="link" :class="textColor" :to="videoLink(index)">
                        <img :src="playCircle" alt="">
                        <h3 class="link-txt"> {{video.video_title}} </h3>
                    </router-link>
                </li>
                
            </ul>
        </div>

        <div class="syllabus-topic-list">
            <router-link 
                v-for="item in modules" 
                :key='item.title'
                class="link" 
                :to="item.link"
                :class="textColor"
            >
                <img :src="item.icon" alt="">
                <h2 class="link-txt">{{item.title}}</h2>
            </router-link>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
name: "CourseInfoRightBar",
  components: {
  },
  data: () => ({ 
    playCircleActive: require("@/assets/images/play-circle-regular.png"),
    playCircle: require("@/assets/images/play-circle-regular2.png"),
    teacherChalk: require("@/assets/images/chalkboard-teacher-solid.png"),
    modules: [
        {
            title: 'Contest',
            icon: require("@/assets/images/medal-solid 1.png"),
            link: '/course/contest'
        },
        {
            title: 'Quiz',
            icon: require("@/assets/images/question-circle-regular.png"),
            link: '/course/quiz'
        },
        {
            title: 'Project',
            icon: require("@/assets/images/pencil-ruler-solid 1.png"),
            link: '/course/project'
        },
        {
            title: 'Mini Test',
            icon: require("@/assets/images/question-circle-regular.png"),
            link: '/course/minitests'
        },
    ],
   }),
  props: {
      textColor: {
        type: String,
        default: 'dark-color'
      }
  },
  created(){
  },
  computed: {
    ...mapState('course', ['module']),
    moduleTitle(){
        return this.module?.number
    },
    videoLinks(){
        return this.module?.theories[0]?.theory_videos
    },
  },
  methods: {
      videoLink(index){
        return '/course/theory/' + (index + 1)
      }
  }
}
</script>

<style lang="scss" scoped>

  .syllabus{
    gap: 0px;
    // background: lightcyan;
    font-family: 'Montserrat', sans-serif;
    // --color: #505050;
    --hover-color: #A8E741;

    .link {            
        display: flex;
        align-items: center;
        text-decoration: none;
        // color: var(--color);
        &:hover {
            color: var(--hover-color);                
        }
        &-icon{
            margin-right: 10px;
        }
        &-txt {
            margin-left: 14px;
            font-size: 18px;
            font-weight: 700;
        }
    }

    &-topic{
        &-head{
            // margin-bottom: 20px;
        }
    }
      
    &-video-links {
        padding-left: 32px;
        
        * > {
            margin-bottom: 30px;
        }
    }
    
  }

  .dark-color {
    color: #505050;
  }
  
  .light-color {
    color: #fff;
  }

</style>
