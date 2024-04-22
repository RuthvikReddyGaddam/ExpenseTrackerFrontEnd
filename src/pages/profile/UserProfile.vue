<template>
  <base-card :hasTitle="true" :hasBody="false">
    <template #title>
      <h1>User Profile</h1>
    </template>
  </base-card>
  <base-card :hasTitle="true" :hasBody="true">
    <template #title>
      <h1>{{ user.fullname }}</h1>
    </template>
    <div class="info">
      <div class="profile">
        <img :src="user.profile" alt="profilePhoto" />
      </div>
      <div class="user">
        <label>Email</label><p> {{ user.email }}</p>
        <label>Address</label><p> {{ user.address }}</p>
        <label>Phone</label><p> +1 {{ user.phone }}</p>
        <label>Gender</label><p> {{ user.gender }}</p>
        <label>Date of Birth</label><p> {{ user.DoB}}</p>
        <label>Current Balance</label><p>${{ user.balance }}</p>
        <label>Budget</label><p> ${{ user.budget }}</p>
        <label>Current Goals</label><p> {{ user.goals }}</p>
      </div>
    </div>
  </base-card>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters["auth/user"];
    },
  },
};
</script>

<style scoped>
.info{
    display: flex;
    align-items: center;
}
img {
    
  border: 1px solid rgb(185, 180, 180);
  width: 100%;
    height: 100%;
    object-fit: cover;
    overflow: hidden;
  border-radius: 5px;
}
.profile{
  margin: 10px;
  padding: 10px;
  flex: 1;
  width: 500px;
  height: 500px;
  border-radius: 10px;
  border: 1px solid rgb(177, 173, 173);
  background-color: rgba(244, 242, 242, 0.853);
}
.user {
    flex: 2;
    margin: 10px;
    padding: 10px;
    border: 0.5px solid rgba(230, 225, 225, 0.812);
    border-radius: 10px;
}
label {
  margin: 5px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 2px;
  display: block;
}

p {
  margin: 5px;
  display: block;
  width: 100%;
  border: 0.5px solid #e6e3e3a2;
  padding: 5px;
}
</style>
