<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Searchbar from "@/components/Searchbar.vue";
import Header from "@/components/Header.vue";
import HomeNews from "@/components/home/HomeNews.vue";
import HomeActivities from "@/components/home/HomeActivities.vue";
import HomeFAQ from "@/components/home/FAQ/HomeFAQ.vue";
import Footer from "@/components/home/Footer.vue";
</script>

<template>
  <Sidebar route="home" />
  <div class="main text-center p-3 px-5">
    <Searchbar route="home" />

    <Header title="DESTAQUES" />

    <section id="news-section">
      <HomeNews />
    </section>
    <section id="activities-section" class="activities-section mx-5 mt-4">
      <div class="activities cards py-5">
        <div v-for="activity in activities">
          <HomeActivities :activity="activity" />
        </div>
      </div>
    </section>
    <section id="citation-section" class="my-4 py-5">
      <div class="citation">
        "A ecologia deve estar inscrita no ADN de tudo o que fazemos diariamente e
        ainda não entrou nos costumes."
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
import { useActivitiesStore } from "@/stores/activities";
export default {
  name: "Home",
  components: {
    Sidebar,
    Searchbar,
    Header,
    HomeNews,
    HomeActivities,
    HomeFAQ,
  },

  data() {
    return { activities: [] };
  },

  created() {
    const activitiesStore = useActivitiesStore();
    activitiesStore.getActivities().then((activities) => {
      this.activities = activities.filter((activity) => {
        return activity.status === "unfinished";
      });
      this.activities = this.activities.slice(0, 3);
    });
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
  background-image: url("@/assets/images/illustration.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin: 0 auto;
  max-width: 1200px;
  padding: 0 1rem;
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
  background-image: url("@/assets/images/illustrationFAQ.png");
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
