<template>
 <div>
    <img :src="photo_url" alt="Receipt Image" class="small-image" @click="openModal" />

    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <slot></slot>
      </div>
    </div>
  </div>
        
    
</template>

<script>
export default {
    props: ['photo_url'],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
  },
};
</script>

<style>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border: 1px solid #888;
  max-width: 80%;
  max-height: 80%;
  overflow: auto;
  position: relative;
}

.full-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.close {
  color: #aaa;
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
.small-image{
    width: 50px;
    height: 50px;
}

</style>