import { defineAsyncComponent } from 'vue'

import LoadingComponent from '../components/LoadingComponent.vue'

const lazyLoadView = (component) =>
    defineAsyncComponent({
        loader: () => component,
        loadingComponent: LoadingComponent,
        // errorComponent: ErrorComponent,
        delay: 0, // default: 200
        timeout: 3000, // default: Infinity
        suspensible: true, // default: true
    })

export { lazyLoadView };