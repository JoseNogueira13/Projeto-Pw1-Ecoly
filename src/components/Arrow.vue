<template>
  <div v-if="direction === 'right'" @click="handleClick" class="mr-3">
    <img src="@/assets/icons/rightArrow.svg" alt="Seta para a direita" />
  </div>
  <div v-else @click="handleClick" class="ml-3">
    <img src="@/assets/icons/leftArrow.svg" alt="Seta para a esquerda" />
  </div>
</template>

<script>
export default {
  name: "Arrow",

  props: {
    direction: {
      type: String,
      required: true,
    },
  },

  methods: {
    handleClick() {
      this.$emit("click");
    },
  },
};
</script>

<style lang="scss" scoped>
div {
  margin-top: 145px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    scale: 1.05;
  }

  &[disabled] {
    opacity: 0.5;
    cursor: default;
  }
}
</style>
