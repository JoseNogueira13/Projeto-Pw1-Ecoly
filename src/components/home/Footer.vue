<template>
  <footer class="footer pt-5 pb-5">
    <div class="container">
      <div class="row">
        <div class="col-sm-4 left-content">
          <img
            src="@/assets/logo/logo_exp.png"
            alt="Ecoly"
            width="170"
            class="logo img-fluid mb-3 text-left mr-5"
          />
          <h4 class="slogan mb-3 text-left">PLANTA O TEU FUTURO</h4>
          <router-link :to="{ name: 'News' }" class="route-link text-left">
            notícias
          </router-link>
          <router-link :to="{ name: 'Activities' }" class="route-link text-left">
            atividades
          </router-link>
          <h4 class="sub-title mt-4">SUBSCREVER À NEWSLETTER</h4>
          <form class="input-group mb-3" @submit.prevent="subscribe">
            <input
              type="email"
              class="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="button-addon2"
              v-model="newsLetterEmail"
              required
            />
            <button
              class="btn btn-outline-secondary"
              type="submit"
              id="button-addon2"
            >
              Subscrever
            </button>
          </form>
          <span class="cr-name"> &copy; 2022 Ecoly </span>
        </div>
        <div class="col-sm-4 mid-content">
          <div class="social-media text-left mb-4">
            <img class="px-2" src="@/assets/icons/instagram.svg" alt="instagram" />
            <img class="px-2" src="@/assets/icons/facebook.svg" alt="facebook" />
            <img class="px-2" src="@/assets/icons/twitter.svg" alt="twitter" />
          </div>

          <a href="#" class="route-link text-left">plano de atividades</a>
          <a href="#" class="route-link text-left">gestão de conselho</a>
          <a href="#" class="route-link text-left">criar conta</a>
        </div>
        <div class="col-sm-4 right-content">
          <h5 class="text-left">ENTRE EM CONTACTO</h5>
          <span class="mb-5 text-left">ECOLY@eco-escolas.com</span>

          <h5 class="text-left">PARA MAIS INFORMAÇÕES</h5>
          <span class="text-left">fee.portugal@abae.pt</span>
          <span class="mb-5 text-left">abae@abae.pt</span>

          <h5 class="text-left">SOBRE NÓS</h5>
          <span class="text-left">
            ECOLY tem como objetivo reunir pessoas interessadas em tornar o planeta um
            espaço verde de forma a sustentar o ecossistema que nos rodeia. Para o
            efeito, é disponibilizado ferramentas para os membros do conselho poderem
            gerir o conselho Eco-escolas e á criação de atividades para o plano de
            ação e poderá ter interação com outros utilizadores.
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { subscribeToNewsLetter } from "@/hooks/subscribeToNewsLetter.js";
export default {
  name: "Footer",

  data() {
    return { newsLetterEmail: "" };
  },

  methods: {
    subscribe() {
      const result = subscribeToNewsLetter(this.newsLetterEmail);

      if (result) {
        this.$bvToast.toast("Subscrição Efetuada com Sucesso", {
          title: "Subscrito com Sucesso",
          variant: "success",
          solid: true,
        });
      } else {
        this.$bvToast.toast("Este Email já está Subscrito", {
          title: "Subscrição Falhou",
          variant: "danger",
          solid: true,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
$footer-bg: #343e3d;
$footer-text: #aedcc0;
$footer-selected-color: #3fc380;

.footer {
  background-color: $footer-bg;
  color: $footer-text;
  font-size: 14px;
  font-family: "Panton", sans-serif;
  font-weight: 400;

  // background image
  background-image: url("@/assets/images/FooterIllustration.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  height: 700px;
}

.logo {
  margin-left: -132px;
}
.slogan {
  color: $footer-text;
  font-size: 25px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
}

.route-link {
  display: block;
  color: #ffffff;
  font-size: 15px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  margin-bottom: 10px;
  &:hover {
    color: $footer-selected-color;
  }
}

.sub-title {
  color: $footer-text;
  font-size: 20px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  margin-bottom: 10px;
  text-align: left;
}

.form-control {
  border: none;
  border-radius: 15px;
  background-color: $footer-text;
  color: $footer-bg;
  font-size: 14px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  &:focus {
    box-shadow: none;
  }
}

.btn {
  border: none;
  border-radius: 0;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  background-color: $footer-selected-color;
  color: #ffffff;
  font-size: 14px;
  font-family: "Panton", sans-serif;
  font-weight: 400;

  &:focus {
    box-shadow: none;
  }
  &:hover {
    background-color: #3fc380;
  }
}

.cr-name {
  color: #ffffff;
  font-size: 14px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  margin-left: 10px;
}

.mid-content {
  padding-left: 120px;
}

.right-content {
  padding-left: 120px;
}

.right-content span {
  display: block;
  color: #ffffff;
  font-size: 14px;
  font-family: "Panton", sans-serif;
  font-weight: 400;
  margin-bottom: 10px;
}
</style>
