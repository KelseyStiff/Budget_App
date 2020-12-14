<template>
  <tr>
    <td>{{ transaction.name }}</td>
    <td>{{ transaction.amount }}</td>
    <td>{{ transaction.category}}</td>

    <td v-show="edit"><img v-on:click="deleteTransaction" src="@/assets/delete.png"></td>
  </tr>
</template>

<script>
export default {
  name: 'TransactionRow',
  props: {
    transaction: Object,
    edit: Boolean
  },
  methods: {
    deleteTransaction(){
      if(confirm(`Delete?`))
        this.$emit('delete-transaction',this.transaction)
    }
  }
}

</script>

<style scoped>

img {
  height: 25px;
}

</style>