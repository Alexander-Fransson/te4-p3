import { defineStore } from "pinia"

interface IUser {
  name: string
  role: string
  id: number
  password: string
}
export const useLogInStore = defineStore("useLogInStore", {
  state: () => {
    return {
      loginState: [
        { name: "isac", role: "student", id: 1, password: "isac" },
        { name: "axel", role: "teacher", id: 2, password: "axel" },
        { name: "axul", role: "teacher", id: 3, password: "axul" },
        { name: "axil", role: "student", id: 4, password: "axil" },
      ] as Array<IUser>,
    }
  },
  getters: {
    users(): Array<IUser> {
      return this.loginState
    },
  },
  actions: {
    changePassword(id: number, password: string): void {
      this.loginState.forEach((person) => {
        if (person.id == id) {
          person.password = password
        }
      })
    },
    addUser(name: string, password: string, role: string): void {
      const userId = this.loginState.length
      this.loginState.push({
        name: name,
        password: password,
        role: role,
        id: userId,
      })
    },
  },
})
