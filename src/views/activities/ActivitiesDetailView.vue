<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="activities" />
  <div class="images-section">
    <div class="background">
      <div class="main text-center p-3 px-5">
        <div class="img-slider row">
          <div class="row justify-content-center align-items-center">
            <img
              v-for="(image, index) in activityDetails.images"
              :key="index"
              :src="image.includes('./data/images') ? '/' + image : image"
              class="addActivityImg img-fluid my-3 mx-3 rounded-lg shadow ml-4"
              alt="Imagem da Atividade"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useActivitiesStore } from "@/stores/activities";
import { useUsersStore } from "@/stores/users";

export default {
  name: "ActivitiesDetailView",

  data() {
    return {
      components: { Sidebar },
      activityDetails: {},
    };
  },

  // when the component his created
  async created() {
    // new id from the url
    const id = this.$route.params.id;
    const activityDetail = await useActivitiesStore().getActivityById(id);
    if (activityDetail) this.activityDetails = activityDetail;
    else this.$router.push({ name: "NotFound" });
  },

  methods: {
    formatDate(date) {
      // convert date to dd/mm/yyyy format (PT-pt)
      return new Date(date).toLocaleDateString("pt-PT");
    },
  },
};
</script>

<style lang="scss" scoped>
// variables colors
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$third-color: #ffffff;
$fourth-color: #e4f0e8;

.center {
  display: flex;
  justify-content: center;
}

.activity-detail {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1.5em;
}

.background {
  background-color: $fourth-color;
  height: 300px;
}


.addActivityImg {
  width: 340px;
  height: 200px;
  transition: all 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}
</style>
