<template>
  <div class="wrapper">
    <div class="wrapper-left">
      <slot name="left" >
      </slot>
    </div>
    <div class="wrapper-right">
      <slot name="right" >
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutTwoColumns",
  data(){
    return {}
  },
  props: {
  },
  components: {
  },
};
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100%;
    // background-color: lightcoral;
    overflow: hidden;
    display: grid;
    grid-template-columns: 500px auto;
    margin: 0;
    margin-left: 64px;
    padding: 0;
    @media screen and (max-width: 800px) {
      margin: 0;
      padding: 0;
      grid-template-columns: auto;
    }
    &-left {
      -webkit-box-shadow: 5px 1px 8px 0px rgba(34, 60, 80, 0.2);
      -moz-box-shadow: 5px 1px 8px 0px rgba(34, 60, 80, 0.2);
      box-shadow: 5px 1px 8px 0px rgba(34, 60, 80, 0.2);
      z-index: 10;
      @media screen and (max-width: 800px) {
        width: 100%;
      }
    }
    &-right {
      @media screen and (max-width: 800px) {
        display: none;
      }
    }
  }
</style>
