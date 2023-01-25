<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="activities" />
  <div class="main text-center p-3 px-5">
    <Header title="ADICIONAR ATIVIDADE" />
    <main>
      <!-- Images -->
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

      <form @submit.prevent="createNewActivity">
        <div class="row mt-5">
          <!-- Left Column -->
          <div class="col-lg-6 pl-lg-5 mt-5">
            <!-- Title -->
            <div class="form-group ml-lg-5 pl-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Título"
                maxlength="50"
                required
                v-model="title"
              ></textarea>
            </div>
            <!-- Objectives -->
            <div class="form-group ml-lg-5 pl-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Objetivos"
                maxlength="125"
                required
                v-model="objectives"
              ></textarea>
            </div>
            <!-- Metas -->
            <div class="form-group ml-lg-5 pl-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Metas"
                maxlength="100"
                required
                v-model="metas"
              ></textarea>
            </div>
            <!-- Recursos -->
            <div class="form-group ml-lg-5 pl-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Recursos"
                maxlength="75"
                required
                v-model="resources"
              ></textarea>
            </div>
          </div>

          <!-- Right Column -->
          <div class="col-lg-6 pr-lg-5 mt-lg-5">
            <!-- Diagnostic -->
            <div class="form-group mr-lg-5 pr-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Diagnóstico"
                maxlength="100"
                required
                v-model="diagnostic"
              ></textarea>
            </div>
            <!-- Participants -->
            <div class="form-group mr-lg-5 pr-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Participantes"
                maxlength="75"
                required
                v-model="participants"
              ></textarea>
            </div>
            <!-- Evaluation Indicators -->
            <div class="form-group mr-lg-5 pr-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Indicadores de Avaliação"
                maxlength="75"
                required
                v-model="evaluationIndicators"
              ></textarea>
            </div>
            <!-- Evaluation Methods -->
            <div class="form-group mr-lg-5 pr-lg-5">
              <textarea
                class="form-control w-75 mx-auto"
                placeholder="Instrumentos de Avaliação"
                maxlength="75"
                required
                v-model="evaluationMethods"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="row mt-4">
          <div class="col-lg-6 ml-lg-5 pl-lg-5 mt-4">
            <!-- Theme select -->
            <div class="form-group">
              <select class="form-control w-50 mx-auto" required v-model="themeID">
                <option value="" disabled selected>Selecione um tema</option>
                <option v-for="theme in themes" :key="theme.id" :value="theme.id">
                  {{ theme.name }}
                </option>
              </select>
            </div>
            <!-- Select Complexity -->
            <div class="form-group mt-5">
              <b class="mr-5">Complexidade</b>
              <b-form-rating
                class="complexity-info border-0"
                inline
                v-model="complexity"
              ></b-form-rating>
            </div>
          </div>
          <div class="col-lg-5">
            <!-- Initial Date (day-month-year) -->
            <div class="form-group ml-lg-5 pl-lg-5">
              <span class="d-flex flex-row justify-content-start">
                Data de Início
              </span>
              <input
                type="date"
                class="form-control w-75 date-input"
                placeholder="Data de Início"
                required
                v-model="initialDate"
              />
            </div>

            <!-- Final Date (day-month-year) -->
            <div class="form-group ml-lg-5 pl-lg-5">
              <span class="d-flex flex-row justify-content-start pt-1">
                Data Final
              </span>
              <input
                type="date"
                class="form-control w-75 date-input"
                placeholder="Data de Início"
                required
                v-model="finalDate"
              />
            </div>
          </div>
        </div>

        <div class="row">
          <button
            class="btn mx-auto mt-5 px-4 create-activity-btn"
            type="submit"
            :disabled="isFormValid"
          >
            Criar Atividade
          </button>
        </div>
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
      activity_images: [],
      title: "",
      objectives: "",
      metas: "",
      resources: "",
      diagnostic: "",
      participants: "",
      evaluationIndicators: "",
      evaluationMethods: "",
      themeID: "",
      complexity: 3,
      initialDate: new Date().toISOString().slice(0, 10),
      finalDate: new Date().toISOString().slice(0, 10),
    };
  },

  async created() {
    const usersStore = useUsersStore();
    const themesStore = useThemesStore();

    // verify if the user is logged in
    if (!usersStore.isUserLogged()) {
      this.$router.push({ name: "Authenticate" });
    }

    // verify if the logged user has a valid role
    const loggedUser = await usersStore.getLoggedUser();
    if (loggedUser.role === "unsigned") {
      this.$router.push({ name: "Home" });
    }

    // get all active themes
    const themes = await themesStore.getActiveThemes();
    this.themes = themes;
  },

  computed: {
    isFormValid() {
      return (
        !this.title ||
        !this.objectives ||
        !this.metas ||
        !this.resources ||
        !this.diagnostic ||
        !this.participants ||
        !this.evaluationIndicators ||
        !this.evaluationMethods ||
        !this.themeID ||
        !this.initialDate ||
        !this.finalDate ||
        this.title.trim() === "" ||
        this.objectives.trim() === "" ||
        this.metas.trim() === "" ||
        this.resources.trim() === "" ||
        this.diagnostic.trim() === "" ||
        this.participants.trim() === "" ||
        this.evaluationIndicators.trim() === "" ||
        this.evaluationMethods.trim() === "" ||
        this.initialDate.trim() === "" ||
        this.finalDate.trim() === "" ||
        this.activity_images.length === 0 ||
        this.initialDate > this.finalDate
      );
    },
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

    // reverse date format
    reverseDate(date) {
      const dateArray = date.split("-");
      return new Date(`${dateArray[2]}/${dateArray[1]}/${dateArray[0]}`);
    },

    async createNewActivity() {
      const usersStore = useUsersStore();
      const activitiesStore = useActivitiesStore();

      const initialDate = new Date(this.initialDate).getTime();
      const finalDate = new Date(this.finalDate).getTime();

      // get logged user id
      const loggedUser = await usersStore.getLoggedUser();

      const newActivity = {
        complexity: this.complexity.toString(),
        creatorID: loggedUser.id,
        diagnostic: this.diagnostic,
        evaluationIndicator: this.evaluationIndicators,
        evaluationMethod: this.evaluationMethods,
        finalDate: finalDate,
        images: this.activity_images,
        initialDate: initialDate,
        meta: this.metas,
        objective: this.objectives,
        participants: this.participants,
        resources: this.resources,
        schoolID: loggedUser.schoolID,
        themeID: this.themeID,
        title: this.title,
      };

      // create new activity
      await activitiesStore.addActivity(newActivity);

      this.$bvToast.toast("Nova Atividade Criada com sucesso!", {
        title: "Atividade Criada",
        variant: "success",
        solid: true,
      });

      this.$router.push({ name: "Activities" });
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

textarea {
  resize: none;
  height: 100px;
  padding: 10px 15px;
  border-radius: 25px;
  border: 1px solid $tertiary-color;
  font-family: "Panton", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: $primary-color;
}

select {
  border-radius: 25px;
  border: 1px solid $tertiary-color;
  font-family: "Panton", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: $primary-color;
}

b {
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  color: $primary-color;
}

.complexity-info {
  color: $tertiary-color;
  scale: 1.5;
}

.date-input {
  border-radius: 25px;
  border: 1px solid $tertiary-color;
  font-family: "Panton", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: $primary-color;
}

span {
  font-family: "Panton", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  color: $primary-color;
  margin-left: 15px;
}

.create-activity-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 25px;

  font-family: "Panton", sans-serif;
  font-size: 1.1rem;
  font-weight: 600;

  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
}
</style>
