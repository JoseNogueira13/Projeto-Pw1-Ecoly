<script setup></script>

<template>
  
    <div class="home-button">
      <router-link to="/">
        <b-button class="btn-authenticate-home">Home</b-button>
      </router-link>
    </div>

    <div class="form">
      <RegisterForm v-if="showRegisterForm" @switch-form="switchForm" />

      <LoginForm v-else @switch-form="switchForm" />
    </div>

</template>

<script>
import RegisterForm from "@/components/authenticate/RegisterForm.vue";
import LoginForm from "@/components/authenticate/LoginForm.vue";

export default {
  components: {
    RegisterForm,
    LoginForm,
  },
  data() {
    return {
      showRegisterForm: false,
      showLoginForm: true,
    };
  },
  methods: {
    switchForm() {
      this.showRegisterForm = !this.showRegisterForm;
      this.showLoginForm = !this.showLoginForm;
    },
  },
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

.info {
  overflow-y: hidden;
  overflow-x: hidden;
  position: relative;
  height: 100vh;
}

.form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}


</style>
