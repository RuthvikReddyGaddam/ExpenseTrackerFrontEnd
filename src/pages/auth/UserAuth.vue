<template>
<div class="container">
  <div class="switchButton">
    <button @click="setSelectedComponent('LoginAuth')">Login</button>
    <button @click="setSelectedComponent('SignupAuth')">Sign Up</button>
  </div>
  <component :is="componentId"></component>
</div>
</template>

<script>
import LoginAuth from "../../components/auth/LoginAuth.vue";
import SignupAuth from "../../components/auth/SignupAuth.vue";
export default {
  components: { LoginAuth, SignupAuth },
  data() {
    return {
      componentId: "LoginAuth",
    };
  },
  methods: {
    setSelectedComponent(cmp) {
      this.componentId = cmp;
    },
  },
};
</script>

<style scoped>

.container{
display: flex;
flex-direction: column;
align-items: center;
}


.switchButton{
  display: flex;
  margin: 10px;
  width: 60%;

  button{
    width: 100%;
    padding: 10px;
    border: 0.5px solid white;
    background-color: black;
    color: white;
    border-radius: 3px;
  }
}

</style>
