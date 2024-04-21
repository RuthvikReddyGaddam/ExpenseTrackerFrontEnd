export default {
    setUser(state, payload) {
        state.user = payload.userDetails;
        state.token = payload.token;
        state.isLoggedIn = payload.isLoggedIn;
    },
    updateBudgetGoals(state, payload) {
        state.user.budget = payload.budget
        state.user.goals = payload.goals;
    },
    updateBalance(state, payload) {
        if (payload.type === "expense") {
            state.user.balance = state.user.balance - payload.amount;
        }else{
            state.user.balance = state.user.balance + payload.amount;    
        }
    },
    autoLogout(state) {
        state.autoLogout = true;
      }


}