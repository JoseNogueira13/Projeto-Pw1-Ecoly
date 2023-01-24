<template>
    <form class="login-form" @submit.prevent="logUser">
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
        <button
          @click="$emit('switch-form')"
          class="switchToRegister"
        >
            Não é membro? Crie conta aqui
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
}
</script>


<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary: #3fc380;
$fourth: #18516f;
$fifth: #ffffff;

.login-form {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 420px;
  top: 50px;
  right: 200px;
}

.login-form > input {
  border-radius: 10px;
  margin-top: 30px;
  height: 40px;
}

.login-form > input::placeholder {
  color: lightgray;
}

.input-background {
  background-image: url(src\assets\icons\manage.svg);
  background-position: left center;
  background-repeat: no-repeat;
  padding-left: 30px;
  background-size: 25px;
}

#email {
  background-image: url(src\assets\icons\manage.svg);
}

#password {
  background-image: url(src\assets\icons\manage.svg);
}
</style>