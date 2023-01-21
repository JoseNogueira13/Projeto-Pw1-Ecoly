<template>
  <div class="row my-2">
    <h3 class="activity-sub-title col-12 text-left">{{ title }}</h3>
    <p class="px-3 col-12">{{ description }}</p>
  </div>
</template>

<script>
export default {
  name: "ActivityReportTitle",
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
.activity-sub-title {
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: -1px;
}
</style>
