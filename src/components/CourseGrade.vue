<template>
  <div class="course-details">
    <loading-component v-if="!grades"></loading-component>
    <div class="course-details-header" v-else>
      <p class="course-details-header-grade"> Current grade</p>
      <p class="course-details-header-overall"> {{grades.total_result.toPrecision(2)}}pts</p>
    </div>
    <!-- <div v-else class="course-details-content">
      
      <div class="course-details-content-lists">
        <p class="course-details-content-lists-name">
          Theory
        </p>
        <hr class="course-details-content-lists-line">
        <p class="course-details-content-lists-points">
          4.5 of 7.5
        </p>
      </div>
      <div class="course-details-content-lists">
        <p class="course-details-content-lists-name">
          Quizes
        </p>
        <hr class="course-details-content-lists-line">
        <p class="course-details-content-lists-points">
          4.0 of 7.5
        </p>
      </div>
      <div class="course-details-content-lists">
        <p class="course-details-content-lists-name">
          Contests
        </p>
        <hr class="course-details-content-lists-line">
        <p class="course-details-content-lists-points">
          8 of 15.0
        </p>
      </div>
      <div class="course-details-content-lists">
        <p class="course-details-content-lists-name">
          Projects
        </p>
        <hr class="course-details-content-lists-line">
        <p class="course-details-content-lists-points">
          9 of 15.0
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import {api as ApiService} from '../services/api.service'
import JwtService from "../services/jwt.service";

export default {
  name: "Grades",
  data() {
    return {
      grades: null
    };
  },
  created() {
    this.fetchGrades()
  },
  methods: {
    fetchGrades(){
      let userUuid = JwtService.getUserUuid()
      let url = `results/week/${userUuid}/?week=${this.currentModuleUuid}`
      ApiService(url)
      .then(
        ({data}) => {
          console.log(data)
          this.grades = data
        }
      )
    }
  },
  computed: {
    ...mapGetters('course', ['currentModuleUuid'])
  },
  watch: {
    currentModuleUuid(){
      this.fetchGrades()
    }
  }
};
</script>

<style lang="scss" scoped>
  .course-details{
    width: 100%;
    min-width: 300px;
    background: #727272;
    border-radius: 5px;
    min-height: 84px;
    height: max-content;

    &-header{
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      width: 100%;
      height: 84px;
      box-sizing: border-box;

      &-grade{
        font-style: normal;
        font-weight: 500;
        
        font-size: 20px;
        line-height: 34px;
        color: #FFFFFF;
        @media screen and (max-width: 1600px) {
              font-size: 18px;
          }
      }

      &-overall{
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 44px;
        text-align: right;
        color: #FFFFFF;
        @media screen and (max-width: 1600px) {
              font-size: 18px;
          }
      }

    }

    &-content{
      width: 100%;
      background: #F1F4F3;
      &-lists{
        padding: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #F1F4F3;
        &-name{
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 29px;
          color: #505050;
          @media screen and (max-width: 1600px) {
              font-size: 20px;
          }
        }
        
        &-line{
          margin: 0 10px;
          width: calc(100% - 40px);
          padding: 0px;
          height: 0px;
          border: 1px solid #C6D2D2;
          background:  #C6D2D2;
        }

        &-points{
          width: 164px;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 29px;
          text-align: right;
          color: #505050;
          @media screen and (max-width: 1600px) {
              font-size: 20px;
          }
        }

      }
    }

  }
</style>
