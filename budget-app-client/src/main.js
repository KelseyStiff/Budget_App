import Vue from 'vue'
import App from './App.vue'

//adds a new variable to Vue object
import BudgetService from "./services/BudgetService";

Vue.prototype.$budget_transaction_api = BudgetService

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')