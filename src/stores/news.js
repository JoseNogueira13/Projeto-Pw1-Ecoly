import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

function orderNewsByDate(news) {
  return news.sort((a, b) => {
    return b.date - a.date;
  });
}

export const useNewsStore = defineStore("news", {
  state: () => ({
    news: [],
  }),

  actions: {
    async getNews() {
      this.news = orderNewsByDate(await fetchData("news"));
      return this.news;
    },

    async getNewById(id) {
      const news = await this.getNews();
      return news.find((news) => news.id === id);
    },

    // Search news
    async searchNews(search) {
      const news = await this.getNews();
      const newsFiltered = news.filter((news) => {
        return news.title.toLowerCase().includes(search.toLowerCase());
      });

      return newsFiltered.map((news) => {
        return { id: news.id, title: news.title, type: "new" };
      });
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

    async removeNewsCreatedByUser(userID) {
      const news = await this.getNews();
      const newNews = news.filter((news) => news.authorID !== userID);
      setLocalStorage("news", newNews);
      this.news = newNews;
    },
  },
});
