import { defineStore } from "pinia";
import { uuid } from "vue-uuid";
import { getLocalStorage, setLocalStorage } from "../hooks/localStorage";

function fetchUsers() {
  const users = getLocalStorage("users");

  return users
    ? users
    : [
        {
          id: uuid.v4(),
          internalId: null,
          name: "Alice Smith",
          email: "alice.smith@gmail.com",
          password: "123",
          role: "admin",
          school: "ESMAD",
          course: null,
          year: null,
          photo: null,
          badges: [0, 2, 4], // badges ids
          highlightedBadge: 2,
        },
      ];
}

export const useUsersStore = defineStore("users", {
  state: () => ({
    users: fetchUsers(),
    loggedUserID: null,
  }),

  actions: {
    // Getters
    getUsers() {
      return this.users;
    },

    getUserById(id) {
      return this.users.find((user) => user.id === id);
    },

    getUsersByRole(role) {
      users.value.filter((user) => user.role === role);
    },

    getUsersBySchool(school, role = null) {
      users.value
        .filter((user) => user.school === school) // Filter by school
        .filter((user) => {
          if (role) return user.role === role; // Filter by role
          return true;
        });
    },

    // Authentication methods
    isUserLogged() {
      return this.loggedUser !== null;
    },

    getLoggedUser() {
      const user = this.users.find((user) => user.id === this.loggedUser);
      return user ? user : null;
    },

    // Add user
    addUser(newUser) {
      this.users.push({ id: uuid.v4(), ...newUser });
      setLocalStorage("users", this.users);
    },

    // Edit user data
    editUser(id, newData) {
      const index = this.users.findIndex((user) => user.id === id);
      if (index === -1) return;

      this.users[index].email = newData.email;
      this.users[index].password = newData.password;
      this.users[index].course = newData.course;
      this.users[index].year = newData.year;
      this.users[index].photo = newData.photo;

      setLocalStorage("users", this.users);
    },

    // Change user role
    changeUserRole(id, newRole) {
      this.users.value.find((user) => user.id === id).role = newRole;
      setLocalStorage("users", this.users);
    },

    // Update Highlighted Badge
    updateHighlightedBadge(badgeId) {
      this.users.value.find(
        (user) => user.id === this.loggedUserID
      ).highlightedBadge = badgeId;
      setLocalStorage("users", this.users);
    },

    // Unlock a new Badge
    unlockBadge(badgeId) {
      this.users.value
        .find((user) => user.id === this.loggedUserID)
        .badges.push(badgeId);
      setLocalStorage("users", this.users);
    },

    // Login
    login(email, password) {
      const user = this.users.value.find(
        (user) => user.email === email && user.password === password
      );
      if (!user) return false;

      setLocalStorage("loggedUser", user.id);
      this.loggedUserID = user.id;

      return true;
    },

    // Logout
    logout() {
      this.loggedUserID = null;
    },

    // Create new user
    createNewUser(newUser) {
      // check if user already exists
      if (this.users.value.find((user) => user.email === newUser.email))
        return false;

      // create new user
      this.users.value.push({ id: uuid.v4(), ...newUser });
      setLocalStorage("users", this.users);
      return true;
    },
  },
});
