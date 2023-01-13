<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Sidebar route="manage" />
  <div class="main text-center p-3 px-5">
    <Header title="GESTÃO" />
  </div>
</template>

<script>
export default {
  name: "Manage",

  components: { Sidebar, Header },
};
</script>

<style lang="scss" scoped></style>
