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
          <div class="grid-layout-first">
            <div class="title mb-3">
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
            <div class="objective mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_objective"
                placeholder="Objetivos"
                v-model="activity_objective"
                required
              ></textarea>
            </div>
            <div class="meta mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_meta"
                placeholder="Metas"
                v-model="activity_meta"
                required
              ></textarea>
            </div>
            <div class="resources mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_resources"
                placeholder="Recursos"
                v-model="activity_resources"
                required
              ></textarea>
            </div>
            <div class="diagnostic mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_diagnostic"
                placeholder="Diagnóstico"
                v-model="activity_diagnostic"
                required
              ></textarea>
            </div>
            <div class="participants mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_participants"
                placeholder="Participantes"
                v-model="activity_participants"
                required
              ></textarea>
            </div>
            <div class="evaluationIndicator mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_evaluationIndicator"
                placeholder="Indicadores de Avaliação"
                v-model="activity_evaluationIndicator"
                required
              ></textarea>
            </div>
            <div class="evaluationMethod mb-3">
              <textarea
                type="text"
                class="form-control"
                id="activity_evaluationMethod"
                placeholder="Instrumentos de Avaliação"
                v-model="activity_evaluationMethod"
                required
              ></textarea>
            </div>
          </div>

          <div class="activity_theme mb-3">
            <label for="activity_theme" class="label">Tema</label>
            <select
              class="form-control"
              id="activity_theme"
              v-model="activity_theme"
              required
            >
              <option v-for="theme in themes" :value="theme.name">
                {{ theme.name }}
              </option>
            </select>
          </div>
          <div class="date-section-select mb-3">
            <div class="initial-date mb-3">
              <div class="initial-date-label mb-3">
                <label for="initialDate" class="label">Data de Início</label>
                <input
                  type="date"
                  class="form-control"
                  id="activity_initialDate"
                  placeholder="Data de Início"
                  v-model="activity_initialDate"
                  required
                />
              </div>
            </div>
            <div class="final-date mb-3">
              <div class="final-date-label mb-3">
                <label for="finalDate" class="label">Data Fim</label>
                <input
                  type="date"
                  class="form-control"
                  id="activity_finalDate"
                  placeholder="Data Fim"
                  v-model="activity_finalDate"
                  required
                />
              </div>
            </div>
            <div class="complexity-section">
              <label for="complexity" class="label">Complexidade</label>
              <b-form-rating
                id="rating-inline"
                class="rating-stars float-right"
                inline
                v-model="activity_complexity"
                :value="{ activity_complexity }"
              ></b-form-rating>
            </div>
          </div>
        </div>
        <button
          type="submit"
          class="addActivityBtn btn pl-5 pr-5"
          :disabled="!new_title || !new_content || new_images.length === 0"
        >
          Criar Atividade
        </button>
      </form>
    </main>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useActivitiesStore } from "@/stores/activities";
import { useThemesStore } from "@/stores/themes";
import { useSchoolsStore } from "@/stores/schools";

export default {
  name: "NewsCreate",
  components: { Sidebar, Header },

  data() {
    return {
      themes: [],
      creatorID: "",
      schoolID: "",
      activity_images: [],
      activity_title: "",
      activity_objective: "",
      activity_meta: "",
      activity_resources: "",
      activity_diagnostic: "",
      activity_participants: "",
      activity_evaluationIndicator: "",
      activity_evaluationMethod: "",
      activity_theme: "Selecione um tema",
      activity_complexity: "1",
      activity_initialDate: "",
      activity_finalDate: "",
      activity_status: "unfinished",
      usersStore: useUsersStore(),
    };
  },

  async created() {
    const usersStore = useUsersStore();
    const schoolsStore = useSchoolsStore();
    const loggedUser = await usersStore.getLoggedUser();
    const loggedUserSchoolId = loggedUser.schoolID;

    // Check if the user is logged in
    if (!usersStore.isUserLogged()) {
      this.$router.push({ name: "Activities" });
    } else {
      this.creatorID = loggedUser.id;
      this.schoolID = loggedUserSchoolId;
    }
    //get all themes from the store
    const themesStore = useThemesStore();
    this.themes = await themesStore.getThemes();
  },

  computed: {},

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

    // reverse date format
    reverseDate(date) {
      const dateArray = date.split("-");
      return new Date(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);
    },

    async addActivity() {
      const activitiesStore = useActivitiesStore();
      //get all activities
      const activities = await activitiesStore.getActivities();

      const activity = {
        complexity: this.activity_complexity,
        creatorID: this.creatorID,
        diagnostic: this.activity_diagnostic,
        evaluationIndicator: this.activity_evaluationIndicator,
        evaluationMethod: this.activity_evaluationMethod,
        finalDate: this.reverseDate(this.activity_finalDate),
        images: this.activity_images,
        initialDate: this.reverseDate(this.activity_initialDate),
        meta: this.activity_meta,
        objective: this.activity_objective,
        participants: this.activity_participants,
        resources: this.activity_resources,
        schoolID: this.schoolID,
        status: this.activity_status,
        theme: this.activity_theme,
        title: this.activity_title,
      };

      // Redirect to news List
      activitiesStore.addActivity(activity).then(() => {
        this.$router.push({ name: "Activities" });
        console.log(activities);
      });
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

form input,
form textarea {
  width: 40%;
  font-family: "Panton", sans-serif;
  font-size: 17px;
  font-weight: 500;
  border: 2px solid $tertiary-color;
  border-radius: 15px;
}
form input:focus,
form textarea:focus {
  border: 2px solid $tertiary-color;
  box-shadow: 0 0 0 1px $secondary-color;
}
form input {
  padding: 20px;
}
form textarea {
  height: 200px;
  padding: 10px 15px;
  max-height: 400px;
}

.addActivityBtn {
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 15px;
  &:hover {
    background-color: $fifth-color;
  }
  &:disabled {
    background-color: $primary-color;
    opacity: 0.5;
  }
}

.label {
  font-family: "Panton", sans-serif;
  font-size: 17px;
  font-weight: bold;
  color: $primary-color;
}

.rating-stars {
  color: $primary-color;
  font-size: 20px;
  margin-right: 5px;
  border: none;
}

.grid-layout-first{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
