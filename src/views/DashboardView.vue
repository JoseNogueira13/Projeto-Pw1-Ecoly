<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Sidebar route="dashboard" />
  <div class="main text-center p-3 px-5">
    <Header title="DASHBOARD" />
  </div>
</template>

<script>
export default {
  name: "Dashboard",

  components: { Sidebar, Header },
};
</script>

<style lang="scss" scoped></style>
