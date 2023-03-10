<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="news" />
  <div class="main text-center p-3 px-5">
    <div class="img-slider row">
      <div class="row justify-content-center align-items-center">
        <img
          v-for="(image, index) in newDetails.images"
          :key="index"
          :src="image.includes('./data/images') ? '../' + image : image"
          class="addNewImg img-fluid my-3 mx-3 rounded-lg shadow ml-4"
          alt="Imagem da Notícia"
        />
      </div>
    </div>

    <div class="new-content mt-5">
      <header>
        <div class="row">
          <div class="col-8">
            <h2 class="text-left new-title">{{ newDetails.title }}</h2>
          </div>
          <div class="col-4 mt-3">
            <h3 class="text-right new-date">
              {{ formatDate(newDetails.date) }}
            </h3>
            <h4 class="text-right new-author">{{ authorName }}</h4>
          </div>
        </div>
      </header>
      <main class="mt-5">
        <p class="text-left new-text">{{ newDetails.body }}</p>
      </main>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/news";
import { useUsersStore } from "@/stores/users";
export default {
  name: "NewsDetailView",

  components: { Sidebar },

  data() {
    return {
      newDetails: {},
      authorName: "Teste",
    };
  },

  async created() {
    window.scrollTo(0, 0);

    // new id from the url
    const id = this.$route.params.id;

    const newDetail = await useNewsStore().getNewById(id);

    if (newDetail) this.newDetails = newDetail;
    else this.$router.push({ name: "NotFound" });

    // get author name
    const author = await useUsersStore().getUserById(newDetail.authorID);
    this.authorName = author.name;
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-PT");
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;

.new-title {
  color: $primary-color;
  font-family: "Alkes", sans-serif;
  font-weight: 800;
  font-size: 2.5rem;
}

.new-date {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 1rem;
}

.new-author {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
}

.new-text {
  color: $primary-color;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
}

.addNewImg {
  width: 340px;
  height: 200px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}

@media (max-width: 1280px) {
  .addNewImg {
    width: 300px;
    height: 180px;
  }
}

@media (max-width: 1160px) {
  .addNewImg {
    width: 280px;
    height: 170px;
  }
}

@media (max-width: 1100px) {
  .addNewImg {
    width: 260px;
    height: 160px;
  }
}

@media (max-width: 1040px) {
  .addNewImg {
    width: 240px;
    height: 150px;
  }
}

@media (max-width: 980px) {
  .addNewImg {
    width: 220px;
    height: 140px;
  }
}

@media (max-width: 920px) {
  .addNewImg {
    width: 200px;
    height: 130px;
  }
}

@media (max-width: 860px) {
  .addNewImg {
    width: 180px;
    height: 120px;
  }
}

@media (max-width: 800px) {
  .addNewImg {
    width: 160px;
    height: 110px;
  }
}

@media (max-width: 740px) {
  .addNewImg {
    width: 140px;
    height: 100px;
  }
}
</style>
