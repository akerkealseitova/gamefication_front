<template>
    <foreignObject 
      v-for="(target, id) in targets"     
      :key="id" 
      class="target-container"
      width="30" height="30"
      :x="target.position.x"
      :y="target.position.y"
      @click="openModule({id, 'event': $event})" 
      @touchend="openModule({id, 'event': $event})"
    >
        <bounce-loader 
            class="target" 
            :loading="true" 
            :key="moduleId"
            :color="colorByState(id)" 
            :size="'24px'"
        ></bounce-loader>
        <span class="target-label">{{+id+1}}</span>
    </foreignObject>
</template>

<script>
import BounceLoader from 'vue-spinner/src/BounceLoader.vue'
import { mapState, mapActions } from 'vuex'

export default {
    name: "MapTargetPoints",
    components: {
        BounceLoader
    },
    data: () => ({ 
     }),
    created(){
    },
    computed: {
        ...mapState('course', ['targets', 'moduleId', 'moduleStates', 'colors']),
    },
    methods: {
        ...mapActions("course", ['openModule']),
        colorByState(id){
            if( id == this.moduleId ){
                return this.colors['ACTIVE']
            }
            if( !this.moduleStates )
                return this.colors['CLOSE']

            return this.colors[this.moduleStates[+id]?.state]
        }
    }
}
</script>

<style scoped>
   .target-container {
        position: relative;
        padding: 0;
        width: 30px;
    }

    .target-container .tooltip{
        position: absolute;
        z-index: 1;
        visibility: hidden;   

        height: 24px;
        width: 24px;

        background: green;
        border-radius: 5px;
    }

    .target-container:hover .tooltip {
        visibility: visible;   
    }

    .target-label {
        position: absolute;
        left: 50%;    
        top: 50%;
        transform: translate(-50%, -50%);    
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        font-size: 8px;
    }

    .target {
        position: absolute;
        left: 50%;    
        top: 50%;
        transform: translate(-50%, -50%);    
        box-sizing: border-box;
        padding: 0;
        cursor: pointer;
    }
</style>