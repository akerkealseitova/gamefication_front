<template>
  <div 
    class="sidebar "
    :class="{'sidebar-active': isNavBarActive}"
  >
    <div class="menu">
      <div class="menu-logo">
        <!-- <router-link to="/" class="menu-logo-router">
          <img :src="logoImg" alt="">
        </router-link> -->
        <div class="menu-logo-router" @click="toggleNavBar">
          <img :src="menuIcon" alt="logo">
        </div>
      </div>
      <div
        v-for="(value, link) in navLinks"
        :key="link"
        :class="{ active: isChosen(link) }"
      >
        <router-link :to="'/' + link">
          <div class="menu-elem">
            <img :src="value.image" alt="" />
          </div>
        </router-link>
      </div>
    </div>
    <div class="profile-router">
      <router-link :to="{name: 'Profile'}" class="img-router">
        <img src="../assets/images/User-icon.png" alt="" />
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      logoImg: require("@/assets/images/logo.png"),
      menuIcon: require("@/assets/images/burger-menu-icon.svg"),
      navLinks: {
        'map': {
          image: require("@/assets/images/Vector.png"),
        },
        'course': {
          image: require("@/assets/images/Book.png"),
        },
        // 'leaderboard': {
        //   image: require("@/assets/images/Cup.png"),
        // },
        // 'statistics': {
        //   image: require("@/assets/images/Segment.png"),
        // },
        // 'settings': {
        //   image: require("@/assets/images/Settings.png"),
        // },
      },
      isNavBarActive: true,
    };
  },
  mounted() {
  },
  methods: {
    isChosen(link) {
      let currentPath = this.$route.path.split('/')[1]
      return link === currentPath
    },
    toggleNavBar() {
      this.isNavBarActive ^= true
    },
    isMobileDevice() {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
  },
  watch: {
    '$route' (){
      if( this.isMobileDevice() )
        this.isNavBarActive = false
    }
  }
};
</script>

<style lang="scss">
.sidebar {
  background: #525151;
  min-width: 64px;
  height: 64px;
  overflow: hidden;
  transition: 0.3s all ease;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // border-bottom: 1px solid rgb(124, 122, 122);
  // border-right: 1px solid rgb(124, 122, 122);
  box-sizing: border-box;
  z-index: 12;
  &-active {
    height: 100%; /* Fallback for browsers that do not support Custom Properties */
    // height: calc(var(--vh, 1vh) * 100);
  }
}
.menu {
  &-elem {
    min-width: 64px;
    width: 64px;
    height: 64px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background-color: rgb(34, 32, 32);
    }
    @media (hover: none) {
      &:hover { background-color: inherit; }
    }
    > img {
      width: 24px;
    }
  }

  &-logo {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 64px;
    width: 64px;
    height: 64px;
    &-router {
      width: 64px;
      height: 64px;
      img {
        margin: 16px;
        height: 32px;
        width: 32px;
      }
    }
  }

}
.active {
  background-color: #fac91b;
  outline: none;
}

.profile-router {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-router {
  width: 48px;
  height: 48px;
  padding-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
    }
}

</style>
