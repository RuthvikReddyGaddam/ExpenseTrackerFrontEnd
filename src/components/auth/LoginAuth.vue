<template>
      <section>
    <form @submit.prevent="">
      <div class="form-control">
      <label for="email">Email</label>
      <div></div>
      <input type="email" ref="email" />
    </div>
    <div class="form-control">
      <label for="password">password</label>
      <div></div>
      <input type="password" ref="password" />
    </div>
    </form>
  </section>
</template>