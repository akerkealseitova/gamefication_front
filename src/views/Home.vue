<template>
  <div class="home">
    <map-controller></map-controller>
  </div>
</template>

<script>
// @ is an alias to /src
import MapQualityLowSvgController from '../components/MapQualityLowSvgController.vue'

export default {
  name: 'Home',
  components: {
    'MapController': MapQualityLowSvgController,
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
  .home {
    overflow: hidden;
    height: 100vh;
    margin: 0;
    padding: 0;
  }
</style>
