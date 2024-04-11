export default {
    deleteExpense(context, payload) {
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
        context.commit('deleteExpense',payload);
    },
    addExpense(context, payload) {
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
        context.commit('addExpense',payload);
    },
    filteredExpenses(context, payload) {
        context.commit("filteredExpenses", payload)
    }


}