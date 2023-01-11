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
      <div class="col-5 px-0">
        <img :src="item.images[0]" alt="imagem da notícia" class="new-image" />
      </div>

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
      // Remove the new from the news array of the NewsView
      this.$emit("removeNew", id);
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

  // place it in the bottom of the div
  position: absolute;
  bottom: 0;
}
</style>
