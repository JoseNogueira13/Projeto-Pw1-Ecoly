<template>
  <div class="border border-dark rounded p-3" style="margin-right: 25%">
    <h2>{{ activity.title }}</h2>
  </div>
</template>

<script>
export default {
  name: "SelectedActivityReport",

  props: {
    activity: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
