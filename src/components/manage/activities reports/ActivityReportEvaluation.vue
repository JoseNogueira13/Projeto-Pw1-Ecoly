<template>
  <div class="row">
    <h3 class="evaluation-title col-12 text-center pl-0">AVALIAÇÃO</h3>
    <div class="row mt-3 col-12">
      <div class="col-6">
        <div class="text-left">
          <h4 class="activity-sub-title">Indicadores</h4>
          <p class="description mb-0">{{ indicator }}</p>
        </div>
      </div>
      <!-- align to the right -->
      <div class="col-6">
        <div class="text-right">
          <h4 class="activity-sub-title">Instrumentos</h4>
          <p class="description mb-0">{{ method }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ActivityReportEvaluation",
  props: {
    indicator: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.evaluation-title {
  font-family: "Panton", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
}

.activity-sub-title {
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: -1px;
}

.description {
  font-family: "Panton", sans-serif;
  font-size: 1rem;
  font-weight: 400;
}
</style>
