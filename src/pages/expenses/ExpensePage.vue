<template>
 <base-card :hasTitle="true" :hasBody="false">
<template #title>
  <h2>Total Expenses: ${{ allExpensesTotal}}</h2>
</template>
</base-card>
  <div class="expense">

   <div class="form">
    <base-card :hasTitle="false" :hasBody="true">
      <expense-form :token="getToken"></expense-form>
    </base-card>
    </div>

    <div class="list">
      <expense-list :token="getToken"></expense-list>
      
    </div>
  </div>
</template>

<script>
import ExpenseList from "../../components/expenses/ExpenseList";
import ExpenseForm from "../../components/expenses/ExpenseForm";

export default {
  components: { ExpenseList, ExpenseForm },
  computed: {
    allExpensesTotal() {
      return this.$store.getters["expenses/allExpensesTotal"];
    },
    getToken() {
        return this.$store.getters["auth/getToken"]
      }

    },

};
</script>

<style scoped>
.expense {
  display: flex;
}
.form,
.list {
  flex: 1;
  /* Add vertical scroll if content overflows */
  padding: 10px; /* Add padding for spacing */
  margin: 10px;
  height: 100%;
}
</style>
