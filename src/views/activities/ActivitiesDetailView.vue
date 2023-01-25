<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="activities" />
  <div class="images-section">
    <div class="background">
      <div class="main text-center p-3 px-5">
        <div class="img-slider row">
          <div class="row justify-content-center align-items-center">
            <img
              v-for="(image, index) in activityDetails.images"
              :key="index"
              :src="image.includes('./data/images') ? '/' + image : image"
              class="addActivityImg img-fluid my-3 mx-3 rounded-lg shadow ml-4"
              alt="Imagem da Atividade"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="header-activity">
    <b-form-rating
      id="rating-inline"
      class="rating-stars float-right"
      inline
      value="0"
    ></b-form-rating>
    <div class="title">
      {{ activityDetails.title }}
    </div>
    <div class="position-buttons my-5">
      <div class="buttons-section d-flex float-right my-5">
        <button
          type="button"
          class="remove-btn btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-1"
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
          class="finish-btn btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-2"
          @click="openModal(activityDetails.initialDate, activityDetails.finalDate)"
          :style="{
            visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
            //show the button only if the final date is less than the current date
            display:
              formatDate(activityDetails.finalDate) <
              new Date().toISOString().split('T')[0]
                ? 'block'
                : 'none',
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

  <div class="main-section">
    <div class="illustration-background">
      <img
        src="@/assets/images/activityDetail-ilustration.svg"
        alt="ilustração do detalhe da atividade"
        class="illustration-background-img"
      />
    </div>
    <div class="rectangle-hide"></div>
    <div class="Activity-detail">
      <div class="left-side-father">
        <div class="left-side">
          <div class="diagnostic">
            <div class="headings-details diagnostic-heading">Diagnóstico</div>
            <div class="contents-details diagnostic-content">
              {{ activityDetails.diagnostic }}
            </div>
          </div>
          <div class="resources">
            <div class="headings-details resources-heading">Recursos</div>
            <div class="contents-details resources-content">
              {{ activityDetails.resources }}
            </div>
          </div>
          <div class="evaluationIndicator">
            <div class="headings-details evaluationIndicator-heading">
              Indicadores de avaliação
            </div>
            <div class="contents-details evaluationIndicator-content">
              {{ activityDetails.evaluationIndicator }}
            </div>
          </div>
        </div>
      </div>
      <div class="right-side-father">
        <div class="right-side float-right d-flex flex-column">
          <div class="objective">
            <div class="headings-details objective-heading">Objetivos</div>
            <div class="contents-details objective-content">
              {{ activityDetails.objective }}
            </div>
          </div>
          <div class="meta">
            <div class="headings-details meta-heading">Metas</div>
            <div class="contents-details meta-content">
              {{ activityDetails.meta }}
            </div>
          </div>
          <div class="participants">
            <div class="headings-details participants-heading">Participantes</div>
            <div class="contents-details participants-content">
              {{ activityDetails.participants }}
            </div>
          </div>
          <div class="evaluationMethod">
            <div class="headings-details evaluationMethod-heading">
              Instrumentos de avaliação
            </div>
            <div class="contents-details evaluationMethod-content">
              {{ activityDetails.evaluationMethod }}
            </div>
          </div>
        </div>
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

  // when the component his created
  async created() {
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
// variables colors
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$third-color: #ffffff;
$fourth-color: #e4f0e8;
$fifth-color: #3fc380;
$sixth-color: #7d8584;

.center {
  display: flex;
  justify-content: center;
}

.activity-detail {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
}

.background {
  background-color: $fourth-color;
  height: 300px;
}

.addActivityImg {
  width: 340px;
  height: 200px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}

.title {
  color: $primary-color;
  //alkes family font
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
.rating-stars {
  display: flex;
  justify-content: center;
  gap: 0.1em;
  padding-top: 0.5em;
  border: none;
  font-size: 1.4em;
  padding-right: 4em;
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
    border: none;
    opacity: 1;
  }
}

.modal-new-img:hover {
  border: 1px solid red;
  opacity: 0.6;
  cursor: pointer;
  transform: scale(1.05);
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

.illustration-background {
  padding-left: 4.3em;
}

.illustration-background-img {
  position: relative;
  top: -4em;
}

.headings-details {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 26.25px;
}

.contents-details {
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 18.5px;
  letter-spacing: 0.05em;
  line-height: 28px;
}

.Activity-detail {
  margin-top: -60em;
}

.rectangle-hide {
  background-color: $secondary-color;
  height: 100px;
  width: 100%;
  margin-top: -4em;
}

.right-side {
  display: flex;
  gap: 6.5em;
  margin-top: -41em;
  width: 30%;
}

.right-side-father {
  margin-right: 17em;
}

.left-side-father {
  margin-left: 22em;
  width: 20%;
}

.left-side {
  display: flex;
  flex-direction: column;
  gap: 6.5em;
  width: 85%;
  position: relative;
  top: -3em;
}
</style>
