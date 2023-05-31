import { defineStore } from "pinia"

interface IPerson {
  name: string
  role: string
  id: number
  email: string
  teacher: string
}

export const useLogStore = defineStore("useLogStore", {
  state: () => {
    return {
      users: [],
      test: "testing store",
      loginState: [
        {
          name: "isac",
          role: "student",
          id: 1,
          email: "isac@mail.com",
          teacher: "axel",
        },
        {
          name: "axel",
          role: "teacher",
          id: 2,
          email: "axel@mail.com",
          teacher: "",
        },
        {
          name: "axul",
          role: "teacher",
          id: 3,
          email: "axul@mail.com",
          teacher: "",
        },
        {
          name: "axil",
          role: "student",
          id: 4,
          email: "axil@mail.com",
          teacher: "axul",
        },
      ],
    }
  },
  // FIXME: använder någon den här??????????????
  getters: {
    login(state): string {
      return state.loginState[0].name
    },
  },
  actions: {
    getNameById(id: number): Array<string> {
      const output: string[] = []
      this.loginState.forEach((person) => {
        if (person.id == id) {
          output.push(person.name)
        }
      })
      return output
    },
    getRoleById(id: number): Array<string> {
      const output: string[] = []
      this.loginState.forEach((person) => {
        if (person.id == id) {
          output.push(person.role)
        }
      })
      return output
    },
    getIdByEmail(email: string): Array<number> {
      const output: number[] = []
      this.loginState.forEach((person) => {
        if (person.email == email) {
          output.push(person.id)
        }
      })
      return output
    },
    getStudentsByTeacher(teacher: string): Array<IPerson> {
      const output: IPerson[] = []
      this.loginState.forEach((person) => {
        if (person.teacher == teacher) {
          output.push(person)
        }
      })
      return output
    },

    getStudents(): Array<IPerson> {
      const output: Array<IPerson> = []
      this.loginState.forEach((person) => {
        if ("student" == person.role) {
          output.push(person)
        }
      })
      return output
    },
    getTeachers(): Array<IPerson> {
      const output: Array<IPerson> = []
      this.loginState.forEach((person) => {
        if ("teacher" == person.role) {
          output.push(person)
        }
      })
      return output
    },
    addUser(email: string, name: string, role: string, teacher: string): void {
      const userId = this.loginState.length
      this.loginState.push({
        name: name,
        email: email,
        role: role,
        id: userId,
        teacher: teacher,
      })
    },
    changeTeacher(id: number, teacher: string): void {
      this.loginState.forEach((person) => {
        if (person.id == id) {
          person.teacher = teacher
        }
      })
    },

    getIdByName(name: string): Array<number> {
      const output: number[] = []
      this.loginState.forEach((person) => {
        if (person.name == name) {
          output.push(person.id)
        }
      })
      return output
    },

    getTeacherById(id: number): number {
      const output: number[] = []
      this.loginState.forEach((person) => {
        if (person.id == id) {
          output.push(this.getIdByName(person.teacher)[0])
        }
      })
      return output[0]
    },
  },
})
