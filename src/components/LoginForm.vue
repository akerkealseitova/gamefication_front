<template>
  <form class="form" @submit.prevent="onSubmit(form.email, form.password)">
    <h2>Log In</h2>

    <!-- Email Row -->
    <div class="form-group">
      <label for=""> Email address</label>
      <input class="form-control" placeholder="Enter email" type="email" v-model="v$.form.email.$model">
      <!-- Error Message -->
      <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>

    <!-- Password and Confirm Password Row -->
    <div class="form-group">
      <label for=""> Password</label><input class="form-control" placeholder="Password" type="password" v-model="v$.form.password.$model">
      <!-- Error Message -->
      <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
        <div class="error-msg">{{ error.$message }}</div>
      </div>
    </div>

    <!-- Submit Button -->
    <button class="submit-button" :disabled="v$.form.$invalid" >Log in</button>
    <router-link to="/auth/register" class="nav-button" >Sign up</router-link>
    
    <p>Forgot password? <a href="">Reset</a></p>

    <div class="" v-for="(error, index) of authErrors" :key="index">
      <p class="auth-error">{{ error }}</p>
    </div>

  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, } from '@vuelidate/validators'
import { LOGIN } from "@/store/actions.type";
import { mapActions } from 'vuex';

export default {
name: "RegistrationForm",
  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      errors: {}
    }
  },
    
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    }
  },
  computed: {
    authErrors(){
      return this.errors.non_field_errors
    }
  },
  methods: {
    ...mapActions('auth', [LOGIN]),
    ...mapActions('course', ['initApp']),
    onSubmit(email, password) {
      this.[LOGIN]({
          email,
          password
        })
        .then(() => {
          this.initApp()
          this.$router.push({ name: "Map" });
        })
        .catch((errors) => this.errors = errors );
    }
  },

}
</script>

<style lang="scss" scoped>
@import '../assets/styles/form.scss';
</style>
