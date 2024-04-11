<template>
<div class="container">
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
};
</script>

<style>

body{
  background-color: rgba(241, 245, 248, 0.672);
}

input, select, option, textarea{
background: rgba(174, 171, 171, 0.28);
border-radius: 10pxpx;
box-shadow: 0 3px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.5px);
-webkit-backdrop-filter: blur(11.5px);
border: 2px solid rgba(221, 208, 208, 0.35);
}

*{
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  box-sizing:border-box;
  
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
