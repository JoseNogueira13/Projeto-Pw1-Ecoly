import { defineStore } from "pinia";
import { uuid } from "vue-uuid";
import { getLocalStorage, setLocalStorage } from "../hooks/localStorage";

async function fetchNews() {
  const news = getLocalStorage("news");
  if (news) return news;

  return await fetch("./data/json/news.json")
    .then((res) => res.json())
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return [];
    });
}

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [],
  }),

  actions: {
    async getNews() {
      if (this.news.length === 0) this.news = await fetchNews();
      return this.news;
    },

    async getNewById(id) {
      if (this.news.length === 0) this.news = await fetchNews();
      return this.news.find((news) => news.id === id);
    },

    // Add new
    async addNew(newNew) {
      const news = await fetchNews();
      news.push({ id: uuid.v4(), date: Date.now(), ...newNew });
      setLocalStorage("news", news);
      this.news = news;
      return this.news;
    },

    // Remove new
    async removeNew(id) {
      const news = await fetchNews();
      const newNews = news.filter((news) => news.id !== id);
      setLocalStorage("news", newNews);
      this.news = newNews;
      return this.news;
    },
  },
});
