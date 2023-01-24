<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import HighlightBadge from "@/components/account/HighlightBadge.vue";
</script>

<template>
  <Sidebar route="account" />
  <div class="main text-center p-3 px-5">
    <Header title="PERFIL" />

    <section class="profile-info-section border mx-5 mt-5 px-2 py-1">
      <div class="row">
        <!-- Profile Image and Highlighted Badge -->
        <div class="col-2 ml-3 my-2 image-container">
          <img
            :src="user.photo"
            alt="Profile Image"
            class="img-fluid rounded-circle profile-image"
          />
          <HighlightBadge
            v-if="user.highlightedBadge"
            :badgeID="user.highlightedBadge"
          />
        </div>
        <!-- Profile Info (name, email, school, course) -->
        <div class="col-8">
          <div class="row mt-2">
            <div class="col-12">
              <h3 class="text-left user-name-info">{{ user.name }}</h3>
            </div>
          </div>
          <div class="row mt-4">
            <div class="col-12">
              <p class="text-left user-email-info">{{ user.email }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <p class="text-left user-school-info">
                {{ userSchool }}
              </p>
            </div>
          </div>
          <div v-if="user.course" class="row">
            <div class="col-12">
              <p class="text-left user-school-info">
                {{ user.course }}
              </p>
            </div>
          </div>
          <div v-if="user.year" class="row">
            <div class="col-12">
              <p class="text-left user-school-info">{{ user.year }} ano</p>
            </div>
          </div>
        </div>
        <!-- Role and Edit Profile Button -->
        <div class="col-2"></div>
      </div>
    </section>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useSchoolsStore } from "@/stores/schools";
export default {
  name: "Account",

  components: { Sidebar, Header, HighlightBadge },

  data() {
    return {
      userID: this.$route.params.id,
      user: { photo: "", highlightedBadge: null },
      userSchool: "",
    };
  },

  async created() {
    const usersStore = useUsersStore();
    const schoolsStore = useSchoolsStore();

    // Manage user
    if (this.userID === "me") {
      if (!usersStore.isUserLogged()) this.$router.push({ name: "Login" });

      const loggedUser = await usersStore.getLoggedUser();
      this.userID = loggedUser.id;
    }

    // if there's no user with that ID, redirect to 404
    const users = await usersStore.getUsers();
    if (!users.some((user) => user.id === this.userID)) {
      this.$router.push({ name: "NotFound" });
    }

    const loggedUser = await usersStore.getLoggedUser();

    if (this.userID === loggedUser.id) {
      this.$router.push({ name: "Account", params: { id: "me" } });
    }

    const currentUser = await usersStore.getUserById(this.userID);
    this.user = currentUser;

    // Manage school
    const school = await schoolsStore.getSchoolById(this.user.schoolID);
    this.userSchool = school.name;
  },

  // if the route changes, update the user
  watch: {
    $route() {
      // reload
      this.$router.go(0);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #e4f0e8;
$fourth-color: #ffffff;
$fifth-color: #18516f;
$sixth-color: #000;
$seventh-color: #c3fecb;

.profile-info-section {
  background-color: $primary-color;
  border-radius: 10px;
}

.image-container {
  position: relative;
  width: 200px;
  height: auto;
}

.profile-image {
  background-color: $secondary-color;
  border: 2px solid $fifth-color;
  width: 100%;
  height: 100%;
}

.user-name-info {
  font-family: "Panton", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: $seventh-color;
}

.user-email-info,
.user-school-info {
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  font-weight: 400;
  color: $seventh-color;
}

.user-school-info {
  font-size: 1.1rem;
}
</style>
