<template>
  <div class="error-page">
    <div class="text-center">
      <img
        class="error-logo"
        src="../assets/logo/logo_exp_dark.png"
        alt="Ecoly logo"
      />
      <h2 class="error-subtitle">
        Ups, a menos que você tenha uma máquina do tempo, esse conteúdo não está
        disponível.
      </h2>
      <p class="error-description">
        Mas não se preocupe, há muitas outras maneiras de se envolver na
        comunidade ecológica e ajudar a proteger o planeta.
      </p>

      <!-- gift of a tree -->
      <img
        class="error-tree mt-2 img-fluid"
        src="../assets/images/tree.gif"
        alt="animated tree"
      />

      <router-link class="error-link" to="/">
        Voltar para a página inicial
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Not Found", // error 404
};
</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary-color: #3fc380;
$fourth-color: #ffffff;

.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(174, 220, 192, 0.7);
}

.error-logo {
  width: 300px;
  height: auto;
}

.error-subtitle {
  font-family: "Alkes", sans-serif;
  font-size: 1.9rem;
  font-weight: bold;
  color: #333;
  width: 60%;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}

.error-description {
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 1.3rem;
  color: rgba(52, 62, 61, 0.8);
  width: 50%;
  margin: 0 auto;
}

.error-tree {
  width: 200px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.error-link {
  font-family: "Panton", sans-serif;
  font-weight: 500;
  font-size: 1.1rem;

  display: inline-block;
  padding: 0.5rem 1rem;
  border: 1px solid $primary-color;
  border-radius: 0.25rem;
  color: $primary-color;
  text-decoration: none;
  transition: all 0.3s;
}

.error-link:hover {
  background-color: $primary-color;
  color: $fourth-color;
}

@media (max-width: 768px) {
  .error-subtitle {
    font-size: 1.5rem;
    width: 80%;
  }

  .error-description {
    font-size: 1.1rem;
    width: 70%;
  }

  .error-link {
    font-size: 1rem;
  }
}

@media (max-width: 576px) {
  .error-subtitle {
    font-size: 1.3rem;
    width: 90%;
  }

  .error-description {
    font-size: 1rem;
    width: 80%;
  }

  .error-link {
    font-size: 0.9rem;
  }
}

@media (max-width: 375px) {
  .error-subtitle {
    font-size: 1.1rem;
    width: 100%;
  }

  .error-description {
    font-size: 0.9rem;
    width: 90%;
  }

  .error-link {
    font-size: 0.8rem;
  }
}
</style>
