<template>
  <loading-component v-if="!module"></loading-component>

  <div v-else-if="!currentQuiz" class="course-content-quiz">
    <div class="course-content-quiz-link">
      <p class="course-content-quiz-link-name">
        No quiz in this module
      </p>
    </div>

    <router-link to="/course/project" class="custom-button" >
      Next step →
    </router-link>
  </div>
  
  <div v-else class="course-content-quiz">
    <div class="course-content-quiz-header">
      <p class="course-content-quiz-header-name"> 
        {{currentQuiz.title}}
      </p>
    </div>
    <!-- <div class="course-content-quiz-bar">
      <input class="course-content-quiz-bar-box" list="browsers" name="myBrowser" placeholder="Select your time" />
      <datalist id="browsers">
        <option value="Tuesday at 2PM-6PM (Zhasdauren Duisebekov)"></option>
        <option value="Monday at 2AM-7AM (Akerke Alseitova)"></option>
        <option value="Friday at 3PM-7PM (Bakdaulet Kynabai)"></option>        
      </datalist>
    </div> -->
    <div class="course-content-quiz-link">
      <p class="course-content-quiz-link-name">
        Link to the quiz
      </p>
    </div>
    <div class="course-content-quiz-linkbox">
      <a :href="currentQuiz.url" target="_blank" class="course-content-quiz-linkbox-hackerrank">
        {{currentQuiz.url}}
      </a>
    </div>
    <!-- <p class="course-content-quiz-status">
      Quiz status
    </p>
    <div class="course-content-quiz-color">
      <div class="course-content-quiz-color-circle">
      </div>
      <p class="course-content-quiz-color-available">
        NOT AVAILABLE
      </p>
    </div> -->
    <router-link to="/course/project" class="custom-button" >
      Next step →
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CourseContentQuiz",
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapState('course', ['module']),
    currentQuiz(){
      return this.module.quizzes[0]
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .course-content-quiz{
    gap: 32px;

    &-header{
      font-style: normal;
      font-weight: 600;
      font-size: 24px;
      line-height: 44px;
      letter-spacing: 0.06em;
      color: #505050;
      @media only screen and (max-width: 850px) {
          font-size: 24px;
        }
    }

    &-bar{
      padding: 0 16px;
      &-box{
         
        
        box-sizing: border-box;
        width: 88%;
        border: none;
        outline: none;
        border-bottom:  4px solid #727171;

        font-size:24px;
        font-style: normal;
        font-weight: bold;
        line-height: 37px;
        letter-spacing: 0.095em;
        color: #2F4858;
        @media only screen and (max-width: 850px) {
          font-size: 18px;
        }
      }
      &-box::placeholder{
        //margin: 1vw;
        font-style: normal;
        font-weight: bold;
        font-size:24px;
        line-height: 32px;
        letter-spacing: 0.095em;
        color: #DCE0E0;
        @media only screen and (max-width: 850px) {
          font-size: 18px;
        }
      }
    }

    &-link{
      &-name{
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 37px;
        letter-spacing: 0.095em;
        color: #505050;
        @media only screen and (max-width: 850px) {
          font-size: 20px;
        }
      }
    }

    &-linkbox{
      height: 56px; 
      margin: auto 16px;
      padding: 0 8px;
      max-width: 700px;
      border: 2px solid #727171;
      border-radius: 5px;
      display: flex;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      align-items: center;

      @media only screen and (max-width: 850px) {
          max-width: 380px;
      }

      &-hackerrank{
        display: flex;
        align-items: center;
        padding: 0 8px;
        height: 100%;
        width: 100%;
        background: lightcyan;
        font-style: normal;
        font-weight: bold;
        font-size:22px;
        line-height: 27px;
        letter-spacing: 0.095em;
        color: #426B85;
        @media only screen and (max-width: 850px) {
          font-size: 16px;
        }
      }
    }

    &-status{
      margin: 10px 0 0 0;
      font-style: normal;
      font-weight: bold;
      font-size:24px;
      // line-height: 37px;
      letter-spacing: 0.095em;
      color: #505050;
      //background: lightpink;
      @media only screen and (max-width: 850px) {
          font-size: 20px;
        }
    }

    &-color{
      //background: lightsalmon;
      display: grid;
      grid-column-gap: 16px;
      display: flex;
      align-items: center;
      &-circle{
        margin-left: 16px;
        border-radius: 50%;
        width: 100%;
        max-width: 38px;
        height: 38px;
        background: #FF9A00;
      }

      &-available{
        margin: 0;
        font-style: normal;
        font-weight: bold;
        font-size: 20px;
        line-height: 37px;
        color: #3C5362;
        @media only screen and (max-width: 850px) {
          font-size: 20px;
        }
      }

    }

  }
</style>
