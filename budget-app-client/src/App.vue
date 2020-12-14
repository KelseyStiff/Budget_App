<template>
  <div id="app">

      <div class="container">

        <h1 id="balance">${{ balance }}</h1>

        <div class="income-expense" id="income-style">
          <h1>${{ incomeTotal }}</h1>
        </div>

        <div class="income-expense" id="expense-style">
          <h1>${{ expenseTotal }}</h1>
        </div>
        <br>

        <div id="add-button">
          <AddTransaction v-on:transaction-added="newTransactionAdded" ></AddTransaction>
        </div>

      </div>

    <br>

    <div id="table">
      <TransactionTable v-bind:transactions="allTransactions" v-on:delete-transaction="transactionDeleted"></TransactionTable>
    </div>

    <div id="chart">
      <budget-chart v-bind:chartData="chartData" :total="100"></budget-chart>
    </div>

    <div id="creds">
      Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
    </div>

  </div>

</template>

<script>
import BudgetChart from './components/BudgetChart.vue'
import AddTransaction from './components/AddTransaction.vue'
import TransactionTable from './components/TransactionTable.vue'
let _ = require("underscore");

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
    newTransactionAdded(transaction) {
      this.$budget_transaction_api.addBudgetTransaction(transaction).then( response => {
      this.getAllData()
      })
    },
    getAllData(){
      this.$budget_transaction_api.getAllBudgetTransactions().then(transaction => {
       this.allTransactions = transaction

        let i = _.groupBy(this.allTransactions, "income")
        this.allIncomes = i.true
        this.allExpenses = i.false

        console.log(i.true)
        console.log(this.allExpenses)

      })
    },
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
          backgroundColor: ['#5680e9','#84CEEB','#5AB9EA','#C1C8E4', '#8860D0']
        }]
      }
    },
    expenseTotal: function (){
      return this.allExpenses.reduce(function (prev, cur) {
        return prev + cur.amount;
      }, 0)

    },
    incomeTotal: function (){
      return this.allIncomes.reduce(function (prev,cur){
        return prev + cur.amount
      }, 0)
    },
    balance: function (){
      return this.incomeTotal - this.expenseTotal
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}



.container{
  background-image: linear-gradient(to right, #00ff90, #8eddf1);
  width: auto;
  padding-bottom: 100px;
  position: relative;
  padding-top: 5px;
}


#balance {
  text-align: center;
}

#expense-style {
  position:relative;
  background: white;
  float: right;
  width: 125px;
  overflow: hidden;
  margin-right: 50px;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 5px 5px 8px #99c1af;
  text-align: center;
}

#income-style {
  position:relative;
  background: white;
  float: left;
  width: 125px;
  overflow: auto;
  margin-left: 50px;
  border-radius: 25px;
  padding: 5px;
  box-shadow: 5px 5px 8px #99c1af;
  text-align: center;

}

#add-button {
  position:absolute;
  bottom:-30px;
  right:46%;
  background: white;
  border-radius: 50px;
}

#table {
  float: left;
  display: block;
  width: auto;
  margin: 10px;
}

#chart {
  float: right;
  width: auto;
  margin: 10px;
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
