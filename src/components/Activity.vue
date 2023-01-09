<template>
    <div class="new mb-4">
        
        <div class="float-right py-1 px-2">
            <div class="buttons-activities d-flex flex-column">
             <button 
             type="button"
             class="remove-btn btn btn-sm rounded-pill float-right py-1 px-2"
             :style="{
                        visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
                    }"
                @click="removeActivity(activity.id)">
                    <img src="@/assets/icons/remove.svg" alt="remove" width="20" loading="lazy" />
                    <span>Remover</span>
            </button>
             <button
             type="button"
             class="finish-btn btn btn-sm rounded-pill float-right py-1 px-2"
             :style="{
                    visibility: userInfo.isLogged || userInfo.isAdmin ? 'visible' : 'hidden',
                    }">
                      <img src="@/assets/icons/finish.svg" alt="finish" width="20" loading="lazy" />
                      <span>Finalizar</span>
                    </button>
            </div>
        </div>

    

    <div class="row">
        <div class="col-5">
            <img
          :src="activity.images[0]"
          alt="imagem da atividade"
          width="410"
          height="250"
          loading="lazy"
          class="activity-image"
        />
        </div>
        <div class="col-7">
            <h2 class="activity-title text-left mt-3">
          <router-link
            :to="{ name: 'ActivitiesDetails', params: { id: activity.id } }"
            class="activity-link"
          >
          {{ activity.title }}
          </router-link>
        </h2>
        <h4 class="activity-title text-center mt-3">Objetivos</h4>
        <p class="new-text text-left mt-3">
                {{ activity.objective }}
            </p>
        </div>
    </div>

    </div>
</template>

<script>
    export default {
        name: "Activity",
    
         // id, isLogged, isAdmin
         props: {
    userInfo: {
      type: Object,
      required: true,
    },
    activity: {
      type: Object,
      required: true,
    },
  },
    
  methods: {
    removeActivity(id) {
        // Remove the activity from the activities array of the ActivitiesView
      this.$emit("removeActivity", id);
    }
  },

    }
</script>

<style scoped>
.buttons-activities{
    gap: 9em;
}

</style>