import { createStore } from 'vuex';
import expensesModule from './modules/expenses/index';
import incomeModule from './modules/income/index';
import authModule from './modules/auth/index';

const store = createStore({
    state(){
return{
    prod: "test",
    backendUrl: "http://localhost:3000"
}
    },
    getters: {
        backendUrl(state){
            return state.backendUrl;
        }
    },

    modules: {
        expenses: expensesModule,
        income: incomeModule,
        auth: authModule
    },
});

export default store;