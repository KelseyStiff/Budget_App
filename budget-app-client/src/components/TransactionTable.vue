<template>
  <div>
      <div class="edit-table-toggle form-check">
        <input id="edit-table" type="checkbox" class="form-check-input" v-model="editTable">
        <label for="edit-table" class="form-check-label">Edit table?</label>
      </div>

      <div id="transaction-table">
        <table class="table">
          <tr>
            <th>Name</th>
            <th>Amount</th>
            <th>Category</th>
            <th v-show="editTable">Delete</th>
          </tr>

          <transaction-row
              v-for="transaction in transactions"
              v-bind:transaction="transaction"
              v-on:delete-transaction="deleteTransaction"
              v-bind:edit="editTable"
              v-bind:key="transaction.key">
          </transaction-row>

        </table>
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
      this.$emit('delete-transaction', transaction)
    }
  }
}
</script>

<style>
#transaction-table {
  max-height: 500px;
  overflow: scroll;
  border: 2px solid lightblue;
  padding: 20px;
}
</style>