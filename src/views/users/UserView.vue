<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { onMounted, ref } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { User } from '@/types/User'
import type { PageParams, SortItem } from '@/types/PageParams'
import FormDialog from '@/views/users/UserFormDialog.vue'
import Pagination from '../../components/Pagination.vue'
import SearchData from '@/components/SearchData.vue'

const userStore = useUserStore()
const roleStore = useRoleStore()

const headers = [
  { title: 'ID', value: 'id', key: 'id' },
  { title: 'Email', value: 'email', key: 'email' },
  { title: 'First Name', value: 'firstName', key: 'firstName' },
  { title: 'Last Name', value: 'lastName', key: 'lastName' },
  { title: 'Gender', value: 'gender' },
  { title: 'Phone', value: 'phone' },
  { title: 'Roles', value: 'roles' },
  { title: 'Actions', value: 'actions', sortable: false }
]

const dialog = ref(false)
const editedUser = ref(Object.assign({}, userStore.initialUser))
const isUpdate = ref(false)
const isCreate = ref(false)
const selectedRoles = ref()
const loading = ref(false)
const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }])
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})

const fetchUsers = async (search?: string) => {
  // search is variable to search null able
  loading.value = true
  if (search) {
    pageParams.value.search = search
    console.log(pageParams.value.search)
  } else {
    pageParams.value.search = ''
  }
  console.log(pageParams.value.search)
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

const closeDialog = () => {
  userStore.clearForm()
  editedUser.value = Object.assign({}, userStore.initialUser)
  dialog.value = false
  isCreate.value = false
  isUpdate.value = false
}

const updateOptions = (options: any) => {
  if (options.sortBy.length === 0) {
    // Set default sort when sortBy is empty
    sortBy.value = [{ key: 'id', order: 'asc' }]
  } else {
    // Update sortBy and sortDesc based on user selection
    sortBy.value = options.sortBy
  }
  // toUpperCase
  pageParams.value.sort = sortBy.value[0].key
  if (sortBy.value[0].order === 'desc') {
    pageParams.value.order = 'DESC'
  } else {
    pageParams.value.order = 'ASC'
  }
  // fetchUser
  fetchUsers()
}

const clickHandler = (page: number) => {
  fetchUsers()
  console.log(page)
}

// watch(pageParams, fetchUsers, { deep: true })

onMounted(async () => {
  await roleStore.getRoles()
  fetchUsers()
  console.log(userStore.totalUsers)
})
</script>
<template>
  <v-container class="pa-8">
    <v-card rounded="lg" flat>
      <v-card flat>
        <v-card-title class="d-flex align-center pa-2">
          <v-row>
            <v-col cols="12" md="1"></v-col>
            <v-col cols="12" md="3" style="font-size: xx-large">User </v-col>
            <v-col cols="12" md="6">
              <!-- <v-text-field
                clearable
                label="Name"
                variant="outlined"
                prepend-inner-icon="mdi-magnify"
                v-model="pageParams.search"
                rounded="lg"
                @keydown.enter="fetchUsers"
              ></v-text-field> -->
              <SearchData
                :label="'ค้นหาผู้ใช้'"
                :search="pageParams.search"
                :fetch-data="fetchUsers"
              ></SearchData>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn width="90px" height="30px" rounded="lg" @click="addUser"> ADD NEW</v-btn>
            </v-col>
          </v-row>

          <!-- <v-spacer></v-spacer> -->
        </v-card-title>

        <v-divider class="ma-2"></v-divider>

        <v-row>
          <v-col>
            <v-data-table-server
              density="default"
              v-model:items-per-page="pageParams.limit"
              :headers="headers"
              :items="userStore.users"
              :items-length="userStore.totalUsers"
              :loading="loading"
              item-value="name"
              class="custom-header"
              @update:options="updateOptions"
              hide-default-footer
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
              </template></v-data-table-server
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <Pagination
              :current-page="pageParams.page"
              :items-per-page="pageParams.limit"
              :total-items="userStore.totalUsers"
              v-model="pageParams.page"
              :max-pages-shown="3"
              @click="clickHandler"
            ></Pagination>
          </v-col>
        </v-row>
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

.pagination-container {
  column-gap: 5px;
}
.paginate-buttons {
  height: 35px;
  width: 50px;
  border-radius: 15px;
  background-color: #2d487e;

  color: rgb(255, 255, 255);
  font-size: 12px;
  font-weight: 600;
}
.paginate-buttons:hover {
  background-color: #4a5670;
}
.active-page {
  border: 1.5px solid #2d487e;
  background-color: #ffffff;
  color: #2d487e;
}
.active-page:hover {
  background-color: #ffffff;
}
/* Pagination Mobile responsive styling */
@media (max-width: 600px) {
  .pagination-container {
    column-gap: 2px;
  }

  .paginate-buttons {
    height: 25px;
    width: 35px;
    font-size: 10px;
  }

  .active-page {
    height: 30px;
    width: 40px;
    font-size: 10px;
  }
}
</style>