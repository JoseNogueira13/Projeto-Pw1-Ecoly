import { useNewsStore } from "@/stores/news";
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
    roles: [],
    // null = loggedOut, 1 = admin, 2 = student
    loggedUserID: getLocalStorage("loggedUser") || null,
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

    async getUsersBySchool(id, role = null) {
      const users = await this.getUsers();
      return users
        .filter((user) => user.schoolID === id)
        .filter((user) => {
          if (role) return user.role === role;
          return true;
        });
    },

    // Get roles
    async getRoles() {
      if (this.roles.length === 0) this.roles = await fetchData("roles");
      return this.roles;
    },

    // Authentication methods
    isUserLogged() {
      // return !!(this.loggedUserID !== null || getLocalStorage("loggedUser") !== null);
      return this.loggedUserID !== null;
    },

    async getLoggedUser() {
      const users = await this.getUsers();
      return users.find((user) => user.id === this.loggedUserID);
    },

    // Add user
    async addUser(newUser) {
      // name, password, email, school, internalId course, year
      const users = await this.getUsers();
      const userID = await this.getUserById(newUser.id);
      const urlParam = newUser.name.replace(/\s/g, "").toLowerCase();
      newUser.photo = `https://api.dicebear.com/5.x/personas/svg?seed=${urlParam}`;

      if (newUser.id !== userID) {
        users.push({
          id: crypto.randomUUID(),
          role: "unsigned",
          badges: [],
          highlightedBadge: null,
          ...newUser,
        });
        setLocalStorage("users", users);
        this.users = users;
        return this.users;
      }
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

    // Delete users from a school
    async deleteUsersFromSchool(id) {
      const newsStore = useNewsStore();

      const users = await this.getUsers();
      const usersFromSchool = await this.getUsersBySchool(id);

      // Delete every new created by the users from the school
      usersFromSchool.forEach(async (user) => {
        await newsStore.removeNewsCreatedByUser(user.id);
      });

      // Delete users from school
      const newUsers = users.filter((user) => user.schoolID !== id);
      this.users = newUsers;
      setLocalStorage("users", this.users);
    },

    // add new role
    async addRole(newRole) {
      const roles = await this.getRoles();

      roles.push(newRole);

      this.roles = roles;
      setLocalStorage("roles", this.roles);
    },
  },
});
