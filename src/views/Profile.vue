
<template>
  <layout-with-header class="course" title="Profile">
    <template v-slot:main>
      <div class="profile">
        <loading-component v-if="!user"></loading-component>
        <div class="profile-card js-profile-card" v-else>
          <div class="profile-card__img">
            <img :src="picture" alt="profile card">
          </div>

          <div class="profile-card__cnt js-profile-cnt">
            <div class="profile-card__name">{{user.first_name + ' ' + user.last_name}}</div>
            <div class="profile-card__txt">Username <strong>{{user.username}}</strong></div>
            <div class="profile-card__txt">
              Email 
              <strong> 
                <a :href="'mailto:' + user.email" target="_blank">
                  {{user.email}}
                </a>
              </strong>
            </div>
            <div class="profile-card-loc">
              <span class="profile-card-loc__icon">
                <svg class="icon"><use xlink:href="#icon-location"></use></svg>
              </span>

              <span class="profile-card-loc__txt">
                Suleyman Demirel University
              </span>     
            </div>

            <div class="profile-card-ctr">
              <button class="custom-button profile-card__button button--grey mt-1" @click="logout">Logout</button>
            </div>
          </div>
        </div>
      </div>

      <svg hidden="hidden">
        <defs>
          <symbol id="icon-location" viewBox="0 0 32 32">
            <title>location</title>
            <path d="M16 31.68c-0.352 0-0.672-0.064-1.024-0.16-0.8-0.256-1.44-0.832-1.824-1.6l-6.784-13.632c-1.664-3.36-1.568-7.328 0.32-10.592 1.856-3.2 4.992-5.152 8.608-5.376h1.376c3.648 0.224 6.752 2.176 8.608 5.376 1.888 3.264 2.016 7.232 0.352 10.592l-6.816 13.664c-0.288 0.608-0.8 1.12-1.408 1.408-0.448 0.224-0.928 0.32-1.408 0.32zM15.392 2.368c-2.88 0.192-5.408 1.76-6.912 4.352-1.536 2.688-1.632 5.92-0.288 8.672l6.816 13.632c0.128 0.256 0.352 0.448 0.64 0.544s0.576 0.064 0.832-0.064c0.224-0.096 0.384-0.288 0.48-0.48l6.816-13.664c1.376-2.752 1.248-5.984-0.288-8.672-1.472-2.56-4-4.128-6.88-4.32h-1.216zM16 17.888c-3.264 0-5.92-2.656-5.92-5.92 0-3.232 2.656-5.888 5.92-5.888s5.92 2.656 5.92 5.92c0 3.264-2.656 5.888-5.92 5.888zM16 8.128c-2.144 0-3.872 1.728-3.872 3.872s1.728 3.872 3.872 3.872 3.872-1.728 3.872-3.872c0-2.144-1.76-3.872-3.872-3.872z"></path>
            <path d="M16 32c-0.384 0-0.736-0.064-1.12-0.192-0.864-0.288-1.568-0.928-1.984-1.728l-6.784-13.664c-1.728-3.456-1.6-7.52 0.352-10.912 1.888-3.264 5.088-5.28 8.832-5.504h1.376c3.744 0.224 6.976 2.24 8.864 5.536 1.952 3.36 2.080 7.424 0.352 10.912l-6.784 13.632c-0.32 0.672-0.896 1.216-1.568 1.568-0.48 0.224-0.992 0.352-1.536 0.352zM15.36 0.64h-0.064c-3.488 0.224-6.56 2.112-8.32 5.216-1.824 3.168-1.952 7.040-0.32 10.304l6.816 13.632c0.32 0.672 0.928 1.184 1.632 1.44s1.472 0.192 2.176-0.16c0.544-0.288 1.024-0.736 1.28-1.28l6.816-13.632c1.632-3.264 1.504-7.136-0.32-10.304-1.824-3.104-4.864-5.024-8.384-5.216h-1.312zM16 29.952c-0.16 0-0.32-0.032-0.448-0.064-0.352-0.128-0.64-0.384-0.8-0.704l-6.816-13.664c-1.408-2.848-1.312-6.176 0.288-8.96 1.536-2.656 4.16-4.32 7.168-4.512h1.216c3.040 0.192 5.632 1.824 7.2 4.512 1.6 2.752 1.696 6.112 0.288 8.96l-6.848 13.632c-0.128 0.288-0.352 0.512-0.64 0.64-0.192 0.096-0.384 0.16-0.608 0.16zM15.424 2.688c-2.784 0.192-5.216 1.696-6.656 4.192-1.504 2.592-1.6 5.696-0.256 8.352l6.816 13.632c0.096 0.192 0.256 0.32 0.448 0.384s0.416 0.064 0.608-0.032c0.16-0.064 0.288-0.192 0.352-0.352l6.816-13.664c1.312-2.656 1.216-5.792-0.288-8.352-1.472-2.464-3.904-4-6.688-4.16h-1.152zM16 18.208c-3.424 0-6.24-2.784-6.24-6.24 0-3.424 2.816-6.208 6.24-6.208s6.24 2.784 6.24 6.24c0 3.424-2.816 6.208-6.24 6.208zM16 6.4c-3.072 0-5.6 2.496-5.6 5.6 0 3.072 2.528 5.6 5.6 5.6s5.6-2.496 5.6-5.6c0-3.104-2.528-5.6-5.6-5.6zM16 16.16c-2.304 0-4.16-1.888-4.16-4.16s1.888-4.16 4.16-4.16c2.304 0 4.16 1.888 4.16 4.16s-1.856 4.16-4.16 4.16zM16 8.448c-1.952 0-3.552 1.6-3.552 3.552s1.6 3.552 3.552 3.552c1.952 0 3.552-1.6 3.552-3.552s-1.6-3.552-3.552-3.552z"></path>
          </symbol>
          <symbol id="icon-link" viewBox="0 0 32 32">
            <title>link</title>
            <path d="M17.984 11.456c-0.704 0.704-0.704 1.856 0 2.56 2.112 2.112 2.112 5.568 0 7.68l-5.12 5.12c-2.048 2.048-5.632 2.048-7.68 0-1.024-1.024-1.6-2.4-1.6-3.84s0.576-2.816 1.6-3.84c0.704-0.704 0.704-1.856 0-2.56s-1.856-0.704-2.56 0c-1.696 1.696-2.624 3.968-2.624 6.368 0 2.432 0.928 4.672 2.656 6.4 1.696 1.696 3.968 2.656 6.4 2.656s4.672-0.928 6.4-2.656l5.12-5.12c3.52-3.52 3.52-9.248 0-12.8-0.736-0.672-1.888-0.672-2.592 0.032z"></path>
            <path d="M29.344 2.656c-1.696-1.728-3.968-2.656-6.4-2.656s-4.672 0.928-6.4 2.656l-5.12 5.12c-3.52 3.52-3.52 9.248 0 12.8 0.352 0.352 0.8 0.544 1.28 0.544s0.928-0.192 1.28-0.544c0.704-0.704 0.704-1.856 0-2.56-2.112-2.112-2.112-5.568 0-7.68l5.12-5.12c2.048-2.048 5.632-2.048 7.68 0 1.024 1.024 1.6 2.4 1.6 3.84s-0.576 2.816-1.6 3.84c-0.704 0.704-0.704 1.856 0 2.56s1.856 0.704 2.56 0c1.696-1.696 2.656-3.968 2.656-6.4s-0.928-4.704-2.656-6.4z"></path>
          </symbol>
        </defs>
      </svg>
    </template>
  </layout-with-header> 
</template>

<script>
import LayoutWithHeader from "../layouts/LayoutWithHeader";
import { mapState, mapActions } from 'vuex';
import {api as ApiService} from '../services/api.service'

export default {
  name: "Profile",
  data() {
    return {
      userUuid: '',
      user: null,
      picture: require("@/assets/images/UserAvatar.png"),
    };
  },
  created(){
    this.fetchUserProfile()
  },
  mounted() {
  },
  methods: {
    ...mapActions(['logout']),
    fetchUserProfile(){
      ApiService.get('users/me/')
      .then(({data}) => {this.user = data})
      .catch(() => 
        this.$toast.error(`Could not get the data`, {position: 'top', duration: 3000})
      )
    }
  },
  computed: {
    ...mapState('auth', ['isAuthenticated']),
  },
  watch: {
    isAuthenticated(newVal){
      if(!newVal){
        this.$router.push('/auth/login')
      }
    }
  },
  components: {
    LayoutWithHeader,
  },
};
</script>

<style lang="scss" scoped>
  * {
    box-sizing: border-box;
  }

  a, a:hover {
    text-decoration: none;
    color: #324e63;
  }

  .icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    stroke-width: 0;
    stroke: currentColor;
    fill: currentColor;
  }

  .profile {
    // height: 100%;
    width: 100%;
    height: auto;
    padding: 12px;
    display: flex;
    padding-top: 64px;

    @media screen and (max-width: 850px) {
      height: auto;
      min-height: 100vh;
    }

  }

  .profile-card {
    width: 100%;
    min-height: 400px;
    margin: auto;
    box-shadow: 0px 8px 60px -10px rgba(13,28,39,0.6);
    background: #fff;
    border-radius: 12px;
    max-width: 700px;
    position: relative;

    &.active {
      .profile-card__cnt {
        filter: blur(6px);
      }

      .profile-card-message,
      .profile-card__overlay {
        opacity: 1;
        pointer-events: auto;
        transition-delay: .1s;
      }

      .profile-card-form {
        transform: none;
        transition-delay: .1s;
      }
    }

    &__img {
      width: 150px;
      height: 150px;
      margin-left: auto;
      margin-right: auto;
      transform: translateY(-50%);
      background: #fff;
      border-radius: 50%;
      overflow: hidden;
      position: relative;
      z-index: 4;
      box-shadow: 0px 5px 50px 0px #FAC91B, 0px 0px 0px 7px rgba(206, 154, 58, 0.5);

      @media screen and (max-width: 576px) {
        width: 120px;
        height: 120px;
      }

      img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
      }

    }

    &__cnt {
      margin-top: -35px;
      text-align: center;
      padding: 0 20px;
      padding-bottom: 40px;
      transition: all .3s;
    }

    &__name {
      font-weight: 700;
      font-size: 24px;
      color: #324e63;
      margin-bottom: 15px;
    }

    &__txt {
      font-size: 18px;
      font-weight: 500;
      color: #324e63;
      margin-bottom: 15px;

      strong {
        //color: #ff2846;
        font-weight: 700;
      }

    }

    &-loc {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 18px;
      font-weight: 600;

      &__icon {
        display: inline-flex;
        font-size: 27px;
        margin-right: 10px;
        //color: #6944ff;
      }

    }

    &-inf {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      align-items: flex-start;
      margin-top: 35px;

      &__item {
        padding: 10px 35px;
        min-width: 150px;

        @media screen and (max-width: 768px) {
          padding: 10px 20px;
          min-width: 120px;
        }

      }

      &__title {
        font-weight: 700;
        font-size: 27px;
        //color: #6944ff;
        color: #324e63;
      }

      &__txt {
        font-weight: 500;
        margin-top: 7px;
      }

    }

    &-social {
      margin-top: 25px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      &__item {
        display: inline-flex;
        width: 55px;
        height: 55px;
        margin: 15px;
        border-radius: 50%;
        align-items: center;
        justify-content: center;
        color: #fff;
        background: #FAC91B;
        box-shadow: 0px 7px 30px rgba(43,98,169,0.5);
        position: relative;
        font-size: 21px;
        flex-shrink: 0;
        transition: all .3s;

        @media screen and (max-width: 768px) {
          width: 50px;
          height: 50px;
          margin: 10px;
        }

        @media screen and (min-width: 768px){
          &:hover {
            transform: scale(1.2);
          }
        }

        &.facebook {
          background: linear-gradient(45deg, #3b5998, #0078d7);
          box-shadow: 0px 4px 30px rgba(43, 98, 169, 0.5);
        }

        &.twitter {
          background: linear-gradient(45deg, #1da1f2,#0e71c8);
          box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.7);
        }

        &.instagram {
          background: linear-gradient(45deg, #405de6, #5851db, #833ab4, #c13584, #e1306c, #fd1d1d);
          box-shadow: 0px 4px 30px rgba(120, 64, 190, 0.6);
        }

        &.behance {
          background: linear-gradient(45deg, #1769ff, #213fca);
          box-shadow: 0px 4px 30px rgba(27, 86, 231, 0.7);
        }

        &.github {
          background: linear-gradient(45deg, #333333, #626b73);
          box-shadow: 0px 4px 30px rgba(63, 65, 67, 0.6);
        }

        &.codepen {
          background: linear-gradient(45deg, #324e63, #414447);
          box-shadow: 0px 4px 30px rgba(55, 75, 90, 0.6);
        }

        &.link {
          background: linear-gradient(45deg, #d5135a, #f05924);
          box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.6);
        }

      }

      .icon-font {
        display: inline-flex;
      }

    }

    &-ctr {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 40px;

      @media screen and (max-width: 576px) {
        flex-wrap: wrap;
      }

    }

    &__button {
      background: none;
      border: none;
      font-family: 'Quicksand', sans-serif;
      font-weight: 700;
      font-size: 19px;
      margin: 15px 35px;
      // padding: 15px 40px;
      min-width: 201px;
      border-radius: 50px;
      min-height: 55px;
      color: #fff;
      cursor: pointer;
      backface-visibility: hidden;
      transition: all .3s;

      @media screen and (max-width: 768px) {
        min-width: 170px;
        margin: 15px 25px;
      }

      @media screen and (max-width: 576px) {
        min-width: inherit;
        margin: 0;
        margin-bottom: 16px;
        width: 100%;
        max-width: 300px;

        &:last-child {
          margin-bottom: 0;
        }
      }

      &:focus {
        outline: none!important;
      }

      @media screen and (min-width: 768px) {
        &:hover {
          transform: translateY(-5px);
        }
      }

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }

      &.button--grey {
        background: linear-gradient(45deg, #616466, #3a3b3b);
        box-shadow: 0px 4px 30px rgba(105, 106, 107, 0.4);

        &:hover {
          box-shadow: 0px 7px 30px rgba(55, 59, 61, 0.75);
        }

      }

      &.button--blue {
        background: linear-gradient(45deg, #1da1f2, #0e71c8);
        box-shadow: 0px 4px 30px rgba(19, 127, 212, 0.4);

        &:hover {
          box-shadow: 0px 7px 30px rgba(19, 127, 212, 0.75);
        }

      }

      &.button--orange {
        background: linear-gradient(45deg, #d5135a, #f05924);
        box-shadow: 0px 4px 30px rgba(223, 45, 70, 0.35);

        &:hover {
          box-shadow: 0px 7px 30px rgba(223, 45, 70, 0.75);
        }

      }

      &.button--gray {
        box-shadow: none;
        background: #dcdcdc;
        color: #142029;
      }

    }

    &-message {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 130px;
      padding-bottom: 100px;
      opacity: 0;
      pointer-events: none;
      transition: all .3s;
    }

    &-form {
      box-shadow: 0 4px 30px rgba(15, 22, 56, 0.35);
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
      height: 100%;
      background: #fff;
      border-radius: 10px;
      padding: 35px;
      transform: scale(.8);
      position: relative;
      z-index: 3;
      transition: all .3s;

      @media screen and (max-width: 768px) {
        max-width: 90%;
        height: auto;
      }

      @media screen and (max-width: 576px) {
        padding: 20px;
      }

      &__bottom {
        justify-content: space-between;
        display: flex;

        @media screen and (max-width: 576px) {
          flex-wrap: wrap;
        }

      }

    }

    textarea {
      width: 100%;
      resize: none;
      height: 210px;
      margin-bottom: 20px;
      border: 2px solid #dcdcdc;
      border-radius: 10px;
      padding: 15px 20px;
      color: #324e63;
      font-weight: 500;
      font-family: 'Quicksand', sans-serif;
      outline: none;
      transition: all .3s;

      &:focus {
        outline: none;
        border-color: #8a979e;
      }

    }

    &__overlay {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      pointer-events: none;
      opacity: 0;
      background: rgba(22, 33, 72, 0.35);
      border-radius: 12px;
      transition: all .3s;
    }

  }
</style>
