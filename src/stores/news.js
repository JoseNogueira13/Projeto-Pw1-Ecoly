import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [],
  }),

  actions: {
    async getNews() {
      if (this.news.length === 0) this.news = await fetchData("news");
      return this.news;
    },

    async getNewById(id) {
      const news = await this.getNews();
      return news.find((news) => news.id === id);
    },

    // Add new
    async addNew(newNew) {
      const news = await this.getNews();
      news.push({ id: crypto.randomUUID(), date: Date.now(), ...newNew });
      setLocalStorage("news", news);
      this.news = news;
      return this.news;
    },

    // Remove new
    async removeNew(id) {
      const news = await this.getNews();
      const newNews = news.filter((news) => news.id !== id);
      setLocalStorage("news", newNews);
      this.news = newNews;
      return this.news;
    },
  },
});
