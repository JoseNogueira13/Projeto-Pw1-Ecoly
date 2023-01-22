<script setup>
import SchoolsTable from "./SchoolsTable.vue";
</script>

<template>
  <div class="row">
    <div class="col-xl-3 col-md-5">
      <b-input-group class="mt-4">
        <template #prepend>
          <b-input-group-text class="filter-input">
            <img src="@/assets/icons/search.svg" alt="search" width="20" />
          </b-input-group-text>
        </template>
        <b-form-input
          class="filter-input"
          v-model="filterInput"
          placeholder="Filtrar por Nome"
          type="search"
          @input="filterSchools"
        ></b-form-input>
      </b-input-group>
    </div>
    <div class="col-lg-9 col-md-7 d-flex justify-content-end align-items-center mt-4">
      <b-form-input
        class="add-school-input mr-4"
        placeholder="Nova Escola"
        v-model="newSchoolName"
      ></b-form-input>
      <b-button
        class="py-1 px-3 add-school-btn"
        size="lg"
        :disabled="!isShoolNameValid"
        @click="addNewSchool"
      >
        <img class="mb-1" src="@/assets/icons/add.svg" alt="add" width="20" />
        <span class="ml-2">Adicionar Escola</span>
      </b-button>
    </div>
  </div>
  <div class="row px-5">
    <SchoolsTable :schools="filterInput.length > 0 ? filteredSchools : schools" />
  </div>
</template>

<script>
import { useSchoolsStore } from "@/stores/schools";
export default {
  name: "ManageSchools",
  components: { SchoolsTable },

  data() {
    return {
      filterInput: "",
      newSchoolName: "",
      schools: [],
      filteredSchools: [],
    };
  },

  computed: {
    filterSchools() {
      this.filteredSchools = this.schools.filter((school) => {
        return school.name.toLowerCase().includes(this.filterInput.toLowerCase());
      });
    },

    isShoolNameValid() {
      return !(
        this.newSchoolName.length < 4 ||
        this.schools.some(
          (school) => school.name.toLowerCase() === this.newSchoolName.toLowerCase()
        )
      );
    },
  },

  methods: {
    addNewSchool() {
      const schoolsStore = useSchoolsStore();
      schoolsStore.addSchool(this.newSchoolName);
      this.newSchoolName = "";

      schoolsStore.getSchools().then((schools) => {
        this.schools = schools;
      });
    },
  },

  async created() {
    const schoolsStore = useSchoolsStore();
    const schools = await schoolsStore.getSchools();
    this.schools = schools;
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

.filter-input {
  background-color: $fourth-color;
  color: $primary-color;
  border: none;
  border-radius: 13px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 17px;

  &:focus {
    box-shadow: none;
  }
}

.add-school-input {
  background-color: $fourth-color;
  color: $primary-color;
  border-radius: 13px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  font-size: 17px;
  width: 300px;

  &:focus {
    box-shadow: none;
  }
}

.add-school-btn {
  background-color: $primary-color;
  color: $tertiary-color;

  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
}
</style>
