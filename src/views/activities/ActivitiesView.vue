<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Searchbar from "@/components/Searchbar.vue";

</script>

<template>
  <Sidebar route="activities" />
  <div class="main text-center p-3 px-5">
    <Searchbar route="activities" />

    <header class="mx-5 mt-4 mb-4">
      <h1 class="title text-left mt-3">ATIVIDADES</h1>
      <div class="border border-2 border-dark mt-3"></div>
    </header>
  
    <!-- route for the add activity form -->
    <router-link 
    :to="{name: 'ActivitiesCreate'}"
    :style="{
      visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
    }">
      <button type="button" class="add-new-btn btn btn-sm rounded-pill ml-5 mb-4">
        <img src="@/assets/icons/add.svg" alt="add" width="20" loading="lazy" />
        <span class="px-3"> Adicionar Atividade </span>
      </button>
    </router-link>

    <section class="activities-section">
      <div>
        <Activity
          v-for="activity in activities"
          :key="activity.id"
          :item="activity"
          :userInfo="userInfo"
          @removeActivity="removeActivity"
        />
      </div>
    </section>


    <!-- Load More Activities if there is more activities to be displayed -->
    <div v-if="numberOfActivities < totalNumberOfActivities">
     <!-- Icon animation loader -->
      <img
        src="@/assets/icons/loading.svg"
        alt="load more"
        width="50"
        loading="lazy"
        class="load-more-icon"
      />
    </div>
  
    <!-- if there´s no more activities to be displayed -->
    <div v-else>
      <h2 class="warning-text text-center mt-3">
        {{
          activities.length > 0 // if there's no more activities to load
            ? "Não existem mais atividades para mostrar" // if there's no activities at all
            : "Não existem atividades para mostrar"
        }}
      </h2>
    </div>
  </div>
</template>

<script>
import { useActivitiesStore } from "@/stores/activities";
import { useUsersStore } from "@/stores/users";
import Activity from "../../components/Activity.vue";

export default {
  name: "Activities",
  components: {
    Sidebar,
    Searchbar,
    Activity
},

  data() {
    return {
      activities: [],
      userInfo : {isLogged: false, isAdmin: false},
      numberOfActivities : 3,
      totalNumberOfActivities :0
    }
  },

  // load the stores when the component his created
  created () {
    const activitiesStore = useActivitiesStore();
    const usersStore = useUsersStore();

    // load activities
    activitiesStore.getActivities().then((activities) =>{
      this.totalNumberOfActivities = activities.length;
      this.activities = activities.slice(0, this.numberOfActivities)
    });

    // Load User Info
    this.userInfo.isLogged = usersStore.isUserLogged();
    if(this.userInfo.isLogged){
      usersStore.getLoggedUser().then((user) => {
        this.userInfo.isAdmin = user.role === "admin";
      });
    }

     // when the user scrolls to the bottom of the page, the number of news to be displayed increases by 5
     window.addEventListener("scroll", this.loadMoreActivities);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.loadMoreActivities);
  },


  methods: {
    loadMoreActivities() {
      const windowHeight = window.innerHeight + document.documentElement.scrollTop;
      const documentHeight = document.documentElement.offsetHeight;
      if (windowHeight === documentHeight) {
        // wait half second before loading more activities
        setTimeout(() => {
          this.numberOfActivities += 3;
          const activitiesStore = useActivitiesStore();
          activitiesStore.getActivities().then((activities) => {
            this.activities = activities.slice(0, this.numberOfActivities);
          });
        }, 500);
      }
    },

    removeActivity(id) {
      const activitiesStore = useActivitiesStore();
      activitiesStore.removeActivity(id);
      this.activities = this.activities.filter((activity) => activity.id !== id);
      this.totalNumberOfActivities -= 1;
      if (this.numberOfActivities > this.totalNumberOfActivities) {
        this.numberOfActivities = this.totalNumberOfActivities;
      }
      this.activities = this.activities.slice(0, this.numberOfActivities);
    },
  
  },

};
</script>

<style lang="scss" scoped>

</style>
