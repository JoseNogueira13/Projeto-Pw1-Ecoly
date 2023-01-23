<template>
  <div class="activity mb-5 shadow">
    <div class="float-right py-1 px-2">
      <div class="buttons-activities d-flex flex-column">
        <button
          type="button"
          class="remove-btn btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-2"
          :style="{
            visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
          }"
          @click="removeActivity(activity.id)"
        >
          <img
            src="@/assets/icons/remove.svg"
            alt="remove"
            width="20"
            loading="lazy"
            class="ml-2"
          />
          <span class="px-3">Remover</span>
        </button>
        <button
          type="button"
          class="finish-btn btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-2"
          @click="openModal(activity.initialDate, activity.finalDate)"
          :style="{
            visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
            //show the button only the after final date of the activity
            display:
              activity.finalDate > new Date().toISOString().split('T')[0]
                ? 'block'
                : 'none',
          }"
        >
          <img
            src="@/assets/icons/finish.svg"
            alt="finish"
            width="20"
            loading="lazy"
            class="ml-2"
          />
          <span class="px-3">Finalizar</span>
        </button>
      </div>
    </div>

    <div class="row">
      <router-link :to="{ name: 'ActivitiesDetails', params: { id: activity.id } }">
        <div class="image-container col-5 px-0">
          <img
            :src="activity.images[0]"
            alt="imagem da atividade"
            class="activity-image"
          />
          <div class="seeMore">
            <img src="@/assets/icons/seeMore.svg" alt="seeMoreIcon" />
          </div>
        </div>
      </router-link>
      <div class="activity-info col-7 d-flex flex-column text-left">
        <h2 class="activity-title text-left mt-3">
          <router-link
            :to="{ name: 'ActivitiesDetails', params: { id: activity.id } }"
            class="activity-link"
          >
            {{ activity.title }}
          </router-link>
        </h2>
        <span class="theme text-center">
          {{ themes.name }}
        </span>
        <div class="activity-info-2 d-flex flex-column my-4">
          <p class="activity-text text-left">
            {{ activity.objective }}
          </p>
          <div class="data-begin-activity d-flex flex-column">
            <span class="date-begin">Data de Início</span>
            <span class="date">{{ activity.initialDate }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity",

  props: {
    userInfo: {
      type: Object,
      required: true,
    },

    activity: {
      type: Object,
      required: true,
    },

    themes: {
      type: Object,
      required: true,
    },
  },

  methods: {
    removeActivity(id) {
      // Remove the activity from the activities array of the ActivitiesView
      this.$el.classList.add("removed");

      this.$bvToast.toast("Atividade Apagada com Sucesso", {
        title: "Atividade Apagada",
        variant: "danger",
        solid: true,
      });

      // wait for the animation to finish
      setTimeout(() => {
        this.$emit("removeActivity", id);
      }, 500);
    },

    openModal(initialDate, finalDate) {
      this.$emit("openModal", initialDate, finalDate);
    },

    formatDate(date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString("pt-PT");
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #e4f0e8;

.remove-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  gap: 1.4em;
  border: 1px solid $primary-color;
  color: $primary-color;
  &:hover {
    background-color: $tertiary-color;
  }
  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}

.finish-btn {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  gap: 1.4em;
  background-color: $primary-color;
  color: $fourth-color;
  &:hover {
    background-color: $tertiary-color;
    color: $fourth-color;
  }
  &:disabled {
    background-color: $secondary-color;
    color: $primary-color;
    cursor: not-allowed;
  }
}
.buttons-activities {
  gap: 9em;
}

.activity-image {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 420px;
  height: 260px;
  object-fit: cover;
}

.image-container {
  &:hover {
    cursor: pointer;
  }
  &:hover .activity-image {
    opacity: 0.3;
  }

  &:hover .seeMore {
    opacity: 1;
  }
}

.activity-title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 25px;
}

.activity-link {
  text-decoration: none;
  color: $primary-color;

  &:hover {
    text-decoration: underline;
  }
}

.seeMore {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 30%;
  left: 70%;
}

.activity {
  background-color: $fifth-color;
  color: $primary-color;
  max-width: 1168px;
  margin: 0 auto;
  border-radius: 20px;
  min-height: 50px;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  animation: slideRight 0.5s ease-in-out;
  &:hover {
    transform: scale(1.03) translateY(-5px);
  }
}

.theme {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 18px;
  color: $primary-color;
  background-color: $secondary-color;
  border-radius: 6px;
  padding: 0.1em 0.5em;
  width: 171px;
}
.activity-text {
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 15px;
  text-align: left;
  height: 100px;
}

.date-begin {
  font-family: "Panton", sans-serif;
  font-weight: bold;
  font-size: 13px;
  color: $primary-color;
}

.date {
  font-family: "Panton", sans-serif;
  font-weight: 300;
  font-size: 13px;
  color: $primary-color;
}

.data-begin-activity {
  margin-top: -1.8em;
}

.removed {
  animation: slideLeft 0.5s ease-in-out;
}

@keyframes slideRight {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideLeft {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(-100%);
    opacity: 0;
  }
}
</style>
