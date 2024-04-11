export default {
    expenses(state) {
        return state.expenses;
    },
    totalExpenses(state) {
        let totalSum = 0;
        for (let i = 0; i < state.filteredExpenses.length; i++) {
            totalSum += state.filteredExpenses[i].amount;
          }
          return totalSum;

    },
    pieChartExpense(state) {
        const categoryTotals = state.filteredExpenses.reduce((totals, item) => {
          const { categoryId, amount } = item;
          totals[categoryId] = (totals[categoryId] || 0) + amount;
          return totals;
        }, {});
      
        const data = Object.keys(categoryTotals);
        const values = Object.values(categoryTotals);
      
        return [data, values];
      },
      lineChartExpenses(state){
        const expenseDate = state.filteredExpenses.map(expense => (expense.date));
        const expenseData = state.filteredExpenses.map(expense => ({ x: expense.date, y: expense.amount }));
        return [expenseData, expenseDate];
        }
};