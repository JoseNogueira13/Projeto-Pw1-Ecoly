import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";

export const useBadgesStore = defineStore("badges", {
  state: () => ({ badges: [] }),

  actions: {
    async getBadges() {
      if (this.badges.length === 0) this.badges = await fetchData("badges");
      return this.badges;
    },

    async getBadgeById(id) {
      const badges = await this.getBadges();
      return badges.find((badge) => badge.id === id);
    },
  },
});
