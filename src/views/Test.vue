<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User'
import type { PageParams } from '@/types/PageParams'
import MainTable from '@/components/table/MainTable.vue'
import type { BreadItem } from '@/types/Breaditem'
import SearchData from '@/components/table/SearchTextfield.vue'

const userStore = useUserStore()

const headers = [
  { title: 'Email', key: 'email', value: 'email', sortable: false },
  { title: 'First Name', key: 'firstName', value: 'firstName', sortable: false },
  { title: 'Last Name', key: 'lastName', value: 'lastName', sortable: false },
  { title: 'Phone', key: 'phone', value: 'phone', sortable: true }
]

const items = [
  { email: 'john@gmail.com', firstName: 'john', lastName: 'wick', phone: '0888527971' }
]
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

const editUser = (user: User) => {}

const deleteUser = async (id: string) => {
  await userStore.deleteUser(id)
}

const updateOptions = (options: any) => {
  pageParams.value.page = options.page
  pageParams.value.limit = options.itemsPerPage
}

// watch(pageParams, fetchUsers, { deep: true })

// onMounted(async () => {
//   await fetchUsers()
//   console.log(userStore.totalUsers)
// })

const breads: BreadItem[] = [
  { title: 'home', disabled: false, href: '/' },
  { title: 'admin', disabled: true, href: '/MainIFAdmin' }
]
</script>

<template>
  <!-- <div>
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
  </div> -->
  <v-container fluid>
    <v-breadcrumbs :items="breads"></v-breadcrumbs>
    <MainTable
      page-icon="mdi-cog"
      page-title="test"
      :items="items"
      :headers="headers"
      :fetchSearch="async () => {}"
      :btnAddAction="() => {}"
      :hasCombobox="['yes', 'no']"
      :hasFaculty="['yai', 'lek']"
      :action="() => {}"
      :items-per-page="10"
    />
  </v-container>
</template>

<style scoped>
.even-row {
  background-color: #f9f9f9;
  color: black;
  text-align: left;
}
.odd-row {
  background-color: #ffffff;
  color: black;
  text-align: left;
}
</style>
