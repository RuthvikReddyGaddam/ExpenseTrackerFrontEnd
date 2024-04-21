export default {
  async deleteIncome(context, payload) {
   const token = payload.token;

    const response = await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/deleteIncome`,
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

    context.commit('deleteIncome', payload);
  },

  async addIncome(context, payload) {
   const token = payload.token;
    const response = await fetch(`${context.rootState.backendUrl}/incomeExpenses/newIncome`, {
      method: 'POST',
      headers: {
        'Authorization': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload.incomeItem)
    })
    let responseData = await response.json()
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to add income! Try later.'
      );
      throw error;
    }
    context.commit('addIncome', responseData);
  },

  filteredIncome(context, payload) {
    context.commit("filteredIncome", payload)
  },


  async loadIncome(context, payload) {
   const token = payload.token;
    const response = await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/income`,
      {
        headers: {
          'Authorization': token
        }
      }
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to load income!');
      throw error;
    }
    const income = []
    for (let responseItem of responseData) {
      let incomeItem = {
        amount: responseItem.amount,
        categoryId: responseItem.categoryId,
        date: responseItem.date,
        description: responseItem.description,
        paymentType: responseItem.paymentType,
        title: responseItem.title,
        user: responseItem.user,
        _id: responseItem._id,
      }
      income.push(incomeItem);
    }

    context.commit('setIncome', income);
    // context.commit('setFetchTimestamp');
  },
  async setIncomeCategories(context, payload){
    const token = payload.token;
    const response = await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/categories/income`,
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

    context.commit('setIncomeCategories', categories);
  }



}