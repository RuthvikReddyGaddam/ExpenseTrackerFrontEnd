<template>
  <div>
    <h4 v-if="!isValid">{{ error }}</h4>
    <form @submit.prevent="formSubmit">
      <div>
        <label for="title">Income Title</label>
        <input type="text" v-model.trim="title" id="title" />
      </div>

      <div>
        <label for="amount">Income Amount</label>
        <input
          type="number"
          v-model.trim="amount"
          id="amount"
          placeholder="$"
        />
      </div>

      <div>
        <label for="category">category</label>
        <select v-model="category" id="category">
          <option
            v-for="category in incomeCategories"
            :key="category._id"
            :value="category.categoryName"
          >
            {{ category.categoryName }}
          </option>
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

      <button class="submitButton">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["token"],
  data() {
    return {
      title: "",
      amount: 0,
      date: "",
      category: "",
      payment: "",
      description: "",
      error: 'Invalid submission. Provide valid information!',
      isValid: true,
    };
  },
  computed: {
    incomeCategories() {
      return this.$store.getters["income/getIncomeCategories"];
    },
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

      this.validateForm();
      if (this.isValid) {
      this.date = new Date(this.date);
      const incomeItem = {
        title: this.title,
        amount: Number(this.amount),
        date: this.date,
        categoryName: this.category,
        paymentType: this.payment,
        description: this.description,
        user: null,
      };

        try{
        this.$store.dispatch("auth/updateBalance", {
          type: "income",
          amount: incomeItem.amount,
        });
        this.$store.dispatch("income/addIncome", {
          token: this.token,
          incomeItem: incomeItem,
        });
      } catch (err) {
        this.error = err.message || 'Failed to add income! Try again later.';
      }
        this.title = "";
        this.amount = 0;
        this.date = "";
        this.category = "";
        this.payment = "";
        this.description = "";
      }
    },
  },
  async created() {
    await this.$store.dispatch("income/setIncomeCategories", {
      token: this.token,
    });
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
.submitButton {
  margin-top: 10px;
  padding: 5px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: black;
  width: 100%;
  color: white;
}
.submitButton:hover {
  background-color: gray;
}
</style>
