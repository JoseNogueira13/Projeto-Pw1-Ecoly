<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<!-- TODO: Make the Login and Register Components to be displayed here -->

<template>
  <Sidebar route="authenticate" />
  <div class="main text-center p-3 px-5">
    <h1>Authenticate</h1>
  </div>
</template>

<script>
export default {
  name: "Authenticate",
};
</script>

<style lang="scss" scoped></style>
