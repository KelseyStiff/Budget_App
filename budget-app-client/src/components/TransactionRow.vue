<!--row component for each transaction-->
<template>
  <tr>
    <td>{{ transaction.name }}</td>
    <td>{{ transaction.amount }}</td>
    <td>{{ transaction.category}}</td>

    <!--formats date with filter-->
    <td>{{ transaction.date | shortDate}}</td>


<!--    when edit checkbox is selected, delete row will show delete button-->
<!--    when clicked it will call deleteTransaction method-->
    <td v-show="edit"><img v-on:click="deleteTransaction" src="@/assets/delete.png"></td>
  </tr>
</template>

<script>
//imported moment - recommended from stackoverflow to format date for Vue app
import moment from 'moment';
export default {
  name: 'TransactionRow',
  props: {
    transaction: Object,
    edit: Boolean

  },
  methods: {
    deleteTransaction(){
      if(confirm(`Delete?`))
        //emits delete-transaction event with said transaction to be deleted
        //to TransactionTable component
        this.$emit('delete-transaction',this.transaction)
    }
  },
  filters: {
    shortDate(date){
      if (date) {
        //using moment to format date
        return moment(String(date)).format('MM/DD/YYYY')
      }
    }
  },
}

</script>

<style scoped>

img {
  height: 25px;
}

td {
  padding: 5px;
}
</style>