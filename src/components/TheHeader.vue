<template>
  <div class="header">
    <h1>{{title}}</h1>
    <div class="badges">
      <!-- <badge-message></badge-message> -->
      <badge-profile></badge-profile>
    </div>
  </div>
</template>

<script>

import BadgeProfile from './BadgeProfile.vue'
// import BadgeMessage from './BadgeMessage.vue'

export default {
  name: "TheHeader",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    }
  },
  mounted() {},
  components: {
    BadgeProfile,
    // BadgeMessage,
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
  .header {
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 150px;
    z-index: 12;
    background: #fff;
    @media screen and (max-width: 850px) {
      overflow-y: hidden;
      position: fixed;
      height: 64px;
      margin-left: 64px;
      padding: 0 5px;
      width: calc(100% - 74px);
    }
    
    h1 {
      font-style: normal;
      font-size: 64px;
      color: #505050;
      @media screen and (max-width: 850px) {
        font-size: 30px;
      }
    }

    .badges {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      grid: 1fr 1fr;
      grid-column-gap: 16px;
      height: 64px;
      // background: red;
    }

  }
</style>
