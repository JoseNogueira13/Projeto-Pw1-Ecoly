<script setup>
import Header from "@/components/Header.vue";
import Sidebar from "@/components/Sidebar.vue";
</script>

<template>
  <Sidebar route="news" />
  <div class="main text-center p-3 px-5">
    <Header title="ADICIONAR NOTÍCIA" />
    <main>
      <div class="row justify-content-center align-items-center">
        <img
          v-for="(image, index) in new_images"
          :key="index"
          :src="image"
          class="addNewImg img-fluid my-3 mx-3 rounded-lg shadow"
          alt="Imagem da Notícia"
        />

        <img
          v-if="new_images.length < 4"
          class="addNewImg addImgBtn my-3 mx-3 rounded-lg shadow"
          src="@/assets/images/addImage.png"
          alt="Add New Image"
          @click="addNewImage"
        />
      </div>

      <form class="w-50 mx-auto mt-5" @submit.prevent="addNew">
        <div class="mb-3">
          <input
            type="text"
            class="form-control"
            id="new_title"
            aria-describedby="tituloNoticia"
            placeholder="Título da Notícia"
            v-model="new_title"
            required
          />
        </div>
        <div class="mb-3">
          <textarea
            type="text"
            class="form-control"
            id="new_content"
            placeholder="Conteúdo da Notícia"
            v-model="new_content"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          class="addNewBtn btn pl-5 pr-5"
          :disabled="!new_title || !new_content || new_images.length === 0"
        >
          Adicionar Notícia
        </button>
      </form>

      <img
        class="bottom-img"
        src="@/assets/images/createNewBG.svg"
        alt="Background Image"
      />
    </main>
  </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useNewsStore } from "@/stores/news";
export default {
  name: "NewsCreate",
  components: { Sidebar, Header },

  data() {
    return {
      new_title: "",
      new_content: "",
      new_images: [],
      authorID: "",
    };
  },

  async created() {
    const usersStore = useUsersStore();

    // Check if the user is logged in
    if (!usersStore.isUserLogged()) this.$router.push({ name: "News" });

    // Check if the user is an admin
    const loggedUser = await usersStore.getLoggedUser();
    if (loggedUser.role !== "admin") this.$router.push({ name: "News" });

    this.authorID = loggedUser.id;
  },

  methods: {
    async addNew() {
      const newsStore = useNewsStore();

      const newNew = {
        title: this.new_title,
        body: this.new_content,
        images: this.new_images,
        authorID: this.authorID,
      };

      // Redirect to news List
      newsStore.addNew(newNew).then(() => {
        this.$router.push({ name: "News" });
      });
    },

    addNewImage() {
      //TODO: Instead of generating random images,
      // allow the user to upload images from their computer

      // Generate random image
      const firstN = Math.floor(Math.random() * 400) + 100;
      const secondN = Math.floor(Math.random() * 400) + 100;

      this.new_images.push(`https://picsum.photos/${firstN}/${secondN}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;
$fifth-color: #18516f;

.main {
  min-height: 100vh;
}

.title {
  font-family: "Alkes", sans-serif;
  font-weight: bold;
  font-size: 35px;
}

.bottom-img {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 700px;
}

form input,
form textarea {
  font-family: "Panton", sans-serif;
  font-size: 17px;
  font-weight: 500;

  border: 2px solid $tertiary-color;
  border-radius: 15px;
}

form input:focus,
form textarea:focus {
  border: 2px solid $tertiary-color;
  box-shadow: 0 0 0 1px $secondary-color;
}

form input {
  padding: 20px;
}

form textarea {
  height: 200px;
  padding: 10px 15px;
}

.addNewBtn {
  background-color: $primary-color;
  color: $fourth-color;
  border-radius: 15px;

  &:hover {
    background-color: $fifth-color;
  }

  &:disabled {
    background-color: $primary-color;
    opacity: 0.5;
  }
}

.addNewImg {
  width: 220px;
  height: 150px;
  transition: all 0.3s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
}

@media (max-width: 1450px) {
  .bottom-img {
    width: 500px;
  }
}

@media (max-width: 1200px) {
  .addNewImg {
    width: 200px;
    height: 130px;
  }
}

@media (max-width: 1080px) {
  .addNewImg {
    width: 180px;
    height: 120px;
  }
}

@media (max-width: 999px) {
  .addNewImg {
    width: 160px;
    height: 110px;
  }

  form input,
  form textarea {
    width: 100%;
  }
}

@media (max-width: 920px) {
  .addNewImg {
    width: 130px;
    height: 90px;
  }
}

@media (max-width: 992px) {
  .bottom-img {
    width: 400px;
  }
}

@media (max-width: 795px) {
  .addNewImg {
    width: 100px;
    height: 70px;
  }
}

@media (max-width: 677px) {
  .bottom-img {
    display: none;
  }
}

@media (max-height: 770px) {
  .bottom-img {
    width: 300px;
  }
}

@media (max-height: 740px) {
  .bottom-img {
    display: none;
  }
}
</style>
