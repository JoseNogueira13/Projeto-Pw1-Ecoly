<template>
  <div
    v-if="filteredUsers.length === 0"
    class="col-12 mt-5 rounded table d-flex flex-column justify-content-center align-items-center"
    style="min-height: 490px"
  >
    <h2 class="error-msg mb-1">Nenhum Utilizador Encontrado</h2>
  </div>
  <div v-else class="col-12 mt-5 px-1 rounded table-container">
    <table class="table table-hover table-striped table-responsive-sm">
      <caption class="text-center">
        Lista Atual de Utilizadores na Plataforma
      </caption>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Email</th>
          <th scope="col">Cargo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id">
          <td class="col-4">{{ user.name }}</td>
          <td class="col-4">{{ user.email }}</td>
          <td class="col-4">
            <b-form-select
              class="select-user-role-input col-12 text-center"
              v-model="user.role"
              @change="changeUserRole(user, $event)"
            >
              <option v-for="(role, index) in options" :value="role" :key="index">
                {{ getRoleName(role) }}
              </option>
            </b-form-select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "UsersTable",

  props: {
    users: {
      type: Array,
      required: true,
    },

    options: {
      type: Array,
      required: true,
    },

    filterByNameInput: {
      type: String,
      required: true,
    },

    filterByEmailInput: {
      type: String,
      required: true,
    },

    filterByRoleInput: {
      type: String,
      required: true,
    },
  },

  computed: {
    filteredUsers() {
      const filterName = this.filterByNameInput.toLowerCase();
      const filterEmail = this.filterByEmailInput.toLowerCase();
      const filterRole = this.filterByRoleInput;
      let filteredUsers = this.users;

      if (filterName !== "") {
        filteredUsers = filteredUsers.filter((user) =>
          user.name.toLowerCase().includes(filterName)
        );
      }
      if (filterEmail !== "") {
        filteredUsers = filteredUsers.filter((user) =>
          user.email.toLowerCase().includes(filterEmail)
        );
      }
      if (filterRole !== "all") {
        filteredUsers = filteredUsers.filter((user) => user.role === filterRole);
      }

      return filteredUsers;
    },
  },

  methods: {
    getRoleName(role) {
      if (role === "admin") return "Administrador";
      if (role === "unsigned") return "Sem Cargo";

      // convert role to lowercase and capitalize first letter
      return role.charAt(0).toUpperCase() + role.slice(1);
    },

    async changeUserRole(user, newRole) {
      const usersStore = useUsersStore();

      await usersStore.changeUserRole(user.id, newRole);

      this.$bvToast.toast("Cargo do Utilizador Alterado com Sucesso", {
        title: "Sucesso",
        variant: "success",
        solid: true,
      });

      const users = await usersStore.getUsers();
      console.table(users);
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
$eighth-color: #3e4847;

.table-container {
  overflow-y: scroll;
  height: 490px;
  border-radius: 25px;
  background-color: $eighth-color;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    background: $primary-color;
  }

  &::-webkit-scrollbar-thumb {
    background: $seventh-color;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $tertiary-color;
  }

  &::-webkit-scrollbar-thumb:active {
    background: $tertiary-color;
  }
}

.table {
  background-color: $primary-color;
  color: $secondary-color;
}

caption {
  color: $seventh-color;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 17px;
}

thead {
  & tr {
    font-family: "Panton", sans-serif;
    font-weight: 700;
    font-size: 22px;
    background-color: $eighth-color;

    & th {
      border: 2px solid $sixth-color;
    }
  }
}

tbody {
  & tr {
    font-family: "Panton", sans-serif;
    font-weight: 700;
    font-size: 20px;
    background-color: $primary-color;

    // load animation (fade in)
    animation: fadeIn 0.5s ease-in-out;

    &:hover {
      color: $fourth-color;
    }

    & td {
      border: 2px solid $sixth-color;
    }
  }
}

.select-user-role-input {
  background-color: $primary-color;
  color: $secondary-color;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 20px;
  border: none;
  padding: 0 10px;
  height: 40px;
  transition: all 0.3s ease-in-out;

  &:focus {
    background-color: $primary-color;
    color: $secondary-color;
    border: 2px solid $seventh-color;
    outline: none;
  }
}

.error-msg {
  color: $secondary-color;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-align: center;

  // show from the bottom animation
  animation: showFromBottom 0.5s ease-in-out;
}

@keyframes showFromBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
