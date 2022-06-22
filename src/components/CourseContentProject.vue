<template>

  <loading-component v-if="!module"></loading-component>

  <div v-else-if="!currentProject" class="course-content-quiz">
    <div class="course-content-quiz-link">
      <p class="course-content-quiz-link-name">
        No project in this module
      </p>
    </div>

    <router-link to="/course/minitests" class="custom-button" >
      Next step →
    </router-link>
  </div>

  <div v-else class="course-content-quiz">
    
    <div class="course-content-quiz-link">
      <p class="course-content-quiz-link-name">
        Project submission: 
      </p>
      <p class="date"> Date: {{startDate}} </p>
      <div class="course-linkbox">
        <a 
          :href="currentProject?.url"
          target="_blank" 
          class="course-linkbox-hackerrank"
        >
          {{currentProject?.url}}
        </a>
      </div>
    </div>
    <div class="course-content-quiz-main">
      <div class="course-content-quiz-main-linkbox"  v-if="!file">
        <div class="upload-btn-wrapper">
          <button class="btn">Upload a file</button>
          <input type="file" id="file" ref="file" @change="onChangeFileUpload"/>
        </div>
      </div>    
      <div class="loader-container" v-else>
        <loading-component size='42px'></loading-component>
      </div>

      <img class="course-content-quiz-main-button" :src="user" alt="">
    </div>

    <div class="attachments">
      <h2 class='attachments-title'> Attachments (click to download) </h2>
      <ul class="links">
        <li
          v-for="(attachment, index) in attachments"
          :key='index'
        >
          <a 
            :href="attachment.file" 
            class="link"
            download
          >
            {{attachmentTitle(attachment)}}
          </a>
          <button class="btn-delete" @click="deleteFile(attachment.uuid)"> 
            <img src="../assets/close.png" alt=""> 
          </button>
        </li>
      </ul>
    </div>

    <p class="message">{{message}}</p>
    
    <div class="buttons">
      <!-- <button  
        @click="uploadFile" 
        :disabled="!file"
        class="custom-button"
      >
        {{uploadText}} →
      </button> -->
      <router-link to="/course/minitests" class="custom-button" >
        Next step →
      </router-link>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import {api as ApiService} from '../services/api.service'

export default {
  components: {  },
  data: () => ({  
    file: null,
    progress: 0,
    message: '',
    user: require("@/assets/images/project.png"),
    uploadText: 'Upload file'
  }),
  created(){
  },
  methods: {
    ...mapActions('course', ['fetchModule']),
    onChangeFileUpload() {
      this.file = this.$refs.file.files[0]; 
      this.uploadFile()
    },
    uploadFile(){
      let formData = new FormData();
      formData.append("project", this.currentProject.uuid)
      formData.append("title", "Student's project work")
      formData.append("file", this.file);

      console.log(this.currentProject.uuid)
      this.uploadText = 'Uploading'

      ApiService.put('weeks/add_projects_attachments/', 
        formData,
          {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      .then(() => {
        this.uploadText = 'Upload'
        this.$toast.success(`Successfully uploaded`, {position: 'top', duration: 3000})
        this.fetchModule()
        this.file = null
        // this.$router.push("/course/minitests")
      })
      .catch(() => {
        this.progress = 0;
        this.file = null
        this.$refs.file.files = null
        this.message = 'Could not upload file'
        this.$toast.error(`Error`, {position: 'top', duration: 3000})
      })
    },
    deleteFile(attachmentUuid){
      ApiService.delete(`weeks/delete_projects_attachment/${attachmentUuid}/`)
      .then(() => {
        this.$toast.success(`File successfully deleted`, {position: 'top', duration: 3000})
        this.fetchModule()
      })
      .catch(() => {
        this.$toast.error(`Could not delete file`, {position: 'top', duration: 3000})
      })
    },
    attachmentTitle(link){
      return '- ' + link.title
    },
  },
  computed: {
    ...mapState('course', ['module']),
    currentProject(){
      return this.module?.projects[0]
    },
    attachments(){
      return this.currentProject?.project_attachments
    },
    startDate(){
      return new Date(this.currentProject.start_date).toLocaleString("en-US")
    }
  }
};
</script>

<style lang="scss" scoped>
  .message {
    color: red;
    margin: 0;
    padding: 0;
  }
  .upload-btn-wrapper {
    position: relative;
    overflow: hidden;
    display: inline-block;
  }

  .btn {
    border: 2px solid gray;
    color: gray;
    background-color: white;
    padding: 8px 20px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
  }

  .upload-btn-wrapper input[type=file] {
    font-size: 100px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
  }
  .course-content-quiz{
    gap: 32px;

    &-link{
      &-name{
        font-style: normal;
        font-weight: bold;
        font-size:30px;
        line-height: 37px;
        letter-spacing: 0.095em;
        color: #505050;
        @media only screen and (max-width: 850px) {
          font-size: 20px;
        }
      }

    }

    .date{ 
      color: #c6d3d4;
      padding: 12px 0;
      font-weight: 700;
      font-size: 18px;
    }

    &-main{
      display: flex;
      align-items: center;
        &-linkbox{
          margin-top: 10px;
          margin-right: 13px;
          padding: 0;
          display: flex;
          height: 48px;
          overflow: hidden;
          max-width: 530px;
          // border-bottom: 4px solid hsl(0, 0%, 45%);
          &-hackerrank{
            margin: 0 16px; 
            display: flex;
            align-items: center;
            height: 100%;
            width: 100%;
    
            // background:salmon;
            font-style: normal;
            font-weight: bold;
            font-size:22px;
            line-height: 27px;
            letter-spacing: 0.095em;
            color: #426B85;
            @media only screen and (max-width: 850px) {
              font-size: 16px;
            }
          }
    
        }
          &-button{
            margin-top: 5px;
            width: 50px;
            height: 50px;
          }
    }
    .attachments {
      max-width: 1000px;
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
        .btn-delete {
          border: none;
          background: none;
          margin-left: 12px;
          padding: 6px 12px;
          padding-bottom: 4px;
          cursor: pointer;
          img {
            height: 16px;
            width: 16px;
          }
        }
      }
    }
  }
  .buttons {
    width: 100%;
    max-width: 1000px;
    display: flex;
    gap: 24px;
  }
  .loader-container {
    width: 156px;
  }

  .course-linkbox{
      display: flex;
      align-items: center;
      height: 46px;
      overflow: hidden;
      margin: 0 16px;
      margin-top: 24px;
      padding: 0 8px;
      max-width: 516px;
      border: 2px solid #727171;
      border-radius: 5px;
      overflow: hidden;
      white-space: nowrap;
      align-items: center;

      &-hackerrank{
        display: flex;
        align-items: center;
        padding: 0px 8px;
        height: 100%;
        background: lightcyan;
        width: 100%;
        font-style: normal;
        font-weight: bold;
        font-size:22px;
        line-height: 27px;
        letter-spacing: 0.095em;
        color: #426B85;
        @media only screen and (max-width: 850px) {
          font-size: 16px;
        }
      }
  }
</style>
