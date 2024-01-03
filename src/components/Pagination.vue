<template>
    <nav aria-label="Page navigation">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(1)" aria-label="First">
            <span aria-hidden="true">&laquo;&laquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <a class="page-link" @click="changePage(currentPage - 1)" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li v-for="page in totalPages" :key="page" class="page-item" :class="{ active: page === currentPage }">
          <a class="page-link" @click="changePage(page)">{{ page }}</a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="changePage(currentPage + 1)" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <a class="page-link" @click="changePage(totalPages)" aria-label="Last">
            <span aria-hidden="true">&raquo;&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    props: {
      currentPage: Number,
      totalPages: Number,
    },
    methods: {
      changePage(page) {
        if (page > 0 && page <= this.totalPages) {
          this.$emit('page-change', page);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your pagination styles here */
  </style>
  