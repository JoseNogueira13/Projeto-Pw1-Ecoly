<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="activities" />
  <!-- Images -->
  <div class="row" style="max-width: 95%">
    <div class="col-12">
      <div class="main text-left p-3 px-5">
        <img
          v-for="(image, index) in activityDetails.images"
          :key="index"
          :src="image.includes('./data/images') ? '/' + image : image"
          class="img-fluid my-3 mx-3 rounded-lg shadow ml-4"
          alt="Imagem da Atividade"
          style="width: 300px; height: 200px; object-fit: cover"
        />
      </div>
    </div>
  </div>

  <!-- Header -->
  <div class="header-activity">
    <b-form-rating
      class="complexity-info float-right mt-3"
      inline
      :value="activityDetails.complexity"
      :readonly="true"
    ></b-form-rating>
    <div class="title">
      {{ activityDetails.title }}
    </div>
    <div class="position-buttons my-5 mr-4">
      <div class="buttons-section d-flex float-right my-5">
        <button
          type="button"
          class="btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-1 remove-btn"
          :style="{
            visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
          }"
          @click="removeActivity(activityDetails.id)"
        >
          <img
            src="@/assets/icons/remove.svg"
            alt="remove"
            width="20"
            loading="lazy"
            class="ml-2 change-color-remove"
          />
          <span class="px-3">Remover</span>
        </button>
        <button
          type="button"
          class="btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-2 finish-btn"
          @click="openModal(activityDetails.initialDate, activityDetails.finalDate)"
          :style="{
            visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
            //show the button only if the final date is less than the current date
            display:
              formatDate(activityDetails.finalDate) <
              new Date().toISOString().split('T')[0]
                ? 'block'
                : 'd-none',
          }"
        >
          <img
            src="@/assets/icons/finish.svg"
            alt="finish"
            width="20"
            loading="lazy"
            class="ml-2"
          />
          <span class="px-3">Finalizar</span>
        </button>
      </div>
    </div>
    <div class="theme-date-section d-flex my-3">
      <div class="theme">{{ theme }}</div>
      <div class="dates-activity d-flex mx-4">
        <div class="date-begin-section">
          <div class="date-begin-title">Data Início</div>
          <div class="date-begin">
            {{ formatDate(activityDetails.initialDate) }}
          </div>
        </div>
        <div class="circle"></div>
        <div class="date-end-section">
          <div class="date-end-title">Data de Fim</div>
          <div class="date-end">{{ formatDate(activityDetails.finalDate) }}</div>
        </div>
      </div>
    </div>
    <div class="line-divider"></div>
  </div>

  <!-- Activity Details -->
  <div class="activity-details">
    <div class="first pr-5 mr-4">
      <div class="row mt-4 detail-info" style="height: 80px"></div>
      <div class="row mt-5 detail-info" style="max-height: 240px">
        <h2 class="d-flex justify-content-end w-100 text-right">Diagnóstico</h2>
        <p class="py-2 d-flex justify-content-end w-100 text-right">
          {{ activityDetails.diagnostic }}
        </p>
      </div>
      <div class="row mt-4 detail-info" style="height: 80px"></div>
      <div class="row mt-5 detail-info" style="max-height: 240px">
        <h2 class="d-flex justify-content-end w-100 text-right">Recursos</h2>
        <p class="py-2 d-flex justify-content-end w-100 text-right">
          {{ activityDetails.resources }}
        </p>
      </div>
      <div class="row mt-4 detail-info" style="height: 80px"></div>
      <div class="row mt-5 detail-info" style="max-height: 240px">
        <h2 class="d-flex justify-content-end w-100 text-right">
          Indicadores de avaliação
        </h2>
        <p class="py-2 d-flex justify-content-end w-100 text-right">
          {{ activityDetails.evaluationIndicator }}
        </p>
      </div>
      <div class="row mt-4 detail-info" style="height: 80px"></div>
    </div>
    <div class="second"></div>
    <div class="third">
      <div class="row mt-4 detail-info" style="max-height: 240px">
        <h2 class="w-100">Objetivos</h2>
        <p class="py-2 text-left">
          {{ activityDetails.objective }}
        </p>
      </div>
      <div class="row mt-4 detail-info" style="height: 80px"></div>
      <div class="row mt-4 detail-info" style="max-height: 240px">
        <h2 class="w-100">Metas</h2>
        <p class="py-2 text-left">
          {{ activityDetails.meta }}
        </p>
      </div>
      <div class="row mt-4 detail-info" style="height: 100px"></div>
      <div class="row mt-4 detail-info" style="max-height: 240px">
        <h2 class="w-100">Participantes</h2>
        <p class="py-2 text-left">
          {{ activityDetails.participants }}
        </p>
      </div>
      <div class="row mt-4 detail-info" style="height: 100px"></div>
      <div class="row mt-4 detail-info" style="max-height: 240px">
        <h2 class="w-100">Instrumentos de avaliação</h2>
        <p class="py-2 text-left">{{ activityDetails.evaluationMethod }}</p>
      </div>
    </div>
  </div>

  <!-- modal finish activity  -->
  <b-modal id="finish-activity-modal" hide-footer centered>
    <template #modal-title>
      <div class="header-modal">
        <span class="modal-title">Relatório</span>
        <div class="dates-report-title">
          <span class="modal-title-date-begin-activity">{{
            formatDateModal(initialDate)
          }}</span>
          <span class="modal-space-between-dates">-</span>
          <span class="modal-title-date-finish-activity">{{
            formatDateModal(finalDate)
          }}</span>
        </div>
      </div>
    </template>
    <div class="main-modal">
      <div class="images-report">
        <img
          v-for="(image, index) in reportImgs"
          :key="index"
          :src="image"
          class="img-fluid modal-new-img modal-add-img mx-2 rounded my-2"
          alt="imagem para o relatório da atividade"
          @click="removeReportImage(index)"
        />
        <img
          v-if="reportImgs.length < 4"
          class="modal-added-image modal-add-img modal-add-img-btn my-3 mx-3 rounded-lg shadow"
          src="@/assets/images/addImage.png"
          alt="add New report Image"
          @click="addReportImage"
        />
      </div>
      <div class="form-report">
        <form @submit.prevent="addReport">
          <textarea
            class="form-control mt-4 mb-0 add-report-description"
            rows="5"
            placeholder="Descrição..."
            v-model="reportDescription"
          >
          </textarea>
          <button
            type="submit"
            class="btn add-report-btn mt-3 px-5 py-1"
            :disabled="reportDescription === '' || reportDescription.length === 0"
          >
            Concluir
          </button>
        </form>
      </div>
    </div>
  </b-modal>
</template>

<script>
import { useActivitiesStore } from "@/stores/activities";
import { useThemesStore } from "@/stores/themes";
import { useUsersStore } from "@/stores/users";

export default {
  name: "ActivitiesDetailView",

  data() {
    return {
      components: { Sidebar },
      activities: [],
      activityDetails: {},
      theme: "",
      reportImgs: [],
      initialDate: "",
      finalDate: "",
      userInfo: { isLogged: false, isAdmin: false },
      reportDescription: "",
      totalNumberOfActivities: 0,
      numberOfActivities: 5,
    };
  },

  async created() {
    window.scrollTo(0, 0);

    const themesStore = useThemesStore();
    const usersStore = useUsersStore();

    // Load User Info
    this.userInfo.isLogged = usersStore.isUserLogged();
    if (this.userInfo.isLogged) {
      usersStore.getLoggedUser().then((user) => {
        this.userInfo.isAdmin = user.role === "admin";
      });
    }

    // new id from the url
    const id = this.$route.params.id;
    const activityDetail = await useActivitiesStore().getActivityById(id);
    if (activityDetail) this.activityDetails = activityDetail;
    else this.$router.push({ name: "NotFound" });

    themesStore.getThemeById(this.activityDetails.themeID).then((theme) => {
      this.theme = theme.name;
    });
  },

  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("pt-PT", options);
    },

    formatDateModal(date) {
      const dateObj = new Date(date);
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      return day + "/" + month + "/" + year;
    },

    openModal(initialDate, finalDate) {
      //find the activity open the modal and set the initial and final date
      this.initialDate = initialDate;
      this.finalDate = finalDate;
      this.$bvModal.show("finish-activity-modal");
    },

    addReportImage() {
      // for the user upload images from their computer
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";
      input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.reportImgs.push(reader.result);
          console.log(this.reportImgs);
        };
      };
      input.click();
    },

    removeReportImage(index) {
      // remove the image from the list
      this.reportImgs.splice(index, 1);
    },

    addReport() {
      // add the report to the activity
      const activitiesStore = useActivitiesStore();
      // find the activity id of the list
      const activity = this.activities.find(
        (activity) =>
          activity.initialDate === this.formatDate(initialDate) &&
          activity.finalDate === this.formatDate(finalDate)
      );
      // finish activity
      activitiesStore.finishActivity(activity.id).then(() => {
        // add report
        activitiesStore.addReport(activity.id, {
          description: this.reportDescription,
          images: this.reportImgs,
        });
      });
      console.log(activity);
      this.$bvModal.hide("finish-activity-modal");
      this.$router.push({ name: "Activities" });
    },

    removeActivity(id) {
      const activitiesStore = useActivitiesStore();
      activitiesStore.removeActivity(id);
      this.activities = this.activities.filter((activity) => activity.id !== id);
      this.totalNumberOfActivities -= 1;
      if (this.numberOfActivities > this.totalNumberOfActivities) {
        this.numberOfActivities = this.totalNumberOfActivities;
      }
      this.activities = this.activities.slice(0, this.numberOfActivities);
      this.$router.push({ name: "Activities" });
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$third-color: #ffffff;
$fourth-color: #e4f0e8;
$fifth-color: #3fc380;
$sixth-color: #7d8584;

.title {
  color: $primary-color;
  font-family: "Alkes", sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 40px;
}

.theme {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 23px;
  background-color: $secondary-color;
  border-radius: 6px;
  padding: 0.2em;
  width: 210px;
  height: 45px;
  text-align: center;
  margin-top: -2em;
}

.date-begin-title {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin-top: -3em;
}

.date-end-title {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 15px;
  margin-top: -3em;
}

.date-begin {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: lighter;
}
.date-end {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: lighter;
}

.circle {
  width: 12.5px;
  height: 12.5px;
  border-radius: 50%;
  background-color: $secondary-color;
  margin-top: -1.3em;
}

.header-activity {
  padding-left: 11.5em;
  padding-top: 2em;
}

.dates-activity {
  gap: 1.2em;
}

.remove-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  gap: 1.4em;
  border: 1px solid $primary-color;
  color: $primary-color;
  &:hover {
    background-color: $fifth-color;
    color: $third-color;
    border: 1px solid $fifth-color;
  }
  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.finish-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  gap: 1.4em;
  background-color: $primary-color;
  color: $fourth-color;
  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.buttons-section {
  padding-top: 0.8em;
  gap: 0.3em;
}

.position-buttons {
  padding-right: 5em;
  position: relative;
  top: -6.5em;
}

.line-divider {
  border: 1px solid $primary-color;
  width: 93.5%;
  margin-top: 2.5em;
}

.images-report {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.modal-add-img-btn {
  width: 200px;
  height: 130px;
  object-fit: cover;
  transform: scale (1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border: none;
    opacity: 1;
  }
}

.modal-new-img {
  width: 200px;
  height: 130px;
  object-fit: cover;
  transform: scale (1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
    border: 1px solid red;
    opacity: 0.6;
  }
}

.add-report-description {
  border-radius: 8px;
  border: 3px solid $fifth-color;
  &::placeholder {
    color: $sixth-color;
    font-family: "Panton", sans-serif;
    font-weight: 600;
    font-size: 14px;
  }
}

.add-report-btn {
  margin-left: 157px;
  background-color: $primary-color;
  color: $fourth-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  &:hover {
    background-color: $fifth-color;
    text-decoration: none;
    color: $fourth-color;
  }
  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.header-modal {
  display: flex;
  flex-direction: column;
}
.modal-title {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 25px;
  color: $primary-color;
}

.modal-title-date-begin-activity {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: $primary-color;
}
.modal-title-date-finish-activity {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 15px;
  color: $primary-color;
}

.complexity-info {
  margin-right: 120px;
  border: none;
  scale: 1.2;
}

.activity-details {
  padding-top: 2em;
  display: grid;
  grid-template-columns: 1.1fr 0.8fr 1fr;
  grid-template-rows: 1fr;
  margin-left: 11.5%;
  width: 82%;
  overflow-x: hidden;
  overflow-y: hidden;
}

.second {
  background: url("@/assets/images/activityDetail-illustration.svg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  height: 1300px;
  animation: slideFromBottom 0.5s ease-in-out;
}

.detail-info {
  h2 {
    font-family: "Panton", sans-serif;
    font-weight: bold;
    font-size: 30px;
    color: $primary-color;
  }

  p {
    font-family: "Panton", sans-serif;
    font-weight: 600;
    font-size: 20px;
    color: $primary-color;
  }
}

.first {
  animation: slideFromLeft 0.8s ease-in-out;
}

.third {
  animation: slideFromRight 0.8s ease-in-out;
}

@keyframes slideFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideFromRight {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes slideFromBottom {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}

@media (max-width: 1620px) {
  .activity-details {
    grid-template-columns: 1fr 2fr 1fr;
  }
}

@media (max-width: 920px) {
  .activity-details {
    .second {
      display: none;
    }

    justify-content: center;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    grid-gap: 2em;
    width: 70%;
    margin: 0 auto;
  }
}
</style>
