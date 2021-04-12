<template>
<base-card>
<base-spinner v-if="isLoading"></base-spinner>
  <form v-else @submit.prevent="submitLogin">
      <p v-if="!isValid">Please fill the e-mail and password</p>
      <div class="form-control">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" v-model.trim="email">
      </div>
      <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password">
      </div>
      <base-button>Login</base-button>
  </form>
  </base-card>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
            isLoading: false,
            error : '',
            isValid: true,
        };
    },
    methods: {
        submitValidation() {
            this.isValid = true;

            if (this.email === '' || this.password === '') {
                this.isValid = false;
            }
        },
        async submitLogin() {
            this.submitValidation();

            if(!this.isValid) {
                return;
            }
            this.isLoading = true;
            try {
                await this.$store.dispatch('signin',{
                    email: this.email,
                    password: this.password,
            });
            } catch (error) {
                this.error = "An error occured please try again later.";
            }
            this.isLoading = false;
            const redirectUrl = '/' + (this.$route.query.redirect || 'coaches');
            this.$router.replace(redirectUrl);
        },
    },
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

</style>