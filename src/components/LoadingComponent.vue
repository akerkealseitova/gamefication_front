<template>
  <div class="loader-component-parent">
    <bounce-loader :loading="true" :color="'#f79a2e'" :size="size"></bounce-loader>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
export default {
  name: "LoadingComponent",
  data() {
    return {
    }
  },
  props: {
    size: {
      type: String,
      default: '128px'
    }
  },
  components: {
    BounceLoader
  },
  mounted() {
  },
  methods: {
  },
};
</script>

<style scoped>
  .loader-component-parent  {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background: rgba(255, 255, 255, 0.6); */
  }
</style>