<template>

  <div class="badge">
    <img :src="user" class="badge-userPicture" alt="">
  </div>

</template>

<script>

export default {
  components: {  },
  data: () => ({ 
    message: 'messasge',
    user: require("@/assets/images/User-icon3.png"),
   }),
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .badge {
    width: 200px;
    height: 60px;
    margin: 0;
    padding: 0;
    background: #565656;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    
    @media screen and (max-width: 850px) {
      height: 48px;
      width: 48px;
      // background: rgba(0, 0, 0, 0.1);
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

  }
  
</style>
