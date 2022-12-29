<template>
  <div class="my-5">
    <h2 class="title mt-2 mb-5">PERGUNTAS FREQUENTES</h2>
    <div class="accordion" role="tablist">
      <b-card
        v-for="question in FAQ"
        :key="question.id"
        no-body
        class="mb-1 card"
      >
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
            <b-card-text class="text-left answer">
              {{ question.answer }}</b-card-text
            >
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeFAQ",

  data() {
    const FAQ = [
      {
        id: 1,
        question: "Quais são as principais funções da plataforma Ecoly?",
        answer:
          " A plataforma Ecoly tem como principais funções: gerir membros do conselho de cada escola, organizar atividades, organizar reuniões entre os membros do conselho e ver as estatísticas de atividades da escola.",
      },
      {
        id: 2,
        question: "Como posso me inscrever na plataforma Ecoly?",
        answer:
          "Para se inscrever na plataforma Ecoly, basta acessar o site oficial e aceder à secção de cadastrar. Depois, basta preencher os dados necessários e pronto!",
      },
      {
        id: 3,
        question: "Qual é o custo para usar a plataforma Ecoly?",
        answer: " A plataforma Ecoly é totalmente gratuita.",
      },
      {
        id: 4,
        question:
          "Existe alguma maneira de acompanhar as estatísticas de outras escolas no Ecoly?",
        answer:
          "Sim, a plataforma Ecoly permite que os usuários vejam as estatísticas de atividades de outras escolas do país e comparem-nas com a da sua escola.",
      },
    ];

    return { FAQ };
  },
};
</script>

<style lang="scss" scoped>
$faq-btn: #343e3d;
$faq-text: #ffffff;

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.accordion {
  background-color: $faq-btn;
  color: $faq-text;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  border: none;
}

.card {
  border: none;
}

.card-header {
  background-color: $faq-btn;
  color: $faq-text;
  border: none;
}

button {
  background-color: $faq-btn;
  color: $faq-text;
  border: none;
}

button:focus,
button:active,
button:hover {
  outline: none;
  box-shadow: none;
  background-color: $faq-btn;
}

.card-body {
  background-color: $faq-btn;
  color: $faq-text;
  border: none;
}

.card-text {
  color: $faq-text;
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
