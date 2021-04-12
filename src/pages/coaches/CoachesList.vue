<template>
  <section>
    <coach-filter @change-filter="setFilters"></coach-filter>
  </section>
    <section>
        <base-card>
        <div class="controls">
            <base-button mode="outline" @click="loadCoaches">Refresh</base-button>
            <base-button v-if="isLoggedIn && !isCoach" link to="/register">Register as Coach</base-button>
            <base-button v-if="!isLoggedIn" link to="/login?redirect=register">Login to register as a Coach</base-button>
        </div>
      <div v-if="isLoading">
      <base-spinner></base-spinner>
      </div>
      <ul v-else-if="hasCoaches">
        <coach-item 
        v-for="coach in filteredCoaches"
        :key="coach.id"
        :id="coach.id"
        :firstName="coach.firstName"
        :lastName="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas">
        </coach-item>
      </ul>
      <h3 v-else-if="gotError">
        {{ error }}
      </h3>
      <h3 v-else>No coaches found</h3>
        </base-card>
    </section>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
    components: {
        CoachItem,
        CoachFilter,
    },
    data() {
      return {
        isLoading: false,
        error: null,
        gotError: false,
        activeFilters: {
              frontend: true,
              backend: true,
              career: true,
            },
      };
    },
    computed: {
        filteredCoaches() {
            const coaches = this.$store.getters['coaches/coaches'];
            return coaches.filter(coach => {
              if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
                return true;
              }
              if (this.activeFilters.backend && coach.areas.includes('backend')) {
                return true;
              }
              if (this.activeFilters.career && coach.areas.includes('career')) {
                return true;
              }
  
              return false;
            });
        },
        hasCoaches() {
          return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
        },
        isLoggedIn() {
          return this.$store.getters.isAuth;
        },
        isCoach() {
          return this.$store.getters['coaches/isCoach'];
        },
    },
    created() {
      this.loadCoaches();
    },
    methods: {
      setFilters(updatedFilters) {
        this.activeFilters = updatedFilters;
      },
async loadCoaches() {
        this.gotError = false;
        this.isLoading = true;
        try {
          await this.$store.dispatch('coaches/loadCoaches');
        } catch (error) {
          this.gotError = true;
          console.log(error.message);
          this.error = error.message;
        }
        this.isLoading = false;
      },
    },

}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}

</style>