<!--
	TODO: gör så att knapparna gör något
 -->

<script setup lang="ts">
import { ref } from "vue"
import { Ref } from "vue"
import { useLogStore } from "../stores/LogStore"
import { useLogInStore } from "../stores/LogInStore"

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

// const password_axel= axel
// // eval('"password." + eval("props.cols[1].value"
// password
// eval(props.name)

function createTeacher() {
  useLogInStore().addUser(newName.value, newPassword.value, "teacher")
  useLogStore().addUser(newEmail.value,newName.value, "teacher", "")
}

const props = defineProps<{ teachers: IPerson[] }>()

const rows = ref(props.teachers)

const password: Ref<Array<string>> = ref([])

function savePassword(index: number, email: string): void {
  console.log(index)
  console.log(password.value[index])
  console.log(email)
  const userId = useLogStore().getIdByEmail(email)
  useLogInStore().changePassword(userId[0], password.value[index])
}

// new teacher
const newEmail = ref("")
const newName = ref("")
const newPassword = ref("")

// table
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
</script>

<template>
  <div class="q-pa-md">
    <q-table
      title="Teachers"
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
      </div>
      <div class="row justify-end q-pa-md">
        <q-btn @click="createTeacher()" class="col-mc" color="green"
          >Create</q-btn
        >
      </div>
    </q-card>
  </div>
</template>
