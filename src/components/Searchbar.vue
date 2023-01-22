<template>
  <div class="searchbar">
    <b-input-group class="mt-4">
      <template #prepend>
        <b-input-group-text class="searchbar-input searchbar-icon">
          <strong>
            <img src="../assets/icons/search.svg" alt="search" width="20" /> </strong
        ></b-input-group-text>
      </template>
      <b-form-input
        class="searchbar-input"
        v-model="search"
        placeholder="Search"
        type="search"
        style="width: 400px"
      ></b-form-input>
    </b-input-group>
  </div>

  <div
    class="search-results"
    :style="{ visibility: showModal ? 'visible' : 'hidden' }"
  >
    <div v-for="item in data" :key="item.id" class="mb-3">
      <div class="row">
        <div class="col-9">
          <router-link
            :to="{
              name: item.type === 'new' ? 'NewsDetails' : 'ActivitiesDetails',
              params: { id: item.id },
            }"
          >
            {{ item.title }}
          </router-link>
        </div>
        <div class="col-3">
          <span>
            {{ item.type }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useNewsStore } from "@/stores/news";
import { useActivitiesStore } from "@/stores/activities";
export default {
  name: "Searchbar",

  props: {
    route: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      search: "",
      data: [],
      newsStore: useNewsStore(),
      activitiesStore: useActivitiesStore(),
      showModal: false,
    };
  },

  methods: {
    showResults() {
      console.table(this.data);

      this.showModal = true;
    },
  },

  computed: {
    async searchNews() {
      const data = await this.newsStore.searchNews(this.search);
      this.data = [...this.data, ...data];
    },

    async searchActivities() {
      const data = await this.activitiesStore.searchActivities(this.search);
      this.data = [...this.data, ...data];
    },

    // search only activities with status "unfinished"
  },

  watch: {
    search: async function () {
      // if the search input has less than 3 characters, don't search
      if (this.search.length < 3) {
        this.showModal = false;
        return;
      }

      this.data = [];
      const route = this.route;

      if (route === "news" || route === "home") await this.searchNews;
      if (route === "activities" || route === "home") await this.searchActivities;

      if (this.data.length === 0) {
        this.showModal = false;
        return;
      }

      this.showResults();
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #ffffff;

.searchbar {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  z-index: 1001;
}

.searchbar-input {
  background-color: $primary-color;
  color: $secondary-color;
  border: none;
  border-radius: 13px;

  &:focus {
    box-shadow: none;
    background-color: $primary-color;
    color: $secondary-color;
  }
}

.searchbar-icon {
  background-color: $primary-color;
  color: $secondary-color;
}

.search-results {
  position: fixed;
  top: 10;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
  overflow: auto;
  padding-left: 150px;
  padding-right: 50px;
  padding-top: 50px;

  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  .row {
    background-color: $primary-color;
    border-radius: 13px;
    padding: 10px;
    margin-bottom: 23px;
  }

  .col-9 {
    color: $secondary-color;
    font-family: "Panton", sans-serif;
    font-weight: 600;
    font-size: 20px;
  }

  .col-3 {
    color: $secondary-color;
    text-align: right;

    font-family: "Panton", sans-serif;
    font-weight: 600;
    font-size: 20px;
  }

  a {
    color: $secondary-color;
  }

  a:hover {
    color: $tertiary-color;
  }
}

@media (max-width: 620px) {
  // stop the input from moving to the next line
  .searchbar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .searchbar-input {
    border-radius: 0;
  }

  .searchbar-icon {
    display: none;
  }
}
</style>
