export default {
    addIncome(state, payload){
    //     const token = context.rootGetters.token;

    // const response = await fetch(
    //   `https://vue-http-demo-85e9e.firebaseio.com/coaches/${userId}.json?auth=` +
    //     token,
    //   {
    //     method: 'PUT',
    //     body: JSON.stringify(coachData)
    //   }
    // );
    // if (!response.ok) {
    //     // error ...
    //   }
  
    //   context.commit('registerCoach', {
    //     ...coachData,
    //     id: userId
    //   });
    state.income.push(payload);
    },
    deleteIncome(state, payload){
        console.log(payload)
        const index = state.income.findIndex(incomeItem => incomeItem._id === payload._id);
        state.income.splice(index,1);
    },
    filteredIncome(state, payload){
        state.filteredIncome = payload;
    }
}