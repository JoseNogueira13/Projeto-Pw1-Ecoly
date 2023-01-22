<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Sidebar route="manage" />
  <div class="main text-center p-3 px-5">
    <Header title="MENU ADMIN" />
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "Manage",

  components: { Sidebar, Header },

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
