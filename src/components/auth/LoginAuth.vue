<template>
  <section>
    <h3 v-if="error !== ''">{{ error }}</h3>
    <base-card :hasTitle="true" :hasBody="true">
      <template #title>
        <h2>Login</h2>
      </template>
      <h2 v-if="!isValid">Invalid username or password</h2>
      <form @submit.prevent="formSubmit">
        <div class="form-control">
          <label for="email">Email</label>
          <div></div>
          <input type="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">password</label>
          <div></div>
          <input type="password" v-model="password" />
        </div>
        <div><button>Submit</button></div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      isValid: true,
    };
  },
  methods: {
    validateForm() {
      this.isValid = true;
      if (this.email === "" && this.password === "") {
        this.isValid = false;
      }
    },
    async formSubmit() {
      this.validateForm();
      const user = {
        email: this.email,
        password: this.password,
      };
      try{ 
      await this.$store.dispatch("auth/login", user);
      this.$router.replace("/dash");
    } catch (err) {
        this.error = err.message || 'Failed to login! try later.';
      }
    },
  },
};
</script>

<style scoped>
section{
  width: 60%
}
form {
  margin: 10px;
  padding: 10px;
}

.form-control {
  margin: 5px;
}

label {
  margin: 5px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 2px;
  display: block;
}

input,
textarea {
  margin: 5px;
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px;
}
button{
  width: 100%;
  background-color: black;
  color: white;
  padding: 5px;
  margin-top: 20px;
}
</style>
