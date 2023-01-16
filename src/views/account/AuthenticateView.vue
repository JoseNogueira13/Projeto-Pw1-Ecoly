<script setup></script>

<!-- TODO: Make the Login and Register Components to be displayed here -->

<template>
  <div class="home-button">
    <router-link to="/">
      <b-button class="btn-authenticate-home">Home</b-button>
    </router-link>
  </div>
  <Sidebar route="authenticate" />
  <div class="logo-slogan-container">
    <img src="@/assets/logo/logo_exp_dark.png" class="authenticate-logo" alt="Logo" />
    <h2 class="authenticate-slogan">PLANTA O TEU FUTURO</h2>
  </div>
  <img
    src="@/assets/images/Register_illustration.png"
    class="authenticate-image"
    alt="Ilustração"
  />

  <div class="register-form-div">
    <h4 class="register-header">CRIE A SUA CONTA E TORNE-SE NUM MEMBRO</h4>
    <form class="register-form" action="submit">
      <input type="text" name="primNome" id="primNome" placeholder="Primeiro Nome" />
      <input type="text" name="ultNome" id="" />
    </form>
  </div>
</template>

<script>
export default {
  name: "Authenticate",
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary: #3fc380;
$fourth: #18516f;
$fifth: #ffffff;

.home-button {
  position: absolute;
  top: 20px;
  left: 50px;
}
.btn-authenticate-home {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: $fifth;
  background-color: $primary-color;
  border: none;
  border-radius: 15px;

  &:hover {
    background-color: $fourth;
  }
}

.authenticate-logo {
  max-width: 150px;
}

.logo-slogan-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 170px;
  left: 70px;
}

.authenticate-slogan {
  font-family: "Panton", sans-serif;
}

.authenticate-image {
  position: absolute;
  bottom: 0px;
  width: 900px;
  height: 900px;
}

.register-header {
  position: absolute;
  top: 20px;
  right: 200px;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 20px;
}

.register-form {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 420px;
  top: 50px;
  right: 200px;
}

.register-form > input {
  border-radius: 10px;
  margin-top: 30px;
  height: 40px;
}

.register-form > input::placeholder {
  color: lightgray;
}

#primNome {
  background-image: url(src\assets\icons\manage.svg);
  background-position: left center;
  background-repeat: no-repeat;
  padding-left: 30px;
  background-size: 25px;
}
</style>
