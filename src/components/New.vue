<template>
  <div class="new mb-5 shadow">
    <button
      type="button"
      class="remove-btn btn btn-sm rounded-pill float-right py-1 px-2 mt-2 mr-2"
      :style="{
        visibility: userInfo.isLogged && userInfo.isAdmin ? 'visible' : 'hidden',
      }"
      @click="removeNew(item.id)"
    >
      <img src="../assets/icons/remove.svg" alt="remove" width="20" class="ml-2" />
      <span class="px-3">Remover</span>
    </button>

    <div class="row">
      <router-link :to="{ name: 'NewsDetails', params: { id: item.id } }">
        <div class="image-container col-5 px-0">
          <img :src="item.images[0]" alt="imagem da notícia" class="new-image" />
          <div class="seeMore">
            <img src="@/assets/icons/seeMore.svg" alt="seeMoreIcon" />
          </div>
        </div>
      </router-link>

      <div class="col-7">
        <h2 class="new-title text-left mt-3">
          <router-link
            :to="{ name: 'NewsDetails', params: { id: item.id } }"
            class="new-link"
          >
            {{ formatTitle(item.title) }}
          </router-link>
        </h2>

        <p class="new-text text-left mt-3">
          {{ reduceText(item.body) }}
        </p>
        <p class="new-date text-left">
          {{ formatDate(item.date) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "New",

  // id, isLogged, isAdmin
  props: {
    userInfo: {
      type: Object,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },

  methods: {
    reduceText(text) {
      return text.substring(0, 400) + "...";
    },

    formatTitle(title) {
      return (title.substring(0, 65) + "...").toUpperCase();
    },

    formatDate(date) {
      const newDate = new Date(date);
      return newDate.toLocaleDateString("pt-PT");
    },

    removeNew(id) {
      this.$el.classList.add("removed");

      this.$bvToast.toast("Notícia Apagada com Sucesso", {
        title: "Notícia Apagada",
        variant: "danger",
        solid: true,
      });

      // wait for the animation to finish
      setTimeout(() => {
        this.$emit("removeNew", id);
      }, 500);
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

.new {
  background-color: $fifth-color;
  color: $primary-color;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 20px;
  min-height: 250px;
  transform: scale(1);
  transition: transform 0.3s ease-in-out;
  animation: slideRight 0.5s ease-in-out;

  &:hover {
    transform: scale(1.03) translateY(-5px);
  }
}

.new-image {
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  width: 440px;
  height: 250px;
  object-fit: cover;
}

.new-title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 25px;
}

.new-link {
  text-decoration: none;
  color: $primary-color;

  &:hover {
    text-decoration: underline;
  }
}

.new-text {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 14px;
  text-align: justify;
  height: 100px;
}

.new-date {
  font-family: "Panton", sans-serif;
  font-weight: 800;
  font-size: 14px;
  text-align: left;
  position: absolute;
  bottom: 0;
}

.removed {
  animation: slideLeft 0.5s ease-in-out;
}

.image-container {
  &:hover {
    cursor: pointer;
  }
  &:hover .new-image {
    opacity: 0.3;
  }

  &:hover .seeMore {
    opacity: 1;
  }
}

.seeMore {
  transition: 0.5s ease;
  opacity: 0;
  position: absolute;
  top: 30%;
  left: 70%;
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

@media (max-width: 1350px) {
  .new {
    max-width: 1000px;
  }

  .new-image {
    width: 400px;
  }

  .col-7 {
    padding-left: 50px;
  }

  // reduce all font size
  .new-title {
    font-size: 20px;
  }

  .new-text {
    font-size: 12px;
    height: 80px;
  }
}

@media (max-width: 1180px) {
  .new {
    max-width: 800px;
  }

  .new-image {
    width: 300px;
  }

  .col-7 {
    padding-left: 40px;
  }

  .new-title {
    font-size: 18px;
  }

  .new-text {
    font-size: 11px;
    height: 60px;
  }

  .new-date {
    font-size: 12px;
  }

  .remove-btn {
    font-size: 11px;
  }
}

@media (max-width: 960px) {
  .remove-btn {
    border: none;
  }

  .remove-btn span {
    display: none;
  }
}

@media (max-width: 870px) {
  // reduce image size and card
  .new-image {
    width: 250px;
    height: 300px;
  }

  .new {
    max-width: 600px;
  }
}

@media (max-width: 739px) {
  .new-image {
    width: 100%;
    height: 300px;
  }

  .col-7 {
    padding-left: 0;
  }

  .new {
    max-width: 100%;
    border-radius: 20px 20px 0 0;
  }
}
</style>
