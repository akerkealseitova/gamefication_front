<template>
  <map-svg-controller
    :isNavigationAllowed="isNavigationAllowed"
  >
    <map-quality-low-svg-container
    ></map-quality-low-svg-container>
  </map-svg-controller> 
</template>

<script>
import MapQualityLowSvgContainer from './MapQualityLowSvgContainer.vue';
import MapSvgController from './MapSvgController.vue';

export default {
  name: "MapQualityLowController",
  components: { MapQualityLowSvgContainer, MapSvgController },
  props: {
    isNavigationAllowed: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({ }),
  created(){
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>
