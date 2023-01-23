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
        <span class="title">Relatório</span>
        <span class="title-date-begin-activity">{{ initialDate }}</span>
        <span class="space-between-dates">-</span>
        <span class="title-date-finish-activity">{{ finalDate }}</span>
      </div>
    </template>
    <div class="d-block text-center">
      <input
        type="text"
        class="form-control new-theme-input"
        placeholder="Novo Tema"
        aria-label="Novo Tema"
      />
    </div>
    <b-button class="add-theme-modal-btn mt-3" block>Concluir</b-button>
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
      userInfo: { isLogged: false, isAdmin: false },
      numberOfActivities: 5,
      numberOfThemes: 3,
      totalNumberOfActivities: 0,
      totalNumberOfThemes: 0,
      initialDate: "",
      finalDate: "",
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
  },

  methods: {
    // to remove an activity from the list
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

    openModal( initialDate, finalDate) {
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
  },
};
</script>

<style lang="scss" scoped>
// variables colors
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;

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
