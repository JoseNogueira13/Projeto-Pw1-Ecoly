<script setup>
import UsersTable from "./UsersTable.vue";
</script>

<template>
  <div class="row">
    <!-- Filter by Name -->
    <div class="col-xl-3 col-md-12">
      <b-input-group class="mt-4">
        <template #prepend>
          <b-input-group-text class="filter-input">
            <img src="@/assets/icons/search.svg" alt="search" width="20" />
          </b-input-group-text>
        </template>
        <b-form-input
          class="filter-input"
          placeholder="Filtrar por Nome"
          type="search"
          v-model="filterByNameInput"
        ></b-form-input>
      </b-input-group>
    </div>
    <!-- Filter by Email -->
    <div class="col-xl-3 col-md-12">
      <b-input-group class="mt-4">
        <template #prepend>
          <b-input-group-text class="filter-input">
            <img src="@/assets/icons/search.svg" alt="search" width="20" />
          </b-input-group-text>
        </template>
        <b-form-input
          class="filter-input"
          placeholder="Filtrar por Email"
          type="search"
          v-model="filterByEmailInput"
        ></b-form-input>
      </b-input-group>
    </div>
    <div class="col-xl-2 col-md-12 d-flex justify-content-end align-items-center">
      <button
        class="btn manage-roles-btn mt-4"
        @click="$bvModal.show('add-role-modal')"
      >
        Gerir Cargos
      </button>
    </div>
    <!-- Filter by Role -->
    <div class="col-xl-4 mt-4 d-flex justify-content-end align-items-center">
      <b-form-select class="filter-by-role-input col-5" v-model="filterByRoleInput">
        <option value="all">Filtrar por cargo</option>
        <option v-for="(role, index) in options" :value="role" :key="index">
          {{ getRoleName(role) }}
        </option>
      </b-form-select>
    </div>
  </div>
  <div class="row px-5">
    <UsersTable
      :users="users"
      :options="options"
      :filterByNameInput="filterByNameInput"
      :filterByEmailInput="filterByEmailInput"
      :filterByRoleInput="filterByRoleInput"
    />
  </div>

  <b-modal id="add-role-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title"> Adicionar Cargo </span>
    </template>
    <div class="d-block text-center">
      <form @submit.prevent="addNewRole">
        <input
          type="text"
          class="form-control new-role-input"
          placeholder="Novo Cargo"
          aria-label="Novo Cargo"
          v-model="newRole"
          required
        />
        <b-button
          class="add-role-modal-btn mt-3"
          block
          type="submit"
          :disabled="newRole === ''"
          >Adicionar</b-button
        >
      </form>
    </div>
  </b-modal>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "ManageUsers",

  components: { UsersTable },

  data() {
    return {
      filterByNameInput: "",
      filterByEmailInput: "",
      filterByRoleInput: "all",
      options: [],
      users: [],
      newRole: "",
    };
  },

  methods: {
    getRoleName(role) {
      if (role === "admin") return "Administrador";
      if (role === "unsigned") return "Sem Cargo";

      // convert role to lowercase and capitalize first letter
      return role.charAt(0).toUpperCase() + role.slice(1);
    },

    async addNewRole() {
      // lowercase and remove all spaces
      const newRole = this.newRole.toLowerCase().replace(/\s+/g, "");

      // check if role already exists
      if (this.options.includes(newRole)) {
        this.$bvToast.toast("Cargo já existe", {
          title: "Erro",
          variant: "danger",
          solid: true,
        });
        return;
      }

      // add new role to options
      const usersStore = useUsersStore();
      await usersStore.addRole(newRole);

      this.$bvToast.toast("Cargo adicionado com sucesso", {
        title: "Sucesso",
        variant: "success",
        solid: true,
      });

      this.newRole = "";
      this.$bvModal.hide("add-role-modal");
    },
  },

  async created() {
    const usersStore = useUsersStore();

    const roles = await usersStore.getRoles();
    this.options = roles;

    const users = await usersStore.getUsers();
    const userLogged = await usersStore.getLoggedUser();

    // remove user logged from users list (he can't edit himself)
    this.users = users.filter((user) => user.id !== userLogged.id);
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

.filter-input {
  background-color: $fourth-color;
  color: $primary-color;
  border: none;
  border-radius: 13px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 17px;

  &:focus {
    box-shadow: none;
  }
}

.filter-by-role-input {
  background-color: $fourth-color;
  color: $primary-color;
  border: none;
  border-radius: 13px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 17px;
  padding: 0.5rem 1rem;
  height: 100%;
  width: 100%;

  &:focus {
    box-shadow: none;
  }
}

.manage-roles-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border: none;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 15px;
  border-radius: 13px;

  &:hover {
    background-color: $fifth-color;
  }
}

.new-role-input {
  background-color: $fourth-color;
  color: $primary-color;
  border: 1px solid $seventh-color;
  border-radius: 13px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 17px;
  padding: 0.5rem 1rem;
  height: 100%;
  width: 100%;

  &:focus {
    box-shadow: none;
  }
}

.add-role-modal-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border: none;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 15px;
  border-radius: 13px;

  &:hover {
    background-color: $fifth-color;
  }
}
</style>
