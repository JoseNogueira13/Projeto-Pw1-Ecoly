<template>
  <b-card no-body class="mb-1 card">
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-button
        block
        v-b-toggle="'collapse-' + question.id"
        variant="info"
        class="text-left question"
        >{{ question.question }}</b-button
      >
    </b-card-header>
    <b-collapse
      :id="'collapse-' + question.id"
      accordion="my-accordion"
      role="tabpanel"
    >
      <b-card-body>
        <b-card-text class="text-left answer"> {{ question.answer }}</b-card-text>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: "FAQquestion",

  props: {
    question: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #ffffff;

.card {
  border: none;
}

.card-header {
  background-color: $primary-color;
  color: $secondary-color;
  border: none;
}

button {
  background-color: $primary-color;
  color: $secondary-color;
  border: none;
}

button:focus,
button:active,
button:hover {
  outline: none;
  box-shadow: none;
  background-color: $primary-color;
}

.card-body {
  background-color: $primary-color;
  color: $secondary-color;
  border: none;
}

.card-text {
  color: $secondary-color;
  font-size: 15px;
}

.question {
  // Panton Bold font
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 20px;
}

.answer {
  // Panton Regular font
  font-family: "Panton", sans-serif;
  font-weight: normal;
  font-size: 18px;
}
</style>
