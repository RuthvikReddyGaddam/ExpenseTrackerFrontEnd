<template>
    <h2>Total Income: ${{ totalIncome }}</h2>
     <div class="income">
       <div class="form">
<base-card hasBody="true">
<income-form></income-form>
</base-card>
       </div>
       <div class="list">
         <income-list></income-list>
       </div>
     </div>  
   </template>
   
   <script>
   import IncomeList from "../../components/income/IncomeList";
   import IncomeForm from "../../components/income/IncomeForm";
   
   export default {
     components: { IncomeList, IncomeForm },
     computed: {
      totalIncome () {
        return this.$store.getters['income/totalIncome'];
      }
    }
   };
   </script>
   
   <style scoped>
   h2{
     text-align: center;
     padding: 30px;
     border-radius: 10px;
     box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
     margin: 20px;
   }
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
   