import { defineStore } from "pinia";
import { getLocalStorage, setLocalStorage } from "../hooks/localStorage";

async function fetchThemes() {
  const themes = getLocalStorage("themes");
  if (themes) return themes;

  return await fetch("./data/json/themes.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export const useThemesStore = defineStore("themes", {
  state: () => ({
    themes: [],
  }),

  actions: {
    async getThemes() {
      if (this.themes.length === 0) this.themes = await fetchThemes();
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

    // Add theme theme
    async addTheme(newTheme) {
      const themes = await this.getThemes();
      themes.push({
        id: crypto.randomUUID(),
        name: newTheme,
        status: "active", // active: can be used, inactive: can't be used anymore
      });

      setLocalStorage("themes", themes);
      this.themes = themes;
    },

    // Disable theme
    async disableTheme(themeID) {
      const themes = await this.getThemes();
      const theme = themes.find((theme) => theme.id === themeID);

      theme.status = "inactive";

      setLocalStorage("themes", themes);
      this.themes = themes;
    },
  },
});
