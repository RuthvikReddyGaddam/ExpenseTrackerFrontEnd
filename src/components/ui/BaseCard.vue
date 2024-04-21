<template>
  <div class="card">
    <!-- <div class="card_image" v-if="image_url">
      <img :src="image_url" alt="" />
    </div> -->

    <div class="card-title" v-if="hasTitle">
      <slot name="title"></slot>
    </div>
    <div class="card-body" v-if="hasBody">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ["hasTitle", "hasBody", "imageUrl"],
};
</script>

<style scoped>
.card {
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 10px;
  padding: 10px;
  margin: 20px;

background-color: rgba(255, 255, 255, 0.66);
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(11.7px);
-webkit-backdrop-filter: blur(11.7px);
border: 1px solid rgba(120, 117, 117, 0.35);
}

.card-title {
  text-align: center;
  padding: 15px;
}

.card-body {
  padding: 10px;
  margin: 5px;
}
</style>
