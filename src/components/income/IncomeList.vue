<template>
  <div class="ul-container">
    <h2 v-if="income.length === 0">No income data found!</h2>
    <ul v-else>
      <income-item
        v-for="incomeItem in income"
        :key="incomeItem._id"
        :_id="incomeItem._id"
        :title="incomeItem.title"
        :description="incomeItem.description"
        :amount="incomeItem.amount"
        :category="incomeItem.categoryId.categoryName"
        :categoryId="incomeItem.categoryId._id"
        :paymentType="incomeItem.paymentType"
        :incomeImage="incomeItem.incomeImage"
        :date="new Date(incomeItem.date).toLocaleDateString('en-US')"
        :token="token"
      ></income-item>
    </ul>
  </div>
</template>

<script>
import IncomeItem from "./IncomeItem.vue";
export default {
  components: { IncomeItem },
  props: ["token"],
  data() {
    return {};
  },
  computed: {
    income() {
      let incomeItems = this.$store.getters["income/income"];
      incomeItems = incomeItems.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      return incomeItems;
    },
    userId() {
      return this.$store.getters.getUserId;
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
    async loadIncome() {
      await this.$store.dispatch("income/loadIncome", { token: this.token });
    },
  },
  created() {
    this.loadIncome();
  },
};
</script>

<style scoped>
.ul-container {
  overflow-y: auto;
  height: 600px;
  overflow-x: hidden;
  padding: 10px;
}
.ul-container::-webkit-scrollbar {
  display: none;
}
</style>
