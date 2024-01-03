<!-- Login.vue -->
<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form @submit.prevent="login">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input type="text" class="form-control" id="username" v-model="username" required>
                </div>
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <input type="password" class="form-control" id="password" v-model="password" required>
                </div>
                <button type="submit" class="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['login']),
      login() {
        // Call the login action from the auth module
        this.$store.dispatch('login',{ email: this.username, password: this.password })
          .then(() => {
            // Redirect to the dashboard or any other route upon successful 
            this.$router.push('/dashboard');
          })
          .catch(error => {
            // Handle login failure
            console.error('Login failed:', error);
          });
      },
    },
    created() {
      // Check if access_token exists in session and set isLoggedIn accordingly
      const access_token = sessionStorage.getItem('access_token');
      if (access_token) {
        this.$store.commit('setAccessToken', access_token);
        this.$store.commit('checkSession');
        if (this.$store.state.isLoggedIn) {
          // Redirect to the dashboard or any other route
          this.$router.push('/dashboard');
        }
      }
    },
  };
  </script>
  
  <style scoped>
  /* Add any scoped styles here */
  </style>
  