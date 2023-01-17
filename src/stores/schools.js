import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useSchoolsStore = defineStore("schools", {
  state: () => ({ schools: [] }),

  actions: {
    async getSchools() {
      if (this.schools.length === 0) this.schools = await fetchData("schools");
      return this.schools;
    },

    async getSchoolById(id) {
      const schools = await this.getSchools();
      return schools.find((school) => school.id === id);
    },

    async addSchool(schoolName) {
      const schools = await this.getSchools();
      schools.push({ id: crypto.randomUUID(), name: schoolName });

      setLocalStorage("schools", schools);
      this.schools = schools;
    },
  },
});
