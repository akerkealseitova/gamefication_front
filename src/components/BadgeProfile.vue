<template>

  <router-link class="badge-profile" to="/profile">
    <img :src="user" class="badge-profile-userPicture" alt=""> 
    <span class="badge-profile-text">Profile</span>
  </router-link>

</template>

<script>

export default {
  components: {  },
  data: () => ({  
    user: require("@/assets/images/User-icon.png"),
  }),
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .badge-profile {
    width: 200px;
    height: 60px;
    border: 1px solid #C6D2D2;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    background: #fff;   
    text-decoration: none;
    display: flex;
    align-items: center;
    @media screen and (max-width: 850px) {
      height: 48px;
      width: 48px;
    }
    &-userPicture{
      width: 60px;
      height: 60px;
      // margin-top: -0.75px;
      // margin-left: -0.5px;
      border: none;

      @media screen and (max-width: 850px) {
        height: 48px;
        width: 48px;
      }
    }
    &-text {
      // background: red;
      color: #505050;
      line-height: 60px;
      width: 100%;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      @media screen and (max-width: 850px) {
        display: none;
      }
    }
  }

</style>
