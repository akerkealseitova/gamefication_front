<template>
  <div id="app" class="app">
    <side-nav-bar></side-nav-bar>
    <router-view/>
  </div>
</template>

<script>
import SideNavBar from './components/SideNavBar.vue';
import {mapActions, mapState} from 'vuex'

export default {
  components: {SideNavBar},
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  methods: {
    ...mapActions('course', ['initApp']),

    fixProblemWithViewHeight() {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty('--vh', `${vh}px`);

      // We listen to the resize event
      window.addEventListener('resize', () => {
        // We execute the same script as before
        let vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
      });
    },
  },
  created(){
    this.initApp()
  },
  mounted(){
    this.fixProblemWithViewHeight();
  }
}
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700&display=swap');
  @import './assets/styles/global.scss';

  html,body, .app{
    font-family: Montserrat, sans-serif;
    height: 100vh; 
    height: calc(var(--vh, 1vh) * 100);
    padding: 0;
    margin: 0;
  }
</style>
