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
          <button
            class="add-btn btn shadow px-3"
            @click="meeting.ata ? seeAtaInfoModal(meeting) : seeAddAtaModal(meeting)"
          >
            {{ meeting.ata ? "Ver Ata" : "Adicionar Ata" }}
          </button>
        </div>
      </div>
    </div>
  </div>

  <b-modal id="see-ata-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title">
        Ata da Reunião - {{ formatDate(currMeeting.date) }}
      </span>
    </template>
    <div class="d-block text-center">
      <div class="imgs">
        <img
          v-for="image in currMeeting.ata.images"
          :key="image"
          :src="image"
          class="img-fluid modal-img mx-2 rounded my-2"
          alt="Imagem da ata da reunião"
        />
      </div>
      <p class="mt-4 px-4 mb-0 modal-description">
        {{ currMeeting.ata.description }}
      </p>
    </div>
  </b-modal>

  <b-modal id="add-ata-modal" hide-footer centered>
    <template #modal-title>
      <span class="modal-title">
        Ata da Reunião - {{ formatDate(currMeeting.date) }}
      </span>
    </template>
    <div class="d-block text-center">
      <div class="imgs">
        <img
          v-for="(image, index) in currImgs"
          :key="index"
          :src="image"
          class="img-fluid modal-img modal-add-img mx-2 rounded my-2"
          alt="Imagem da ata da reunião"
          @click="removeImage(index)"
        />
        <img
          v-if="currImgs.length < 4"
          class="modal-img modal-add-img modal-add-img-btn my-3 mx-3 rounded-lg shadow"
          src="@/assets/images/addImage.png"
          alt="Add New Image"
          @click="addNewImage"
        />
      </div>
      <form @submit.prevent="createAta">
        <textarea
          class="form-control mt-4 mb-0 add-ata-description"
          rows="15"
          placeholder="Descrição..."
          v-model="currDescription"
        ></textarea>
        <button
          type="submit"
          class="btn add-ata-btn mt-3 px-5 py-1"
          :disabled="currDescription === ''"
        >
          {{ currMsg }}
        </button>
      </form>
    </div>
  </b-modal>
</template>

<script>
import { useMeetingsStore } from "@/stores/meetings";
export default {
  name: "PastMeetings",

  data() {
    return {
      meetingsStore: useMeetingsStore(),
      meetings: [],
      currMeeting: { id: "", date: "", ata: { images: [], description: "" } },
      currImgs: [],
      currDescription: "",
      currMsg: "Adicionar Ata",
    };
  },

  async created() {
    const meetings = await this.meetingsStore.getMeetings();
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

    seeAtaInfoModal(meeting) {
      this.currMeeting = meeting;
      this.$bvModal.show("see-ata-modal");
    },

    seeAddAtaModal(meeting) {
      this.currMeeting = meeting;
      this.$bvModal.show("add-ata-modal");
    },

    addNewImage() {
      //TODO: Instead of generating random images,
      // allow the user to upload images from their computer

      // Generate random image
      const firstN = Math.floor(Math.random() * 400) + 100;
      const secondN = Math.floor(Math.random() * 400) + 100;

      this.currImgs.push(`https://picsum.photos/${firstN}/${secondN}`);
    },

    removeImage(index) {
      this.currImgs.splice(index, 1);
    },

    async createAta() {
      this.currMsg = "A adicionar ata...";

      await this.meetingsStore.addAta(this.currMeeting.id, {
        images: this.currImgs,
        description: this.currDescription,
      });

      setTimeout(() => {
        this.currMsg = "Ata adicionada com sucesso!";
        this.currImgs = [];
        this.currDescription = "";
      }, 2000);

      setTimeout(() => {
        this.$bvModal.hide("add-ata-modal");
        this.currMsg = "Adicionar Ata";
      }, 4000);
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

.add-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 20px;
  font-size: 15px;
  font-weight: 600;
  width: 68%;

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

.imgs {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.modal-img {
  width: 200px;
  height: 130px;
  object-fit: cover;
  transform: scale (1);
  transition: transform 0.3s ease-in-out;
}

.modal-description {
  font-family: "Panton", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: $sixth-color;
  max-height: 500px;
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
}

.modal-add-img:hover {
  border: 1px solid red;
  opacity: 0.6;

  cursor: pointer;
  transform: scale(1.05);
}

.modal-add-img-btn:hover {
  border: none;
  opacity: 1;
}

.add-ata-description {
  font-family: "Panton", sans-serif;
  font-size: 17px;
  font-weight: 600;
  color: $sixth-color;
  max-height: 500px;
  min-height: 200px;

  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 7px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: $primary-color;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: $fourth-color;
    border-radius: 10px;
  }
}

.add-ata-btn {
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 20px;

  font-family: "Panton", sans-serif;
  font-size: 17px;
  font-weight: 600;

  &:hover {
    background-color: $fifth-color;
    color: $fourth-color;
  }
}
</style>
