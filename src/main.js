import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import panZoom from 'vue-panzoom'
import Paginate from 'v-scroll-paginate';
import Toaster from "@meforma/vue-toaster";

import LoadingComponent from './components/LoadingComponent'

import tooltip from "./directives/tooltip.js";
import "./directives/tooltip.css";

createApp(App)
    .use(router)
    .use(store)
    .use(panZoom)
    .use(Paginate)
    .use(Toaster)
    .directive("tooltip", tooltip)
    .component('LoadingComponent', LoadingComponent)
    .mount('#app')