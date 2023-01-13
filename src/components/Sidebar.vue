<template>
  <nav
    :class="{
      sidebar: true,
      expanded: isExpanded,
      reduced: !isExpanded,
      openAnimation: openAnimation,
      closeAnimation: closeAnimation,
    }"
    @mouseover="open"
    @mouseleave="close"
  >
    <div class="top-logo">
      <router-link :to="{ name: 'Home' }">
        <!-- if (isExpanded === true) show -->
        <img
          v-if="showText"
          src="../assets/logo/logo_exp.png"
          alt="home"
          width="180"
          height="60"
          class="mt-2"
        />
        <!-- else show -->
        <img v-else src="../assets/logo/logo.png" alt="home" width="50" height="80" />
      </router-link>
    </div>
    <div class="nav-links">
      <router-link :to="{ name: 'News' }">
        <img
          src="../assets/icons/news.svg"
          alt="News"
          width="50"
          height="50"
          class="route-icon"
          :class="{ 'selected-icon': route === 'news' }"
        />
        <span v-if="showText" :class="{ 'selected-link': route === 'news' }">
          Notícias
        </span>
      </router-link>
      <router-link :to="{ name: 'Activities' }"
        ><img
          src="../assets/icons/activities.svg"
          alt="Activities"
          width="50"
          height="50"
          class="route-icon"
          :class="{ 'selected-icon': route === 'activities' }"
        />
        <span v-if="showText" :class="{ 'selected-link': route === 'activities' }">
          Atividades
        </span>
      </router-link>
      <router-link :to="{ name: 'Dashboard' }"
        ><img
          src="../assets/icons/dashboard.svg"
          alt="Dashboard"
          width="50"
          height="50"
          class="route-icon"
          :class="{ 'selected-icon': route === 'dashboard' }"
        />
        <span v-if="showText" :class="{ 'selected-link': route === 'dashboard' }">
          Dashboard
        </span>
      </router-link>
      <router-link :to="{ name: 'Manage' }"
        ><img
          src="../assets/icons/manage.svg"
          alt="Manage"
          width="50"
          height="50"
          class="route-icon"
          :class="{ 'selected-icon': route === 'manage' }"
        />
        <span v-if="showText" :class="{ 'selected-link': route === 'manage' }">
          Gestão
        </span>
      </router-link>
    </div>

    <div class="bottom-link">
      <router-link
        :to="{
          name: isUserLogged ? 'Account' : 'Authenticate',
        }"
      >
        <img
          src="../assets/icons/account.svg"
          alt="Account"
          width="50"
          height="50"
          :class="{
            'route-icon': true,
            'mt-2': showText,
            'selected-icon': route === 'account' || route === 'authenticate',
          }"
          :style="{
            marginTop: !showText && isUserLogged ? '-23px' : '0',
            marginTop: !showText && !isUserLogged ? '-10px' : '-10px',
          }"
        />
        <span v-if="showText" :class="{ 'selected-link': route === 'account' }">
          {{ isUserLogged ? "Meu Perfil" : "Sign In" }}
        </span>
      </router-link>
      <button
        v-if="showText && isUserLogged"
        class="sign-out-btn"
        @click="signOut"
        :style="{ visibility: showText ? 'visible' : 'hidden' }"
      >
        Sign Out
      </button>
    </div>
  </nav>
</template>

<script>
import { useUsersStore } from "@/stores/users";
export default {
  name: "Sidebar",

  props: {
    route: String,
  },

  data() {
    const currentRoute = this.$route.path;

    const isUserLogged = useUsersStore().isUserLogged();

    return {
      currentRoute,
      showText: false,
      openAnimation: false,
      closeAnimation: false,
      isExpanded: false,
      isUserLogged,
    };
  },

  methods: {
    // Sidebar Animations
    open() {
      if (this.isExpanded) return;

      this.openAnimation = true;
      setTimeout(() => {
        this.openAnimation = false;
        this.isExpanded = true;
        this.showText = true;
      }, 300);
    },

    close() {
      if (!this.isExpanded) return;

      if (this.openAnimation) {
        setTimeout(() => {
          this.close();
        }, 300);
        return;
      }

      this.closeAnimation = true;
      this.showText = false;
      setTimeout(() => {
        this.closeAnimation = false;
        this.isExpanded = false;
        this.showText = false;
      }, 300);
    },

    signOut() {
      useUsersStore().signOut();
      this.$router.go("/");
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;

.sidebar {
  background-color: $primary-color;
  color: $secondary-color;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  text-align: center;
  font-size: 1.7rem;
  font-weight: 300;

  transition: color 0.1s ease-in-out;

  a {
    text-decoration: none;
    color: $secondary-color;
    display: block;
    padding: 16px;
    transition: 0.3s;
  }
}

.expanded {
  width: 250px;
}

.reduced {
  width: 80px;
}

.top-logo {
  height: 10%;
}

.nav-links {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 80%;
}

.bottom-link {
  height: 10%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.route-icon {
  margin-right: 10px;
  float: left;
}

.selected-link {
  color: $tertiary-color;
}

.selected-icon {
  filter: invert(0.5) sepia(1) saturate(3) hue-rotate(100deg);
}

.sign-out-btn {
  background-color: transparent;
  color: $secondary-color;
  opacity: 40%;
  border: none;
  font-size: 1.2rem;
  top: -40px;
  position: relative;
  align-self: flex-end;
  margin-right: 53px;

  &:hover {
    opacity: 70%;
  }
  transition: color 0.5s ease-in-out;
}

.openAnimation {
  animation: slideRight 0.3s ease-in-out;
}

.closeAnimation {
  animation: slideLeft 0.3s ease-in-out;
  width: 80px;
}

@keyframes slideLeft {
  0% {
    width: 250px;
  }
  100% {
    width: 80px;
  }
}

@keyframes slideRight {
  0% {
    width: 80px;
  }
  100% {
    width: 250px;
  }
}
</style>
