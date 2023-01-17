<script setup>
import ManageSection from "../ManageSection.vue";
import CreateMeeting from "./CreateMeeting.vue";
</script>

<template>
  <div class="mt-5 pt-5">
    <ManageSection
      title="REUNIÕES"
      description="crie reuniões ou registe as reuniões do conselho adicionado a ata"
    />

    <div class="row mt-5">
      <div class="col-lg-6">
        <h2>see past and future meetings</h2>
      </div>
      <div class="col-lg-6">
        <CreateMeeting />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Meetings",

  components: { ManageSection, CreateMeeting },
};
</script>

<style lang="scss" scoped></style>
