<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Searchbar from "@/components/Searchbar.vue";
import Header from "@/components/Header.vue";
</script>

<template>
  <Sidebar route="activities" />
  <div class="main text-center p-3 px-5">
    <Searchbar route="activities" />

    <Header title="ATIVIDADES" />

    <!-- route for the add activity form -->
    <div class="sub_heading_activities d-flex">
      <router-link
        :to="{ name: 'ActivitiesCreate' }"
        :style="{
          visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
        }"
      >
        <button
          type="button"
          class="add-activity-btn btn btn-sm rounded-pill ml-5 mb-4"
        >
          <img src="@/assets/icons/add.svg" alt="add" width="20" loading="lazy" />
          <span class="px-3"> Adicionar Atividade </span>
        </button>
      </router-link>
    </div>

    <section class="activities-section">
      <div>
        <Activity
          v-for="activity in activities"
          :key="activity.id"
          :activity="activity"
          :userInfo="userInfo"
          :themes="themes.find((theme) => theme.id === activity.themeID)"
          @removeActivity="removeActivity"
          @openModal="openModal"
        />
      </div>
    </section>

    <!-- Load More Activities if there is more activities to be displayed -->
    <div v-if="numberOfActivities < totalNumberOfActivities">
      <!-- Icon animation loader -->
      <img
        src="@/assets/icons/loading.svg"
        alt="load more"
        width="50"
        loading="lazy"
        class="load-more-icon"
      />
    </div>

    <!-- if there´s no more activities to be displayed -->
    <div v-else>
      <h2 class="warning-text text-center mt-3">
        {{
          activities.length > 0 // if there's no more activities to load
            ? "Não existem mais atividades para mostrar" // if there's no activities at all
            : "Não existem atividades para mostrar"
        }}
      </h2>
    </div>
  </div>

  <!-- modal finish activity -->
  <b-modal id="finish-activity-modal" hide-footer centered>
    <template #modal-title>
      <div class="header-modal">
        <span class="modal-title">Relatório</span>
        <div class="dates-report-title">
          <span class="modal-title-date-begin-activity">{{
            formatDate(initialDate)
          }}</span>
          <span class="modal-space-between-dates">-</span>
          <span class="modal-title-date-finish-activity">{{
            formatDate(finalDate)
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
import { useUsersStore } from "@/stores/users";
import Activity from "../../components/Activity.vue";
import { useThemesStore } from "@/stores/themes";
import { useSchoolsStore } from "@/stores/schools";

export default {
  name: "Activities",
  components: {
    Sidebar,
    Searchbar,
    Activity,
    Header,
  },

  data() {
    return {
      activities: [],
      themes: [],
      reportImgs: [],
      userInfo: { isLogged: false, isAdmin: false },
      numberOfActivities: 5,
      numberOfThemes: 3,
      totalNumberOfActivities: 0,
      totalNumberOfThemes: 0,
      initialDate: "",
      finalDate: "",
      reportDescription: "",
    };
  },

  // load the stores when the component his created
  created() {
    const activitiesStore = useActivitiesStore();
    const usersStore = useUsersStore();
    const themesStore = useThemesStore();
    const schoolsStore = useSchoolsStore();

    // Load User Info
    this.userInfo.isLogged = usersStore.isUserLogged();
    if (this.userInfo.isLogged) {
      usersStore.getLoggedUser().then((user) => {
        this.userInfo.isAdmin = user.role === "admin";
      });
    }

    // get theme name by id
    themesStore.getThemes().then((themes) => {
      this.totalNumberOfThemes = themes.length;
      this.themes = themes.slice(0, this.numberOfThemes);
    });

    // get all activities with status "unfinished" of the school of the user logged in otherwise if not logged in will get all activities with status "unfinished"
    if (this.userInfo.isLogged || this.userInfo.isAdmin) {
      usersStore.getLoggedUser().then((user) => {
        schoolsStore.getSchoolById(user.schoolID).then((school) => {
          activitiesStore.getActivities().then((activities) => {
            this.activities = activities.filter(
              (activity) => activity.status === "unfinished"
            );
            this.activities = this.activities.filter(
              (activity) => activity.schoolID === school.id
            );
            this.totalNumberOfActivities = this.activities.length;
            this.activities = this.activities.slice(0, this.numberOfActivities);
          });
        });
      });
    } else {
      activitiesStore.getActivities().then((activities) => {
        this.activities = activities.filter(
          (activity) => activity.status === "unfinished"
        );
        this.totalNumberOfActivities = this.activities.length;
        this.activities = this.activities.slice(0, this.numberOfActivities);
      });
    }

    // when the user scrolls to the bottom of the page, the number of activities to be displayed increases by 5
    window.addEventListener("scroll", this.loadMoreActivities);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.loadMoreActivities);
  },

  methods: {
    removeActivity(id) {
      const activitiesStore = useActivitiesStore();
      activitiesStore.removeActivity(id);
      this.activities = this.activities.filter((activity) => activity.id !== id);
      this.totalNumberOfActivities -= 1;
      if (this.numberOfActivities > this.totalNumberOfActivities) {
        this.numberOfActivities = this.totalNumberOfActivities;
      }
      this.activities = this.activities.slice(0, this.numberOfActivities);
    },

    openModal(initialDate, finalDate) {
      //find the activity open the modal and set the initial and final date
      this.initialDate = initialDate;
      this.finalDate = finalDate;
      this.$bvModal.show("finish-activity-modal");
    },

    formatDate(date) {
      const dateObj = new Date(date);
      const month = dateObj.getUTCMonth() + 1;
      const day = dateObj.getUTCDate();
      const year = dateObj.getUTCFullYear();
      return day + "/" + month + "/" + year;
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
          activity.initialDate === this.initialDate &&
          activity.finalDate === this.finalDate
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
    },

    loadMoreActivities() {
      const windowHeight = window.innerHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.offsetHeight;

      if (windowHeight - 5 > documentHeight - 6) {
        // wait half second before loading more activities
        setTimeout(() => {
          this.numberOfActivities += 5;
          const activitiesStore = useActivitiesStore();
          activitiesStore.getActivities().then((activities) => {
            this.activities = activities.slice(0, this.numberOfActivities);
          });
        }, 500);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// variables colors
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #7d858480;

.add-activity-btn {
  background-color: $primary-color;
  color: $fourth-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &:hover {
    background-color: $tertiary-color;
    text-decoration: none;
    color: $fourth-color;
  }
  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.sub_heading_activities {
  gap: 1em;
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 400;
}

.warning-text {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 25px;
  color: $primary-color;
}

// styles for the finish activity modal
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
  border: 3px solid $tertiary-color;

  &::placeholder {
    color: $fifth-color;
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
    background-color: $tertiary-color;
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

.loading .load-more-icon {
  // rotate the icon (loading animation)
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
