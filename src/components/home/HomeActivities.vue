<template>
  <b-card
    :key="activity.id"
    :img-src="activity.images[0]"
    img-alt="Image"
    img-top
    tag="article"
    style="max-width: 20rem"
    class="activity-card mb-2 p-3"
  >
    <h4 class="title">{{ activity.title.toUpperCase() }}</h4>
    <span class="theme p-1">{{ theme }}</span>
    <b-card-text class="date mt-5 pt-4">
      CALENDARIZAÇÃO
      <span class="date-value"
        >{{ formatDate(activity.initialDate) }} -
        {{ formatDate(activity.finalDate) }}</span
      >
    </b-card-text>

    <b-button class="see-more-btn mt-4" href="#">Ver Mais</b-button>
  </b-card>
</template>

<script>
import { useThemesStore } from "@/stores/themes";
export default {
  name: "HomeActivities",

  props: {
    activity: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      theme: "",
    };
  },

  methods: {
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString("pt-PT", options);
    },
  },

  created() {
    const themes = useThemesStore();

    themes.getThemeById(this.activity.themeID).then((theme) => {
      this.theme = theme.name;
    });
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary: #3fc380;
$fourth: #18516f;

.activity-card {
  background-color: $secondary-color;
  border: none;
  border-radius: 15px;
  min-height: 450px;

  animation: slide 2s ease-in-out;
}

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 20px;
  color: $primary-color;
  text-align: left;
  margin-left: -17px;
}

.theme {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 12px;
  background-color: $primary-color;
  color: #aedcc0;
  border-radius: 10px;
  position: absolute;
  left: 20px;
  min-width: 50px;
}

.date {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: $primary-color;
  position: absolute;
  top: 63%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.date-value {
  display: block;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 12px;
  color: $primary-color;
}

.see-more-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 15px;
  color: $secondary-color;
  background-color: $primary-color;
  border: none;
  border-radius: 15px;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, -50%);

  &:hover {
    background-color: $fourth;
  }
}

@keyframes slide {
  0% {
    opacity: 0;
    transform: translateX(-100px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
