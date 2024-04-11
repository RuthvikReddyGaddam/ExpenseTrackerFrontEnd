<template>
  <li class="list-item">
    <div class="item-content">
      <base-modal :receipt="receipt">
      <img :src="receipt" alt="Image" class="item-image" />
    </base-modal>
      <div class="text-elements">
        <h3>{{ title }}</h3>
        <p>{{ description }} {{ amount }} {{ category }} {{ date }}</p>
      </div>
      <button class="delete-button" @click="deleteExpense(_id)">Delete</button>
    </div>
  </li>
</template>

<script>
export default {
  props: [
    "_id",
    "title",
    "description",
    "amount",
    "category",
    "paymentType",
    "receipt",
    "date"
  ],
  data() {
    return {};
  },
  methods: {
    deleteExpense(_id) {
      this.$store.dispatch('expenses/deleteExpense', {_id});
    }
  }
};
</script>

<style scoped>
.list-item {

  list-style-type: none;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
  margin-bottom: 20px;
}

.item-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-left: 10px;
}


.text-elements {
  flex-grow: 3;
  padding-left: 30px;
}

.delete-button {
  padding: 5px 10px;
  background-color: #1b1212;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #4d4b4b;
}
</style>

