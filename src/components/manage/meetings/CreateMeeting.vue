<template>
  <div class="mr-md-4">
    <form @submit.prevent="createNewMeeting">
      <div class="row">
        <div class="col-md-6">
          <div class="row">
            <!-- DAY -->
            <div class="col-4">
              <select name="day" id="day" class="form-control" v-model="day">
                <option v-for="day in daysInMonth" :key="day" :value="day">
                  {{ day }}
                </option>
              </select>
            </div>
            <!-- MONTH -->
            <div class="col-md-4 px-md-0">
              <select name="month" id="month" class="form-control" v-model="month">
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
            <!-- YEAR -->
            <div class="col-md-4">
              <select name="year" id="year" class="form-control" v-model="year">
                <option v-for="year in years" :key="year" :value="year">
                  {{ year }}
                </option>
              </select>
            </div>
          </div>
        </div>
        <!-- TIME -->
        <div class="col-md-2">
          <input
            type="text"
            class="form-control"
            placeholder="hora:min"
            v-model="hourMinutes"
          />
        </div>
        <!-- ROOM -->
        <div class="col-md-2">
          <input type="text" class="form-control" placeholder="sala" v-model="room" />
        </div>
      </div>
      <div class="row">
        <div class="col-10 my-4">
          <textarea
            class="form-control meeting-description"
            rows="6"
            placeholder="Descrição da reunião..."
            style="resize: none"
            v-model="description"
          ></textarea>
        </div>
      </div>
      <div class="row">
        <div class="col-10">
          <button
            type="submit"
            class="create-btn btn float-right"
            :disabled="hourMinutes === '' || room === '' || description === ''"
          >
            {{ message }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useMeetingsStore } from "@/stores/meetings";
export default {
  data() {
    const currDay = new Date().getDate();
    const currMonth = new Date().getMonth() + 1;
    const currYear = new Date().getFullYear();
    const currTime = new Date().toLocaleTimeString("pt-PT", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      day: currDay,
      month: currMonth,
      year: currYear,
      hourMinutes: currTime,
      room: "",
      years: Array.from({ length: 5 }, (v, k) => k + currYear),
      description: "",
      usersStore: useUsersStore(),
      meetingsStore: useMeetingsStore(),
      message: "Criar Reunião",
    };
  },

  computed: {
    daysInMonth() {
      return new Date(this.year, this.month, 0).getDate();
    },
  },

  methods: {
    async createNewMeeting() {
      this.message = "A criar reunião...";

      // check if hours/minutes are valid
      const timeRegex = /^([0-1]\d|2[0-3]):[0-5]\d$/;
      if (!timeRegex.test(this.hourMinutes)) return;
      // Convert date to number
      const currDate = `${this.currYear}-${this.currMonth}-${this.currDay} ${this.currTime}:00`;
      const currDateTimeNumber = new Date(currDate).getTime();

      // Get logged user and his school
      const loggedUser = await this.usersStore.getLoggedUser();
      const loggedUserSchoolId = loggedUser.schoolID;

      const meeting = {
        date: currDateTimeNumber,
        room: this.room,
        description: this.description,
        schoolID: loggedUserSchoolId,
      };

      await this.meetingsStore.addNewMeeting(meeting);

      setTimeout(() => {
        this.message = "Reunião criada com sucesso!";
      }, 2000);
      setTimeout(() => {
        this.message = "Criar Reunião";
      }, 6000);
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

.create-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border: none;
  border-radius: 15px;
  padding: 5px 20px;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    background-color: $fifth-color;
    color: $fourth-color;
  }
}

.meeting-description,
select,
input {
  border: 3px solid $seventh-color;
  border-radius: 15px;
  padding: 15px 30px;
  font-size: 15px;
  font-weight: 600;
  color: $primary-color;
}

select,
input {
  padding: 5px 10px;
}
</style>
