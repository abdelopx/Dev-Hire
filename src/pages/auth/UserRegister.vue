<template>
<base-card>
<base-spinner v-if="isLoading"></base-spinner>
  <form v-else @submit.prevent="submitRegister">
      <p v-if="!isValid">One or more fields are empty / Passwords are not identical.</p>
      <div class="form-control">
          <label for="email">Email</label>
          <input type="text" name="email" id="email" v-model.trim="email">
      </div>
      <div class="form-control">
          <label for="password">Password</label>
          <input type="password" name="password" id="password" v-model.trim="password">
      </div>
      <div class="form-control">
          <label for="passwordConfirmation">Confirm password</label>
          <input type="password" name="passwordConfirmation" id="passwordConfirmation" v-model.trim="passwordConfirmation">
      </div>
      <base-button>Register</base-button>
  </form>
  </base-card>
</template>

<script>

export default {
    data() {
        return {
            email: '',
            password: '',
            passwordConfirmation: '',
            isValid: true,
            isLoading: false,
            error : '',
        };
    },
    methods: {
        submitValidation() {
            this.isValid = true;

            if (this.email === '' || this.password === '' || this.passwordConfirmation === '') {
                this.isValid = false;
            }
            else if (this.password != this.passwordConfirmation) {
                this.isValid = false;
            }
        },
        async submitRegister() {
            this.isLoading = true;
            this.submitValidation();

            if(!this.isValid) {
                return;
            }
            try {
                await this.$store.dispatch('signup',{
                    email: this.email,
                    password: this.password,
            });
            } catch (error) {
                this.error = error.message;
            }
            this.isLoading = false;
            this.$router.replace('/login');
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