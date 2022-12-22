import { defineStore } from "pinia";
import { getLocalStorage, setLocalStorage } from "../hooks/localStorage";

async function fetchActivities() {
  const activities = getLocalStorage("activities");
  if (activities) return activities;

  return await fetch("./data/json/activities.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export const useActivitiesStore = defineStore("activities", {
  state: () => ({
    activities: [],
  }),

  actions: {
    async getActivities() {
      if (this.activities.length === 0)
        this.activities = await fetchActivities();
      return this.activities;
    },

    async getActivityById(id) {
      if (this.activities.length === 0)
        this.activities = await fetchActivities();
      return this.activities.find((activities) => activities.id === id);
    },

    // Add activity activity
    async addActivity(newActivity) {
      const activities = await fetchActivities();
      activities.push({
        id: crypto.randomUUID(),
        date: Date.now(),
        ...newActivity,
      });
      setLocalStorage("activities", activities);
      this.activities = activities;
      return this.activities;
    },

    // Finish activity
    async finishActivity(id) {
      const activities = await fetchActivities();
      // Find the activity and set finished to true
      activities.find((activity) => activity.id === id).finished = true;
      this.activities = activities;
      setLocalStorage("activities", activities);
    },

    // Add a report
    async addReport(id, report) {
      const activities = await fetchActivities();
      activities.find((activity) => activity.id === id).report.push(report);
      this.activities = activities;
      setLocalStorage("activities", activities);
    },
  },
});
