<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import axios from 'axios'
import { useUserStore } from '@/stores/user'
import type { User } from '@/types/User'
import type { PageParams } from '@/types/PageParams'

const userStore = useUserStore()

const headers = [
  { title: 'Email', value: 'email' },
  { title: 'First Name', value: 'firstName' },
  { title: 'Last Name', value: 'lastName' },
  { title: 'Gender', value: 'gender' },
  { title: 'Phone', value: 'phone' },
  { title: 'Roles', value: 'roles' },
  { title: 'Actions', value: 'actions', sortable: false }
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

watch(pageParams, fetchUsers, { deep: true })

onMounted(async () => {
  await fetchUsers()
  console.log(userStore.totalUsers)
})
</script>

<template>
  <div>
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
  </div>
</template>

<style scoped>
.mx-4 {
  margin-left: 16px;
  margin-right: 16px;
}
</style>
