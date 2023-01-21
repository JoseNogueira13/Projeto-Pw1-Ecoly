<template>
  <div class="row my-4">
    <!-- Previous Image -->
    <div class="col-2 d-flex align-items-center justify-content-center">
      <button class="btn" :disabled="slider === 0" @click="slider--">
        <img
          src="@/assets/icons/leftArrow.svg"
          class="img-fluid"
          alt="Imagem Anterior"
        />
      </button>
    </div>
    <!-- Current Image -->
    <div class="col-8 text-center">
      <img :src="images[slider]" class="img-fluid" alt="Imagem da atividade" />
    </div>
    <!-- Next Image -->
    <div class="col-2 d-flex align-items-center justify-content-center">
      <button class="btn" :disabled="slider === images.length - 1" @click="slider++">
        <img
          src="@/assets/icons/rightArrow.svg"
          class="img-fluid"
          alt="Imagem Seguinte"
        />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivitiesReportImages",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      slider: 0,
    };
  },
};
</script>

<style lang="scss" scoped></style>
