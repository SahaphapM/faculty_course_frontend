import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import userService from '@/service/user'
import type { PageParams } from '@/types/PageParams'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const totalUsers = ref(0)

  const initialUser: User = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    roles: []
  }

  const editedUser = ref<User>({ ...initialUser })

  function clearCurrentUser() {
    currentUser.value = null
  }

  const addUser = (user: User) => {
    users.value.push(user)
  }

  async function fetchUsersPage(params: PageParams) {
    const res = await userService.getUsersByPage(params)
    users.value = res.data.data
    totalUsers.value = res.data.total
  }

  async function fetchUser(id: string) {
    const res = await userService.getUser(id)
    editedUser.value = res.data
  }

  async function fetchUsers() {
    const res = await userService.getUsers()
    users.value = res.data
  }

  async function saveUser() {
    const user = editedUser.value
    await userService.addUser(user)
  }

  async function updateUser() {
    const user = editedUser.value
    await userService.updateUser(user)
  }

  async function updateImage(userId: string, file: File) {
    await userService.updateImageUser(userId, file)
  }

  async function deleteUser(id: string) {
    await userService.delUser(id)
    await fetchUsers()
  }

  function clearForm() {
    editedUser.value = { ...initialUser }
  }

  return {
    addUser,
    users,
    currentUser,
    clearCurrentUser,
    fetchUser,
    fetchUsers,
    saveUser,
    deleteUser,
    editedUser,
    clearForm,
    updateUser,
    initialUser,
    fetchUsersPage,
    totalUsers,
    updateImage
  }
})
