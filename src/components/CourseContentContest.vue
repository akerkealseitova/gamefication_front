<template>

  <loading-component v-if="!module"></loading-component>

  <div v-else-if="!currentContest" class="course-content-quiz">
    <div class="course-content-quiz-link">
      <p class="course-content-quiz-link-name">
        No contest in this module
      </p>
    </div>

    <router-link to="/course/quiz" class="custom-button" >
      Next step →
    </router-link>
  </div>

  <div v-else class="course-content-quiz">
    <div class="course-content-quiz-header">
      <h1 class="course-content-quiz-header-name"> 
        {{currentContest.title}}
      </h1>
      <p>
        {{currentContest.description}}
      </p>
    </div>

    <div class="course-content-quiz-link">
      <p class="course-content-quiz-link-name">
        Link to the contest:
      </p>
    </div>
    <div class="course-content-quiz-linkbox">
      <a :href="currentContest.url" target="_blank" class="course-content-quiz-linkbox-hackerrank">
        {{currentContest.url}}
      </a>
    </div>
    
    <router-link to="/course/quiz" class="custom-button" >
      Next step →
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "CourseContentContest",
  data() {
    return {
    };
  },
  mounted() {
  },
  computed: {
    ...mapState('course', ['module']),
    currentContest(){
      return this.module?.contests[0]
    }
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
  .course-content-quiz{
    gap: 48px;
    color: #505050;

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
      display: flex;
      align-items: center;
      height: 46px;
      overflow: hidden;
      margin: 0 16px;
      padding: 0 8px;
      max-width: 516px;
      border: 2px solid #727171;
      border-radius: 5px;
      overflow: hidden;
      white-space: nowrap;
      align-items: center;

      &-hackerrank{
        display: flex;
        align-items: center;
        padding: 0px 8px;
        height: 100%;
        background: lightcyan;
        width: 100%;
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
  }
</style>
