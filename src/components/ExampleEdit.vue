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
          <form @submit.prevent="updateData">
            <div class="form-group">
              <label for="newState">New State</label>
              <input type="text" class="form-control" :value="inputValue" id="newState" @input="updateInputState($event.target.value)" required>
            </div>
            <button type="submit" class="btn btn-primary">Create State</button>
          </form>
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
export default {
  props:['stateId'],
  computed: {
    states(){
      return this.$store.getters['item/states']
    },
    inputValue(){
      return this.$store.getters['item/newstates']
    },
  },
  methods:{
    updateInputState(value) {
      // Commit the mutation to update the input value in the Vuex store
      this.$store.commit('item/setNewState', value);
    },
    updateData(){
      this.$store.dispatch('item/updateNewState',this.stateId);
    }
  },
  created(){
    this.$store.dispatch('item/fetchUpdateStates',this.stateId);
  }
};
</script>

<style>
</style>