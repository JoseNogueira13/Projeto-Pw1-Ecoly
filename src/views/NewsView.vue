<script setup>
import Sidebar from "../components/Sidebar.vue";
import Searchbar from "../components/Searchbar.vue";
</script>

<template>
  <Sidebar route="news" />
  <div class="main text-center p-3 px-5">
    <Searchbar route="news" />

    <header class="mx-5 mt-4 mb-4">
      <h1 class="title text-left mt-3">NOTÍCIAS</h1>
      <div class="border border-2 border-dark mt-3"></div>
    </header>

    <!-- 
      Create New Button 
      (only visible if the user logged is the type of admin) 
    -->
    <router-link
      to="/news/create"
      :style="{
        visibility:
          userInfo.isLogged && userInfo.isAdmin ? 'visible' : 'hidden',
      }"
    >
      <button
        type="button"
        class="add-new-btn btn btn-sm rounded-pill ml-5 mb-4"
      >
        <img
          src="../assets/icons/add.svg"
          alt="add"
          width="20"
          loading="lazy"
        />
        <span class="px-3"> Adicionar Notícia </span>
      </button>
    </router-link>

    <section class="news-section">
      <!-- If there's no news -->
      <div v-if="news.length === 0">
        <h2 class="new-title text-center mt-3">
          Não existem notícias para mostrar
        </h2>
      </div>

      <!-- If there's news -->
      <div v-else v-for="item in news" :key="item.id" class="new mb-5">
        <button
          type="button"
          class="remove-btn btn btn-sm rounded-pill float-right py-1 px-2"
          :style="{
            visibility:
              userInfo.isLogged && userInfo.isAdmin ? 'visible' : 'hidden',
          }"
          @click="removeNew(item.id)"
        >
          <img
            src="../assets/icons/remove.svg"
            alt="remove"
            width="20"
            loading="lazy"
            class="ml-2"
          />
          <span class="px-3">Remover</span>
        </button>

        <div class="row">
          <div class="col-5">
            <img
              :src="item.images[0]"
              alt="imagem da notícia"
              width="410"
              height="250"
              loading="lazy"
              class="new-image"
            />
          </div>

          <div class="col-7">
            <h2 class="new-title text-left mt-3">
              {{ formatTitle(item.title) }}
            </h2>
            <p class="new-text text-left mt-3">
              {{ reduceText(item.body) }}
            </p>
            <p class="new-date text-left mt-4">
              {{ formatDate(item.date) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Load more News Icon animation -->
    <div v-if="numberOfNews < totalNumberOfNews">
      <img
        src="../assets/icons/loading.svg"
        alt="load more"
        width="50"
        loading="lazy"
        class="load-more-icon"
      />
    </div>

    <!-- If there's no more news to be displayed -->
    <div v-else>
      <h2 class="new-title text-center mt-3">
        Não existem mais notícias para mostrar
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
    Sidebar,
    Searchbar,
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
      this.userInfo.isAdmin = usersStore.getLoggedUser().role === "admin";
    }

    // when the user scrolls to the bottom of the page, the number of news to be displayed increases by 5
    window.onscroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        this.loadMoreNews();
      }
    };
  },

  methods: {
    reduceText(text) {
      return text.substring(0, 550) + "...";
    },

    formatTitle(title) {
      return (title.substring(0, 65) + "...").toUpperCase();
    },

    formatDate(date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString("pt-PT");
    },

    loadMoreNews() {
      // wait 1 second before loading more news
      setTimeout(() => {
        this.numberOfNews += 5;
        const newsStore = useNewsStore();
        newsStore.getNews().then((news) => {
          this.news = news.slice(0, this.numberOfNews);
        });
      }, 500);
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
  background-color: $secondary-color;
  color: $primary-color;

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

.remove-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  border: 1px solid $primary-color;
  color: $primary-color;

  &:hover {
    background-color: $tertiary-color;

    & span {
      color: $fourth-color;
    }
  }

  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.new {
  background-color: $secondary-color;
  color: $primary-color;
  padding: 10px;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  min-height: 250px;
}

.new-image {
  border-radius: 20px;
  margin-top: 20px;
}

.new-title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 25px;
}

.new-text {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: justify;
  height: 133px;
}

.new-date {
  font-family: "Panton", sans-serif;
  font-weight: 800;
  font-size: 14px;
  text-align: left;
}

.see-more-btn {
  background-color: $secondary-color;
  color: $primary-color;

  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;

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
