<template>
  <div class="row">
    <div class="col-3">
      <h2>AÇÕES RÁPIDAS</h2>
    </div>

    <div class="col-xl-2 col-lg-3">
      <router-link class="fast-action-btn" :to="{ name: 'ActivitiesCreate' }">
        <img src="@/assets/icons/add.svg" alt="add icon" />
        Adicionar Atividade
      </router-link>
    </div>
    <div class="col-xl-2 col-lg-3">
      <router-link class="fast-action-btn" :to="{ name: 'NewsCreate' }">
        <img src="@/assets/icons/add.svg" alt="add icon" class="mb-1" />
        Adicionar Notícia
      </router-link>
    </div>
    <div class="col-xl-2 col-lg-3">
      <router-link class="fast-action-btn" :to="{ name: 'AdminMenu' }">
        Menu Admin
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "FastActions",
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #ffffff;
$fourth-color: #18516f;

.row {
  display: flex;
  justify-content: center;
  align-items: center;
}

h2 {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 25px;
  margin-top: 10px;
}

.fast-action-btn {
  background-color: $primary-color;
  color: $tertiary-color;
  display: inline-block;
  font-size: 15px;
  border-radius: 25px;
  margin: 1rem;
  text-decoration: none;
  max-width: 200px;
  width: 110%;
  padding: 2px;
  padding-left: 5px;
  padding-right: 5px;
  scale: 1;
  translate: 0;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: $fourth-color;
  }
}
</style>
