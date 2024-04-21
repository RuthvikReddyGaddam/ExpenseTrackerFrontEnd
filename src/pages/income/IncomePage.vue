<template>
    <base-card :hasTitle="true" :hasBody="false">
   <template #title>
    <h2>Total Income: ${{ allIncomeTotal }}</h2>  
  </template>
  </base-card>
     <div class="income">
       <div class="form">
<base-card :hasTitle="false" :hasBody="true">
<income-form :token="getToken"></income-form>
</base-card>
       </div>
       <div class="list">
         <income-list :token="getToken"></income-list>
       </div>
     </div>  
   </template>
   
   <script>
   import IncomeList from "../../components/income/IncomeList";
   import IncomeForm from "../../components/income/IncomeForm";
   
   export default {
     components: { IncomeList, IncomeForm },
     computed: {
      allIncomeTotal() {
      return this.$store.getters["income/allIncomeTotal"];
    },
      getToken() {
        return this.$store.getters["auth/getToken"];
      }
    }
   };
   </script>
   
   <style scoped>
   .income{
       display: flex;
  

   }
   .form, .list {
     flex: 1;
     padding: 10px; 
     margin: 10px;
     height: 100%;
   }


   </style>
   