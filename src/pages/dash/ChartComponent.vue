<template>
  <div class="main-container">
    <div class="line-chart">
      <Line :data="lineData" :options="lineChartOptions" />
    </div>
    <div class="pie-charts">
      <div class="left-pie">
        <Pie :data="expenseData" :options="expensePieOptions" />
      </div>
      <div class="right-pie">
        <Pie :data="incomeData" :options="incomePieOptions" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Line, Pie } from "vue-chartjs";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default {
  name: "App",
  components: {
    Line,
    Pie,
  },
  data() {
    return {
      lineData: {},
      lineChartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Expenses vs Income",
            fontSize: 16,
          },
        },
      },
      expenseData:{},
      incomeData:{},
      expensePieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Spending Breakdown by category",
            fontSize: 16,
          },
        },
      },
      incomePieOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Income Breackdown by Category",
            fontSize: 16,
          },
        },
      },
    };
  },
  methods: {
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
      labels = [...labels];
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

  beforeMount() {
   this.getLineData();
   this.getPieData();
  },


};
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 60rem;
  overflow: hidden;
}

.line-chart {
  flex: 1;
  width: calc(100% - 40px); /* Adjust for margin and padding */
  margin: 20px;
  padding: 20px;
  overflow-x: auto;
}
.pie-charts {
  display: flex;
  width: calc(100% - 40px); /* Adjust for margin and padding */
  margin: 20px;
  padding: 20px;
}

.pie-charts {
  display: flex;
}
.left-pie,
.right-pie {
  flex: 1;
  width: 100%;
}
</style>
