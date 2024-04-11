<template>
 <base-card hasTitle="true">
<template #title>
  <h2>Total Expenses: ${{ totalExpenses }}</h2>
</template>
</base-card>
  <div class="expense">

   <div class="form">
    <base-card hasBody="true">
      <expense-form></expense-form>
    </base-card>
    </div>

    <div class="list">
      <expense-list></expense-list>
      
    </div>
  </div>
</template>

<script>
import ExpenseList from "../../components/expenses/ExpenseList";
import ExpenseForm from "../../components/expenses/ExpenseForm";

export default {
  components: { ExpenseList, ExpenseForm },
  data() {
    return {
      
    };
    
  },
  computed: {
      totalExpenses () {
        return this.$store.getters['expenses/totalExpenses'];
      }
    }
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
