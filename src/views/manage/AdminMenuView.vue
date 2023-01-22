<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import ManageUsers from "@/components/manage/admin/ManageUsers.vue";
import ManageSchools from "@/components/manage/admin/ManageSchools.vue";
</script>

<template>
  <Sidebar route="manage" />
  <div class="main text-center p-3 px-5">
    <Header title="MENU ADMIN" />

    <div class="row mx-5 mt-5">
      <div class="row mx-5">
        <span
          class="select-option text-center mr-4"
          :class="{ selected: selectedOption === 'Users' }"
          @click="selectedOption = 'Users'"
          >Utilizadores</span
        >
        <span
          class="select-option text-center"
          :class="{ selected: selectedOption === 'Schools' }"
          @click="selectedOption = 'Schools'"
          >Escolas</span
        >
      </div>
    </div>
    <div class="row mx-5 admin-container">
      <div style="width: 95%; margin: 0 auto">
        <component
          :is="selectedOption === 'Users' ? 'ManageUsers' : 'ManageSchools'"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "Manage",
  components: { Sidebar, Header, ManageUsers, ManageSchools },

  data() {
    return { selectedOption: "Users" }; // "Users" or "Schools"
  },

  async created() {
    const usersStore = useUsersStore();
    // Is user logged
    if (!usersStore.isUserLogged()) this.$router.push("/login");
    // Is user an admin
    const loggedUser = await usersStore.getLoggedUser();
    if (loggedUser.role !== "admin") this.$router.push({ name: "Home" });
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

.select-option {
  font-family: "Panton", sans-serif;
  font-size: 1.5rem;
  font-weight: 500;
  color: $primary-color;

  &:hover {
    cursor: pointer;
  }
}

.selected {
  font-weight: 700;
  text-decoration: underline;
}

.admin-container {
  height: 600px;
  background-color: $secondary-color;
  border-radius: 40px;
}
</style>
