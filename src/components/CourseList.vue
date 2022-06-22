<template>
  <div class="wrapper">
    <h1 class="header">Syllabus</h1>
    <loading-component v-if="isModulesLoading"></loading-component>
    <ul v-else class="list">
      <li 
        class="list-item"
        v-for="(item, index) in moduleStates"
        :key='index'
        @click="openModule({'id':index})"
        v-tooltip="{
                  text: 'Module is unavailable',
                  show: item.state === 'CLOSE'
                }"
      >
        <button>
          <bounce-loader class="circle" :loading="true" :color="colorByState(item.state)" :size="'32px'"></bounce-loader>
        </button>
        <span >{{item.number}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import {mapActions, mapState} from "vuex"

export default {
  data: () => ({ 
  }),
  components: { 
    BounceLoader
  },
  created(){
  },
  computed: { 
    ...mapState('course', ['moduleStates', 'isShowCourseInfo', 'colors']),
    isModulesLoading(){
      return !this.moduleStates
    }
  }, 
  methods: {
    ...mapActions('course', ['openModule', 'fetchModules']),
    colorByState(state){
      return this.colors[state]
    }
  }
};
</script>

<style lang="scss" scoped>
  .wrapper {
    min-height: 100%;
    min-width: 30%;
    width: 40%;
    overflow-y: scroll;
    background: #525151;  

    z-index: 0;

    @media screen and (max-width: 850px) {
      // position: absolute;
      // z-index: 15;
      width: 100%;
    }

    .header {
      box-sizing: border-box;
      padding-left: 16px;
      height: 64px;
      line-height: 64px;
      background: #525151;  
      margin: 0;
      color: #fff;
      border-bottom: 1px solid rgb(124, 122, 122);
      border-top: 1px solid rgb(124, 122, 122);
      font-size: 24px;
    }

    .list {
      display: grid;
      grid-template-columns: auto;
      font-weight: 500;
      // background: #fff;
      color: #fff;
      .list-item {

        cursor: pointer;
        display: grid;
        grid-template-columns: 64px auto;
        height: 64px;
        border-bottom: 1px solid rgb(124, 122, 122);

        & > :first-child {
          border-right: 1px solid rgb(124, 122, 122);
          text-align: center;
          .circle {
            display: inline-block;
            vertical-align: middle;
            height: 32px;
            width: 32px;
            border-radius: 50%;
          }
          .red {
            background-color: red
          }
          .green {
            background-color: green
          }
        }
        & > :not(:first-child) {
          padding: 0 12px;
        }
        &:first-child {
          @media screen and (max-width: 850px) {
            border-top: 1px solid #000;
          }
        }
        &:last-child {
          // border-bottom: none;
        }
        & > * {
          height: 100%;
          line-height: 64px;
          background: transparent;
          border: none;
        }
        &:hover {
          background-color: rgb(34, 32, 32);
          .tooltip {
            visibility: visible;   
          }
        }
        button:focus, button:active {
          outline: none;
        }

      }
      
    }
  }
</style>
