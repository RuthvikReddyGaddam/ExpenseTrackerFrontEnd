export default {
    totalIncome(state) {
        let totalSum = 0;
        for (let i = 0; i < state.filteredIncome.length; i++) {
            totalSum += state.filteredIncome[i].amount;
          }
          return totalSum;
    },
    income(state) {
        return state.income;
    },
    pieChartIncome(state) {
        const categoryTotals = state.filteredIncome.reduce((totals, item) => {
          const { categoryId, amount } = item;
          totals[categoryId] = (totals[categoryId] || 0) + amount;
          return totals;
        }, {});
      
        const data = Object.keys(categoryTotals);
        const values = Object.values(categoryTotals);
      
        return [data, values];
      },
      lineChartIncome(state){
      const incomeDate = state.filteredIncome.map(incomeItem => (incomeItem.date));
      const incomeData = state.filteredIncome.map(incomeItem => ({ x: incomeItem.date, y: incomeItem.amount }));
      return [incomeData, incomeDate];
      }
};
