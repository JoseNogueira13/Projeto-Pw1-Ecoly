<template>
  <div
    v-if="schools.length === 0"
    class="col-12 mt-5 rounded table d-flex flex-column justify-content-center align-items-center"
    style="min-height: 490px"
  >
    <h2 class="error-msg mb-1">Nenhuma Escola encontrada</h2>
  </div>
  <div v-else class="col-12 mt-5 px-1 rounded table-container">
    <table class="table table-hover table-striped table-responsive-sm">
      <caption class="text-center">
        Lista Atual de Escolas da Plataforma
      </caption>
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="school in schools" :key="school.id">
          <td class="col-xl-9 col-md-8 col-6">
            {{ school.name }}
          </td>
          <td class="col-xl-3 col-md-4 col-6">
            <b-button
              class="py-1 px-3 edit-school-btn ml-3"
              size="sm"
              variant="outline-success"
              @click="showEditModal(school)"
            >
              Editar
            </b-button>
            <b-button
              class="py-1 px-3 remove-school-btn mr-3"
              size="sm"
              variant="outline-danger"
              @click="showDeleteModal(school)"
              >Remover</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <b-modal id="edit-school-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title"> Editar Escola </span>
    </template>
    <div class="d-block text-center">
      <input
        type="text"
        class="form-control new-theme-input"
        placeholder="Nome da Escola"
        aria-label="Nome da Escola"
        v-model="newSchoolName"
        @input="updateIsNewNameValid"
      />
    </div>
    <b-button class="mt-3" block @click="editSchool" :disabled="!isNewNameValid"
      >Alterar Nome</b-button
    >
  </b-modal>

  <b-modal id="remove-school-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title"> Tem a certeza que quer apagar esta Escola?</span>
    </template>
    <b-button class="mt-3 col-5 mr-5 ml-3" variant="success" @click="deleteSchool"
      >Sim</b-button
    >
    <b-button
      class="mt-3 col-5"
      variant="danger"
      @click="$bvModal.hide('remove-school-modal')"
      >Não</b-button
    >
  </b-modal>
</template>

<script>
import { useSchoolsStore } from "@/stores/schools";
export default {
  name: "SchoolsTable",

  props: {
    schools: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      newSchoolName: "",
      currSchoolID: 0,
      isNewNameValid: false,
    };
  },

  methods: {
    async isNewSchoolNameValid() {
      const schoolsStore = useSchoolsStore();
      const schools = await schoolsStore.getSchools();

      return (
        this.newSchoolName.length < 4 ||
        schools.some(
          (school) => school.name.toLowerCase() === this.newSchoolName.toLowerCase()
        )
      );
    },

    updateIsNewNameValid() {
      this.isNewSchoolNameValid().then((res) => {
        this.isNewNameValid = !res;
      });
    },

    async showEditModal(currentSchool) {
      this.newSchoolName = currentSchool.name;
      this.currSchoolID = currentSchool.id;
      this.$bvModal.show("edit-school-modal");
      this.updateIsNewNameValid();
    },

    showDeleteModal(currentSchool) {
      this.currSchoolID = currentSchool.id;
      this.$bvModal.show("remove-school-modal");
    },

    async deleteSchool() {
      const schoolsStore = useSchoolsStore();
      await schoolsStore.deleteSchool(this.currSchoolID);
      this.$bvModal.hide("remove-school-modal");

      this.$emit("reload-table");
    },

    async editSchool() {
      const schoolsStore = useSchoolsStore();
      await schoolsStore.editSchool(this.currSchoolID, this.newSchoolName);
      this.$bvModal.hide("edit-school-modal");

      this.$emit("reload-table");
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
$seventh-color: #57b894;
$eighth-color: #3e4847;

.table-container {
  overflow-y: scroll;
  height: 490px;
  border-radius: 25px;
  background-color: $eighth-color;

  &::-webkit-scrollbar {
    width: 15px;
  }

  &::-webkit-scrollbar-track {
    background: $primary-color;
  }

  &::-webkit-scrollbar-thumb {
    background: $seventh-color;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: $tertiary-color;
  }

  &::-webkit-scrollbar-thumb:active {
    background: $tertiary-color;
  }
}

.table {
  background-color: $primary-color;
  color: $secondary-color;
}

caption {
  color: $seventh-color;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 17px;
}

thead {
  & tr {
    font-family: "Panton", sans-serif;
    font-weight: 700;
    font-size: 22px;
    background-color: $eighth-color;

    & th {
      border: 2px solid $sixth-color;
    }
  }
}

tbody {
  & tr {
    font-family: "Panton", sans-serif;
    font-weight: 700;
    font-size: 20px;
    background-color: $primary-color;

    // load animation (fade in)
    animation: fadeIn 0.5s ease-in-out;

    &:hover {
      color: $fourth-color;
    }

    & td {
      border: 2px solid $sixth-color;
    }
  }
}

.edit-school-btn,
.remove-school-btn {
  float: left;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 17px;
}

.remove-school-btn {
  float: right;
}

.error-msg {
  color: $secondary-color;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-align: center;

  // show from the bottom animation
  animation: showFromBottom 0.5s ease-in-out;
}

@keyframes showFromBottom {
  0% {
    opacity: 0;
    transform: translateY(100%);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
