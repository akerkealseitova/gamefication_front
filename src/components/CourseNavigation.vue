<template>
    <div class="course-navigation">
      <router-link to="/map">
          <img
            :src="backIcon"
          />
          Back to map
      </router-link>
      <div class="breadcrumbs">
        <router-link 
          v-for="(route, index) in breadcrumbs" 
          :key="index"
          :to="route.link"
        >
          {{route.title}}
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      backIcon: require("@/assets/images/arrow-alt-circle-left.svg"),
    }
  },
  computed: {
    breadcrumbs(){
      let capitalize = (s) =>  s.charAt(0).toUpperCase() + s.slice(1)
      let currentPath = this.$route.path
      let link = ''
      return currentPath.split('/').splice(1).map((route) => {
          link += '/' + route
          return {title: capitalize(route), link: link}
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .course-navigation {
    margin: 32px 0 32px 0;
    width: 100%;
    height: 80px;
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    font-weight: bold;
    a {
      display: flex;
      font-size: 18px;
      align-items: center;
      text-decoration: none;
      font-weight: bold;
      color: #2F4858;
      &:hover {
        color: #356380;
      }
      img {
        height: 100%;
        margin-right: 8px;
      }
    }
    .breadcrumbs {
      line-height: 24px;
      display: flex;
      color:  #2F4858;
      font-size: 32px;
      *::after {
        content: "/";
        margin-left: 5px;
        margin-right: 5px;
      }
      *:last-child::after{
        content: "";
      }
      
      @media screen and (max-width: 850px) {
        font-size: 24px
      }
    }
  }
</style>