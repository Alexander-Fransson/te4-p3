import { defineStore } from "pinia"
//import { registerRuntimeCompiler } from "vue"
import "../../../Functions/date.extensions"

const weekNumber = new Date().getWeek()

function areEqual(array1: number[], array2: number[]) {
  // console.log(array1, array2)
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true
      }

      return false
    })
  }

  return false
}

interface IMessages {
  sender_id: number
  recipient_ids: number[]
  read: boolean
  type: "log" | "comment"
  content: string
  weekDay:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  weekNumber: number
  time: Date
}

export const useMessagesStore = defineStore("useMessagesStore", {
  state: () => {
    return {
      messages: [
        {
          sender_id: 1,
          recipient_ids: [2, 1],
          read: false,
          type: "comment",
          content: "you call this a comment.",
          weekNumber: 4,
          weekDay: "Monday",
          time: new Date(),
        },
        {
          sender_id: 2,
          recipient_ids: [1, 2],
          read: false,
          type: "comment",
          content: "yes i do you inconsiderate chutni.",
          weekNumber: 4,
          weekDay: "Monday",
          time: new Date(),
        },
        {
          sender_id: 1,
          recipient_ids: [2, 1],
          read: false,
          type: "comment",
          content: "dont talk back to me you lowly comoner.",
          weekNumber: 4,
          weekDay: "Monday",
          time: new Date(),
        },
        {
          sender_id: 1,
          recipient_ids: [2, 1],
          read: false,
          type: "comment",
          content: "where did you go",
          weekNumber: 4,
          weekDay: "Tuesday",
          time: new Date(),
        },
        {
          sender_id: 1,
          recipient_ids: [1, 0],
          read: false,
          type: "log",
          content: "this is a log for Monday from user 1",
          weekNumber: 4,
          weekDay: "Monday",
          time: new Date(),
        },
      ] as IMessages[],
    }
  },
  getters: {
    weekNumber() {
      return weekNumber
    },
    weekDay():
      | "Sunday"
      | "Monday"
      | "Tuesday"
      | "Wednesday"
      | "Thursday"
      | "Friday"
      | "Saturday" {
      const dayNames: (
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday"
      )[] = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ]
      const now = new Date()

      return dayNames[now.getDay()]
    },
  },
  actions: {
    getMessages(
      weekDay:
        | "Sunday"
        | "Monday"
        | "Tuesday"
        | "Wednesday"
        | "Thursday"
        | "Friday"
        | "Saturday",
      weekNumber: number,
      recipientIds: number[]
    ) {
      const c = this.messages.filter((message) => {
        // console.log(
        //   recipientIds.sort(),
        //   message.content,
        //   message.weekDay == weekDay,
        //   message.weekNumber == weekNumber,
        //   areEqual(message.recipient_ids.sort(), recipientIds.sort()),
        //   message.recipient_ids.sort()
        // )

        return (
          areEqual(message.recipient_ids.sort(), recipientIds.sort()) &&
          message.weekDay == weekDay &&
          message.weekNumber == weekNumber
        )
      })
      if (c.length > 0) {
        return c
      } else {
        const v = {
          sender_id: 0,
          recipient_ids: [0],
          read: false,
          type: "log",
          content: "",
          weekNumber: 0,
          weekDay: "",
          time: new Date(),
        }
        return [v]
      }
    },
    addMessage(
      sender_id: number,
      recipient_ids: number[],
      content: string,
      type: "log" | "comment"
    ) {
      this.messages = [
        ...this.messages,
        {
          sender_id: sender_id,
          recipient_ids: recipient_ids,
          read: false,
          type: type,
          content: content,
          weekNumber: this.weekNumber,
          weekDay: this.weekDay,
          time: new Date(),
        },
      ]
    },
    uppdateLog(newMessage: IMessages) {
      const update = this.messages.map((message: IMessages) => {
        if (
          message.sender_id == newMessage.sender_id &&
          message.weekDay == newMessage.weekDay &&
          message.weekNumber == newMessage.weekNumber &&
          message.type == "log" &&
          newMessage.type == "log"
        ) {
          return newMessage
        } else {
          return message
        }
      })

      this.messages = []

      this.messages = update
    },
  },
})
