<template>
  <div class="ul-container">
    <ul>
      <income-item
        v-for="incomeItem in income"
        :key="incomeItem._id"
        :_id="incomeItem._id"
        :title="incomeItem.title"
        :description="incomeItem.description"
        :amount="incomeItem.amount"
        :category="incomeItem.category_id"
        :paymentType="incomeItem.paymentType"
        :incomeImage="incomeItem.incomeImage"
        :date="dateString(incomeItem.date)"
      ></income-item>
    </ul>
  </div>
</template>

<script>
import IncomeItem from "./IncomeItem.vue";
export default {
  components: { IncomeItem },
  data() {
    return {
    };
  },
  computed: {
    income() {
      return this.$store.getters['income/income']
    }
  },
  methods: {
    dateString(date){
      if(date){
        const dateItem = new Date(date).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
          });
          return dateItem;
      }
      else return ''
       
    }
  }
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
