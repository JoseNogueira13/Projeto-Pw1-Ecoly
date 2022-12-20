<template>
  <div class="homeNews p-3 px-5">
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="transparent"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide
        v-for="item in news"
        :key="item.id"
        :img-src="item.images[0]"
      >
        <article>
          <h1 class="title">
            {{ item.title.toUpperCase() }}
          </h1>
          <p class="text my-4">
            {{ reduceText(item.body) }}
          </p>
          <div class="bottom-elements">
            <span class="date-created">{{ formatDate(item.date) }}</span>
            <b-button variant="primary" class="read-more-btn btn btn-primary">
              Ler mais
            </b-button>
          </div>
        </article>
      </b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/news";
export default {
  name: "HomeNews",

  data() {
    return {
      slide: 0,
      sliding: null,
      news: [],
    };
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true;
    },
    onSlideEnd(slide) {
      this.sliding = false;
    },

    reduceText(text) {
      return text.substring(0, 200) + "...";
    },

    formatDate(date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString("pt-PT");
    },
  },

  created() {
    const newsStore = useNewsStore();
    newsStore.getNews().then((news) => {
      // assign 5 news to the news array
      this.news = news.slice(0, 5);
    });
  },
};
</script>

<style lang="scss" scoped>
$new-btn: #343e3d;
$new-bg: #aedcc0;
$new-selected-color: #3fc380;
$new-hover-color: #18516f;

.homeNews {
  max-width: 1000px;
  margin: 0 auto;
}

article {
  // use $new-bg as background but with 50% opacity
  background-color: rgba($new-bg, 0.95);
  padding: 1rem;
  border-radius: 10px;
}

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  color: $new-btn;
  font-size: 1.5rem;
}

.text {
  font-family: "Panton", sans-serif;
  font-weight: normal;
  color: $new-btn;
}

.bottom-elements {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.date-created {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  color: $new-btn;
  font-size: 0.8rem;
}

.read-more-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  color: #aedcc0;
  background-color: $new-btn;
  border: none;
  border-radius: 15px;

  &:hover {
    background-color: $new-hover-color;
  }
}
</style>
