<template>
  <div class="world-map">
    <course-list></course-list>
    <map-quality-controller></map-quality-controller>
  </div>
</template>
<script>
import MapQualityController from './MapQualityController.vue';
import CourseList from './CourseList.vue';

export default {
  components: { MapQualityController, CourseList },
  data: () => ({ 
  }),
  created(){
  },
  methods: {
    bridge(event){
      this.$emit("onBulletPointChosen", event.path[0].id)
    },
  }
};
</script>

<style lang="scss" scoped>
  .world-map {
    position: relative;

    width: 100%;
    min-height: 100vh;
    overflow-y: scroll;
    margin: 0;
    margin-left: 64px;
    padding: 0;    
      
    background-size: 400% 400%;
    animation: gradient 30s ease infinite;

    @media screen and (max-width: 850px) {
      padding-top: 64px;
      margin-left: 0;
    }

  }

  .red {
    color: red
  }
  .green {
    color: green
  }
</style>
