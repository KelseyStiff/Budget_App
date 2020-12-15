<template>
  <div>
    <!--code for this popup(modal) component is mostly copied from https://vuejs.org/v2/examples/modal.html-->
    <transition name="modal">

      <div v-if="isOpen">
        <div class="overlay">
          <div class="modal">

            <!--any form validation errors in error array show here-->
            <div v-show="errors.length > 0">
              <ul>
                <!--loop through errors to list all on separate lines-->
                <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
              </ul>
            </div>

            <div class="inputs">
              <label>Name:</label>
              <input type="text" v-model="transactionName">
              <br>

              <label>Amount:</label>
              <input type="number" v-model="transactionAmount">
              <br>

              <label>Type:</label>
              <!--if expense is selected, category is not required and will be disabled-->
              <input onclick="document.getElementById('category').disabled = true" type="radio" id="income" class="incomeOrExpenseCheck" name="incomeOrExpenseCheck" value="income">
              <label for="income">Income</label>
              <input onclick="document.getElementById('category').disabled = false" type="radio" id="expense" class="incomeOrExpenseCheck" name="incomeOrExpenseCheck" value="expense">
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

              <label>Date:</label>
              <input type="date" v-model="dateString">
            </div>

            <br>

            <!--when add button is selected, add transaction method emits transaction to App.vue-->
            <button  v-on:click="addTransaction()" >add</button>

            <!--close button will exit pop up and clear all entered data-->
            <p v-on:click="isOpen = !isOpen; clearData() ">close</p>

          </div>
        </div>
      </div>
    </transition>

    <!--add transaction button opens the pop-up form-->
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
      dateString: '',
      errors: []
    };
  },
  methods: {
  addTransaction(){

    this.errors = []

    //form validation
    if(!this.transactionName){
      this.errors.push('Transaction Name Required')
    }
    if(!this.transactionAmount || this.transactionAmount < 0){
      this.errors.push('enter valid Transaction Amount (cannot 0 or less)')
    }
    if(document.getElementById('expense').checked && !this.transactionCategory ) {
      this.errors.push('Category Required for Expense')
    }
    if(!this.dateString){
      this.errors.push('Date of Transaction Required')
    }

    if(this.errors.length === 0) {

      //if user selects income, then incomeOrExpense = false and income is not added to expense array & chart
      this.incomeOrExpense = !document.getElementById('expense').checked;

      //if the user selects expense as type, a category is required
      if(this.incomeOrExpense === true){
        //if user selects income, category is not required, if one is selected it is cleared.
        this.transactionCategory = ''
      }

      //if no errors, transaction object is created with entered data
      let transaction = {
        name: this.transactionName,
        amount: this.transactionAmount,
        income: this.incomeOrExpense,
        category: this.transactionCategory,
        date: this.dateString
      }

      //emit transaction-added event to app to vue along with transaction object
      this.$emit('transaction-added', transaction)
    }

  },
    clearData(){
    //clear all data when form pop up is closed/cancelled
    this.errors = []
      this.transactionName = ''
      this.transactionCategory = ''
      this.transactionAmount = ''
      this.dateString = ''
    }
  }
}
</script>

<style scoped>

.modal {
  width: 500px;
  margin: 0 auto;
  padding: 10px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px 3px #ac85bc;
  transition: all 0.2s ease-in;
  font-family: Helvetica, Arial, sans-serif;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  text-align: center;
  width: 100%;
  height: 100%;
  background: rgba(238, 214, 255, .5)

}

input{
margin: 15px;
}


img {
  width: 50px;
}

p {
  margin-left: 90%;
  color: purple;

}

ul{
  text-align: center;
  list-style-type: none;
  color: indianred;
}

button{
  background-image: linear-gradient(to right, #d1a4ff, #8eddf1);
  border: none;
  padding: 10px;
  font-size: 20px;
  width: 100px;
  border-radius: 25px;
  text-align: center;
}




</style>