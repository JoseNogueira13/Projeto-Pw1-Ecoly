<script setup>
import ManageSection from "./ManageSection.vue";
</script>

<template>
  <div class="mt-5 pt-3">
    <ManageSection
      title="LISTA DE RELATÓRIO DE ATIVIDADES"
      description="clique numa atividade para visualizar o relatório"
    />
  </div>
</template>

<script>
export default {
  name: "ActivitiesReportList",
};
</script>
