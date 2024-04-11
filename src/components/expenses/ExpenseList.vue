<template>
  <div class="ul-container">
    <ul>
      <expense-item
        v-for="expense in expenses"
        :key="expense._id"
        :_id="expense._id"
        :title="expense.title"
        :description="expense.description"
        :amount="expense.amount"
        :category="expense.category_id"
        :paymentType="expense.paymentType"
        :receipt="expense.receipt"
        :date="dateString(expense.date)"
      ></expense-item>
    </ul>
  </div>
</template>

<script>
import ExpenseItem from "./ExpenseItem.vue";
export default {
  components: { ExpenseItem },
  data() {
    return {};
  },
  computed: {
    expenses() {
      return this.$store.getters["expenses/expenses"];
    },
  },
  methods: {
    dateString(date) {
      if (date) {
        const dateItem = new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });
        return dateItem;
      } else return "";
    },
  },
};
</script>

<style scoped>
.ul-container {
  overflow-y: auto;
  height: 500px;
  overflow-x: hidden;
  padding: 10px;
}
.ul-container::-webkit-scrollbar {
  display: none;
}
</style>
