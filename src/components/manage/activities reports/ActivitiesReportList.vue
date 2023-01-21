<script setup>
import ManageSection from "../ManageSection.vue";
import SelectedActivityReport from "./SelectedActivityReport.vue";
</script>

<template>
  <div class="mt-5 pt-3">
    <ManageSection
      title="LISTA DE RELATÓRIO DE ATIVIDADES"
      description="clique numa atividade para visualizar o relatório"
    />

    <div class="row mt-5 report-list-section">
      <!-- Select Activity -->
      <div class="col-lg-7 activities-list d-flex flex-column justify-content-center">
        <div v-for="activity in activities" :key="activity.id" class="row mb-4">
          <div class="col-lg-6" style="margin-left: 18%">
            <button
              class="select-activity-btn btn w-100 mt-1 py-2"
              @click="selectedActivity = activity"
              :class="{
                'selected-activity-btn': selectedActivity.id === activity.id,
              }"
              :disabled="selectedActivity.id === activity.id"
            >
              {{ activity.title }}
            </button>
          </div>
          <div class="select-activity-date text-center">
            <span class="font-weight-bold"> Data de início </span>
            {{ formatDate(activity.initialDate) }}
          </div>
        </div>
      </div>
      <!-- Activity Report -->
      <div class="col-lg-5">
        <SelectedActivityReport
          v-if="selectedActivity"
          :activity="selectedActivity"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useActivitiesStore } from "@/stores/activities";
import { useUsersStore } from "@/stores/users";
export default {
  name: "ActivitiesReportList",
  components: { ManageSection, SelectedActivityReport },

  data() {
    return {
      activities: [],
      selectedActivity: null,
    };
  },

  async created() {
    const activitiesStore = useActivitiesStore();
    const usersStore = useUsersStore();

    // get logged user
    const loggedUser = await usersStore.getLoggedUser();
    const userSchoolID = loggedUser.schoolID;

    const activities = await activitiesStore.getActivities();
    const finishedActivities = activities.filter((activity) => {
      return activity.status === "finished" && activity.schoolID === userSchoolID;
    });

    // sort by date
    finishedActivities.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    this.activities = finishedActivities;
    this.selectedActivity = this.activities[0];
  },

  methods: {
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
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #e4f0e8;
$fourth-color: #ffffff;
$fifth-color: #18516f;
$sixth-color: #000;
$seventh-color: #57b894;

.report-list-section {
  background-image: url("@/assets/images/activitiesReportIllustration.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.select-activity-btn {
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 15px;
  transition: 0.3s;
  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
}

.select-activity-date {
  font-family: "Panton", sans-serif;
  font-size: 1.1rem;
  max-width: 200px;
  margin: 0 auto;
}

.selected-activity-btn {
  background-color: $fourth-color;
  border: 1px solid $primary-color;
  color: $primary-color;
  &:hover {
    background-color: $fourth-color;
    color: $sixth-color;
  }
}

.activities-list {
  height: 900px;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }
  &::-webkit-scrollbar-track {
    background: $tertiary-color;
  }
  &::-webkit-scrollbar-thumb {
    background: $seventh-color;
  }
}
</style>
