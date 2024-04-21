export default {
    addIncome(state, payload) {
        state.income.push(payload);
    },
    deleteIncome(state, payload) {
        const index = state.income.findIndex(incomeItem => incomeItem._id === payload._id);
        state.income.splice(index, 1);
        state
    },
    filteredIncome(state, payload) {
        state.filteredIncome = payload;
    },
    setIncome(state, payload) {
        state.income = []
        state.income = payload
    },
    setIncomeCategories(state, payload) {
        state.incomeCategories = [];
        state.incomeCategories = payload;
    }
}