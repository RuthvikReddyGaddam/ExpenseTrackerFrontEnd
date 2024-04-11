export default {
    addExpense(state, payload){

    state.expenses.push(payload);
    },
    deleteExpense(state, payload){
        const index = state.expenses.findIndex(expense => expense._id === payload._id);
        state.expenses.splice(index,1);
    },
    filteredExpenses(state, payload){
        state.filteredExpenses = payload;
    }
}