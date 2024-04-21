<template>
  <div v-if="$route.path === '/auth'">
    <router-view path="/auth"></router-view>
  </div>
  <div class="container" v-else>
    <div class="left-panel">
      <the-header></the-header>
    </div>
    <div class="right-panel">
      <router-view> </router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from "../src/components/TheHeader.vue";
export default {
  components: { TheHeader },
  computed: {
    didAutoLogout() {
      return this.$store.getters["auth/didAutoLogout"];
    },
  },
  watch: {
    didAutoLogout(curValue, oldValue) {
      if (curValue && curValue !== oldValue) {
        this.$router.push("/auth");
      }
    },
  },
  async onMounted() {
    await this.$store.dispatch("expenses/loadExpenses", {token: this.getToken});
    await this.$store.dispatch("income/loadIncome", {token: this.getToken}); 
  },
};
</script>

<style>
body {
  background: rgb(255, 255, 255);
}

input,
select,
option,
textarea {
  background: rgba(122, 119, 119, 0.157);
  border-radius: 10pxpx;
  box-shadow: 0 3px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 2px solid rgba(221, 208, 208, 0.35);
}

* {
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container {
  display: flex;
}

.left-panel {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  color: white;
  width: 300px; /* Adjust the width as needed */
  background-color: black; /* Set background color as needed */
}

.right-panel {
  margin-left: 300px;
  padding: 30px;
  width: 100%;
}
</style>
