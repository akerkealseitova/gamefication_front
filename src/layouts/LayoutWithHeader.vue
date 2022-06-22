<template>
  <div class="wrapper">
    <the-header
      :title="title"
    ></the-header>
    <div class="wrapper-main">
      <slot name="main" >
      </slot>
    </div>
  </div>
</template>

<script>
import TheHeader from '../components/TheHeader'
export default {
  name: "LayoutWithHeader",
  data(){
    return {}
  },
  props: {
    title: {
      type: String,
      requierd: true
    }
  },
  components: {
    TheHeader,
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    height: max-content;
    // background-color: lightcoral;
    margin: 0;
    margin-left: 64px;
    padding: 0 64px;
    @media screen and (max-width: 850px) {
      margin: 0;
      padding: 0;
    }
    &-main {
      @media screen and (max-width: 850px) {
        padding: 64px 10px;
      }
    }
  }
</style>
