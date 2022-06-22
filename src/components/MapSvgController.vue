<template>
  <div class="world-map">
    <panZoom 
      :options="options"
      @init="onInit"
      selector="#world-map"
    >
      <slot> 
        <router-view></router-view>
      </slot>
    </panZoom>
    <map-quality-controller v-if="isNavigationAllowed" class="quality-controller"></map-quality-controller>
    <ul class="map-controllers" v-show="false">
      <li><button @click="center"><img :src="controllerIcons.center.image" alt=""/></button></li>
      <li><button @click="zoomIn"><img :src="controllerIcons.zoomIn.image" alt=""/></button></li>
      <li><button @click="zoomOut"><img :src="controllerIcons.zoomOut.image" alt=""/></button></li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import MapQualityController from './MapQualityController.vue';

export default {  
  name: "MapSvgController",
  components: { MapQualityController },
  props: {
    isNavigationAllowed: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({ 
    controllerIcons: {
      center: {
        image: require("@/assets/images/Vector.png"),
      },
      zoomIn: {
        image: require("@/assets/images/Book.png"),
      },
      zoomOut: {
        image: require("@/assets/images/Cup.png"),
      }
    },
    options: {
      minZoom: 0.75, 
      maxZoom: 4, 
      initialZoom: 2.5,
      initialX: null,
      initialY: null,
      bounds: true,
      boundsPadding: 0.1
    },
    containerDimensions: {
      x: 1630,
      y: 1080
    },
    panZoom: null,
    loader: null,
  }),
  computed: {
    ...mapState('course', ['targetPosition']),
  },
  methods: {
    ...mapActions('course', ['openModule']),
    onInit(panZoom){
      this.panZoom = panZoom
      this.center()
      this.setTransformOrigin()
    },
    center(){
      this.changePosition(this.targetPosition);
    },
    changePosition(position){ 
      this.setDefaultZoom()

      let fault = 300
      if( position.x > 350 ){
        fault = -550
      }

      let x = -position.x + fault
      let y = -position.y

      this.panZoom.smoothMoveTo(x, y);
    },
    setTransformOrigin(){
    },
    setDefaultZoom(){
      this.panZoom.getTransform().scale = this.options.initialZoom
    },
    zoomIn(x = 0.5, y = 0.5){
      // first 2 arguments for point
      // third argument -> if greater than 1 - zoom in
      this.panZoom.zoomTo(x, y, 1.5);
    },
    zoomOut(){
      // first 2 arguments for point
      // third argument -> if greater than 1 - zoom out
      this.panZoom.zoomTo(0.5, 0.5, -1);
    },
    bridge(event){
      this.$emit("onBulletPointChosen", event.path[0].id)
    },
  },
  watch: {
    targetPosition(newValue) {
      // console.log(`Updating from ${oldValue} to ${newValue}`);
      this.changePosition(newValue)
    },
  },
};
</script>

<style lang="scss" scoped>
  .world-map {
    position: relative;

    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;

    // background: #3a7bd5;  /* fallback for old browsers */
    // background: linear-gradient(-45deg, #48b3bb, #3c86e7, #1c55be, #184380);
    // animation: gradient 20s ease infinite;
    // background-size: 400% 400%;

    $color: #1e7fc4;
    background: radial-gradient(ellipse at center, $color 0%, darken($color, 50%) 100%);

    .quality-controller {
      @media screen and (max-width: 850px ) {
        width: calc(100% - 64px);
      }
    }

    .map-controllers {
      position: absolute;
      bottom: 0;
      right: 0;
      margin: 0;
      
      display: flex;
      align-items: center;

      button {
        background: #525151;
        box-sizing: border-box;
      
        height: 64px;
        width: 64px;
        padding: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        cursor: pointer;

        border: none;
        border-right: solid 1px #fcfcfc;

        &:last-child {
          border-right: none;
        }

        &:hover {
          background-color: rgb(34, 32, 32);
        }     
        &:focus {
          background-color: #fac931;
          outline: none;
        }

        > img {
          height: 24px;
          width: 24px;
        }
      }
    }
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

</style>
