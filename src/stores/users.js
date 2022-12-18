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
      return getLocalStorage("loggedUser" !== null);
    },

    getLoggedUser() {
      const loggedUserId = getLocalStorage("loggedUser");
      if (!loggedUserId) return null;
      return getUser.value(loggedUserId);
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
    updateHighlightedBadge(id, badgeId) {
      this.users.value.find((user) => user.id === id).highlightedBadge =
        badgeId;
      setLocalStorage("users", this.users);
    },

    unlockBadge(id, badgeId) {
      this.users.value.find((user) => user.id === id).badges.push(badgeId);
      setLocalStorage("users", this.users);
    },

    login(email, password) {
      const user = this.users.value.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) return "User not found or wrong password.";

      setLocalStorage("loggedUser", user.id);
      return user;
    },

    logout() {
      setLocalStorage("loggedUser", null);
    },

    // Create new user
    createNewUser(newUser) {
      // check if user already exists
      if (this.users.value.find((user) => user.email === newUser.email))
        return "User already exists.";

      // create new user
      this.users.value.push({ id: uuid.v4(), ...newUser });
      setLocalStorage("users", this.users);
      return "User created successfully.";
    },
  },
});
