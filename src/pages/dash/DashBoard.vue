<template>
  <base-card :hasBody="false" :hasTitle="true">
    <template v-slot:title>
      <h1>Dashboard</h1>
    </template>
  </base-card>
  <base-card :hasBody="true" :hasTitle="true">
    <template v-slot:title>
      <h2>Filters, Budget and Goals</h2>
    </template>
    <div class="inputs">
      <div>
        <label for="fromDate">From</label>
        <input type="date" v-model="fromDate" />
      </div>
      <div>
        <label for="toDate">To</label>
        <input type="date" v-model="toDate" />
      </div>
      <button @click="updateFilters" class="filterButton">Filter</button>
    </div>
    <div class="budget-goals" v-if="!editBudgetGoals">
      <div>Budget ${{ budget }}</div>
      <div>Goals {{ goals }}</div>
    </div>
    <div class="budget-goals" v-else>
      <div>
        <label for="budget">Budget</label>
        <input
          type="number"
          v-model.trim="newBudget"
          id="budget"
        />
      </div>
      <div>
        <label for="goals">Goals</label>
        <textarea v-model.trim="newGoals" id="goals" cols="30" rows="2"></textarea>
      </div>
    </div>
    <button @click="updateBudgetGoals" class="updateButton">
      {{ buttonContent }}
    </button>
    <div v-if="revealComponent">
      <chart-component></chart-component>
    </div>
  </base-card>

  <base-card :hasTitle="true" :hasBody="true" v-if="revealComponent">
    <template #title>
      <h2>Summary</h2>
    </template>

    <div class="summary">
      <h3 id="income" :style="{ width: incomeWidth }">
        Total Income: {{ totalIncome }}
      </h3>

      <h3 id="expense" :style="{ width: expenseWidth }">
        Total Expenses : {{ totalExpenses }}
      </h3>
    </div>

    <h3 id="balance">Balance : {{ totalIncome - totalExpenses }}</h3>
  </base-card>
</template>

<script>
import ChartComponent from "./ChartComponent";
import { mapGetters } from "vuex";
// import InfoComponent from "./InfoComponent";
export default {
  components: {
    ChartComponent,
    // InfoComponent
  },
  data() {
    return {
      fromDate: null,
      toDate: null,
      revealComponent: false,
      editBudgetGoals: false,
      buttonContent: "Update Budget & Goals",
      newBudget: 0,
      newGoals: "",
    };
  },
  computed: {
    ...mapGetters("income", ["totalIncome", "income", "filteredIncome"]),
    ...mapGetters("expenses", [
      "totalExpenses",
      "expenses",
      "filteredExpenses",
    ]),
    incomeWidth() {
      return `${
        (this.totalIncome / (this.totalIncome + this.totalExpenses)) * 100
      }%`;
    },
    expenseWidth() {
      return `${
        (this.totalExpenses / (this.totalIncome + this.totalExpenses)) * 100
      }%`;
    },
    budget() {
      return this.$store.getters.budget;
    },
    goals() {
      return this.$store.getters.goals;
    },
  },
  methods: {
    filterItem(fromDate, toDate, item) {
      return item.filter((incomeItem) => {
        const incomeDate = new Date(incomeItem.date);
        return incomeDate <= toDate && incomeDate >= fromDate;
      });
    },
    updateFilters() {
      const fromDate = new Date(this.fromDate);
      const toDate = new Date(this.toDate);
      if (this.fromDate && this.toDate && this.fromDate <= this.toDate) {
        const filteredIncome = this.filterItem(fromDate, toDate, this.income);
        const filteredExpenses = this.filterItem(
          fromDate,
          toDate,
          this.expenses
        );
        this.$store.dispatch("expenses/filteredExpenses", filteredExpenses);
        this.$store.dispatch("income/filteredIncome", filteredIncome);
        this.revealComponent = true;
        console.log(this.revealComponent);
      } else {
        return;
      }
    },
    updateBudgetGoals() {

      if (this.editBudgetGoals && this.newBudget>=0 && this.newGoals!== '') {
        this.$store.dispatch("updateBudgetGoals", {
          budget: this.newBudget,
          goals: this.newGoals,
        });

        this.editBudgetGoals = !this.editBudgetGoals;

      } else {
        if(this.editBudgetGoals){
          this.buttonContent = "Update Budget & Goals";
        }else this.buttonContent = "Submit Changes";
        this.editBudgetGoals = !this.editBudgetGoals;
      }
    },
  },
};
</script>

<style scoped>
.inputs,
.budget-goals {
  display: flex;
  margin: 10px;
  div {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 10px;
  }
  label,
  input {
    border-radius: 5px;
    margin: 5px;
    padding: 5px;
  }
}

.updateButton {
  width: 100%;
  margin: 10px;
  padding: 10px;
}

.summary {
  display: flex;
}
h3 {
  padding: 5px;
  margin: 2px;
  text-align: center;
}

#income {
  background-color: rgba(59, 212, 38, 0.648);
}
#expense {
  background-color: rgba(255, 0, 0, 0.614);
}
#balance {
  background-color: rgb(28, 123, 207);
}
</style>
