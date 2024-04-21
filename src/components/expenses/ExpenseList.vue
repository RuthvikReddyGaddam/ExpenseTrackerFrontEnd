<template>
  <div class="ul-container">
    <h2 v-if="expenses.length === 0">No expense data found!</h2>
    <ul v-else>
      <expense-item
        v-for="expense in expenses"
        :key="expense._id"
        :_id="expense._id"
        :title="expense.title"
        :description="expense.description"
        :amount="expense.amount"
        :category="expense.categoryId.categoryName"
        :paymentType="expense.paymentType"
        :receipt="expense.receipt"
        :date="dateString(expense.date)"
        :token="token"
      ></expense-item>
    </ul>
  </div>
</template>

<script>
import ExpenseItem from "./ExpenseItem.vue";

export default {
  components: { ExpenseItem },
  props: ["token"],
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
    async loadExpenses() {
      await this.$store.dispatch("expenses/loadExpenses", {token: this.token});
    }
  },
  created() {
    this.loadExpenses();
  }
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
