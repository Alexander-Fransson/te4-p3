<!--
	TODO: Hämta användare dynamiskt
	TODO: Hämta teachers dynamiskt
	TODO: gör så att knapparna gör något
 -->

<script setup lang="ts">
import { useLogStore } from "../stores/LogStore"
import { useLogInStore } from "../stores/LogInStore"
import { ref } from "vue"
import { Ref } from "vue"
import router from "../router"

interface IRow {
  email: string
  name: string
}

interface IPerson {
  name: string
  role: string
  id: number
  email: string
  teacher: string
}

const props = defineProps<{
  teachers: IPerson[]
  students: IPerson[]
}>()

//selects

const options = props.teachers.map((teacher: IPerson) => {
  return teacher.name
})
const selectedTeacher = ref(
  props.students.map((student: IPerson) => {
    return student.teacher
  })
)

const rows = ref(props.students)

// new teacher
const newEmail = ref("")
const newName = ref("")
const newPassword = ref("")
const newTeacher = ref(selectedTeacher.value[0])

// table
const password: Ref<Array<string>> = ref([])

function savePassword(index: number, email: string): void {
  console.log(index)
  console.log(password.value[index])
  console.log(email)
  const userId = useLogStore().getIdByEmail(email)
  useLogInStore().changePassword(userId[0], password.value[index])
}

function saveTeacher(teacher: string, email: string) {
  console.log(email)
  const userId = useLogStore().getIdByEmail(email)
  useLogStore().changeTeacher(userId[0], teacher)
}

const columns: any = [
  {
    name: "email",
    required: true,
    label: "Email",
    align: "left",
    field: (row: IRow) => row.email,
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: "name",
    align: "left",
    label: "Name",
    field: "name",
    sortable: true,
  },
]

function createStudent() {
  useLogInStore().addUser(newName.value, newPassword.value, "student")
  useLogStore().addUser(newEmail.value, newName.value, "student", newTeacher.value
  )
  // router.push("/admin")
}

// const rows = [
//   {
//     email: "isac@mail.com",
//     name: "Isac",
//   },
//   {
//     email: "axel@mail.com",
//     name: "Axel",
//   },
//   {
//     email: "Alexander1@mail.com",
//     name: "Alexander 1",
//   },
//   {
//     email: "Alexander2@mail.com",
//     name: "Alexander 2",
//   },
// ]
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Students"
      :rows="rows"
      :columns="columns"
      row-key="name"
      hide-bottom
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
          <q-th>
            <span>Teacher</span>
          </q-th>

          <q-th align="left">
            <span>password</span>
          </q-th>
          <q-th />
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td
            auto-width
            v-for="col in props.cols"
            :key="col.name"
            :props="props"
          >
            {{ col.value }}
          </q-td>

          <q-td auto-width>
            <q-select
              @update:model-value="(val: string) => saveTeacher(val, props.cols[0].value)"
              v-model="selectedTeacher[props.rowIndex]"
              :options="options"
              label="Teacher"
            />
          </q-td>
          <q-td auto-width>
            <q-input
              v-model="password[props.rowIndex]"
              :props="props"
              label="Password"
            />
          </q-td>
          <q-td auto-width>
            <q-btn
              :props="props"
              @click="savePassword(props.rowIndex, props.cols[0].value)"
              size="sm"
              square
              color="blue"
              >Reset</q-btn
            >
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <q-card>
      <div class="q-pa-md row no-wrap">
        <q-input v-model="newEmail" class="col-md" label="Email" />
        <q-input v-model="newName" class="col-md" label="Name" />
        <q-input v-model="newPassword" class="col-md" label="Password" />
        <q-select v-model="newTeacher" :options="options" label="Teacher" />
      </div>
      <div class="row justify-end q-pa-md">
        <q-btn @click="createStudent()" class="col-mc" color="green"
          >Create</q-btn
        >
      </div>
    </q-card>
  </div>
</template>
