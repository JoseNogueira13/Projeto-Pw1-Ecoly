<script setup>
import ManageSection from "../ManageSection.vue";
import CreateMeeting from "./CreateMeeting.vue";
import PastMeetings from "./PastMeetings.vue";
import FutureMeetings from "./FutureMeetings.vue";
</script>

<template>
  <div class="mt-5 pt-5">
    <ManageSection
      title="REUNIÕES"
      description="crie reuniões ou registe as reuniões do conselho adicionado a ata"
    />

    <div class="row mt-5 ml-2">
      <div class="col-lg-6">
        <div class="ml-md-5">
          <div class="future-past-meetings">
            <div class="row">
              <div class="col-6">
                <div class="row">
                  <div
                    class="select-meetings col-6 text-left"
                    :class="selectedMeetings === 'past' ? 'selected' : ''"
                    @click="selectedMeetings = 'past'"
                  >
                    Realizadas
                  </div>
                  <div
                    class="select-meetings col-6 text-left"
                    :class="selectedMeetings === 'future' ? 'selected' : ''"
                    @click="selectedMeetings = 'future'"
                  >
                    Futuras
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-12">
                <div v-if="selectedMeetings === 'past'">
                  <PastMeetings />
                </div>
                <div v-else>
                  <FutureMeetings />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
        <CreateMeeting />
      </div>
    </div>
  </div>
</template>

<script>
import { useMeetingsStore } from "@/stores/meetings";
export default {
  name: "Meetings",

  components: { ManageSection, CreateMeeting, PastMeetings, FutureMeetings },

  data() {
    // past or future
    return {
      selectedMeetings: "past",
      pastMeetings: [],
      futureMeetings: [],
      meetingsStore: useMeetingsStore(),
    };
  },
};
</script>

<style scoped lang="scss">
.future-past-meetings {
  width: 75%;
  max-width: 520px;
  margin-left: 100px;
}

.select-meetings {
  font-family: "Panton", sans-serif;
  font-style: normal;
  font-size: 23px;

  &:hover {
    cursor: pointer;
  }
}

.selected {
  font-weight: bold;
  text-decoration: underline;
}

@media screen and (max-width: 1400px) {
  .select-meetings {
    font-size: 20px;
  }
}

@media screen and (max-width: 1250px) {
  .select-meetings {
    font-size: 18px;
  }
}

@media screen and (max-width: 1160px) {
  .select-meetings {
    font-size: 16px;
  }
}

@media screen and (max-width: 1060px) {
  .select-meetings {
    font-size: 14px;
  }
}

@media screen and (max-width: 990px) {
  .select-meetings {
    font-size: 23px;
  }

  .future-past-meetings {
    width: 100%;
    padding-bottom: 50px;
    margin: 0 auto;
    margin-right: 20%;
  }
}
</style>
