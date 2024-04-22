export default {
    totalIncome(state) {
        let totalSum = 0;
        for (let i = 0; i < state.filteredIncome.length; i++) {
            totalSum += state.filteredIncome[i].amount;
          }
          return totalSum;
    },
    allIncomeTotal(state) {
      let totalSum = 0;
      for (let i = 0; i < state.income.length; i++) {
          totalSum += state.income[i].amount;
        }
        return totalSum;

  },
    income(state) {
        return state.income;
    },
    pieChartIncome(state) {
        const categoryTotals = state.filteredIncome.reduce((totals, item) => {
          const categoryName = item.categoryId.categoryName;
          const amount = item.amount;
          totals[categoryName] = (totals[categoryName] || 0) + amount;
          return totals;
        }, {});
      
        const data = Object.keys(categoryTotals);
        const values = Object.values(categoryTotals);
      
        return [data, values];
      },
      lineChartIncome(state){
      let incomeDate = state.filteredIncome.map(incomeItem => (new Date(incomeItem.date).toLocaleDateString('en-US')));
      let incomeData = state.filteredIncome.map(incomeItem => ({ x: new Date(incomeItem.date).toLocaleDateString('en-US'), y: incomeItem.amount }));
      incomeData = incomeData.sort((a,b) => {
        const dateA = new Date(a.x);
        const dateB = new Date(b.x);
        return dateA-dateB;
      });
      console.log(incomeData,"income getter")
      return [incomeData, incomeDate];
      },
      getIncomeCategories(state){
        return state.incomeCategories;
      },
      getIncomeCsvData(state){
        let data = [];
        for(let income of state.filteredIncome){
          data.push([new Date(income.date).toLocaleDateString('en-US'), income.title, `+${income.amount}`, income.description, income.categoryId.categoryName])
        }
        return data;
      }
};
