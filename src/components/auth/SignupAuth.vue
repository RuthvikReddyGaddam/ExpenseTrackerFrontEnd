<template>
  <section>
    <base-card :hasTitle="true" :hasBody="true">
      <template #title>
        <h2>Signup</h2>
      </template>
      <form @submit.prevent="formSubmit">
        <div v-if="!isValid">Please enter valid data!</div>
        <div class="form-control">
          <label for="email">Email</label>
          <input type="email" v-model.trim="email" />
        </div>
        <div class="form-control">
          <label for="password">password</label>
          <input type="password" v-model="password" />
        </div>
        <div class="form-control">
          <label for="fullname">Full name</label>
          <input type="text" v-model.trim="fullname" />
        </div>
        <div class="form-control">
          <label for="phone">Phone</label>
          <input
            type="text"
            id="phone"
            name="phone"
            pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
            v-model.trim="phone"
          />
        </div>
        <div class="form-control">
          <label for="email">Address</label>
          <input type="address" v-model.trim="address" />
        </div>
        <div class="form-control">
          <label for="dob">Date of Birth</label>
          <input type="date" v-model.trim="DoB" />
        </div>
        <div class="form-control">
          <label for="gender">Gender</label>
          <select name="gender" id="gender" v-model="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        </div>
        <div class="form-control">
          <label for="profile">Profile</label>
          <input type="file" id="profile" ref="profile" accept="image" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </base-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      fullname: "",
      phone: "",
      address: "",
      DoB: "",
      gender: "",
      error: "Something Went wrong! try again.",
      isValid: true,
    };
  },

  methods: {
    async uploadProfile() {
     try{
       const formData = new FormData();
      formData.append("profile", this.$refs.profile.files[0]);
      const response = await fetch(`${this.$store.getters.backendUrl}/uploadProfile`, {
        method: "POST",
        headers: { Authorization: this.token },
        body: formData,
      });
      const responseData = await response.json();
      return responseData.imageUrl;
    } catch (err) {
        this.error = err.message || 'Failed to upload image! try later.';
      }
    },
    validateForm() {
      this.isValid = true;
      if (
        this.email === "" ||
        this.password === "" ||
        !this.phone === "" ||
        this.fullname === "" ||
        this.address === "" ||
        this.DoB === "" ||
        this.gender === ""
      ) {
        this.isValid = false;
      }
    },
    async formSubmit() {
      this.validateForm();
      if (this.isValid) {
        let url = "defaultProfile";
        if (
          this.$refs.profile.files[0] &&
          this.$refs.profile.files[0].type.startsWith("image/")
        ) {
          url = await this.uploadProfile();
        }
      const user = {
        email: this.email,
        password: this.password,
        phone: this.phone,
        fullname: this.fullname,
        address: this.address,
        DoB: Date(this.DoB),
        balance: 0,
        budget: 0,
        goals: "No Goal Setup",
        gender: this.gender,
        profile: url
      };
      try{
        await this.$store.dispatch("auth/register", user);
        this.$router.replace("/dash");
      } catch (err) {
        this.error = err.message || 'Failed to add expense! try later.';
      }
        
      }
    },
  },
};
</script>


<style scoped>
section{
  width: 60%
}
form {
  margin: 10px;
  padding: 10px;
}

.form-control {
  margin: 5px;
}

label {
  margin: 5px;
  margin-top: 20px;
  font-weight: bold;
  margin-bottom: 2px;
  display: block;
}

input,
textarea,select {
  margin: 5px;
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  padding: 5px;
}
button{
  width: 100%;
  background-color: black;
  color: white;
  padding: 5px;
  margin-top: 20px;
}
button:hover{
  background-color: gray;
}
</style>
