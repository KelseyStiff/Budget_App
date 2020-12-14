<template>
  <div>
        <transition name="modal">
      <div v-if="isOpen">
        <div class="overlay" @click.self="isOpen = false;">
          <div class="modal">

            <label>Name:</label>
            <input type="text" v-model="transactionName">
            <br>
            <label>Amount:</label>
            <input type="number" v-model="transactionAmount">
            <br>
            <input onclick="document.getElementById('category').disabled = true" type="radio" id="income" name="incomeOrExpenseCheck" value="income">
            <label for="income">Income</label>
            <input onclick="document.getElementById('category').disabled = false" type="radio" id="expense" name="incomeOrExpenseCheck" value="expense">
            <label for="expense">Expense</label>
            <br>
            <label>Category:</label>
            <select id="category" v-model="transactionCategory">
              <option>Housing</option>
              <option>Food</option>
              <option>Transportation</option>
              <option>Utilities</option>
            </select>
            <br>

            <button v-on:click="addTransaction(); isOpen = !isOpen" >add</button>
          </div>
        </div>
      </div>
    </transition>

   <img v-on:click="isOpen = !isOpen" src="../assets/add_button.png" />

  </div>

</template>

<script>
export default {
  data: function() {
    return {
      isOpen: false,
      transactionName: '',
      transactionAmount: 0,
      incomeOrExpense: false,
      transactionCategory: '',
    };
  },
  methods: {
  addTransaction(){
    this.incomeOrExpense = !document.getElementById('expense').checked;

    let transaction = {name: this.transactionName, amount: this.transactionAmount, income: this.incomeOrExpense, category: this.transactionCategory}
       this.$emit('transaction-added', transaction)
        console.log(transaction.income)
  },

  }
};
</script>

<style scoped>

.modal {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

img {
  width: 50px;
}


</style>