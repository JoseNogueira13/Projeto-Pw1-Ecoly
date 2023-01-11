<template>
  <header class="mx-5 mt-4 mb-4">
    <h1 class="title text-left mt-3">{{ title }}</h1>
    <div class="border border-2 border-dark mt-3"></div>
  </header>
</template>

<script>
export default {
  name: "Header",

  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}
</style>
