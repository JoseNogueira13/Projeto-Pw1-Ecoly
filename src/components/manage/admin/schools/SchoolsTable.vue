<template>
  <div
    v-if="schools.length === 0"
    class="col-12 mt-5 rounded table d-flex flex-column justify-content-center align-items-center"
  >
    <h2 class="error-msg">Nenhuma Escola encontrada</h2>
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
            >
              Editar
            </b-button>
            <b-button
              class="py-1 px-3 remove-school-btn mr-3"
              size="sm"
              variant="outline-danger"
              >Remover</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "SchoolsTable",

  props: {
    schools: {
      type: Array,
      required: true,
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

    &:hover {
      color: $fourth-color;
    }

    & td {
      border: 2px solid $sixth-color;
    }
  }
}

.error-msg {
  color: $secondary-color;
  font-family: "Panton", sans-serif;
  font-weight: 700;
  font-size: 30px;
  text-align: center;
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
</style>
