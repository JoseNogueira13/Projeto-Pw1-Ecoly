<script setup>
import Sidebar from "@/components/Sidebar.vue";
import Header from "@/components/Header.vue";
import HighlightBadge from "@/components/account/HighlightBadge.vue";
</script>

<template>
  <Sidebar route="account" />
  <div class="main text-center p-3 px-5">
    <Header title="PERFIL" />

    <!-- Profile Information -->
    <section class="profile-info-section mx-5 mt-5 px-2 py-1">
      <div class="row">
        <!-- Profile Image and Highlighted Badge -->
        <div class="col-2 my-2 pl-4 image-container">
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
        <div class="col-5 mr-4">
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
              <p class="text-left user-school-info">{{ userSchool }}</p>
            </div>
          </div>
          <div v-if="user.course && user.year" class="row">
            <div class="col-12">
              <p class="text-left user-school-info">
                {{ user.course }} - {{ user.year }} ano
              </p>
            </div>
          </div>
        </div>
        <!-- Role and Edit Profile Button -->
        <div class="ml-5 col-xl-4 col-3 mt-2">
          <!-- Role Icon -->
          <div class="row">
            <div class="col-12 text-right">
              <img
                v-if="user.role === 'admin'"
                src="@/assets/icons/admin.svg"
                alt="Icon de Perfil"
                class="profile-icon"
              />
              <img
                v-else
                src="@/assets/icons/profile.svg"
                alt="Icon de Perfil"
                class="profile-icon"
              />
            </div>
          </div>
          <!-- Role Title -->
          <div v-if="user.role" class="row">
            <div class="col-12 text-right">
              <p
                class="user-role-info mt-1"
                :style="{ marginRight: user.role === 'admin' ? '0' : '1rem' }"
              >
                {{ getRoleName(user.role) }}
              </p>
            </div>
          </div>
          <!-- Edit Profile Button -->
          <div class="row">
            <div class="col-12 text-right">
              <button class="btn edit-profile-btn px-4 py-0 mt-2">
                Editar Perfil
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- User Seeds -->
    <section class="profile-seeds-section border mx-5 mt-5 py-4">
      <div class="row d-flex align-items-center justify-content-center">
        <div class="col-6">
          <h2 class="seeds-title text-left ml-5">Sementes</h2>
        </div>
        <div class="col-3">
          <span class="seeds-info"> Mensal: {{ monthlySeeds }} </span>
          <img
            src="@/assets/icons/seed.svg"
            alt="Ícone de Semente"
            class="ml-1 mb-2"
          />
        </div>
        <div class="col-3">
          <span class="seeds-info"> Total: {{ totalSeeds }} </span>
          <img
            src="@/assets/icons/seed.svg"
            alt="Ícone de Semente"
            class="ml-1 mb-2"
          />
        </div>
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
      monthlySeeds: 0,
      totalSeeds: 0,
    };
  },

  methods: {
    getRoleName(role) {
      if (role === "admin") return "Administrador";
      if (role === "unsigned") return "Sem Cargo";

      // convert role to lowercase and capitalize first letter
      return role.charAt(0).toUpperCase() + role.slice(1);
    },
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

    // Manage seeds
    const totalSeeds = await usersStore.getSeeds(this.userID);
    const monthlySeeds = await usersStore.getSeeds(this.userID, true);
    this.totalSeeds = totalSeeds;
    this.monthlySeeds = monthlySeeds;
  },

  // if the route changes, update the user
  watch: {
    $route() {
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

.profile-info-section,
.profile-seeds-section {
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

.profile-icon {
  width: 100px;
  height: 100px;

  margin-right: 12px;
}

.user-role-info {
  font-family: "Panton", sans-serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: $seventh-color;
}

.edit-profile-btn {
  border: 2px solid $seventh-color;
  border-radius: 10px;
  font-family: "Panton", sans-serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: $seventh-color;
  margin-right: -13px;

  &:hover {
    background-color: $seventh-color;
    color: $primary-color;
  }
}

.seeds-title {
  font-family: "Alkes", sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: $seventh-color;
}

.seeds-info {
  font-family: "Panton", sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
  color: $seventh-color;
}
</style>
