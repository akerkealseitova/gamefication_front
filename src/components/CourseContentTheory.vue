<template>
  <loading-component v-if="!module || module?.theories?.length <= 0"></loading-component>

  <div v-else class="theory">
    
    <ul class="video-links">
      <li
        v-for="(item, index) in videoLinks"
        :key="item.url"
      >
        <button
          class="link-box"
          :class="[index === currentVideoIndex ? 'active' : '']"
          @click="openVideo(index)"
        >
          <img :src="playCircle" alt="">
        </button>
      </li>
    </ul>
    
    <div class="placeholder-container" v-show="!loaded">
      <loading-component></loading-component>
    </div>
    <iframe 
      width="100%" 
      height="400" 
      :src="currentVideo" 
      @load="load"
      v-show="loaded"
      title="YouTube video player" 
      frameborder="0" 
      loading="lazy" 
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
      allowfullscreen
    >
    </iframe>

    <div class="attachments">
      <h2 class='attachments-title'> Attachments (click to download) </h2>
      <ul class="links">
        <li
          v-for="link in attachments"
          :key='link'
        >
          <a 
            :href="link" 
            target="_blank"
            class="link"
            download
          >
            {{attachmentTitle(link)}}
          </a>
        </li>
      </ul>
    </div>

    <router-link to="/course/contest" class="custom-button" >
      Next step →
    </router-link>

  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: "CourseContentTheory",
  data() {
    return {
      playCircle: require("@/assets/images/play-circle.svg"),
      currentVideoIndex: 0,
      loaded: false
    };
  },
  mounted() {
    let videoId = +this.$route.params?.id
    if( videoId )
      this.currentVideoIndex = videoId-1
  },
  computed: {
    ...mapGetters('course', ['videoLinks', 'attachments']),
    ...mapState('course', ['module']),
    currentVideo(){
      let url = this.videoLinks[this.currentVideoIndex]?.video
      if( !url ) 
        return ''
      let re = /watch\?v=/
      url = url.replace(re, '/embed/')
      let extraIndex = url.indexOf('&')
      if( extraIndex !== -1 )
        url = url.slice(0, extraIndex)
      return url;
    },
    attachments(){
      return [this.module?.theories[0]?.presentation]
    }
  },
  methods: {
    attachmentTitle(link){
      let pos = link?.lastIndexOf('/') + 1
      return '- ' + link?.substring(pos) 
    },
    openVideo(index){
      this.currentVideoIndex = index
      this.loaded = false
    },
    load(){
      this.loaded = true
    }
  },
};
</script>

<style lang="scss" scoped>
  .placeholder-container {
    height: 400px;
  }
  .theory {
    gap: 32px;

    .video-links {
      display: flex;
      *  {
        margin-left: 12px;
      }
      *:first-child {
        margin-left: 0;
      }

      .link-box {
        background: #5EBC32;
        display: inline-block;
        height: 64px;
        width: 64px;
        text-align: center;

        border-radius: 5px;

        cursor: pointer;

        &:before {
          content: "";
          display: inline-block;
          height: 100%;
          vertical-align: middle;
        }

        &:disabled {
          background: grey;
        }

        img {
          width: 42px;
          height: 42px;
          margin: 0 auto;
          vertical-align: middle;
        }
      }

      .active {
        background: #FF9A00;
      }

      .closed {
        background: red;
      }

      .watched {
        background: #5EBC32;
      }
    }

    .attachments {
      &-title {
        font-size: 16px;
        color: #C6D2D2;
        margin: 0;
      }
      .links {
        overflow: hidden;
        overflow-wrap: break-word;
        * {
          margin-bottom: 12px;
        }
        *:last-child {
          margin-bottom: 0px;
        }
        font-size: 24px;
        padding: 16px;
        border: 2px solid #F1F4F3;
        border-radius: 5px;
        .link {
          color: #2F4858;
          text-decoration: none;
          &:hover {
            color: #5EBC32;
          }
        }
      }
    }

  }
</style>
