<script setup>
import Sidebar from "../components/Sidebar.vue";
import Searchbar from "../components/Searchbar.vue";
import HomeNews from "../components/HomeNews.vue";
import HomeActivities from "../components/HomeActivities.vue";
import HomeFAQ from "../components/HomeFAQ.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  <Sidebar route="home" />
  <div class="main text-center p-3 px-5">
    <Searchbar route="home" />

    <header class="mx-5 mt-4 mb-5">
      <h1 class="title text-left mt-3">DESTAQUES</h1>
      <div class="border border-2 border-dark mt-3"></div>
    </header>

    <section id="news-section">
      <HomeNews />
    </section>
    <section id="activities-section" class="activities-section mx-5 mt-4">
      <div class="activities">
        <HomeActivities />
      </div>
    </section>
    <section id="citation-section" class="my-4 py-5">
      <div class="citation">
        "A ecologia deve estar inscrita no ADN de tudo o que fazemos diariamente
        e ainda não entrou nos costumes."
        <span class="author">Yann Arthus Bertrand</span>
      </div>
    </section>
  </div>
  <div class="main text-center">
    <section id="FAQ-section" class="FAQ-section py-2">
      <div class="faq">
        <HomeFAQ />
      </div>
    </section>
    <Footer />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    Sidebar,
    Searchbar,
    HomeNews,
    HomeActivities,
    HomeFAQ,
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #ffffff;

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.activities {
  width: 65%;
  max-width: 905px;
  margin: 0 auto;
  min-height: 400px;
  background-image: url("../assets/images/illustration.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.citation {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 27px;
  color: $primary-color;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.author {
  display: block;
  font-family: "Panton", sans-serif;
  font-weight: 300;
  font-size: 15px;
  color: $primary-color;
  text-align: center;
  margin-top: 10px;
}

.citation,
.author {
  text-align: left;
}

.FAQ-section {
  background-color: $secondary-color;
  background-image: url("../assets/images/illustrationFAQ.png");
  background-repeat: no-repeat;
  background-position: center;
  background-position-y: -170px;
}

.faq {
  width: 65%;
  max-width: 905px;
  margin: 0 auto;
  min-height: 200px;
}

.footer {
  background-color: $primary-color;
  color: $tertiary-color;
  padding: 20px;
  text-align: center;
  font-size: 12px;
  font-family: "Panton", sans-serif;
  font-weight: 300;
}
</style>
