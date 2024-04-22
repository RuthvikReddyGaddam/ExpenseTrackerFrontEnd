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
    </div>
    <button @click="updateFilters" class="filterButton">Filter</button>
    <div class="budget-goals" v-if="!editBudgetGoals">
      <div>Budget ${{ budget }}</div>
      <div>Goals {{ goals }}</div>
    </div>
    <div class="budget-goals" v-else>
      <div>
        <label for="budget">Budget</label>
        <input type="number" v-model.trim="newBudget" id="budget" />
      </div>
      <div>
        <label for="goals">Goals</label>
        <textarea
          v-model.trim="newGoals"
          id="goals"
          cols="30"
          rows="2"
        ></textarea>
      </div>
    </div>
    <button @click="updateBudgetGoals" class="updateButton">
      {{ buttonContent }}
    </button>
    <div v-if="revealComponent">
      <chart-component :lineData="lineData" :expenseData="expenseData" :incomeData="incomeData"></chart-component>
    </div>
    <div v-if="showError">
      <h3>No expenses or Income found in the filtered Dates!</h3>
    </div>
  </base-card>

  <base-card :hasTitle="true" :hasBody="true" v-if="revealComponent">
    <template #title>
      <h2>Summary</h2>
    </template>

    <div class="summary">
      <h3 id="income" :style="{ width: incomeWidth }" v-if="totalIncome>0">
        Total Income: {{ totalIncome }}
      </h3>

      <h3 id="expense" :style="{ width: expenseWidth }" v-if="totalExpenses>0">
        Total Expenses : {{ totalExpenses }}
      </h3>
    </div>

    <h3 id="balance">Balance : {{ totalIncome - totalExpenses }}</h3>
  </base-card>
</template>

<script>
import ChartComponent from "../../components/dash/ChartComponent";
import { mapGetters } from "vuex";

export default {
  components: {
    ChartComponent,
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
      budget: 0,
      goals: "",
      showError: false,
      lineData: {},
      expenseData: {},
      incomeData: {},
    };
  },
  computed: {
    ...mapGetters("income", ["totalIncome", "income", "filteredIncome"]),
    ...mapGetters("auth", ["getToken"]),
    ...mapGetters("expenses", ["totalExpenses", "expenses", "filteredExpenses"]),
    incomeWidth() {
      return `${
        (this.totalIncome / (this.totalIncome + this.totalExpenses)) * 100
      }%`;
    },
    expenseWidth() {
      return `${
        (this.totalExpenses / (this.totalIncome + this.totalExpenses)) * 100
      }%`;
    }
  },
  methods: {
    filterItem(fromDate, toDate, item) {
      return item.filter((incomeItem) => {
        const incomeDate = new Date(incomeItem.date);
        return incomeDate <= toDate && incomeDate >= fromDate;
      });
    },
    updateFilters() {
      this.revealComponent = false;
      const fromDate = new Date(this.fromDate);
      const toDate = new Date(this.toDate);
      if (this.fromDate && this.toDate && this.fromDate <= this.toDate) {
        console.log("here")
        const filteredIncome = this.filterItem(fromDate, toDate, this.income);
        const filteredExpenses = this.filterItem(fromDate, toDate, this.expenses);
        if (filteredExpenses.length > 0 || filteredIncome.length > 0) {
          this.showError = false;
          this.$store.dispatch("expenses/filteredExpenses", filteredExpenses);
          this.$store.dispatch("income/filteredIncome", filteredIncome);
          this.getLineData();
          this.getPieData();
          this.revealComponent = true;
        } else {
          this.showError = true;
        }
      }
    },


  async updateBudgetGoals() {
      if (this.editBudgetGoals && this.newBudget > 0 && this.newGoals !== "" && (this.newBudget !== this.budget || this.newGoals !== this.goals)) {
        await this.$store.dispatch("auth/updateBudgetGoals", {
          token: this.getToken,
          budget: this.newBudget,
          goals: this.newGoals,
        });
        this.budget = this.$store.getters["auth/budget"]
        this.goals = this.$store.getters["auth/goals"]
        this.editBudgetGoals = false;
        this.buttonContent = "Update Budget & Goals";
      } else {
        this.editBudgetGoals = true;
        this.buttonContent = "Submit Changes";
      }
    },
    randomNumber(num) {
      return Math.floor(Math.random() * (num + 1));
    },
    generateBackgroundColor(color) {
      let arr = [];
      for(let i= 0; i< color; i++){
        arr.push(`rgba(${this.randomNumber(255)},${this.randomNumber(255)},${this.randomNumber(255)},1)`)
      }

      return arr;
    },

    getLineData() {
      const [incomeData, incomeDate] = this.$store.getters['income/lineChartIncome'];
      const [expenseData, expenseDate] = this.$store.getters['expenses/lineChartExpenses'];
      let labels = new Set([...incomeDate, ...expenseDate]);
      labels = Array.from(labels);
      labels = labels.sort((a,b) => {
        const dateA = new Date(a);
        const dateB = new Date(b);
        return dateA - dateB;
      })
      this.lineData = {
        labels: labels,
      datasets: [
        {
          label: 'Expenses',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: expenseData,
        },
        {
          label: 'Income',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: incomeData,
        },
      ],
    };
  },

    getPieData() {
      const getters = [['Spending', "expenses/pieChartExpense"], ["Income", "income/pieChartIncome"]];
      let val = [];
      for (let i=0;i<getters.length;i++) {
        const [dataArray, values] = this.$store.getters[getters[i][1]];
        const background = this.generateBackgroundColor(dataArray.length);
         val.push({
          labels: dataArray,
          datasets: [{ backgroundColor: background, data: values }],
          title: {
            display: true,
            text: getters[i][0]+" Breakdown by Category",
            fontSize: 16,
          },
        });
      }
      this.expenseData = val[0];
      this.incomeData = val[1];
    },
  },
  
async mounted() {
    this.budget = this.$store.getters["auth/budget"];
    this.goals = this.$store.getters["auth/goals"];
  }
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
button:hover {
  background-color: gray;
}
button {
  align-items: center;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 5px;
  border: 1px solid rgba(135, 132, 132, 0.492);
  background-color: rgb(0, 0, 0);
  color: white;
  border-radius: 5px;
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
