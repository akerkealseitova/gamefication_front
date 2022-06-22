<template>
  <div class="map-info-panel">
    <div class="panel-wrapper">
      <div class="information-section">
        <div class="information-section-header">
          <p>{{moduleTitle}}</p>
          <button 
            class="information-section-header-btn" 
            @click="closeModule"
          >
            <img 
              :src="close" 
              alt="" 
              width="20"
              class="img-btn"
            >
          </button>
        </div>
        <div class="img-carousel" v-show="false">
          <img :src="carouselImg" class="img-carousel-item" alt="">
          <img :src="carouselImg" class="img-carousel-item" alt="">
          <img :src="carouselImg" class="img-carousel-item" alt="">
          <img :src="carouselImg" class="img-carousel-item" alt="">
        </div>
        <p class="information-section-info" v-show="false">
          Carnegie Mellon University (CMU) is a private research university based in Pittsburgh, Pennsylvania. Founded in 1900 by Andrew Carnegie as the Carnegie Technical Schools, the university became the Carnegie Institute of Technology in 1912 and began granting four-year degrees. In 1967, the Carnegie Institute of Technology merged with the Mellon Institute of Industrial Research to form Carnegie Mellon University.
        </p>
      </div>
      
      <div class="syllabus-head" v-show="false">Your syllabus here: </div>
      <course-content-nav class="syllabus" textColor="light-color"></course-content-nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CourseContentNav from './CourseContentNav.vue'

export default {
name: "CourseInfoRightBar",
  components: {
    CourseContentNav
  },
  data: () => ({ 
    carouselImg: require("@/assets/images/carousel-item.png"),
    teacherChalk: require("@/assets/images/chalkboard-teacher-solid.png"),
    playCircle: require("@/assets/images/play-circle-regular.png"),
    playCircleGrey: require("@/assets/images/play-circle-regular2.png"),
    pencil: require("@/assets/images/pencil.png"),
    question: require("@/assets/images/question-circle-regular.png"),
    medal: require("@/assets/images/medal-solid 1.png"),
    pencilRuler: require("@/assets/images/pencil-ruler-solid 1.png"),
    close: require("@/assets/images/close.svg"),
   }),
  props: {
  },
  created(){
  },
  computed: {
    ...mapState('course', ['moduleId', 'targets']),
    moduleTitle(){
      return this.targets[this.moduleId].title
    }
  },
  methods: {
    ...mapActions('course', ['closeModule']),
  },
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  .map-info-panel {
    overflow-y: scroll;
    overflow-x: hidden;
    background: #525252;
    min-width: 30%;
    width: 40%;
    // --color: #fff;
    height: 100%;
    @media screen and (max-width: 850px) {
      position: absolute;
      z-index: 15;
      width: 100%;
    }
  }
  .panel-wrapper {
    .syllabus {
      --hover-color: #FAC91B;
      padding: 16px 16px;
    }
  }

  .information-section {
    
    &-header {
      color: #000;
      background-color: #FAC91B;
      font-size: 24px;
      font-weight: 700;
      padding: 8px 16px;
      font-family: 'Montserrat', sans-serif;
      display: flex;
      align-items: center;
      margin: 0 auto;
      justify-content: space-between;
      
      &-btn{
        height: 48px;
        width: 48px;
        text-align: center;
        background-color: transparent;
        border: 0;
        cursor: pointer;
        .img-btn{
          // display: none;
        }
      }

      @media screen and (max-width: 850px) {
        font-size: 22px;
        .img-btn{
          display: inline-block;
        }

      }

    }
    
    .img-carousel {
      background: #525252;
      width: 100%;
      overflow: scroll;

      padding: 40px 40px;
      display: flex;
      margin-bottom: 20px;

      &-item {
        height: 150px;
        margin-right: 10px;
        box-shadow: 5px 5px 10px rgba($color: #000000, $alpha: .25);
      }

      /* width */
      &::-webkit-scrollbar {
        width: 10px;
        height: 10px;
      }

      /* Track */
      &::-webkit-scrollbar-track {
        background: #525252;
        
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: #FAC91B;
        border-radius: 8px;
      }

      /* Handle on hover */
      &::-webkit-scrollbar-thumb:hover {
        background: #fac91a;
      }

      &::-webkit-scrollbar-button {
        width: 5px; 
        height: 0px; 
      }
      
    }

    &-info {
      padding:20px 16px 60px 16px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 500;
      line-height: 19,5px;
      text-align: justify;
    }

  }

  .syllabus-head {
    color: #000;
    background-color: #FAC91B;
    font-size: 24px;
    font-weight: 700;
    padding: 20px 16px;
  }
</style>
