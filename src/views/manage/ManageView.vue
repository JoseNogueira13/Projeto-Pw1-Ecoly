<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import FastActions from "@/components/manage/FastActions.vue";
import ManageThemes from "@/components/manage/ManageThemes.vue";
</script>

<template>
  <Sidebar route="manage" />
  <div class="main text-center p-3 px-5">
    <Header title="GESTÃO" />
    <FastActions />
    <ManageThemes />
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "Manage",

  components: { Sidebar, Header, FastActions, ManageThemes },

  async created() {
    const usersStore = useUsersStore();

    const isUserLogged = await usersStore.isUserLogged();
    const userLogged = await usersStore.getLoggedUser();
    const isUserAdmin = userLogged.role === "admin";

    if (!isUserLogged || !isUserAdmin) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>

<style lang="scss" scoped></style>
