<template>
  <div class="meetings">
    <div v-if="meetings.length === 0">
      <h2 class="error-msg text-center">Não há reuniões passadas</h2>
    </div>

    <div v-for="meeting in meetings" :key="meeting.id">
      <div class="row mb-3">
        <div class="col-1"></div>
        <div
          class="col-5 date shadow text-center d-flex align-items-center justify-content-center"
        >
          {{ formatDate(meeting.date) }}
        </div>
        <div class="col-6">
          <button class="see-more-btn btn shadow px-3">Ver Informações</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useMeetingsStore } from "@/stores/meetings";
export default {
  name: "FutureMeetings",

  data() {
    return {
      meetingsStore: useMeetingsStore(),
      meetings: [],
    };
  },

  async created() {
    const meetings = await this.meetingsStore.getMeetings();
    // TODO: replace with > Date.now()
    const filteredMeetings = meetings.filter((meeting) => meeting.date < Date.now());

    // order by date
    this.meetings = filteredMeetings.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-PT");
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

.meetings {
  background-color: $secondary-color;
  padding: 20px;
  border-radius: 10px;
  height: 250px;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 10px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary-color;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: $secondary-color;
    border-radius: 10px;
  }

  // change color of scrollbar to black
  &::-webkit-scrollbar-thumb:hover {
    background: $fifth-color;
  }
}

.date {
  background-color: $fourth-color;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
}

.see-more-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;

  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
}

.error-msg {
  color: $sixth-color;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 20px;
}
</style>
