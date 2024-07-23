<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { User } from '@/types/User'
import type { PageParams } from '@/types/PageParams'
import FormDialog from '@/views/users/UserFormDialog.vue'

const userStore = useUserStore()
const roleStore = useRoleStore()

const headers = [
  { title: 'ID', value: 'id' },
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
  editedUser.value = { ...user } // work with a temporary copy of editedUser.value *******************
  selectedRoles.value = userStore.editedUser.roles
    ? userStore.editedUser.roles.map((role) => role.id)
    : []

  if (editedUser.value.id) {
    isUpdate.value = true
    dialog.value = true
  }
}

const deleteUser = async (id: string) => {
  await userStore.deleteUser(id)
}

const addUser = () => {
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

const saveUser = async (user: User) => {
  userStore.editedUser = user

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
    <v-card class="pa-3" rounded="lg">
      <v-card flat>
        <v-card-title class="d-flex align-center pa-2">
          <v-row>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="3" style="font-size: xx-large">User </v-col>
            <v-col cols="12" md="6">
              <v-text-field
                clearable
                label="Name"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                v-model="pageParams.search"
                rounded="lg"
                @keydown.enter="fetchUsers"
              ></v-text-field>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn
                rounded="lg"
                style="height: 55px; margin-bottom: 2%; margin-left: 1.6%; width: 150px"
                @click="addUser"
              >
                <v-icon>mdi-plus</v-icon>&nbsp; ADD NEW</v-btn
              >
            </v-col>
          </v-row>

          <!-- <v-spacer></v-spacer> -->
        </v-card-title>

        <v-divider class="ma-2"></v-divider>

        <v-data-table-server
          v-model:items-per-page="pageParams.limit"
          :headers="headers"
          :items="userStore.users"
          :items-length="userStore.totalUsers"
          :loading="loading"
          item-value="name"
          @update:options="updateOptions"
          class="custom-header"
        >
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

      <v-dialog max-width="1000px" persistent v-model="dialog">
        <FormDialog
          :item="editedUser"
          :method="saveUser"
          :isUpdate="isUpdate"
          :roles="roleStore.roles"
          @close-dialog="closeDialog"
        ></FormDialog>
      </v-dialog>
    </v-card>
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
.custom-header {
  /* background-color: #2b5ec3;
  color: #ffffff; */
}
</style>
