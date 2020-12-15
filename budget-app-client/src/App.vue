<template>
  <div id="app">


    <div class="amounts-heading">

      <!-- displays balance of income - expenses-->
      <h1>${{ balance }}</h1>

      <!-- displays balance of income - calling the incomeTotal computed property-->
      <div id="income-style">
        <p>income</p>
        <h1>${{ incomeTotal }}</h1>
      </div>

      <!-- displays balance of expenses - calling the expenseTotal computed property -->
      <div id="expense-style">
        <p>expense</p>
        <h1>${{ expenseTotal }}</h1>
      </div>
      <br>

      <!-- add transaction component - triggers transaction-added method on click (which opens pop-up form)
       when transaction-added emits transaction the newTransactionAdded method is called to add transaction-->
      <div id="add-button">
        <AddTransaction v-on:transaction-added="newTransactionAdded" ></AddTransaction>
      </div>

    </div> <!-- end of amounts heading div -->

    <br>

    <div id="table-style">
      <!-- transaction table component - array of all transactions is binded, when delete-transaction emits transaction
      to be deleted, transactionDeleted method is called to delete transaction-->
      <TransactionTable v-bind:transactions="allTransactions" v-on:delete-transaction="transactionDeleted"></TransactionTable>
    </div>


    <div id="chart-style">
      <!-- chart component for viewing expense transactions by category-->
      <budget-chart v-if="allExpenses" v-bind:chartData="chartData"></budget-chart>
    </div>

    <div id="creds">
      Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    </div>



  </div> <!--  end of app-->

</template>

<script>
//importing components
import BudgetChart from './components/BudgetChart.vue'
import AddTransaction from './components/AddTransaction.vue'
import TransactionTable from './components/TransactionTable.vue'

// underscore import - (recommended on stack overflow for ._GroupBy method)
let _ = require("underscore");

//Vue app creation
export default {
  name: 'App',
  components: {
    AddTransaction,
    BudgetChart,
    TransactionTable,
  },
  data(){
    return {
      allIncomes: [],
      allExpenses: [],
      allTransactions: [],
    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    //add new transaction to api by calling the addBudgetTransaction routing request and responding with
    //getAllData method
    newTransactionAdded(transaction) {
      this.$budget_transaction_api.addBudgetTransaction(transaction).then( response => {
        this.getAllData()
      })
    },
    //fetching all data from api via getAllBudgetTransactions routing request, responding with
    //transaction object
    getAllData(){
      this.$budget_transaction_api.getAllBudgetTransactions().then(transaction => {

        //transaction object is added to allTransaction array
        this.allTransactions = transaction

        // learned how to use underscore.js group by from stackoverflow (by: Bergi)
        // group by method splits all transaction array into two arrays (allIncomes & allExpenses)
        // based on the income element so income & expense transactions are seperated

        //I believe this method is causing an error - allIncome & allExpense arrays are showing
        //undefined in dev tools until at least 1 income and 1 expense exist in api
        let i = _.groupBy(this.allTransactions, "income")
        this.allIncomes = i.true
        this.allExpenses = i.false
      })
    },
    //deletes transaction from api via deleteBudgetTransaction routing request then responds
    //with updated data
    transactionDeleted(transaction){
      this.$budget_transaction_api.deleteBudgetTransaction(transaction).then( () => {
        this.getAllData()
      })
    },
  },
  computed: {
    chartData() {
        let labels = this.allExpenses.map(rec => rec.category)
        let amounts = this.allExpenses.map(rec => rec.amount)

        return {
          labels: labels,
          datasets: [ {
            label: 'amount for category',
            data: amounts,
            backgroundColor: ['#ecb1d1','#84CEEB','#5AB9EA','#d9c4fd', '#8860D0','#8860D0','#C4FFDB','#E483F8','#6AFFC1']
          }]
        }
    },
    //calcs the total of all expense amounts
    expenseTotal: function (){
      //checking if allExpenses exists before trying to work with it
      if(this.allExpenses){
        //learned how to use .reduce method on stack overflow (by: OwChallie)
        return this.allExpenses.reduce(function (prev, cur) {
          return prev + cur.amount;
        }, 0)
      }
    },
    //calcs total of all incomes using .reduce
    incomeTotal: function (){
      //checking if allIncomes exists before calc
      if(this.allIncomes){
        return this.allIncomes.reduce(function (prev,cur){
          return prev + cur.amount
        }, 0)
      }
    },

    //calcs balance of income - expense
    balance: function (){
      if(this.allIncomes && !this.allExpenses){
        return this.incomeTotal
      } if (this.allExpenses && !this.allIncomes){
        return this.expenseTotal
      } else {
        return this.incomeTotal - this.expenseTotal
      }
    }
  },

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.amounts-heading{
  background-image: linear-gradient(to right, #d1a4ff, #8eddf1);
  width: auto;
  padding-bottom: 100px;
  position: relative;
  padding-top: 5px;
  text-align: center;
  border-radius: 15px;
}

#income-style {
  position:relative;
  background: white;
  float: left;
  width: auto;
  bottom: 20px;
  min-width: 150px;
  max-width: 300px;
  overflow: auto;
  margin-left: 50px;
  border-radius: 25px;
  padding: 2px;
  box-shadow: 5px 5px 8px #d5fffb;
  text-align: center;
}

#expense-style {
  position:relative;
  background: white;
  float: right;
  width: auto;
  bottom: 20px;
  min-width: 150px;
  max-width: 300px;
  display: inline-block;
  margin-right: 50px;
  border-radius: 25px;
  padding: 2px;
  box-shadow: 5px 5px 8px #d5fffb;
  text-align: center;
}

#add-button {
  position:absolute;
  bottom:-30px;
  right:46%;
  background: white;
  border-radius: 50px;
}

#table-style{
  float: left;
  height: 300px;
  display: block;
  margin-left: 60px;
  margin-bottom: 100px;
}

#chart-style {
  float: right;
  width: auto;
  display: block;
  padding: 20px 25px 5px 5px;
  margin-right: auto;
}

#creds {
  color: lightgray;
  font-size: x-small;
  margin: auto;
  text-align: center;
  bottom: 0;
  position: fixed;
}


</style>