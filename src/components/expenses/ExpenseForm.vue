<template>
  <div>
    <h4 v-if="!isValid">Invalid submission. Provide valid information!</h4>
    <form @submit.prevent="formSubmit">
      <div>
        <label for="title">Expense Title</label>
        <input type="text" v-model.trim="title" id="title" />
      </div>
<div>
  
  <label for="amount">Expense Amount</label>
      <input
        type="number"
        v-model.trim="amount"
        id="amount"
        placeholder="$"
      />
</div>

      <div>
        <label for="category">category</label>
        <select v-model.trim="category" id="category">
          <option value="Grocery">Grocery</option>
          <option value="Food">Food</option>
          <option value="Rent">Rent</option>
          <option value="Subscriptions">Subscriptions</option>
          <option value="Insurance">Insurance</option>
        </select>
      </div>

      <div>
        <label for="payment">Payment</label>
        <select v-model.trim="payment" id="payment">
          <option value="cash">cash</option>
          <option value="debit">Debit</option>
          <option value="credit">credit</option>
        </select>
      </div>

      <div>
        <label for="date">Date</label>
        <input type="date" v-model="date">
      </div>

      <div>
        <label for="description">Description</label>
        <textarea
          v-model.trim="description"
          id="description"
          cols="30"
          rows="5"
        ></textarea>
      </div>

      <div>
        <label for="receipt">Receipt</label>
        <input type="file" id="receipt" ref="receipt" accept="image" />
      </div>
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      amount: 0,
      date: "",
      category: "",
      payment: "",
      description: "",
      isValid: true
    };
  },
  methods: {
    validateForm() {
      this.isValid = true;
    if(this.title === '' || this.amount <0 || !this.date  || this.category === '' || this.payment === '' || this.description === ''){
      this.isValid = false;
    }  
    },
    formSubmit() {
      this.date = new Date(this.date);
      this.validateForm();
      const expense = {
        title: this.title,
        amount: Number(this.amount),
        date: this.date,
        category: this.category,
        paymentType: this.payment,
        description: this.description,
        receipt: this.$refs.receipt.files[0],
      };
      if(this.isValid){
        this.$store.dispatch("expenses/addExpense", expense);
      }

      
    },
  },
};
</script>

<style scoped>
textarea {
  resize: none;
  width: 100%;

  border-radius: 5px;
}

form {
  div {
    margin-top: 10px;
  }
}

input,
select {
  height: 30px;
  width: 100%;
  border: 1 px solid black;
  border-radius: 5px;
}

h4{
  margin-left: 30px;
  margin-top: 30px;
  color: rgba(183, 28, 28, 0.849);
}
</style>
