<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="activities" />
  <div class="main text-center p-3 px-5">
    <Header title="ADICIONAR ATIVIDADE" />
    <main>
      <div class="row justify-content-center align-items-center">
        <img
          v-for="(image, index) in activity_images"
          :key="index"
          :src="image"
          class="addNewImg img-fluid my-3 mx-3 rounded-lg shadow"
          alt="Imagem da Atividade"
          @click="removeImage(index)"
        />

        <img
          v-if="activity_images.length < 4"
          class="addNewImg addImgBtn my-3 mx-3 rounded-lg shadow"
          src="@/assets/images/addImage.png"
          alt="Add New Image"
          @click="addNewImage"
        />
      </div>

      <form class="w-50 mx-auto mt-5" @submit.prevent="addActivity">
        <div class="form-inputs">
          <div class="title">
            <input
              type="text"
              class="form-control"
              id="activity_title"
              aria-describedby="tituloAtividade"
              placeholder="Título"
              v-model="activity_title"
              required
            />
          </div>
          <div class="objective">
            <textarea
              type="text"
              class="form-control"
              id="activity_objective"
              placeholder="Objetivos"
              v-model="activity_form.activity_objective"
              required
            ></textarea>
          </div>
          <div class="meta">
            <textarea
              type="text"
              class="form-control"
              id="activity_meta"
              placeholder="Metas"
              v-model="activity_form.activity_meta"
              required
            ></textarea>
          </div>
          <div class="resources">
            <textarea
              type="text"
              class="form-control"
              id="activity_resources"
              placeholder="Recursos"
              v-model="activity_form.activity_resources"
              required
            ></textarea>
          </div>
          <div class="diagnostic">
            <textarea
              type="text"
              class="form-control"
              id="activity_diagnostic"
              placeholder="Diagnóstico"
              v-model="activity_form.activity_diagnostic"
              required
            ></textarea>
          </div>
          <div class="participants">
            <textarea
              type="text"
              class="form-control"
              id="activity_participants"
              placeholder="Participantes"
              v-model="activity_form.activity_participants"
              required
            ></textarea>
          </div>

          <div class="evaluationIndicator">
            <textarea
              type="text"
              class="form-control"
              id="activity_evaluationIndicator"
              placeholder="Indicadores de Avaliação"
              v-model="activity_form.activity_evaluationIndicator"
              required
            ></textarea>
          </div>
          <div class="evaluationMethod">
            <textarea
              type="text"
              class="form-control"
              id="activity_evaluationMethod"
              placeholder="Instrumentos de Avaliação"
              v-model="activity_form.activity_evaluationMethod"
              required
            ></textarea>
          </div>
          <div class="activity_theme">
            <b-dropdown
              id="dropdown-left"
              text="Tema"
              variant="primary"
              class="m-2"
              v-model="activity_form.activity_theme"
            >
              <b-dropdown-item v-for="theme in themes">{{
                theme.name
              }}</b-dropdown-item>
            </b-dropdown>
          </div>
          <div class="date-section-select">
            <div class="initial-date">
              <label for="initialDate">Data de Início</label>
              <input
                type="date"
                class="form-control"
                id="activity_initialDate"
                placeholder="Data de Início"
                v-model="activity_form.activity_initialDate"
                required
              />
            </div>
            <div class="final-date">
              <label for="finalDate">Data Fim</label>
              <input
                type="date"
                class="form-control"
                id="activity_finalDate"
                placeholder="Data Fim"
                v-model="activity_form.activity_finalDate"
                required
              />
            </div>
            <div class="complexity-section">
              <label for="complexity">Complexidade</label>
              <b-form-rating
                id="rating-inline"
                class="rating-stars float-right"
                inline
                value="0"
              ></b-form-rating>
            </div>
          </div>
        </div>
        <button type="submit">Criar Atividade</button>
      </form>
    </main>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useActivitiesStore } from "@/stores/activities";
import { useThemesStore } from "@/stores/themes";

export default {
  name: "NewsCreate",
  components: { Sidebar, Header },

  data() {
    return {
      themes: [],
      activity_images: [],
      activity_form: [
        {
          activity_title: "",
          activity_objective: "",
          activity_meta: "",
          activity_resources: "",
          activity_diagnostic: "",
          activity_participants: "",
          activity_evaluationIndicator: "",
          activity_evaluationMethod: "",
          activity_theme: "",
          activity_initialDate: "",
          activity_finalDate: "",
          activity_complexity: "",
        },
      ],
    };
  },

  async created() {
    const usersStore = useUsersStore();
    // Check if the user is logged in
    if (!usersStore.isUserLogged()) this.$router.push({ name: "Activities" });

    //get all themes from the database
    const themesStore = useThemesStore();
    this.themes = await themesStore.getThemes();
  },

  methods: {
    addNewImage() {
      // for the user upload images from their computer
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.activity_images.push(reader.result);
        };
      };
      input.click();
    },
    removeImage(index) {
      this.activity_images.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

.main {
  min-height: 100vh;
}

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.addNewImg {
  width: 220px;
  height: 150px;
  transform: scale (1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    border: 1px solid red;
    opacity: 0.6;
    cursor: pointer;
    transform: scale(1.05);
  }
}

.addImgBtn:hover {
  border: none;
  opacity: 1;
}
</style>
