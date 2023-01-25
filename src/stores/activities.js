import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    activities: [],
  }),

  actions: {
    async getActivities() {
      if (this.activities.length === 0)
        this.activities = await fetchData("activities");
      return this.activities;
    },

    async getActivityById(id) {
      const activities = await this.getActivities();
      return activities.find((activities) => activities.id === id);
    },

    async searchActivities(search) {
      const activities = await this.getActivities();
      const activitiesFiltered = activities.filter((activities) => {
        return (
          activities.title.toLowerCase().includes(search.toLowerCase()) &&
          activities.status === "unfinished"
        );
      });

      return activitiesFiltered.map((activities) => {
        return { id: activities.id, title: activities.title, type: "activity" };
      });
    },

    // Add activity activity
    async addActivity(newActivity) {
      const activities = await this.getActivities();
      activities.push({
        id: crypto.randomUUID(),
        report: {},
        status: "unfinished",
        ...newActivity,
      });
      setLocalStorage("activities", activities);
      this.activities = activities;
      return this.activities;
    },

    // Remove Activity
    async removeActivity(id) {
      const activities = await this.getActivities();
      const newActivities = activities.filter((activities) => activities.id !== id);
      setLocalStorage("activities", newActivities);
      this.activities = newActivities;
      return this.activities;
    },

    // Remove Activities from a school
    async removeActivitiesFromSchool(id) {
      const activities = await this.getActivities();
      const newActivities = activities.filter(
        (activities) => activities.schoolID !== id
      );
      setLocalStorage("activities", newActivities);
      this.activities = newActivities;
    },

    // Finish activity
    async finishActivity(id) {
      const activities = await this.getActivities();
      // Find the activity and set finished to true
      activities.find((activity) => activity.id === id).status = "finished";
      this.activities = activities;
      setLocalStorage("activities", activities);
    },

    // Add a report
    async addReport(id, report) {
      const activities = await this.getActivities();
      activities.find((activity) => activity.id === id).report = report;
      this.activities = activities;
      setLocalStorage("activities", activities);
    },
  },
});
