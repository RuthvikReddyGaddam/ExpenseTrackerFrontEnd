import { createStore } from 'vuex';

import expensesModule from './modules/expenses/index';
import incomeModule from './modules/income/index';


const store = createStore({
    state() {
            return {
                userId: '',
                budget: 0,
                goals: ''
            };
    },
    getters: {
        budget(state){
            return state.budget;
        },
        goals(state){
            return state.goals
        }
    },
    actions: {
        updateBudgetGoals(context, payload) {
            context.commit("updateBudgetGoals", payload)
        }
    },
    mutations: {
        updateBudgetGoals(state, payload) {
            state.budget = payload.budget;
            state.goals = payload.goals;
    },
},
    modules: {
        expenses: expensesModule,
        income: incomeModule
    }
});

export default store;