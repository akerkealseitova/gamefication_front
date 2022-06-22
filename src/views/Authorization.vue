<template>
  <layout-two-columns class="auth">
    <template v-slot:left>
      <div class="auth-form">

        <img src="../assets/images/QuarterCircle.svg" class="vector-item vector-item-one" alt="">
        <img src="../assets/images/VectorBlack.svg" class="vector-item vector-item-two" alt="">

        <div class="auth-form-container">
          <h1>Java Course</h1>
          <div class="auth-form-container-form">
            <router-view></router-view>
          </div>
          <p class="auth-form-container-footer">
            © 2020 Suleyman Demirel University. 
            <br/>
            All rights reserved.
          </p>
        </div>
      </div>
    </template>
    <template v-slot:right>
      <map-controller :isNavigationAllowed="false"></map-controller>
    </template>
  </layout-two-columns>
</template>

<script>
import LayoutTwoColumns from "../layouts/LayoutTwoColumns";
import { lazyLoadView } from '../services/lazyLoad.service'

export default {
  name: "Authorization",
  data() {
    return {};
  },
  created() {},
  methods: {},
  components: {
    LayoutTwoColumns,
    MapController: lazyLoadView(import("../components/MapQualityLowSvgController.vue"))
  },
};
</script>

<style lang="scss" scoped>
  .app, html {
    background-color: #525151;
  }
  .auth {
    &-form {
      position: relative;
      height: 100%;
      background: #525151;

      .vector-item {
        position: absolute;
        z-index: 1;
        &-one {
          width: 35%;
          top: 0;
          right: 0;
        }
        &-two {
          bottom: 0;
          width: 70%;
          left: 0;
        }
      }

      &-container {
        display: flex;
        flex-flow: column;
        justify-content: space-between;

        padding: 24px;
        height: calc(100% - 64px);

        z-index: 5;
        // background: red;
        color: #fff;

        > * {
          z-index: inherit;
          margin: 0;
        }

        h1 {
          margin-left: 48px;
        }

        &-form {
          // background: darkorange;
          padding-bottom: 64px;
          
        }

        &-footer {
          font-size: 13px;
        }

      }

    }
  }
</style>
