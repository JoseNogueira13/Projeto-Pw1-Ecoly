<script setup>
import Arrow from "@/components/Arrow.vue";
</script>

<template>
  <div class="news-card shadow">
    <div v-if="news.length > 0" class="row">
      <div class="col-1">
        <Arrow
          :options="{ direction: 'left', isDisabled: slide === 0 }"
          @click="slide--"
          :disabled="slide === 0"
        />
      </div>
      <!-- Image -->
      <div class="col-4 img-container d-none d-lg-block">
        <img :src="news[slide].images[0]" alt="Imagem da Notícia em Destaque" />
      </div>
      <!-- Content -->
      <div class="col-10 col-lg-6">
        <div class="row-3" style="height: 64px">
          <h1 class="mt-5 new-title">
            {{ formatTitle(news[slide].title) }}
          </h1>
        </div>
        <div class="row-6" style="height: 136px">
          <p class="mt-3 text-left new-text">
            {{ reduceText(news[slide].body) }}
          </p>
        </div>
        <div class="row-3">
          <div class="row">
            <div class="col-6 text-left mt-3">
              <p>{{ formatDate(news[slide].date) }}</p>
            </div>
            <div class="col-6 text-right mt-3">
              <router-link
                class="see-details-btn py-2 px-3"
                :to="{ name: 'NewsDetails', params: { id: news[slide].id } }"
              >
                Ver Mais
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="col-1">
        <Arrow
          :options="{ direction: 'right', isDisabled: slide === news.length - 1 }"
          @click="slide++"
          :disabled="slide === news.length - 1"
        />
      </div>
    </div>
    <div v-else class="row">
      <div class="col-12 pt-5">
        <h1
          class="mt-5 new-title text-center pt-5"
          style="font-size: 30px; font-weight: 400"
        >
          Não existem notícias para mostrar
        </h1>
      </div>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/news";
export default {
  name: "HomeNews",

  data() {
    return {
      slide: 0,
      news: [
        {
          id: 1,
          title: "Notícias",
          images: ["./data/images/praia.png"],
          body: "Carregando Notícias",
        },
      ],
    };
  },

  methods: {
    reduceText(text) {
      return text.substring(0, 250) + "...";
    },

    formatTitle(title) {
      return (title.substring(0, 48) + "...").toUpperCase();
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-PT");
    },

    goToNewsDetails(id) {
      this.$router.push({ name: "NewsDetails", params: { id: id } });
    },
  },

  async created() {
    const newsStore = useNewsStore();
    const news = await newsStore.getNews();

    this.news = news.slice(0, 5);
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #ffffff;
$fourth-color: #18516f;

.news-card {
  background-color: $secondary-color;
  width: 900px;
  height: 350px;
  margin: 0 auto;
  border-radius: 25px;
  animation: slide 1s ease-in-out;
}

.img-container {
  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 15px;
    margin-top: 50px;
  }
}

.new-title {
  font-family: "Alkes", sans-serif;
  font-size: 23px;
  font-weight: 700;

  color: $primary-color;
  text-align: left;
}

.new-text {
  font-family: "Panton", sans-serif;
  font-size: 16px;
  font-weight: 400;
  color: $primary-color;
}

.see-details-btn {
  background-color: $primary-color;
  color: $tertiary-color;
  border-radius: 15px;
  border: none;
  width: 100px;
  height: 40px;
  font-family: "Panton", sans-serif;
  font-size: 16px;
  font-weight: 400;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: $fourth-color;
    text-decoration: none;
  }
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateY(50%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1090px) {
  .news-card {
    width: 800px;
  }
}

@media (max-width: 950px) {
  .news-card {
    width: 100%;
  }
}
</style>
