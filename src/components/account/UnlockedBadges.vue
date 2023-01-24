<template>
  <div class="mt-4">
    <div v-for="badge in badges" :key="badge.id" class="row text-center py-2 mr-5">
      <div class="col-2">
        <img :src="badge.src" alt="Badge Image" class="img-fluid badge-icon ml-3" />
      </div>
      <div class="col-10">
        <h5 class="text-left badge-title">{{ badge.title }}</h5>
        <p class="text-left badge-description">{{ badge.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UnlockedBadges",

  props: {
    badges: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #e4f0e8;
$fourth-color: #ffffff;
$fifth-color: #18516f;
$sixth-color: #000;
$seventh-color: #c3fecb;

.badge-icon {
  width: 60px;
  height: auto;
  border-radius: 50%;
}

.badge-title {
  font-family: "Panton", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;

  color: $seventh-color;
}

.badge-description {
  font-family: "Panton", sans-serif;
  font-size: 1.1rem;
  font-weight: 300;

  color: $seventh-color;
}
</style>
