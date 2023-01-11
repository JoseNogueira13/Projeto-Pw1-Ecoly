<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Sidebar route="account" />
  <div class="main text-center p-3 px-5">
    <Header title="Perfil" />
  </div>
</template>

<script>
export default {
  name: "Account",

  components: { Sidebar, Header },
};
</script>

<style lang="scss" scoped></style>
