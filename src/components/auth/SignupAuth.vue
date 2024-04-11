<template>
  <section>
    <form @submit.prevent="">
      <div class="form-control">
        <label for="email">Email</label>
        <input type="email" ref="email" />
      </div>
      <div class="form-control">
        <label for="password">password</label>
        <input type="password" ref="password" />
      </div>
      <div class="form-control">
        <label for="fullname">Full name</label>
        <input type="text" ref="fullname" />
      </div>
      <div class="form-control">
        <label for="phone">Phone</label>
        <input type="text" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>
      </div>
      <div class="form-control">
        <label for="email">Address</label>
        <input type="address" ref="address" />
      </div>
      <div class="form-control">
        <label for="dob">Date of Birth</label>
        <input type="date" ref="dob" />
      </div>
      <div class="form-control">
        <label for="profile">Profile</label>
        <input type="image" ref="Profile" />
      </div>
    </form>
  </section>
</template>