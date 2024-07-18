<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { User } from '@/types/User'
import type { PageParams } from '@/types/PageParams'

const userStore = useUserStore()
const roleStore = useRoleStore()

const headers = [
  { title: 'Email', value: 'email' },
  { title: 'First Name', value: 'firstName' },
  { title: 'Last Name', value: 'lastName' },
  { title: 'Gender', value: 'gender' },
  { title: 'Phone', value: 'phone' },
  { title: 'Roles', value: 'roles' },
  { title: 'Actions', value: 'actions', sortable: false }
]
const genders = ['Male', 'Female']

const dialog = ref(false)
const editedUser = ref(Object.assign({}, userStore.initialUser))
const isUpdate = ref(false)
const isCreate = ref(false)
const selectedRoles = ref()
const loading = ref(false)
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})

const fetchUsers = async () => {
  loading.value = true
  try {
    await userStore.fetchUsersPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching users:', error)
  } finally {
    loading.value = false
  }
}

const editUser = (user: User) => {
  isUpdate.value = true
  editedUser.value = { ...user } // work with a temporary copy of editedUser.value *******************
  selectedRoles.value = userStore.editedUser.roles
    ? userStore.editedUser.roles.map((role) => role.id)
    : []
  console.log(selectedRoles.value)
  dialog.value = true
}

const deleteUser = async (id: string) => {
  await userStore.deleteUser(id)
}

const showAddUserDialog = () => {
  isCreate.value = true
  dialog.value = true
}

const closeDialog = () => {
  userStore.clearForm()
  editedUser.value = Object.assign({}, userStore.initialUser)
  dialog.value = false
  isCreate.value = false
  isUpdate.value = false
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
  fetchUsers()
  closeDialog()
  dialog.value = false
}

const updateOptions = (options: any) => {
  pageParams.value.page = options.page
  pageParams.value.limit = options.itemsPerPage
  fetchUsers()
}

// watch(pageParams, fetchUsers, { deep: true })

onMounted(async () => {
  await roleStore.getRoles()
  fetchUsers()
  console.log(userStore.totalUsers)
})
</script>
<template>
  <v-container>
    <v-card>
      <v-card-title class="d-flex justify-space-between" style="font-weight: 400"
        >User List <v-btn color="primary" @click="showAddUserDialog">Add User</v-btn>
      </v-card-title>
      <v-data-table-server
        v-model:items-per-page="pageParams.limit"
        :headers="headers"
        :items="userStore.users"
        :items-length="userStore.totalUsers"
        :loading="loading"
        item-value="name"
        @update:options="updateOptions"
      >
        <template v-slot:top>
          <v-text-field
            v-model="pageParams.search"
            label="Search"
            @keydown.enter="fetchUsers"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.roles="{ item }">
          <v-chip-group>
            <v-chip v-for="role in item.roles" :key="role.id">
              {{ role.name }}
            </v-chip>
          </v-chip-group>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
          <v-icon small @click="deleteUser(item.id!)">mdi-delete</v-icon>
        </template>
      </v-data-table-server>
    </v-card>

    <!-- <v-card rounded="10" class="mx-auto" style="width: 520px; max-width: 80%; margin-top: 1px">
      <v-pagination
        next-icon="mdi-menu-right"
        prev-icon="mdi-menu-left"
        v-model="currentPage"
        :total-visible="visiblePages"
        :length="pages"
        rounded="10"
      ></v-pagination>
    </v-card> -->

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
            <v-text-field
              v-if="isCreate"
              v-model="editedUser.password"
              label="Password"
            ></v-text-field>
            <v-text-field v-model="editedUser.firstName" label="First Name"></v-text-field>
            <v-text-field v-model="editedUser.middleName" label="Middle Name"></v-text-field>
            <v-text-field v-model="editedUser.lastName" label="Last Name"></v-text-field>

            <v-select v-model="editedUser.gender" :items="genders" label="Base Gender"></v-select>
            <v-text-field v-model="editedUser.phone" label="Phone"></v-text-field>
            <v-combobox
              v-model="editedUser.roles"
              multiple
              label="Roles"
              :items="roleStore.roles"
              item-title="name"
              item-value="id"
              :return-object="true"
            ></v-combobox>
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
<style>
.icon-container {
  display: flex;
  align-items: center;
}

.icon-container > * {
  margin-right: 8px;
  /* Add some spacing between icons */
}
</style>
