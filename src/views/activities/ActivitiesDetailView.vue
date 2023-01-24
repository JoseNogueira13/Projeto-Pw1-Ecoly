<script setup>
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
<Sidebar route="activities"/>
    <div class="center">
        <div class="activity-detail">
        <h2 class="activity-Title">{{ activityDetails.title }}</h2>
        <span>{{ activityDetails.status }}</span>
        <h4>Diagnóstico</h4>
        <p>{{ activityDetails.diagnostic }}</p>
        <h4>Objetivos</h4>
        <p>{{ activityDetails.objective }}</p>        
        <h4>Metas</h4>
        <p>{{ activityDetails.meta }}</p>  
        <h4>Recursos</h4>
        <p>{{ activityDetails.resources }}</p>                
        <h4>Participantes</h4>
        <p>{{ activityDetails.participants }}</p>                
        <h4>Indicadores de Avaliação</h4>
        <p>{{ activityDetails.evaluationIndicator }}</p>                
        <h4>Avaliação de Instrumentos</h4>
        <p>{{ activityDetails.evaluationMethod }}</p>                

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
                components : {Sidebar},
                activityDetails: {},
                authorName: "Teste",
            }
        },

        // when the component his created
        async created() {
    
            // new id from the url
    const id = this.$route.params.id;
    const activityDetail = await useActivitiesStore().getActivityById(id);
    if (activityDetail) this.activityDetails = activityDetail;
    else this.$router.push({ name: "NotFound" });
    
    // get author name
    const author = await useUsersStore().getUserById(+activityDetail.authorID);
    this.authorName = author.name;
  
},

    methods: {
        formatDate(date) {
      // convert date to dd/mm/yyyy format (PT-pt)
      return new Date(date).toLocaleDateString("pt-PT");
    },
    },

    }
</script>

<style scoped>

.center{
    display: flex;
    justify-content: center;
}

.activity-detail{
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 1.5em;
}
</style>