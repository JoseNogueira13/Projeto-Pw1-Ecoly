<template>
    <div class="register-form-div">
        <h4 class="register-header">CRIE A SUA CONTA E TORNE-SE NUM MEMBRO</h4>
        <div class="form-container">
          <form class="register-form" @submit.prevent="addUser">
            <input
              v-model="primNome"
              class="input-background"
              id="primNome"
              name="primNome"
              placeholder="Primeiro Nome"
              type="text"
              required
            />
            <input
              v-model="ultNome"
              class="input-background"
              id="ultNome"
              name="ultNome"
              placeholder="Ultimo Nome"
              type="text"
              required
            />
            <input
              v-model="email"
              class="input-background"
              id="email"
              name="email"
              placeholder="Email"
              type="email"
              required
            />
            <input
              v-model="password"
              class="input-background"
              id="password"
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            <input
              v-model="confPass"
              class="input-background"
              id="confPass"
              name="confPass"
              placeholder="Confirm your password"
              type="password"
              required
            />
            <select
              v-model="escola"
              class="input-background"
              id="escola"
              name="escola"
              required
            >
              <option
                disabled
                value=""
              >
                Selecione a escola
              </option>
              <option
                v-for="school in schools"
                :value="school.id"
              >
                {{ school.name }}
              </option>
            </select>

            <input
              v-model="numInt"
              class="input-background"
              id="numInt"
              name="numInt"
              placeholder="Numero Interno"
              type="text"
              required
            />
            <input
              v-model="curso"
              class="input-background"
              id="curso"
              name="curso"
              placeholder="Curso"
              type="text"
              required
            />
            <input
              v-model="anoCur"
              class="input-background"
              id="anoCur"
              name="anoCur"
              placeholder="Ano do curso"
              type="text"
              required
            />
            
            <button
              @click="$emit('switch-form')"
              class="switchToLogin"
            >
                Já é membro? Entre aqui
            </button>


            <button
              type="submit"
              class="authenticate-user-btn"
              :disabled="!escola"
            >
              Sign up
            </button>
            
          </form>
        </div>
      </div>
</template>

<script>
import { useUsersStore } from "@/stores/users";
import { useSchoolsStore } from "@/stores/schools"

export default {
  data() {
    return {
      primNome: '',
      ultNome: '',
      email: '',
      password: '',
      confPass: '',
      escola: '',
      numInt: '',
      curso: '',
      anoCur: '',
      schools: [],
    }
  },
  async created() {
    const schoolsStore = useSchoolsStore();
    const school = await schoolsStore.getSchools();
    this.schools = school
    console.log(this.schools);
  },
  methods: {
  async addUser() {
      if(this.password !== this.confPass) {
        this.$bvToast.toast("A palavra passe e a sua confirmação não coincidem!", {
        title: "Palavras passe não coincidem",
        variant: "danger",
        solid: true,
      });
        return
      }

      const usersStore = useUsersStore();
      const newUser = {
        name: this.primNome + ' ' + this.ultNome,
        email: this.email,
        password: this.password,
        schoolID: this.escola,
        internalId: this.numInt,
        course: this.curso,
        year: this.anoCur
      };
      usersStore.createNewUser(newUser)

      this.$bvToast.toast("Utilizador adicionado com sucesso!", {
        title: "Utilizador criado!",
        variant: "success",
        solid: true,
      });
    },
  },
};


</script>

<style lang="scss" scoped>
$primary-color: #343e3d;
$secondary-color: #aedcc0;
$tertiary: #3fc380;
$fourth: #18516f;
$fifth: #ffffff;


.authenticate-user-btn {
  position: absolute;
  margin-top: 680px;
  margin-left: 130px;
  font-size: 15px;
  width: 150px;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  color: $fifth;
  background-color: $primary-color;
  border: none;
  border-radius: 5px;

  &:hover {
    background-color: $fourth;
  }
}
.authenticate-user-btn:disabled {
    /* styles for the button when it is disabled */
    background-color: #ccc;
    color: #555;
    cursor: not-allowed;
  }


.register-header {
  position: absolute;
  top: 20px;
  right: 200px;
  font-family: "Panton", sans-serif;
  font-weight: 600;
  font-size: 20px;
}

.form-container{
    display: flex;
    align-items: center;
    justify-content: center;
}

.register-form {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 420px;
  top: 50px;
  right: 200px;
}

.switchToLogin{
    position: absolute;
    border: none;
    background-color: transparent;
    width: 200px;
    margin-top: 645px;
    margin-left: 100px;

    &:hover {
    color: $tertiary;
  }
}
.register-form > input {
  border-radius: 10px;
  margin-top: 30px;
  height: 40px;
}

.register-form > input::placeholder {
  color: lightgray;
}

.input-background {
  background-image: url(src\assets\icons\manage.svg);
  background-position: left center;
  background-repeat: no-repeat;
  padding-left: 30px;
  background-size: 25px;
}
select.input-background {
    border-radius: 5px;
    margin-top: 25px;
    height: 40px;
    
}

#primNome {
  background-image: url(src\assets\icons\manage.svg);
}

#ultNome {
  background-image: url(src\assets\icons\manage.svg);
}

#email {
  background-image: url(src\assets\icons\manage.svg);
}

#password {
  background-image: url(src\assets\icons\manage.svg);
}

#confPass {
  background-image: url(src\assets\icons\manage.svg);
}

#escola {
  background-image: url(src\assets\icons\manage.svg);
}

#numInt {
  background-image: url(src\assets\icons\manage.svg);
}

#curso {
  background-image: url(src\assets\icons\manage.svg);
}

#anoCur {
  background-image: url(src\assets\icons\manage.svg);
}

</style>