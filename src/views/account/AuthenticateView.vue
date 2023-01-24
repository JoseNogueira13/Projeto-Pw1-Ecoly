<script setup></script>

<!-- TODO: Make the Login and Register Components to be displayed here -->

<template>

  <div class="row">
    <div class="col-6">
        <div class="home-button">
          <router-link to="/">
            <b-button class="btn-authenticate-home">Home</b-button>
          </router-link>
        </div>
        
        <div class="logo-slogan-container">
          <img src="@/assets/logo/logo_exp_dark.png" class="authenticate-logo" alt="Logo" />
          <h2 class="authenticate-slogan">PLANTA O TEU FUTURO</h2>
        </div>
        <img
          src="@/assets/images/Register_illustration.png"
          class="authenticate-image"
          alt="Ilustração"
        />
    </div>
  
    <div class="col-6">
      <div class="register-form-div">
        <h4 class="register-header">CRIE A SUA CONTA E TORNE-SE NUM MEMBRO</h4>
        <div class="form-container">
          <form class="register-form" @submit.prevent="addUser">
            <input
              v-model="primNome"
              class="input-background"
              id="primNome"
              name="primNome"
              placeholder="Primeiro Nome"
              type="text"
              required
            />
            <input
              v-model="ultNome"
              class="input-background"
              id="ultNome"
              name="ultNome"
              placeholder="Ultimo Nome"
              type="text"
              required
            />
            <input
              v-model="email"
              class="input-background"
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
            <input
              v-model="password"
              class="input-background"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            <input
              v-model="confPass"
              class="input-background"
              id="confPass"
              name="confPass"
              placeholder="Confirm your password"
              type="password"
              required
            />
            <input
              v-model="escola"
              class="input-background"
              id="escola"
              name="escola"
              placeholder="Nome da escola"
              type="text"
              required
            />
            <input
              v-model="numInt"
              class="input-background"
              id="numInt"
              name="numInt"
              placeholder="Numero Interno"
              type="text"
              required
            />
            <input
              v-model="curso"
              class="input-background"
              id="curso"
              name="curso"
              placeholder="Curso"
              type="text"
              required
            />
            <input
              v-model="anoCur"
              class="input-background"
              id="anoCur"
              name="anoCur"
              placeholder="Ano do curso"
              type="text"
              required
            />
            
            <button
              type="submit"
              class="authenticate-user-btn"
            >
              Sign up
            </button>
            
          </form>
          <div
            v-if="passwordNotMatch"
            class="error-message"
          >
            Passwords do not match
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      primNome: '',
      ultNome: '',
      email: '',
      password: '',
      confPass: '',
      escola: '',
      numInt: '',
      curso: '',
      anoCur: '',
      passwordNotMatch: false
    }
  },
  methods: {
    checkPasswords(password, confPass) {
    if (password !== confPass) {
      this.passwordNotMatch = true
    }
  },
  async addUser() {
      if(this.password !== this.confPass) {
        this.passwordNotMatch = true;
        return
      } 

      this.passwordNotMatch = false;

      const usersStore = useUsersStore();

      const newUser = {
        name: this.primNome + ' ' + this.ultNome,
        email: this.email,
        password: this.password,
        escola: this.escola,
        numInt: this.numInt,
        curso: this.curso,
        anoCur: this.anoCur
      };
      usersStore.addUser(newUser).then(() => {
        this.$router.push({ name: "Home" })
      })
      this.passwordNotMatch = false; 
    }
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
.addUserBtn {
  position: absolute;
  margin-top: 650px;
  margin-left: 165px;
  font-size: 15px;
  width: 150px;
}

.authenticate-user-btn {
  position: absolute;
  margin-top: 650px;
  margin-left: 140px;
  font-size: 15px;
  width: 150px;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  color: $fifth;
  background-color: $primary-color;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: $fourth;
  }
}

.error-message {
  position: absolute;
  bottom: 150px;
  left: 300px;
  color: red;
  text-align: center;
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

.form-container{
    display: flex;
    align-items: center;
    justify-content: center;
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

.input-background {
  background-image: url(src\assets\icons\manage.svg);
  background-position: left center;
  background-repeat: no-repeat;
  padding-left: 30px;
  background-size: 25px;
}

#primNome {
  background-image: url(src\assets\icons\manage.svg);
}

#ultNome {
  background-image: url(src\assets\icons\manage.svg);
}

#email {
  background-image: url(src\assets\icons\manage.svg);
}

#password {
  background-image: url(src\assets\icons\manage.svg);
}

#confPass {
  background-image: url(src\assets\icons\manage.svg);
}

#escola {
  background-image: url(src\assets\icons\manage.svg);
}

#numInt {
  background-image: url(src\assets\icons\manage.svg);
}

#curso {
  background-image: url(src\assets\icons\manage.svg);
}

#anoCur {
  background-image: url(src\assets\icons\manage.svg);
}

</style>
