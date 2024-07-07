<script setup lang="ts">
import { useRoleStore } from '@/stores/role';
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User';
import { onMounted, ref } from 'vue';

const userStore = useUserStore()
const roleStore = useRoleStore()
const dialog = ref(false)
const editedUser = ref(Object.assign({}, userStore.initialUser));
const isUpdate = ref(false)
const selectedRoles = ref()


const headers = [
  { text: 'Email', value: 'email' },
  { text: 'First Name', value: 'firstName' },
  { text: 'Last Name', value: 'lastName' },
  { text: 'Gender', value: 'gender' },
  { text: 'Phone', value: 'phone' },
  { text: 'Roles', value: 'roles' }, // Add a header for roles
  { text: 'Actions', value: 'actions', sortable: false }
]


onMounted(() => {
  userStore.fetchUsers()
  roleStore.getRoles()
})

const showAddUserDialog = () => {
  dialog.value = true
}

const editUser = (user: User) => {
  isUpdate.value = true
  editedUser.value = { ...user } // work with a temporary copy of editedUser.value ******************* 
  selectedRoles.value = userStore.editedUser.roles ? userStore.editedUser.roles.map(role => role.id) : [];
  console.log(selectedRoles.value)
  dialog.value = true
}

const deleteUser = async (id: string) => {
  await userStore.deleteUser(id)
}

const closeDialog = () => {
  userStore.clearForm()
  editedUser.value = Object.assign({}, userStore.initialUser)
  dialog.value = false
}

const saveUser = async () => {
  userStore.editedUser = editedUser.value

  if (isUpdate.value) {
    await userStore.updateUser()
  } else {
    await userStore.saveUser()
  }
  isUpdate.value = false
  userStore.clearForm()
  userStore.fetchUsers()
  closeDialog()
  dialog.value = false
}

</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="d-flex justify-space-between">

            Users
            <v-btn color="primary" @click="showAddUserDialog">Add User</v-btn>



          </v-card-title>
          <v-data-table :headers="headers" :items="userStore.users" class="elevation-1">

            <template v-slot:item.roles="{ item }">
              <v-chip-group>
                <v-chip v-for="role in item.roles" :key="role.id">
                  {{ role.name }}
                </v-chip>
              </v-chip-group>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
              <v-icon small @click="deleteUser(item.id)">mdi-delete</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>





    <v-dialog v-model="dialog" max-width="600px">
      <v-card>
        <v-card-title>
          <span v-if="editedUser.id">Edit User</span>
          <span v-else>Add User</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field v-model="editedUser.id" label="Id"></v-text-field>
            <v-text-field v-model="editedUser.email" label="Email"></v-text-field>
            <v-text-field v-model="editedUser.password" label="Password"></v-text-field>
            <v-text-field v-model="editedUser.firstName" label="First Name"></v-text-field>
            <v-text-field v-model="editedUser.middleName" label="Middle Name"></v-text-field>
            <v-text-field v-model="editedUser.lastName" label="Last Name"></v-text-field>
            <v-text-field v-model="editedUser.gender" label="Gender"></v-text-field>
            <v-text-field v-model="editedUser.phone" label="Phone"></v-text-field>
            <v-combobox v-model="editedUser.roles" multiple label="Roles" :items="roleStore.roles" item-title="name"
              item-value="id" :return-object="true"></v-combobox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="saveUser">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
