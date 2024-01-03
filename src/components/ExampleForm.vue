<template>
  <div class="card card-default">
    <div class="card-header">
      <h3 class="card-title">Select2 (Default Theme)</h3>

      <div class="card-tools">
        <button type="button" class="btn btn-tool" data-card-widget="collapse">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" class="btn btn-tool" data-card-widget="remove">
          <i class="fas fa-times"></i>
        </button>
      </div>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col-md-6">
          <!-- Form for creating data -->
          <form @submit.prevent="createData">
            <div class="form-group">
              <label for="newState">New State</label>
              <input type="text" class="form-control" :value="inputValue" id="newState" @input="updateInputState($event.target.value)" required>
            </div>
            <div class="form-group">
              <label for="">Image</label>
              <input type="file" @change="handleFileChange" />
            </div>
            <button type="submit" class="btn btn-primary">Create State</button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12">
          <h2>State List</h2>
          <table class="table table-condensed">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="state in paginatedStates" :key="state.id">
                <td>{{ state.id }}</td>
                <td>{{ state.test }}</td>
                <td>
                  <button @click="removeState(state.id)" class="btn btn-danger">Remove</button>
                  <router-link class="btn btn-info" :to="`dashboard/detail/${state.id}`">View</router-link>
                </td>
              </tr>
            </tbody>
          </table>
          <pagination :currentPage="currentPage" :totalPages="totalPages" @page-change="handlePageChange" />
        </div>
      </div>
    </div>
    <div class="card-footer">
      Visit
      <a href="https://select2.github.io/">Select2 documentation</a>
      for more examples and information about the plugin.
    </div>
  </div>
</template>

<script>
import Pagination from './Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data(){
    return {
      itemsPerPage: 5, // Number of items to display per page
      currentPage: 1,
      selectedFile: null,
    }
  },
  computed: {
    states(){
      return this.$store.getters['item/states']
    },
    inputValue(){
      return this.$store.getters['item/newstates']
    },
    paginatedStates() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.states.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.states.length / this.itemsPerPage);
    },
  },
  methods:{
    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      console.log(this.selectedFile)
    },
    updateInputState(value) {
      // Commit the mutation to update the input value in the Vuex store
      this.$store.commit('item/setNewState', value);
    },
    createData(){
      if (!this.selectedFile) {
        console.error('No file selected.');
        return;
      }

      const formData = new FormData();
      formData.append('image', this.selectedFile);
      formData.append('test', this.inputValue);
// console.log(formData)
      this.$store.dispatch('item/createNewState',formData);
    },
    removeState(state_id){
      this.$store.dispatch('item/removeNewState',state_id);
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  created(){
    this.$store.dispatch('item/fetchStates');
  }
};
</script>

<style>
</style>