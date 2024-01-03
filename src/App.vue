<template>
  <body class="hold-transition sidebar-mini layout-fixed" v-if="isLoggedIn">
    <div class="wrapper">
      
      <Preloader></Preloader>
      <Navbar></Navbar>
      <Sidebar></Sidebar>

      <div class="content-wrapper">
        
        <ContentHeader></ContentHeader>

        <section class="content">
          <div class="container-fluid">
            <router-view></router-view>
          </div>
        </section>
        
      </div>
      
      <Footer></Footer>
      <ControlSidebar></ControlSidebar>
      
    </div>
  </body>
  <Login v-else></Login>
</template>

<script>
import $ from 'jquery'
import "../node_modules/admin-lte/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css"
import "../node_modules/admin-lte/plugins/select2/css/select2.min.css"

import Preloader from "./dashboard/Preloader.vue"
import ContentHeader from "./dashboard/ContentHeader.vue"
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
import ControlSidebar from "./dashboard/ControlSidebar.vue"
import Login from "./Login.vue"
import { computed } from 'vue';
import { useStore } from 'vuex';
import { mapActions } from 'vuex';

export default {
  name: "App",
  components: {
    Preloader,
    ContentHeader,
    Navbar,
    Sidebar,
    Footer,
    ControlSidebar,
    Login
  },
  methods: {
    ...mapActions(['logout']),
    initializeSelect2() {
      //Initialize Select2 Elements
      $(".select2").select2();

      //Initialize Select2 Elements
      $(".select2bs4").select2({
        theme: "bootstrap4",
      });
    },
    
  },
  mounted() {
    this.initializeSelect2()
  },
  setup() {
    const store = useStore(); // Ensure this line is present and correct
    const isLoggedIn = computed(() => store.state.isLoggedIn);

    return {
      isLoggedIn,
    };
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
