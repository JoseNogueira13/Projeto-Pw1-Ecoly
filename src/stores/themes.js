import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useThemesStore = defineStore("themes", {
  state: () => ({
    themes: [],
  }),

  actions: {
    async getThemes() {
      if (this.themes.length === 0) this.themes = await fetchData("themes");
      return this.themes;
    },

    async getThemeById(id) {
      const themes = await this.getThemes();
      return themes.find((themes) => themes.id === id);
    },

    async getActiveThemes() {
      const themes = await this.getThemes();
      return themes.filter((theme) => theme.status === "active");
    },

    // Add theme
    async addTheme(newTheme) {
      // convert to lowercase, capitalize first letter and replace spaces with 1 space
      newTheme = newTheme
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/\b[a-z]/g, (letter) => letter.toUpperCase())
        .replace(/\s+/g, " ")
        .trim();

      const themes = await this.getThemes();
      let result;

      // Check if theme already exists
      const themeExists = themes.find((theme) => theme.name === newTheme);
      if (themeExists) {
        // change the status to active
        themeExists.status = "active";
        result = themeExists;
      } else {
        themes.push({
          id: crypto.randomUUID(),
          name: newTheme,
          status: "active", // active: can be used, inactive: can't be used anymore
        });

        result = themes.at(-1);
      }

      setLocalStorage("themes", themes);
      this.themes = themes;

      return result;
    },

    // Disable theme
    async disableTheme(themeID) {
      const themes = await this.getThemes();

      themes.forEach((theme) => delete theme.displayDelete);

      const theme = themes.find((theme) => theme.id === themeID);

      theme.status = "inactive";

      setLocalStorage("themes", themes);
      this.themes = themes;
    },
  },
});
