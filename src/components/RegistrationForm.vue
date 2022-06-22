<template>
  <form class="form" @submit.prevent="onSubmit({...form1, ...form2})">
    <h2>Sign up</h2>
    <h5>Step {{step}}</h5>
    
    <!-- step 1 -->
    <div class="step" v-if="step == 1">
      <!-- Email Row -->
      <div class="form-group">
        <label for=""> Email address</label>
        <input 
          class="form-control" placeholder="Enter email" type="email" 
          v-model="v$.form1.email.$model"
          @click="resetEmailError"
        >
        <!-- Error Message -->
          <div class="input-errors" v-for="error in emailErrors" :key="error">
            <div class="error-msg">{{ error }}</div>
          </div>
      </div>

    <!-- Password and Confirm Password Row -->
      <div class="form-group">
        <label for=""> Password</label><input class="form-control" placeholder="Password" type="password" v-model="v$.form1.password.$model">
        <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.form1.password.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <div class="form-group">
        <label for="">Confirm Password</label><input class="form-control" placeholder="Confirm Password" type="password" v-model="v$.form1.confirmPassword.$model">
        <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.form1.confirmPassword.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <button class="submit-button" :disabled="v$.form1.$invalid" @click="step = 2" >next step</button>
    </div>

    <!-- step 2 -->
    <div class="step" v-if="step == 2">

      <!-- Username Row -->
      <div class="form-group">
        <label for=""> Username</label><input class="form-control" placeholder="Enter username" type="text" v-model="v$.form2.username.$model">
        <!-- Error Message -->
        <div class="input-errors" v-for="(error, index) of v$.form2.username.$errors" :key="index">
          <div class="error-msg">{{ error.$message }}</div>
        </div>
      </div>

      <!-- First and Last Name Row -->
      <div class="form-row">
        <div class="form-group">
          <label for=""> First Name</label><input class="form-control" placeholder="Enter first name" type="text" v-model="v$.form2.first_name.$model">
          <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form2.first_name.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-group">
          <label for="">Last Name</label><input class="form-control" placeholder="Enter last name" type="text" v-model="v$.form2.last_name.$model">
          <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form2.last_name.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>

      <!-- Student ID and mbti_type -->
      <div class="form-row">

        <!-- Student ID Row -->
        <div class="form-group">
          <label for=""> Student Id</label><input class="form-control" placeholder="Enter student id" type="text" v-model="v$.form2.student_id.$model">
          <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form2.student_id.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-group">
          <label for=""> MBTI type</label>
          <select name="Practice group" id="" v-model="v$.form2.mbti_type.$model">
            <option 
              v-for="type in mbtiTypes" 
              :key="type"
              :value="type" 
            >
              {{type}}
            </option>
          </select>
          <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form2.mbti_type.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

      </div>

      <!-- Lector group and practice group -->
      <div class="form-row">
        <div class="form-group">
          <label for="">Lector group </label>
          <!-- <input class="form-control" placeholder="Lector group" type="text" v-model="v$.form2.lector_group.$model"> -->
          <select name="Lector group" id="" v-model="v$.form2.lector_group.$model">
            <option 
              v-for="group in lectorGroups" 
              :key="group.uuid"
              :value="group.uuid" 
            >
              {{group?.title}}
            </option>
          </select>
          <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form2.lector_group.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

        <div class="form-group">
          <label for="">Practice group</label>
          <!-- <input class="form-control" placeholder="Practice group" type="text" v-model="v$.form2.practice_group.$model"> -->
          <select name="Practice group" id="" v-model="v$.form2.practice_group.$model">
            <option 
              v-for="group in practiceGroups" 
              :key="group.uuid"
              :value="group.uuid" 
            >
              {{group?.title}}
            </option>
          </select>
          <!-- Error Message -->
          <div class="input-errors" v-for="(error, index) of v$.form2.practice_group.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>

      </div>

      <button class="submit-button" :disabled="v$.form1.$invalid || v$.form2.$invalid" >Sign up</button>
      <router-link to="/auth/login" class="nav-button" >Log in</router-link>
    </div>
    
    <div class="" v-for="(error, index) of authErrors" :key="index">
      <p class="auth-error">{{ error }}</p>
    </div>
    
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import { REGISTER } from "@/store/actions.type";
import { mapActions } from 'vuex'
import {api as ApiService} from '../services/api.service'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)){
    return true;
  }
  return false;
}

export default {
name: "RegistrationForm",
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form1: {
        email: '',
        password: '',
        confirmPassword: '',
      },
      form2: {
        student_id: '',
        mbti_type: '',
        lector_group: '',
        practice_group: '',
        username: '',
        first_name: '',
        last_name: '',
      },
      errors: {},
      lectorGroups: [
        {
          title: 'Loading',
          uuid: '-1'
        },
      ],
      practiceGroups: [
        {
          title: 'Loading',
          uuid: '-1'
        },
      ],
      mbtiTypes: [
        'ISTJ', 
        'ISFJ', 
        'INFJ', 
        'INTJ', 
        'ISTP',
        'ISFP', 
        'INFP', 
        'INTP', 
        'ESTP', 
        'ESFP', 
        'ENFP', 
        'ENTP', 
        'ESTJ', 
        'ESFJ', 
        'ENFJ',
        'ENTJ'
      ],
      step: 1,
    }
  },
  validations() {
    return {
      form1: {
        email: { required, email },
        password: { required, min: minLength(6) },
        confirmPassword: { required, sameAs: sameAs(this.form1.password) }
      },
      form2: {
        student_id: {
          required
        },
        mbti_type: {
          required
        },
        username: {
          required
        },
        lector_group: {
          required
        },
        practice_group: {
          required
        },
        first_name: { 
          required, name_validation: {
            $validator: validName,
            $message: 'Invalid Name.'
          } 
        },
        last_name: { 
          required, name_validation: {
            $validator: validName,
            $message: 'Invalid Name.'
          } 
        },
      },
    }
  },
  created(){
    this.fetchLectorGroups();
    this.fetchPracticeGroups();
  },
  computed: {
    emailErrors(){
      let errors = this.v$.form1.email.$errors.map((item) => item.$message);
      // assign empty array if email errors not found
      let email = Object.is(this.errors.email, undefined) ? [] : this.errors.email;
      return [...errors, ...email]
    },
    authErrors(){
      return this.errors.non_field_errors
    }
  },
  methods: {
    ...mapActions('auth', [REGISTER]),
    fetchLectorGroups(){
      ApiService.get('users/lector_groups/').
        then( ({data}) => {
          this.lectorGroups = data
        })
    },
    fetchPracticeGroups(){
      ApiService.get('users/practice_groups/').
        then(({data}) =>  {
          this.practiceGroups = data
        })
    },
    resetEmailError(){
      this.errors.email = []
    },
    onSubmit(payload) {
      this.[REGISTER]({
          ...payload
        })
        .then(() => {
          // this.initApp()
          this.$router.push('/auth/login');
        })
        .catch((errors) => {
          this.errors = errors
          this.$router.push('/auth/login');
        });
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../assets/styles/form.scss';
</style>
