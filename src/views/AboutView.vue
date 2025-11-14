<template>
  <div class="container p-4">
    <div class="box" style="background-color: #00BCD4; color: white; border-radius: 0;">
      <h1 class="title is-4 has-text-centered" style="color: white;">About Seatvue</h1>
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
      </div>
    </div>

    <div class="box" style="background-color: #00BCD4; color: white; border-radius: 0;">
      <h2 class="title is-5" style="color: white;">How can we do better?</h2>
      <div class="content">
        <p>Your feedback helps us improve Seatvue. We value your thoughts and suggestions.</p>
        <a href="#" class="button is-fullwidth" style="background-color: #0097A7; color: white; border-radius: 0;">
          <span>Take the survey</span>
          <span class="icon is-right">
            <i class="fas fa-external-link-alt"></i>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box {
}
.button .icon.is-right {
  margin-left: auto;
}
.button {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>