export default {
  async deleteExpense(context, payload) {
    const token = payload.token;

    const response = await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/deleteExpense`,
      {
        headers: {
          'Authorization': token,
          'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({_id: payload._id, amount: payload.amount})
      }
    );
    if (!response.ok) {
      // error ...
    }

    context.commit('deleteExpense', payload);
  },

  async addExpense(context, payload) {
    const token = payload.token;
    const response = await fetch(`${context.rootState.backendUrl}/incomeExpenses/newExpense`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.expense)
    })
    let responseData = await response.json()
    if (!response.ok) {
      // error ...
    }

    context.commit('addExpense', responseData);
  },
  filteredExpenses(context, payload) {
    context.commit("filteredExpenses", payload)
  },

  async loadExpenses(context, payload) {
    const token = payload.token;
    const response = await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/expenses`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to load expenses!');
      throw error;
    }
    const expenses = []
    if(responseData.length>0){
      for (let response of responseData) {
        let expense = {
          amount: response.amount,
          categoryId: response.categoryId,
          date: response.date,
          description: response.description,
          paymentType: response.paymentType,
          receipt: response.receipt,
          title: response.title,
          user: response.user,
          _id: response._id,
        }
        expenses.push(expense);
    }
    
    }
    context.commit('setExpenses', expenses);
    // context.commit('setFetchTimestamp');
  },
  async setExpenseCategories(context, payload){
    const token = payload.token;
    const response = await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/categories/expenses`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to load categories!');
      throw error;
    }
    const categories = []
      for (let response of responseData) {
        let category = {
          _id: response._id,
          categoryName: response.categoryName
        }
        categories.push(category);
    }
    context.commit('setExpenseCategories', categories);
  }


}