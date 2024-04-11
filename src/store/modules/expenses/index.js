import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
    namespaced: true,
    state() {
        return {
            expenses: [
                {
                  _id: "65f743e53d08fec6ec1d4f08",
                  title: "chipotle food",
                  date: "2023-03-01T06:00:00.000+00:00",
                  amount: 1050,
                  description: "chipotle",
                  categoryId: "c2",
                  paymentType: "cash",
                  user: "65f740723d08fec6ec1d4efd",
                  receipt:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX0EpqEE2_hCg2oBuXSr5z33aZd6dSGlau_f-NBaKMw&s",
                },
        
                {
                  _id: "65f743e53d08fec6ec1d4f09",
                  title: "trash",
                  date: "2023-03-02T06:00:00.000+00:00",
                  amount: 40,
                  description: "trash and maintenance",
                  categoryId: "c5",
                  paymentType: "cash",
                  user: "65f740723d08fec6ec1d4efd",
                  receipt:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX0EpqEE2_hCg2oBuXSr5z33aZd6dSGlau_f-NBaKMw&s",
                },
                {
                  _id: "65f743e53d08fec6ec1d4f0a",
                  title: "costco",
                  date: "2023-03-03T06:00:00.000+00:00",
                  amount: 100,
                  description: "costco groceries",
                  categoryId: "c1",
                  paymentType: "debit",
                  user: "65f740723d08fec6ec1d4eff",
                  receipt:
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvX0EpqEE2_hCg2oBuXSr5z33aZd6dSGlau_f-NBaKMw&s",
                },
              ],
              filteredExpenses: []
        };
    },
    actions,
    getters,
    mutations
};
