<script setup>
import FAQquestion from "@/components/home/FAQ/FAQquestion.vue";
import { fetchData } from "@/hooks/fetchData";
</script>

<template>
  <div class="my-5">
    <h2 class="title mt-2 mb-5">PERGUNTAS FREQUENTES</h2>
    <div class="accordion" role="tablist">
      <FAQquestion
        v-for="question in FAQ"
        :key="question.id"
        :question="question"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFAQ",

  components: {
    FAQquestion,
  },

  data() {
    return { FAQ: [] };
  },

  created() {
    fetchData("FAQ").then((data) => (this.FAQ = data));
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.accordion {
  background-color: $primary-color;
  color: $secondary-color;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border: none;
}
</style>
