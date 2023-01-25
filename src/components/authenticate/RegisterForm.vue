<template>

  <form class="register-form" @submit.prevent="addUser">
    <h2>CRIE A SUA CONTA E TORNE-SE NUM MEMBRO</h2>
    <!-- Input  first name-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Primeiro Nome"
        type="text"
        v-model="primNome"
      ></b-form-input>
    </b-input-group>

    <!-- Input last name-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Ultimo Nome"
        type="text"
        v-model="ultNome"
      ></b-form-input>
    </b-input-group>

    <!-- Input email-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Email"
        type="text"
        v-model="email"
      ></b-form-input>
    </b-input-group>

    <!-- Input password-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Password"
        type="password"
        v-model="password"
      ></b-form-input>
    </b-input-group>

    <!-- Input confirm password-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Confirm password"
        type="password"
        v-model="confPass"
      ></b-form-input>
    </b-input-group>

    <!-- Select school-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-select
        v-model="escola"
        class="register-input"
        id="escola"
        name="escola"
        required
      >
        <option disabled value="">Selecione a escola</option>
        <option v-for="school in schools" :value="school.id">
          {{ school.name }}
        </option>
      </b-form-select>
    </b-input-group>

    <!-- Input Internal Number-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Internal Number"
        type="text"
        v-model="numInt"
      ></b-form-input>
    </b-input-group>

    <!-- Input Course-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Course"
        type="text"
        v-model="curso"
      ></b-form-input>
    </b-input-group>

    <!-- Input Course-->
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="register-input-img">
          <img src="@/assets/icons/search.svg" alt="search" width="20" />
        </b-input-group-text>
      </template>
      <b-form-input
        class="register-input"
        placeholder="Year"
        type="text"
        v-model="anoCur"
      ></b-form-input>
    </b-input-group>

    <button @click="$emit('switch-form')" class="switchToLogin">
      Já é membro? Entre aqui
    </button>

    <button type="submit" class="authenticate-user-btn" :disabled="!escola">
      Sign up
    </button>
  </form>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useSchoolsStore } from "@/stores/schools";

export default {
  data() {
    return {
      primNome: "",
      ultNome: "",
      email: "",
      password: "",
      confPass: "",
      escola: "",
      numInt: "",
      curso: "",
      anoCur: "",
      schools: [],
    };
  },
  async created() {
    const schoolsStore = useSchoolsStore();
    const school = await schoolsStore.getSchools();
    this.schools = school;
    console.log(this.schools);
  },
  methods: {
    async addUser() {
      if (this.password !== this.confPass) {
        this.$bvToast.toast("A palavra passe e a sua confirmação não coincidem!", {
          title: "Palavras passe não coincidem",
          variant: "danger",
          solid: true,
        });
        return;
      }

      const usersStore = useUsersStore();
      const newUser = {
        name: this.primNome + " " + this.ultNome,
        email: this.email,
        password: this.password,
        schoolID: this.escola,
        internalId: this.numInt,
        course: this.curso,
        year: this.anoCur,
      };
      usersStore.createNewUser(newUser);

      this.$bvToast.toast("Utilizador adicionado com sucesso!", {
        title: "Utilizador criado!",
        variant: "success",
        solid: true,
      });
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


.register-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  padding-bottom: 50px;
}
.register-form > h2 {
  font-family: "Panton", sans-serif;
}

.authenticate-user-btn {
  position: absolute;
  margin-top: 680px;
  margin-left: 130px;
  font-size: 15px;
  width: 150px;
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
.authenticate-user-btn:disabled {
  background-color: #ccc;
  color: #555;
  cursor: not-allowed;
}

.register-header {
  position: absolute;
  top: 20px;
  right: 200px;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 20px;
}

.form-container {
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

.switchToLogin {
  position: absolute;
  border: none;
  background-color: transparent;
  width: 200px;
  margin-top: 645px;
  margin-left: 100px;

  &:hover {
    color: $seventh-color;
  }
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

.register-input-img {
  background-color: $fourth-color;
  color: $primary-color;
  border: 1px solid;
  border-color: $seventh-color;
  border-radius: 10px;
}

.register-input {
  border: 1px solid;
  border-color: $seventh-color;
  border-left: none;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .register-form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -55%);
    width: 400px;
    padding-bottom: 50px;
  }
}
</style>
