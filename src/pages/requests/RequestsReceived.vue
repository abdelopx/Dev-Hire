<template>
  <base-card>
    <h1>Requests received</h1>
    <base-spinner v-if="isLoading"></base-spinner>
    <ul v-else-if="hasRequests">
    <request-item v-for="request in fetchedRequests" 
      :key="request.id"
      :email="request.userEmail"
      :message="request.message"></request-item>
    </ul>
    <p v-else-if="hasError">{{ error }}</p>
    <p v-else>It look like you did not received any request.</p>
  </base-card>
</template>

<script>
import RequestItem from '../../components/requests/RequestItem.vue';
import BaseSpinner from '../../components/UI/BaseSpinner.vue';
export default {
  components: {
    RequestItem,
    BaseSpinner,
},
  created() {
    this.fetchRequests();
  },
  data() {
    return {
      isLoading: false,
      hasError: false,
      error: '',
    };
},
  computed:{
    fetchedRequests() {
      return this.$store.getters['requests/requests'];
    },
    hasRequests() {
      return !this.isLoading && this.$store.getters['requests/hasRequests'];
    },
  },
  methods: {
  async fetchRequests() {
    this.isLoading = true;
    try {
      await this.$store.dispatch('requests/fetchRequests');
    } catch(error) {
      console.log('messa' + error.message);
      this.hasError = true;
      this.error = error.message;
    }
    this.isLoading = false;
    },
  }
}
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}                                                                                                                        
</style>