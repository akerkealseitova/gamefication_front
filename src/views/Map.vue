<template>
  <div class="map">
    <router-view
      class="map-svg-controller"
    ></router-view>
    <course-list 
      v-show="isCourseListShown"
      class="course-list"
    ></course-list>
    <map-module-info v-show="isModuleInfoShown">
    </map-module-info>
  </div>
</template>

<script>
import CourseList from "@/components/CourseList"
import {lazyLoadView} from "../services/lazyLoad.service"
import {mapState} from 'vuex'

export default {
  name: "Map",
  components: {
    CourseList,
    MapModuleInfo: lazyLoadView(import('../components/MapModuleInfo.vue')),
  },
  data() {
    return {
      mobileMaxWidth: 850,
    }
  },
  created(){
  },
  methods: {
  },
  computed: {
    ...mapState('course', ['isModuleInfoShown']),
    isCourseListShown(){
      let width = window.screen.width
      return !this.isModuleInfoShown && width > this.mobileMaxWidth
    }
  }
}
</script>

<style lang="scss" scoped>
  .map{
    overflow: hidden;    
    background: #fff;
    display: flex;
    /* align-items: center;
    justify-content: center; */
    height: 100%;
    margin: 0;
    padding: 0;
    @media all and (max-width: 850){
    }
    
    &-svg-controller {
    }

    .course-list {
      box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    }
  }
</style>
