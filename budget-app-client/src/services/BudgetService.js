import axios from 'axios'

export default {

    getAllBudgetTransactions() {
        return axios.get('/api/budget_transactions').then( response => {
            return response.data
        })
    },

    addBudgetTransaction(budgetTransaction) {
        return axios.post('/api/budget_transactions', budgetTransaction).then( response => {
            return response.data
        })
    },
    deleteBudgetTransaction(budgetTransaction) {
        return axios.delete(`/api/budget_transactions/${budgetTransaction.id}`, budgetTransaction).then(response => {
            return response.data
        })
    }

}