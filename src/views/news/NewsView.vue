<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
import Searchbar from "@/components/Searchbar.vue";
import New from "@/components/New.vue";
</script>

<template>
  <Sidebar route="news" />
  <div class="main text-center p-3 px-5">
    <Searchbar route="news" />

    <Header title="NOTÍCIAS" />

    <!-- Add new (only visible for admins) -->
    <router-link
      :to="{ name: 'NewsCreate' }"
      :style="{
        visibility:
          userInfo.isLogged && userInfo.isAdmin ? 'visible' : 'hidden',
      }"
    >
      <button
        type="button"
        class="add-new-btn btn btn-sm rounded-pill ml-5 mb-4"
      >
        <img src="@/assets/icons/add.svg" alt="add" width="20" loading="lazy" />
        <span class="px-3"> Adicionar Notícia </span>
      </button>
    </router-link>

    <section class="news-section">
      <div>
        <New
          v-for="item in news"
          :key="item.id"
          :item="item"
          :userInfo="userInfo"
          @removeNew="removeNew"
        />
      </div>
    </section>

    <!-- Load more News Icon animation -->
    <div v-if="numberOfNews < totalNumberOfNews">
      <img
        src="@/assets/icons/loading.svg"
        alt="load more"
        width="50"
        loading="lazy"
        class="load-more-icon"
      />
    </div>

    <!-- If there's no more news to be displayed -->
    <div v-else>
      <h2 class="warning-text text-center mt-3">
        {{
          news.length > 0 // if there's no more news to load
            ? "Não existem mais notícias para mostrar" // if there's no news at all
            : "Não existem notícias para mostrar"
        }}
      </h2>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/news";
import { useUsersStore } from "@/stores/users";
export default {
  name: "News",
  components: {
    Header,
    Sidebar,
    Searchbar,
    New,
  },

  data() {
    return {
      news: [],
      userInfo: { isLogged: false, isAdmin: false },
      numberOfNews: 5,
      totalNumberOfNews: 0,
    };
  },

  created() {
    // Load the stores
    const newsStore = useNewsStore();
    const usersStore = useUsersStore();

    // Load News
    newsStore.getNews().then((news) => {
      this.totalNumberOfNews = news.length;
      this.news = news.slice(0, this.numberOfNews);
    });

    // Load User Info
    this.userInfo.isLogged = usersStore.isUserLogged();
    if (this.userInfo.isLogged) {
      usersStore.getLoggedUser().then((user) => {
        this.userInfo.isAdmin = user.role === "admin";
      });
    }

    // when the user scrolls to the bottom of the page, the number of news to be displayed increases by 5
    window.addEventListener("scroll", this.loadMoreNews);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.loadMoreNews);
  },

  methods: {
    loadMoreNews() {
      const windowHeight =
        window.innerHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.offsetHeight;

      if (windowHeight - 5 > documentHeight - 6) {
        // wait half second before loading more news
        setTimeout(() => {
          this.numberOfNews += 5;
          const newsStore = useNewsStore();
          newsStore.getNews().then((news) => {
            this.news = news.slice(0, this.numberOfNews);
          });
        }, 500);
      }
    },

    removeNew(id) {
      const newsStore = useNewsStore();
      newsStore.removeNew(id);
      this.news = this.news.filter((item) => item.id !== id);
      this.totalNumberOfNews -= 1;
      if (this.numberOfNews > this.totalNumberOfNews) {
        this.numberOfNews = this.totalNumberOfNews;
      }
      this.news = this.news.slice(0, this.numberOfNews);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.add-new-btn {
  background-color: $primary-color;
  color: $fourth-color;

  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;

  display: flex;
  align-items: center;
  justify-content: flex-start;

  &:hover {
    background-color: $tertiary-color;
    text-decoration: none;
    color: $fourth-color;
  }

  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.warning-text {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 25px;
  color: $primary-color;
}

.load-more-icon {
  // rotate the icon (loading animation)
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
