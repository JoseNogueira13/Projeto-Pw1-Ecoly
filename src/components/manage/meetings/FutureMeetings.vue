<template>
  <div class="meetings">
    <div v-if="meetings.length === 0">
      <h2 class="error-msg text-center">Não há reuniões futuras</h2>
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
          <button
            class="see-more-btn btn shadow px-3"
            @click="showMeetingInfo(meeting)"
          >
            Ver Informações
          </button>
        </div>
      </div>
    </div>
  </div>

  <b-modal id="meeting-info-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title"> Informação da Reunião </span>
    </template>
    <div class="d-block text-center">
      <h3 class="modal-date-info">
        Reunião de {{ currMeeting.day }} de {{ currMeeting.month }} de
        {{ currMeeting.year }}
      </h3>
      <h4 class="modal-room-info">Local: {{ currMeeting.room }}</h4>
      <h4 class="modal-time-info">
        Horário: {{ currMeeting.hour }}:{{ currMeeting.minute }}
      </h4>
      <hr />
      <p class="modal-description-info">
        {{ currMeeting.description }}
      </p>
    </div>
  </b-modal>
</template>

<script>
import { useMeetingsStore } from "@/stores/meetings";
export default {
  name: "FutureMeetings",

  data() {
    return {
      meetingsStore: useMeetingsStore(),
      meetings: [],
      currMeeting: {
        day: "",
        month: "",
        year: "",
        hour: "",
        minute: "",
        room: "",
        description: "",
      },
    };
  },

  async created() {
    const meetings = await this.meetingsStore.getMeetings();
    const filteredMeetings = meetings.filter((meeting) => meeting.date > Date.now());

    // order by date
    this.meetings = filteredMeetings.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
  },

  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-PT");
    },

    getMonthName(month) {
      const months = [
        "janeiro",
        "fevereiro",
        "março",
        "abril",
        "maio",
        "junho",
        "julho",
        "agosto",
        "setembro",
        "outubro",
        "novembro",
        "dezembro",
      ];
      return months[month - 1];
    },

    showMeetingInfo(meeting) {
      // convert meeting.date to day, month, year, hour, minute
      const date = new Date(meeting.date);
      this.currMeeting.day = date.getDate();
      this.currMeeting.month = this.getMonthName(date.getMonth() + 1);
      this.currMeeting.year = date.getFullYear();
      this.currMeeting.hour = date.getHours();
      this.currMeeting.minute = date.getMinutes();
      this.currMeeting.room = meeting.room;
      this.currMeeting.description = meeting.description;

      this.$bvModal.show("meeting-info-modal");
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

.modal-title,
.modal-date-info,
.modal-room-info,
.modal-time-info,
.modal-description-info {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 20px;
}

.modal-title {
  font-size: 22px;
}

.modal-date-info {
  font-size: 25px;
}

.modal-description-info {
  font-size: 17px;
}

@media screen and (max-width: 1340px) {
  .date {
    margin-left: 25%;
    margin-bottom: 10px;
  }
  .see-more-btn {
    margin-left: 70%;
    margin-bottom: 10px;
    width: 100%;
    min-width: 120px;
  }
}
</style>
