<script setup>
import ManageSection from "./ManageSection.vue";
</script>

<template>
  <div class="mt-5">
    <ManageSection
      title="CONTACTAR MEMBROS"
      description="entre em contacto com outros membros do conselho"
    />

    <form class="mt-5 contact-form" @submit.prevent="sendMsg">
      <div class="form-group mb-4">
        <select class="form-control" id="destinyInput" v-model="destiny">
          <option disabled selected value="null">Selecione o destinatário</option>
          <option v-for="user in users" :key="user" :value="user.id">
            {{ user.name }} ({{ user.email }}) - {{ user.role }}
          </option>
        </select>
      </div>
      <div class="form-group mb-4">
        <textarea
          class="form-control"
          id="textArea"
          rows="4"
          placeholder="Escreva aqui a sua mensagem..."
          v-model="message"
        ></textarea>
      </div>
      <button
        type="submit"
        class="btn send-email-btn"
        :disabled="destiny === null || message === ''"
      >
        {{ btnMsg }}
      </button>
    </form>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "ContactMembers",

  components: { ManageSection },

  data() {
    return {
      users: [],
      usersStore: useUsersStore(),
      destiny: null,
      message: "",
      btnMsg: "Enviar",
    };
  },

  async created() {
    const user = await this.usersStore.getLoggedUser();
    const school = user.school;
    const users = await this.usersStore.getUsersBySchool(school);

    // (id, name, email)
    users.forEach((user) => {
      this.users.push({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      });
    });
  },

  methods: {
    sendMsg() {
      this.btnMsg = "Enviando...";
      setTimeout(() => {
        this.btnMsg = "Enviado!";

        setTimeout(() => {
          this.btnMsg = "Enviar";
        }, 2000);
      }, 2000);
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

.contact-form {
  width: 80%;
  margin: 0 auto;

  #destinyInput {
    width: 40%;
    border-radius: 10px;
    border: 1px solid $seventh-color;

    &:focus {
      border: 2px solid $seventh-color;
      box-shadow: none;
    }
  }

  #textArea {
    border-radius: 10px;
    border: 1px solid $seventh-color;

    &:focus {
      border: 2px solid $seventh-color;
      box-shadow: none;
    }
  }

  .send-email-btn {
    width: 15%;
    background-color: $primary-color;
    color: $fourth-color;
    border: none;
    border-radius: 10px;
    font-size: 15px;
    font-weight: 600;
    transition: background-color 0.3s ease-in-out;

    float: right;

    &:hover {
      background-color: $fifth-color;
      cursor: pointer;
    }
  }
}
</style>
