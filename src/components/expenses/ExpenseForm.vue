<template>
  <div>
    <h4 v-if="!isValid">{{ error }}</h4>
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
        <select v-model="category" id="category">
          <option
            v-for="category in expenseCategories"
            :key="category._id"
            :value="category.categoryName"
          >
            {{ category.categoryName }}
          </option>
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
        <input type="date" v-model="date" />
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
      <button type="submit" class="submitButton">Submit</button>
    </form>
  </div>
</template>

<script>
// import axios from "axios";
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
      isValid: true,
      error: "Invalid submission. Provide valid information!"
    };
  },
  computed: {
    getUserId() {
      return this.$store.getters["auth/getUserId"];
    },
    expenseCategories() {
      return this.$store.getters["expenses/getExpenseCategories"];
    },
  },
  methods: {
    async uploadReceipt() {
      const formData = new FormData();
      formData.append("receipt", this.$refs.receipt.files[0]);
      const response = await fetch(`${this.$store.getters.backendUrl}/incomeExpenses/uploadImage`, {
        method: "POST",
        headers: { Authorization: this.token },
        body: formData,
      });
      const responseData = await response.json();
      return responseData.imageUrl;
    },
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

    async formSubmit() {
      this.validateForm();
      if (this.isValid) {
        let url = "";
        if (
          this.$refs.receipt.files[0] &&
          this.$refs.receipt.files[0].type.startsWith("image/")
        ) {
          url = await this.uploadReceipt();
        }
        this.date = new Date(this.date);
        const expenseItem = {
          title: this.title,
          amount: Number(this.amount),
          date: this.date,
          categoryName: this.category,
          paymentType: this.payment,
          description: this.description,
          user: this.getUserId,
          receipt: url,
        };
        try{
        await this.$store.dispatch("auth/updateBalance", {
          type: "expense",
          amount: expenseItem.amount,
        });
        await this.$store.dispatch("expenses/addExpense", {
          expense: expenseItem,
          token: this.token,
        });      } catch (err) {
        this.error = err.message || 'Failed to add expense! try later.';
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
    await this.$store.dispatch("expenses/setExpenseCategories", {
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

h4 {
  margin-left: 30px;
  margin-top: 30px;
  color: rgba(183, 28, 28, 0.849);
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
