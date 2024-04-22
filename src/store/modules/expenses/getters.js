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
    allExpensesTotal(state) {
      let totalSum = 0;
      for (let i = 0; i < state.expenses.length; i++) {
          totalSum += state.expenses[i].amount;
        }
        return totalSum;

  },
    pieChartExpense(state) {
        const categoryTotals = state.filteredExpenses.reduce((totals, item) => {
          const categoryName = item.categoryId.categoryName;
          const amount = item.amount;
          totals[categoryName] = (totals[categoryName] || 0) + amount;
          return totals;
        }, {});
      
        const data = Object.keys(categoryTotals);
        const values = Object.values(categoryTotals);
      
        return [data, values];
      },
      lineChartExpenses(state){
        let expenseDate = state.filteredExpenses.map(expense => (new Date(expense.date).toLocaleDateString('en-US')));
        let expenseData = state.filteredExpenses.map(expense => ({ x: new Date(expense.date).toLocaleDateString('en-US'), y: expense.amount }));
        expenseData = expenseData.sort((a,b) => {
          const dateA = new Date(a.x);
          const dateB = new Date(b.x);
          return dateA-dateB;
        });
        console.log(expenseData,"expense getter")
        return [expenseData, expenseDate];
        },
        getExpenseCategories(state){
          return state.expenseCategories;
        },
        getExpenseCsvData(state){
          let data = [];
          for(let expense of state.filteredExpenses){
            data.push([new Date(expense.date).toLocaleDateString('en-US'), expense.title, `-${expense.amount}`, expense.description, expense.categoryId.categoryName])
          }
          return data;
        }
};