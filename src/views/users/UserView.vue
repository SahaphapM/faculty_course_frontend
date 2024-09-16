<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { computed, onMounted, ref } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { User } from '@/types/User'
import type { PageParams, SortItem } from '@/types/PageParams'
import FormDialog from '@/views/users/UserFormDialog.vue'
import MainTable from '@/components/table/MainTable.vue'
import { useLocale } from 'vuetify'

const userStore = useUserStore()
const roleStore = useRoleStore()
const { t } = useLocale()

const headers = computed(() => [
  { title: t('uid'), value: 'id', key: 'id', sortable: false },
  { title: t('email'), value: 'email', key: 'email', sortable: false },
  { title: t('first name'), value: 'firstName', key: 'firstName', sortable: false },
  { title: t('last name'), value: 'lastName', key: 'lastName', sortable: false },
  // { title: 'เพศ', value: 'gender' },
  // { title: 'เบอร์โทรศัพท์', value: 'phone' },
  { title: t('position'), value: 'roles', key: 'roles', sortable: false }
])

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
  search: '',
  columnId: '',
  columnName: ''
})

const fetchUsers = async (search?: string, columnId?: string, columnName?: string) => {
  loading.value = true
  if (search !== '' && search) {
    pageParams.value.search = search
  } else {
    pageParams.value.search = ''
  }
  if (columnId && columnName) {
    pageParams.value.columnId = columnId
    pageParams.value.columnName = columnName
  } else {
    pageParams.value.columnId = ''
    pageParams.value.columnName = ''
  }

  console.log(pageParams)
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
  //sorting
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

  // current page
  pageParams.value.page = options.page
  // item per page
  pageParams.value.limit = options.itemsPerPage
  // fetchUser
  fetchUsers()
}

onMounted(async () => {
  await roleStore.getRoles()
  await fetchUsers()
  console.log(userStore.users)
  console.log(userStore.totalUsers)
})
</script>

<template>
  <v-container fluid>
    <MainTable
      page-icon="mdi-account-group"
      :page-title="t('list user')"
      :items="userStore.users"
      :headers="headers"
      :fetchSearch="fetchUsers"
      :fetchFab="fetchUsers"
      :btnAddAction="addUser"
      :action="editUser"
      customCol="roles"
    >
      <template #roles="{ item }">
        <v-chip>
          {{ item.roles.map((n: any) => n.name)[0] }}
        </v-chip>
      </template>
    </MainTable>
  </v-container>
  <v-dialog max-width="1000px" v-model="dialog" persistent>
    <FormDialog
      :item="editedUser"
      :method="saveUser"
      :isUpdate="isUpdate"
      :roles="roleStore.roles"
      @close-dialog="closeDialog"
    ></FormDialog>
  </v-dialog>
</template>
<style scoped></style>
