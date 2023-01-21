<script setup>
import ActivityReportTitle from "./ActivityReportTitle.vue";
import ActivityReportEvaluation from "./ActivityReportEvaluation.vue";
</script>

<template>
  <div class="activity-container p-4 text-left" style="margin-right: 25%">
    <h2 class="activity-title text-left">{{ activity.title }}</h2>
    <span class="theme py-1 px-2 rounded">{{ themeName }}</span>

    <!-- Image slider -->
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
        <img
          :src="activity.images[slider]"
          class="img-fluid"
          alt="Imagem da atividade"
        />
      </div>
      <!-- Next Image -->
      <div class="col-2 d-flex align-items-center justify-content-center">
        <button
          class="btn"
          :disabled="slider === activity.images.length - 1"
          @click="slider++"
        >
          <img
            src="@/assets/icons/rightArrow.svg"
            class="img-fluid"
            alt="Imagem Seguinte"
          />
        </button>
      </div>
    </div>

    <div class="row d-flex align-items-center justify-content-center mb-4">
      <button class="report-description-btn btn">See Report Description</button>
    </div>

    <ActivityReportTitle title="Participantes" :description="activity.participants" />
    <ActivityReportTitle title="Diagnóstico" :description="activity.diagnostic" />
    <ActivityReportTitle title="Objetivos" :description="activity.objective" />
    <ActivityReportTitle title="Metas" :description="activity.meta" />
    <ActivityReportTitle title="Recursos" :description="activity.resources" />
    <ActivityReportEvaluation
      :indicator="activity.evaluationIndicator"
      :method="activity.evaluationMethod"
    />
  </div>
</template>

<script>
import { useThemesStore } from "@/stores/themes";
export default {
  name: "SelectedActivityReport",
  props: {
    activity: {
      type: Object,
      required: true,
    },
  },

  components: { ActivityReportTitle, ActivityReportEvaluation },

  data() {
    return {
      themeName: "",
      slider: 0,
    };
  },

  async created() {
    const themesStore = useThemesStore();
    const theme = await themesStore.getThemeById(this.activity.id);
    this.themeName = theme.name;
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
$seventh-color: #57b894;

.activity-container {
  background-color: $secondary-color;
  color: $primary-color;
  border-radius: 15px;
}

.activity-title {
  font-family: "Panton", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
}

.theme {
  font-family: "Panton", sans-serif;
  background-color: $primary-color;
  color: $secondary-color;
}

.activity-sub-title {
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: -1px;
}

.report-description-btn {
  background-color: $primary-color;
  color: $secondary-color;
  font-family: "Panton", sans-serif;
  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
}
</style>
