<template>
  <div class="course-module">
    <div class="course-module-header">
      <p class="course-module-header-name">
        Module progress
      </p>
    </div>
    <div class="course-module-main-body">
        <h3 class="course-module-main-body-name">Earn +0.3 points to unblock next University</h3>
        
        <div class="course-module-main-body-prgs">
          <span class="course-module-main-body-prgs-bar">
            <span class="course-module-main-body-prgs-bar-progress"></span>
          </span>
          <img :src="crown" class="course-module-main-body-prgs-crown" alt="">
        </div>

        <div class="course-module-main-body-points">
          <p class="course-module-main-body-points-zero">0</p>
          <p class="course-module-main-body-points-overall">0.8/2.0 pts</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {  },
  data: () => ({ 
    crown: require("@/assets/images/crown-solid 1.png"),
   }),
  methods: {
  }
};
</script>

<style lang="scss" scoped>
  .course-module{
    background: #F1F4F3;
    padding: 0px 24px;
    border-radius: 5px;
    &-header{
      border-radius: 5px;
      display: flex;
      align-items: center;
      width: 100%;
      height: 88px;
      background: #F1F4F3;

      &-name{
        font-style: normal;
        font-weight: 500;
        font-size: 28px;
        line-height: 34px;
        color: #505050;
      }

    }

    &-main-body{
      border-radius: 5px;
      width: 100%;
      background: #F1F4F3;

      &-name{
        font-style: normal;
        font-weight: bold;
        font-size: 18px;
        line-height: 22px;
        color: #505050;
      }

      &-prgs{
        display: flex;
        justify-content: space-between;
        &-bar{
          margin: 30px 0;
          background: #C6D2D2;
          display: block;
          height: 10px;
          border-radius: 50px;
          width: 90%;
          height: 20px;
          &-progress{
            width: 40%;
            animation: prgs 2s;
          }
          span{
            height: 20px;
            float: left;
            background: #FAC91B;
            border-radius: 50px;
          }
        }
        
        &-crown{
          margin-left: 16px;
          align-self: center;
          width: 100%;
          max-width: 75px;
          height: 100%;
          max-height: 60px;
        }
      }

      &-points{
        display: flex;
        justify-content: space-between;
        &-zero{
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 44px;
          color: #C6D2D2;
        }

        &-overall{
          font-style: normal;
          font-weight: 600;
          font-size: 24px;
          line-height: 44px;
          text-align: right;
          color: #FAC91B;
        }
      }

    }
      @keyframes prgs {
        0%{
          width: 0%;
        }

        100%{
          width: 40%;
        }
      }

  }
</style>
