<!--table component to hold transaction row components-->
<template>
  <div>
    <div id="transaction-table">
      <table class="table">
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Date</th>

<!--         if delete check box selected, delete table row will appear-->
          <th v-show="editTable">Delete</th>
        </tr>

<!--        when delete transaction event is emitted, transaction row is removed from table-->
        <transaction-row
            v-for="transaction in transactions"
            v-bind:transaction="transaction"
            v-on:delete-transaction="deleteTransaction"
            v-bind:edit="editTable"
            v-bind:key="transaction.key">
        </transaction-row>

      </table>
    </div>


    <div class="edit-table">
      <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
      <label for="edit-table" class="form-check-label">delete transactions?</label>
    </div>

  </div>
</template>

<script>

import TransactionRow from '@/components/TransactionRow.vue'

export default {
  name: 'TransactionTable',
  components: { TransactionRow },
  props: {
    transactions: Array
  },
  data(){
    return {
      editTable: false
    }
  },
  methods: {
    deleteTransaction(transaction){
      //emits delete transaction even to app.vue to be completely delete from database
      this.$emit('delete-transaction', transaction)
    }
  }
}
</script>

<style>
#transaction-table {
  max-height: 500px;
  overflow: scroll;
  padding: 20px 20px 0px 20px;
}

table, th {
  border: 2px solid #d2b0e5;
  border-collapse: collapse;
  padding: 5px;
  width: auto;

}

.edit-table{
  display: block;
  text-align: center;
  font-size: small;
}

</style>