import { useActivitiesStore } from "@/stores/activities";
import { useMeetingsStore } from "@/stores/meetings";
import { useUsersStore } from "@/stores/users";
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

    async editSchool(id, newSchoolName) {
      const schools = await this.getSchools();
      const school = schools.find((school) => school.id === id);
      school.name = newSchoolName;

      setLocalStorage("schools", schools);
      this.schools = schools;
    },

    async deleteSchool(id) {
      const usersStore = useUsersStore();
      const meetingsStore = useMeetingsStore();
      const activitiesStore = useActivitiesStore();
      const schools = await this.getSchools();

      // Delete users from this school
      await usersStore.deleteUsersFromSchool(id);

      // Delete meetings from this school
      await meetingsStore.removeMeetingsBySchool(id);

      // Delete activities from this school
      await activitiesStore.removeActivitiesFromSchool(id);

      // Delete the school
      const newSchools = schools.filter((school) => school.id !== id);

      setLocalStorage("schools", newSchools);
      this.schools = newSchools;
    },
  },
});
