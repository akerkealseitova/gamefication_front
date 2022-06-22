<template>
  <layout-with-header class="course" title="Course">
    <template v-slot:main>
      <course-navigation></course-navigation>
      <div class="course-main">
        <!-- left side -->
        <div class="course-main-content">
          <h4 class="course-main-panel-title">Current assignments</h4>
          <div class="content">
            <!-- /quiz, /contest, /project -->
            <router-view class="content-wrapper">
            </router-view>
          </div>
          <!-- <course-module-progress>
          </course-module-progress> -->
        </div>
        <!-- right side -->
        <div class="course-main-side">
          <h4 class="course-main-panel-title">Course details</h4>
          <course-grade></course-grade>
          <course-comments>
          </course-comments>
          <!-- links -->
          <!-- <div class="course-main-side-quick-actions">
            <h4 class="course-main-panel-title bottom-border">Quick actions</h4>
            <ul>
              <li><a href="">Contact teacher</a></li>
              <li><a href="">Report a tachnical problem</a></li>
              <li><a href="">Tutorial</a></li>
            </ul>
          </div> -->
        </div>
      </div>
    </template>
  </layout-with-header> 
</template>

<script>
import LayoutWithHeader from "../layouts/LayoutWithHeader";
import CourseComments from "../components/CourseComments";
import CourseGrade from "../components/CourseGrade";
// import CourseModuleProgress from "../components/CourseModuleProgress";
import CourseNavigation from "../components/CourseNavigation";
import { mapState } from 'vuex';
export default {
  name: "Course",
  data() {
    return {};
  },
  created(){
    if(this.moduleId === null)
      this.$router.push('/map')
  },
  mounted() {
  },
  methods: {
  },
  computed: {
    ...mapState('course', ['moduleId'])
  },
  components: {
    LayoutWithHeader,
    CourseNavigation,
    // CourseModuleProgress,
    CourseComments,
    CourseGrade,
  },
};
</script>

<style lang="scss" scoped>
.course {
  height: max-content;
  padding-bottom: 64px;
  &-main {
    width: 100%;      
    display: flex;
    
    @media only screen and (max-width: 1375px) {
      flex-direction: column;
    }
    
    &-panel-title {
      text-align: left;
      width: 100%;
      color: #C6D2D2;
    }

    &-content {
      // position: relative;
      width: 100%;
      padding-right: 24px;
      @media only screen and (max-width: 1375px) {
        padding-right: 0px;
        padding-bottom: 32px;
      }
      .content {
        margin-bottom: 32px;
        &-wrapper {
          display: flex;
          flex-flow: column;
          min-height: 250px;
          height: 100%;
        }        
      }
    }
    
    &-side {
      flex-shrink: 0; 
      flex-basis: 550px;
      padding: 24px 0;
      display: flex;
      flex-flow: column;
      // gap: 20px;
      // justify-content: space-between;
      align-items: center;
      & > * {
        margin-top: 32px;
        &:nth-child(1), &:nth-child(2){
          margin-top: 0;
        }
      } 
      @media screen and (max-width: 850px) {
        padding: 16px 0;
      }

      &-quick-actions {
        width: 100%;
        .bottom-border {
          margin-top: 5px;
          padding-top: 0;
          padding-bottom: 3px;
          border-bottom: 1px solid #C6D2D2;
        }
        ul {
          list-style: none;
          padding: 0;
          li {
            margin: 5px 0;
            a {
              text-decoration: none;
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>
