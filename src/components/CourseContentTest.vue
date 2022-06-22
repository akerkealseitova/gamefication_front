<template>
  <loading-component v-if="!currentTest && !results"></loading-component>
  <div class="course-content-quiz" v-else-if="!results">
    <div class="course-content-quiz-header">
      
      <p class="course-content-quiz-header-name"> 
        {{ currentTest?.title }} </p>
      <ul class="test-links">
        <li 
          v-for="(item, index) in currentTest?.mini_test_questions"
          :key="item.url"
         >
          <button 
            @click="currentTestIndex = index"
            class="link-box"
            :class="[currentTestIndex == index ? 'active' : userAnswer !== null && userAnswer[index] !== -1 ? 'answered' : '']"
          >
            <img :src="pencil" alt="">
          </button>
        </li>
      </ul>

      <div class="question">
        <p class="question__title">{{ currentQuestion?.text  }}</p>
        <div 
          v-for="(item, index) in currentQuestionAnswer"
          :key="item.uuid"
          class="question__variants"
        >  
          <div class="variant" @click="saveAnswer(index)">
            <div 
              class="variant__label"
              :class="[userAnswer && userAnswer[currentTestIndex] == index ? 'variant__label-active' : '']"
            >
              {{ String.fromCharCode(65+index) }}
            </div>
            <div class="variant__content">
              {{item.text}}
            </div>
          </div>
         </div>
      </div>

      <button class="custom-button" @click="nextQuestion" v-if="currentTestIndex + 1 < numberOfQuestions">Next -></button>
      <button class="custom-button" v-else :disabled="!isValidAnswers" @click="submitResults">
        Finish
      </button>

    </div>
  </div>
  <div class="results" v-else>
    <h1 >Results of test</h1>
    <p>    
      <span class="bold-text">
        Right Answers:
      </span> {{results.right_answers}}
    </p>
    <p>
      <span class="bold-text">
        Wrong Answers:
      </span> {{results.wrong_answers}}
    </p>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {api as ApiService} from '../services/api.service'

export default {
  name: "CourseContentQuiz",
  data() {
    return {
      userAnswer: null,
      currentTestIndex: 0,
      pencil: require("@/assets/images/pencil.png"),
    };
  },
  created(){
    if( this.currentTest ){
      this.setDefaultValueUserAnswers()
    }
  },
  computed: {
    ...mapState('course', ['module']),
    results() {
      let results = this.module?.mini_tests[0]?.minitests_result
      if( results?.right_answers == null || results?.wrong_answers == null ){
        return null
      }
      return results
    },
    currentTest(){
      if( this.results ){
        return null
      }
      let test = this.module?.mini_tests[0]?.mini_test
      if(  !test?.mini_test_questions.length && test?.mini_test_questions.length === 0 ) {
        return null
      }
      return test
    },
    currentQuestion(){ 
      if(!this.currentTest) return;
      return this.currentTest?.mini_test_questions[this.currentTestIndex];
    },
    currentQuestionAnswer() {
      if(!this.currentQuestion) return;
      return this.currentQuestion?.mini_test_question_answers;
    },
    numberOfQuestions(){
      return this.currentTest?.mini_test_questions?.length
    },
    miniTestAnswer(){
      // uuid — uuid вопроса
      // answer — uuid одного из вариантов ответа

      return this.userAnswer.map((ans, index) => ({
        "uuid": this.currentTest.mini_test_questions[index]?.uuid,
        "answer": this.currentTest.mini_test_questions[index].mini_test_question_answers[ans]?.uuid
      }))
    },
    isValidAnswers(){
      if( this.userAnswer )
        return !this.userAnswer.some(ans => ans === -1)
      return false
    },
  },
  mounted() {
  },
  watch: {
    currentTest(){
      this.setDefaultValueUserAnswers()
    }
  },
  methods: {
    ...mapActions('course', ['initApp']),
    setDefaultValueUserAnswers(){
      let length = this.currentTest?.mini_test_questions?.length 
      this.userAnswer = new Array(length).fill(-1)
    },
    saveAnswer(answerIndex){
      this.userAnswer[this.currentTestIndex] = answerIndex;
    },
    nextQuestion(){
      this.currentTestIndex = Math.min(this.currentTest.mini_test_questions.length-1, this.currentTestIndex+1);
    },
    submitResults(){
      console.log(this.userAnswer)
      ApiService.post('minitests/create_minitestresult/', {
        "minitest": this.currentTest.uuid,
        "answers": this.miniTestAnswer
      }).then(
        () => {
          this.$toast.success(`Mini test submitted`, {position: 'top', duration: 1000});
          this.$router.go('')
        }
      )
      .catch(() => this.$toast.error(`Error`, {position: 'top', duration: 3000}))
    }
  },  
};
</script>

<style lang="scss" scoped>
  .course-content-quiz{
    gap: 32px;

    .test-links{
      display: flex;
      overflow-x: scroll;
      padding: 12px 0; 
      *  {
        margin-left: 12px;
      }
      *:first-child {
        margin-left: 0;
      }

      .link-box {
        background: grey;
        display: inline-block;
        height: 64px;
        width: 64px;
        text-align: center;

        border-radius: 5px;

        cursor: pointer;

        &:before {
          content: "";
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }

        &:disabled {
          background: grey;
        }

        img {
          width: 42px;
          height: 42px;
          margin: 0 auto;
          vertical-align: middle;
        }
      }

      .active{
        background-color: #FF9A00;
      }

      .answered{
        background-color: #5EBC32;
      }
    }

    .question{

      margin: 60px 0 30px 0;

      .question__title{
        font-size: 16px;
        line-height: 20px;
      }
      
      .question__variants{
        margin-top: 30px;
        
        .variant{
          display: flex;
          align-items: center;
          margin-top: 20px;

          &:first-child{
            margin-top: 0px;
          }
          .variant__label{
            box-sizing: border-box;
            height: 50px;
            width: 50px;
            border-radius: 50%;  
            border: 3px solid black;
            line-height: 44px;
            text-align: center;
          }
          .variant__label-active{
            color: #FF9A00;
            border-color: #FF9A00;
          }
          .variant__content{
            margin-left: 20px;
            font-size: 16px;
            line-height: 20px;
            max-width: calc(100% - 70px);
          }
        }
      }
      
    }

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
        font-size: 24px;
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
      overflow: hidden;
      margin: auto 16px;
      margin-left: 12px;
      padding: 0 8px;
      max-width: 516px;
      border: 2px solid #727171;
      border-radius: 5px;
      display: flex;
      align-items: center;
      @media only screen and (max-width: 850px) {
          max-width: 380px;
      }


      &-hackerrank{

        display: flex;
        align-items: center;
        padding: 0 8px;
        height: 100%;
        max-height: 1vh;
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
  .results {
    color: #505050;
    font-size: 18px;
    
    h1 {
      font-size: 32px;
    }
    p {
      margin: 12px 0;
    }
    .bold-text {
      font-weight: bold;
      margin-right: 12px;
    }
  }
</style>
