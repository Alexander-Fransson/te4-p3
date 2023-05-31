import { defineStore } from "pinia"
//import { date } from "quasar"
import { ref, Ref } from "vue"
interface ISDay {
  signedInId: number
  role: string
  signedIn: boolean
  selectedDay: string
  selectedWeek: number
  selectedUser: number
  singedInUserRole: Ref<string>
}

export const EnvVariables = defineStore("EnvVariables", {
  state: () => {
    return {
      signedInId: -1,
      role: "teacher",
      signedIn: false,
      selectedDay: "Monday",
      selectedWeek: 4,
      selectedUser: 1,

      singedInUserRole: ref(""),
    } as ISDay
  },
  getters: {},
  actions: {
    changeSelectedDay(day: string): void {
      this.selectedDay = day
    },
  },
})
