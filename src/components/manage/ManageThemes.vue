<script setup>
import ManageSection from "./ManageSection.vue";
</script>

<template>
  <div class="mt-5">
    <ManageSection
      title="TEMAS"
      description="adicionar temas para o plano de atividades"
    />

    <section
      class="row mt-5"
      :class="themes.length < 4 ? 'justify-content-center' : ''"
    >
      <!-- Theme -->
      <div class="col-xl-3 col-lg-4" v-for="theme in themes" :key="theme.id">
        <h2
          class="theme mt-2 py-2"
          @mouseover="theme.displayDelete = true"
          @mouseout="theme.displayDelete = false"
          @click="disableTheme(theme.id)"
        >
          {{ theme.displayDelete ? "X" : theme.name }}
        </h2>
      </div>

      <!-- Add New Theme Button -->
      <div class="col-xl-3 col-lg-4">
        <h2 class="theme mt-2 py-2" @click="$bvModal.show('add-theme-modal')">
          <img src="@/assets/icons/add.svg" alt="add theme" />
        </h2>
      </div>
    </section>
  </div>

  <b-modal id="add-theme-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title"> Adicionar Tema </span>
    </template>
    <div class="d-block text-center">
      <input
        type="text"
        class="form-control new-theme-input"
        placeholder="Novo Tema"
        aria-label="Novo Tema"
        v-model="newTheme"
      />
    </div>
    <b-button
      class="add-theme-modal-btn mt-3"
      block
      @click="addTheme(newTheme)"
      :disabled="newTheme === '' || newTheme.trim().length < 3"
      >Adicionar</b-button
    >
  </b-modal>
</template>

<script>
import { useThemesStore } from "@/stores/themes";
export default {
  name: "ManageThemes",

  components: { ManageSection },

  data() {
    return {
      themes: [], // id, name, status (active, inactive)
      themesStore: useThemesStore(),
      newTheme: "",
    };
  },

  methods: {
    disableTheme(themeID) {
      this.themesStore.disableTheme(themeID);
      // remove theme from list
      this.themes = this.themes.filter((theme) => theme.id !== themeID);
    },

    async addTheme(themeName) {
      this.$bvModal.hide("add-theme-modal");
      if (this.themes.some((theme) => theme.name === themeName)) return;

      const theme = await this.themesStore.addTheme(themeName);
      this.themes.push(theme);
    },
  },

  async created() {
    const themes = await this.themesStore.getActiveThemes();

    const displayThemes = themes.map((theme) => {
      return { ...theme, displayDelete: false };
    });

    this.themes = displayThemes;
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
$seventh-color: #57b894;

.row {
  max-width: 900px;
  margin: 0 auto;
}

.theme {
  background-color: $primary-color;
  color: $fourth-color;
  display: inline-block;
  border-radius: 25px;
  max-width: 200px;
  width: 90%;
  font-family: "Panton", sans-serif;
  font-size: 15px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: $fifth-color;
    cursor: pointer;
  }
}

.modal-title {
  font-family: "Panton", sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 27px;
}

.new-theme-input {
  border: 2px solid $seventh-color;
  border-radius: 10px;
  padding: 5px 15px;
  font-family: "Panton", sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 17px;

  &:focus {
    border: 2px solid $seventh-color;
    box-shadow: 0 0 0 1px $secondary-color;
  }
}

.add-theme-modal-btn {
  background-color: $primary-color;
  color: $fourth-color;
  font-family: "Panton", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  border-radius: 10px;
  border: none;
  width: 40%;
  margin: 0 auto;
  padding: 5px 0;

  &:hover {
    background-color: $fifth-color;
  }
}
</style>
