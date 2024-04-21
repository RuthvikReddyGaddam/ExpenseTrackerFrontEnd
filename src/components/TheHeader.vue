<template>
  <div class="nav" v-if="isLoggedIn">
    <div class="user">
      <img
        :src="profileUrl"
        alt="profilePhoto"
      />
      <div>
        <h3 class="fullname">{{ fullname }}</h3>
        <h5>Balance: ${{ balance }}</h5>
      </div>
    </div>
    <div class="links">
      <ul>
        <li>
          <router-link to="/profile">Your Profile</router-link>
        </li>
        <li>
          <router-link to="/dash">Dashboard</router-link>
        </li>
        <li>
          <router-link to="/expenses">Expenses</router-link>
        </li>
        <li>
          <router-link to="/income">Income</router-link>
        </li>
      </ul>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/isLoggedIn"];
    },
    balance() {
      return this.$store.getters["auth/balance"];
    },
    profileUrl(){
      return this.$store.getters["auth/profileUrl"];
    },
    fullname() {
      return this.$store.getters["auth/fullname"];
    },
  },

  methods: {
    logout() {
      this.$router.push("/auth");
      this.$store.dispatch("auth/logout");
      
    },
  },
};
</script>

<style scoped>
.fullname {
  white-space: nowrap;
  overflow: hidden; 
  text-overflow: ellipsis;
  width: 15ch;
}
nav {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 20px;
  box-sizing: border-box;
}

.user {
  padding-top: 75px;
  display: flex;
  margin: 35px;
  /* padding: 2px; */

  img {
    border-radius: 500px;
    width: 75px;
    height: 75px;
  }
  div {
    margin: auto;
    padding: 10px;
  }
  h3 {
    margin: 0;
  }
  h5 {
    margin: 0;
  }
}

.links {
  display: flex;
  flex-direction: column;
  padding: 10px;

  ul {
    list-style-type: none;

    li {
      padding-bottom: 15px;
    }
    a {
      margin: 30px;
      color: white;
      text-decoration: none;
    }
    a:hover {
      color: rgb(255, 228, 196);
    }
  }
}
button {
  margin: 10px;
  padding: 5px;
  background-color: white;
  border: 2px solid white;
  border-radius: 5px;
}
button:hover {
  background-color: antiquewhite;
}
</style>
