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

    // Add activity activity
    async addActivity(newActivity) {
      const activities = await this.getActivities();
      activities.push({
        id: crypto.randomUUID(),
        date: Date.now(),
        ...newActivity,
      });
      setLocalStorage("activities", activities);
      this.activities = activities;
      return this.activities;
    },

    // Remove Activity
    async removeActivity(id) {
      const activities = await this.getActivities();
      const newActivities = activities.filter(
        (activities) => activities.id !== id
      );
      setLocalStorage("activities", newActivities);
      this.activities = newActivities;
      return this.activities;
    },

    // Finish activity
    async finishActivity(id) {
      const activities = await this.getActivities();
      // Find the activity and set finished to true
      activities.find((activity) => activity.id === id).finished = true;
      this.activities = activities;
      setLocalStorage("activities", activities);
    },

    // Add a report
    async addReport(id, report) {
      const activities = await this.getActivities();
      activities.find((activity) => activity.id === id).report.push(report);
      this.activities = activities;
      setLocalStorage("activities", activities);
    },
  },
});
