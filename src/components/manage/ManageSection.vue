<template>
  <section class="theme-section shadow rounded">
    <h2 class="mt-3">{{ title }}</h2>
    <p>{{ description }}</p>
  </section>
</template>

<script>
export default {
  name: "ManageThemes",

  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #e4f0e8;
$secondary-color: #000;

.theme-section {
  background-color: $primary-color;
  color: $secondary-color;
  padding: 5px;
  width: 80%;
  margin: 0 auto;
}

.theme-section h2 {
  font-family: "Panton", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 25px;
  margin-bottom: 0;
}

.theme-section p {
  font-family: "Panton", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  margin-top: 0;
}
</style>
