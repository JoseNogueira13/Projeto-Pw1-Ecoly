<template>
  <form class="login-form" @submit.prevent="login">
    <h2>Login</h2>

    <!-- Input Course-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="login-input-img">
          <img src="@/assets/icons/email.svg" alt="search" width="20" />
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
          <img src="@/assets/icons/password.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="login-input"
        placeholder="Password"
        type="password"
        v-model="password"
      ></b-form-input>
    </b-input-group>

    <button @click="$emit('switch-form')" class="switchToRegister">
      Não é membro? Crie conta aqui
    </button>

    <button class="submitLoginBtn" type="submit">Entrar</button>
  </form>
</template>

<script>
import { useUsersStore } from "@/stores/users";

export default {
  data() {
    return {
      email: "",
      password: "",
      users: [],
    };
  },

  methods: {
    async login() {
      const usersStore = useUsersStore();
      const user = await usersStore.getUsers();
      this.users = user;

      const userExists = this.users.find((user) => user.email === this.email);

      if (userExists) {
        if (userExists.password === this.password) {
          usersStore.login(this.email, this.password);

          this.$bvToast.toast("Entraste na aplicação!", {
            title: "Login com sucesso",
            variant: "success",
            solid: true,
          });

          setTimeout(() => {
            this.$router.push({ name: "Home" });
          }, 1000);
        } else {
          this.$bvToast.toast("A palavra passe está incorreta!", {
            title: "Dados de acesso incorretos",
            variant: "danger",
            solid: true,
          });
        }
      } else {
        this.$bvToast.toast("O email inserido não existe!", {
          title: "Dados de acesso incorretos",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
}
.login-form > h2 {
  font-family: "Panton", sans-serif;
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

.submitLoginBtn {
  position: absolute;
  margin-top: 110px;
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
  width: 300px;
  margin-top: 50px;
  margin-left: 50px;

  &:hover {
    color: $seventh-color;
  }
}
</style>
