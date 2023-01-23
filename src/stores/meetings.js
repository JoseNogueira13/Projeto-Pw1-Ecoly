import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import { setLocalStorage } from "../hooks/localStorage";

export const useMeetingsStore = defineStore("meetings", {
  state: () => ({ meetings: [] }),

  actions: {
    async getMeetings() {
      if (this.meetings.length === 0) this.meetings = await fetchData("meetings");
      return this.meetings;
    },

    async getMeetingById(id) {
      const meetings = await this.getMeetings();
      return meetings.find((meeting) => meeting.id === id);
    },

    async addNewMeeting(meeting) {
      meeting.id = crypto.randomUUID();
      const meetings = await this.getMeetings();
      meetings.push(meeting);

      setLocalStorage("meetings", meetings);
      this.meetings = meetings;
    },

    async addAta(id, ata) {
      const meetings = await this.getMeetings();
      const meeting = meetings.find((meeting) => meeting.id === id);
      meeting.ata = ata;

      setLocalStorage("meetings", meetings);
      this.meetings = meetings;
    },

    async removeMeetingsBySchool(id) {
      const meetings = await this.getMeetings();
      const newMeetings = meetings.filter((meeting) => meeting.schoolID !== id);

      setLocalStorage("meetings", newMeetings);
      this.meetings = newMeetings;
    },
  },
});
