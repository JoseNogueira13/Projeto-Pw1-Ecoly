<template>
    <form class="login-form" @submit.prevent="login">
        <h2>Login</h2>

          <!-- Input Course-->
          <b-input-group class="mt-4">
              <template #prepend>
                <b-input-group-text class="login-input-img">
                  <img src="@/assets/icons/search.svg" alt="search" width="20" />
                </b-input-group-text>
              </template>
              <b-form-input
                class="login-input"
                placeholder="Email"
                type="text"
                v-model="email"
              ></b-form-input>
            </b-input-group>
        
            <!-- Input Course-->
          <b-input-group class="mt-4">
              <template #prepend>
                <b-input-group-text class="login-input-img">
                  <img src="@/assets/icons/search.svg" alt="search" width="20" />
                </b-input-group-text>
              </template>
              <b-form-input
                class="login-input"
                placeholder="Password"
                type="password"
                v-model="password"
              ></b-form-input>
            </b-input-group>
      
        <button
          @click="$emit('switch-form')"
          class="switchToRegister"
        >
            Não é membro? Crie conta aqui
        </button>

        <button
          class="submitLoginBtn"
          type="submit"
        >
            Entrar
        </button>
    </form>
    
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
        const usersStore = useUsersStore();
        usersStore.login(this.email, this.password)

        this.$bvToast.toast("Entraste na aplicação!", {
        title: "Login com sucesso",
        variant: "success",
        solid: true,
      });
      setTimeout(() => {
        this.$router.push({ name: "Home" })
      }, 1000);
    }
  }
}
</script>


<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #e4f0e8;
$fourth-color: #ffffff;
$fifth-color: #18516f;
$sixth-color: #000;
$seventh-color: #57b894;

.login-form {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 420px;
  top: 350px;
  right: 300px;
}

.login-form > input {
  border-radius: 10px;
  margin-top: 30px;
  height: 40px;
}

.login-form > input::placeholder {
  color: lightgray;
}

.login-input-img {
  background-color: $fourth-color;
  color: $primary-color;
  border: 1px solid;
  border-color: $seventh-color;
  border-radius: 10px;
}
.login-input {
  border: 1px solid;
  border-color: $seventh-color;
  border-left: none;
  border-radius: 10px;
}

.submitLoginBtn{
  position: absolute;
  margin-top: 250px;
  margin-left: 120px;
  font-size: 15px;
  width: 170px;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  color: $fourth-color;
  background-color: $primary-color;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: $fifth-color;
  }
}

.switchToRegister {
    position: absolute;
    border: none;
    background-color: transparent;
    width: 200px;
    margin-top: 200px;
    margin-left: 100px;

    &:hover {
    color: $seventh-color;
    }
}

#email {
  background-image: url(src\assets\icons\manage.svg);
}

#password {
  background-image: url(src\assets\icons\manage.svg);
}
</style>