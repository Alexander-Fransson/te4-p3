import { defineStore } from "pinia"

interface IUser {
  email: string
  username: string
  role: string
}

export const useUserStore = defineStore("useUserStore", {
  state: () => {
    return {
      users: [
        {
          email: "isac@email.com",
          username: "isac",
          role: "student",
        },
        {
          email: "axel@email.com",
          username: "axel",
          role: "teacher",
        },
      ] as IUser[],
    }
  },
  getters: {
    all: (state) => state.users,
    teachers: (state) => state.users.filter((user) => user.role === "teacher"),
    students: (state) => state.users.filter((user) => user.role === "student"),
  },
  actions: {},
})
