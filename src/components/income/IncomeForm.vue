<template>
  <div>
    <h4 v-if="!isValid">Invalid submission. Provide valid information!</h4>
    <form @submit.prevent="formSubmit">
      <div>
        <label for="title">Income Title</label>
        <input type="text" v-model.trim="title" id="title" />
      </div>

      <div>
        <label for="amount">Income Amount</label>
        <input type="number" v-model.trim="amount" id="amount" placeholder="$" />
      </div>

      <div>
        <label for="category">category</label>
        <select v-model="category" id="category">
          <option value="salary">Salary</option>
          <option value="freelance">Freelance</option>
          <option value="business">Business</option>
          <option value="investment">Investment</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label for="payment">Payment</label>
        <select v-model="payment" id="payment">
          <option value="cash">cash</option>
          <option value="debit">Debit</option>
          <option value="credit">credit</option>
        </select>
      </div>

      <div>
        <label for="date">Enter a date</label>
        <input type="date" v-model="date" id="date" />
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
      isValid: true,
    };
  },
  methods: {
    validateForm() {
      this.isValid = true;
      if (
        this.title === "" ||
        this.amount < 0 ||
        !this.date ||
        this.category === "" ||
        this.payment === "" ||
        this.description === ""
      ) {
        this.isValid = false;
      }
    },
    formSubmit() {
      this.date = new Date(this.date);
      this.validateForm();
      const incomeItem = {
        title: this.title,
        amount: Number(this.amount),
        date: this.date,
        category: this.category,
        paymentType: this.payment,
        description: this.description,
      };
      if (this.isValid) {
        this.$store.dispatch("income/addIncome", incomeItem);
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

h4 {
  margin-left: 30px;
  margin-top: 30px;
  color: rgba(183, 28, 28, 0.849);
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
</style>
