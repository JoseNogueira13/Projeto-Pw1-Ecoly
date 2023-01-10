import { defineStore } from "pinia";
import { fetchData } from "../hooks/fetchData";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "../hooks/localStorage";

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: [],
    loggedUserID: null,
  }),

  actions: {
    // Getters
    async getUsers() {
      if (this.users.length === 0) this.users = await fetchData("users");
      return this.users;
    },

    async getUserById(id) {
      const users = await this.getUsers();
      return users.find((user) => user.id === id);
    },

    async getUsersByRole(role) {
      const users = await this.getUsers();
      return users.filter((user) => user.role === role);
    },

    async getUsersBySchool(school, role = null) {
      const users = await this.getUsers();
      return users
        .filter((user) => user.school === school)
        .filter((user) => {
          if (role) return user.role === role;
          return true;
        });
    },

    // Authentication methods
    isUserLogged() {
      if (this.loggedUserID !== null) return true;

      const loggedUser = getLocalStorage("loggedUser");
      if (loggedUser) {
        this.loggedUserID = parseInt(loggedUser);
        return true;
      }

      return false;
    },

    async getLoggedUser() {
      const users = await this.getUsers();
      return users.find((user) => user.id === this.loggedUserID);
    },

    // Add user
    async addUser(newUser) {
      const users = await this.getUsers();
      users.push({ id: crypto.randomUUID(), ...newUser });

      this.users = users;
      setLocalStorage("users", this.users);
    },

    // Edit user data
    async editUser(id, newData) {
      const users = await this.getUsers();

      const index = users.findIndex((user) => user.id === id);
      if (index === -1) return;

      users[index].email = newData.email;
      users[index].password = newData.password;
      users[index].course = newData.course;
      users[index].year = newData.year;
      users[index].photo = newData.photo;

      this.users = users;
      setLocalStorage("users", this.users);
    },

    // Change user role
    async changeUserRole(id, newRole) {
      const users = await this.getUsers();

      users.find((user) => user.id === id).role = newRole;

      this.users = users;
      setLocalStorage("users", this.users);
    },

    // Update Highlighted Badge
    async updateHighlightedBadge(badgeId) {
      const users = await this.getUsers();

      users.find((user) => user.id === this.loggedUserID).highlightedBadge = badgeId;

      this.users = users;
      setLocalStorage("users", this.users);
    },

    // Unlock a new Badge
    async unlockBadge(badgeId) {
      const users = await this.getUsers();

      users.find((user) => user.id === this.loggedUserID).badges.push(badgeId);

      this.users = users;
      setLocalStorage("users", this.users);
    },

    // Login
    async login(email, password) {
      const users = await this.getUsers();

      const user = users.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) return false;

      setLocalStorage("loggedUser", user.id);
      this.loggedUserID = user.id;

      return true;
    },

    // SignOut
    signOut() {
      this.loggedUserID = null;
      removeLocalStorage("loggedUser");
    },

    // Create new user
    async createNewUser(newUser) {
      const users = await this.getUsers();

      // check if user already exists
      if (users.find((user) => user.email === newUser.email)) return false;

      // create new user
      users.push({ id: crypto.randomUUID(), ...newUser });

      this.users = users;
      setLocalStorage("users", this.users);
      return true;
    },
  },
});
