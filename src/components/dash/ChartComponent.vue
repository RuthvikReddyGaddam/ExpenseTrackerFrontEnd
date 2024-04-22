<template>
<div class="main-container">
  <button @click="downloadCSV">Download data as an Excel sheet</button>
  <a class="csvLink" v-if="revealLink" :href="downloadLink">Click to Download Csv</a>
    <div class="line-chart">
      <Line :data="lineData" :options="lineChartOptions" />
    </div>
    <div class="pie-charts">
      <div class="left-pie">
        <Pie :data="expenseData" :options="expensePieOptions" v-if="expenseData.datasets[0].data.length > 0"/>
        <p v-else>No expenses found between these dates!</p>
      </div>
      <div class="right-pie">

        <Pie :data="incomeData" :options="incomePieOptions" v-if="incomeData.datasets[0].data.length > 0"/>
        <p v-else>No income found between these dates!</p>
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
    Pie
  },
  props: ["incomeData", "expenseData", "lineData"],
  data() {
    return {
      downloadLink: "",
      revealLink: false,
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
  computed: {
    expenseCsv() {
      return this.$store.getters["expenses/getExpenseCsvData"];
    },
    incomeCsv() {
      return this.$store.getters["income/getIncomeCsvData"];
    }
  },
  methods: {
  
    downloadCSV(){
      this.revealLink = false;
      let combinedData = [...this.expenseCsv, ...this.incomeCsv];
      combinedData.sort((prev, curr) => new Date(prev[0]) - new Date(curr[0]));
      console.log(combinedData);
      let data = "date,title,amount,description,categoryName\n";
      combinedData.forEach(row => {
        data += row.join(',') + '\n'
      });
      const blob = new Blob([data], { type: 'text/csv;charset=utf-8,' });
      this.revealLink = true;
      this.downloadLink = URL.createObjectURL(blob);
    }
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
button.hover{
  background-color: gray;
}
.csvLink{
  text-decoration: none;
  font-size: 13px;
  align-items: center;
  text-align: center;;
  width: 100%;
  margin-bottom: 0.5rem;
  padding: 5px;
  border: 1px solid rgba(135, 132, 132, 0.492);
  background-color: rgb(0, 0, 0);
  color: white;
  border-radius: 5px;
}
</style>
