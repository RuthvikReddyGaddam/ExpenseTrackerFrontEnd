export default {
    addExpense(state, payload){
    state.expenses.unshift(payload);
    },
    deleteExpense(state, payload){
        const index = state.expenses.findIndex(expense => expense._id === payload._id);
        state.expenses.splice(index,1);
    },
    filteredExpenses(state, payload){
        state.filteredExpenses = [];
        state.filteredExpenses = payload;
    },
    setExpenses(state, payload) {
        state.expenses = [];
        state.expenses = payload;
    },
    setExpenseCategories(state, payload) {
        state.expenseCategories = [];
        state.expenseCategories = payload;
    }
}