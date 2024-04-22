let timer;
export default {
  async register(context, payload) {

    let response = await fetch(
      `${context.rootState.backendUrl}/users//register`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      });
      let responseData = await response.json()
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to Register! Try later.'
      );
      throw error;
    }

    const token = responseData.token;
    response = await fetch(`${context.rootState.backendUrl}/users`, {
      headers: {
        'Authorization': token
      },
    });
    const userDetails = await response.json();
    if (!response.ok) {
      const error = new Error(
        userDetails.message || 'Failed to Login! Try later.'
      );
      throw error;
    }
    const expiresIn = +userDetails.exp;
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);
    context.commit("setUser", {userDetails: userDetails, token:  token, isLoggedIn: true});
  },

  async login(context, payload) {
    let response = await fetch(
      `${context.rootState.backendUrl}/users/login`,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      });
    let responseData = await response.json()
    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to Register! Try later.'
      );
      throw error;
    }
    const token = responseData.token;
    response = await fetch(`${context.rootState.backendUrl}/users`, {
      headers: {
        'Authorization': token
      },
    });
    const userDetails = await response.json();
    if (!response.ok) {
      const error = new Error(
        userDetails.message || 'Failed to Login! Try later.'
      );
      throw error;
    }

    const expiresIn = +userDetails.exp;
    timer = setTimeout(function () {
      context.dispatch('autoLogout');
    }, expiresIn);

  
    context.commit("setUser", {userDetails: userDetails, token: token, isLoggedIn: true});
    await context.dispatch("expenses/loadExpenses", {token: token}, {root: true});
    await context.dispatch("income/loadIncome", {token: token}, {root: true}); 

  },
  async updateBudgetGoals(context, payload) {
    const token = payload.token;
    const data = { budget: payload.budget, goals: payload.goals };
    await fetch(
      `${context.rootState.backendUrl}/incomeExpenses/updateBudgetGoals`,
      {
        headers: {
          "Authorization": token,
          'Content-Type': 'application/json'
        },
        method: 'PATCH',
        body: JSON.stringify(data)
      });
    context.commit("updateBudgetGoals", data)
  },
  logout(context) {
    clearTimeout(timer);
    context.commit("setUser", { token: null, user: null, isLoggedIn: false });

  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("autoLogout");
  },

  updateBalance(context, payload){
    context.commit("updateBalance", payload);
  }
}