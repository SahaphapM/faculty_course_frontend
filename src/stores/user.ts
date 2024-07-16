import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types/User'
import userService from '@/service/user'

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const currentUser = ref<User | null>(null)
  const totalUsers = ref(0)

  const initialUser: User = {
    id: '',
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    phone: '',
    googleId: '',
    roles: []
  }

  const editedUser = ref<User>({ ...initialUser })

  function clearCurrentUser() {
    currentUser.value = null
  }

  const addUser = (user: User) => {
    users.value.push(user)
  }

  async function fetchUsersPage(page: number, limit: number) {
    const res = await userService.getUsersByPage(page, limit)
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
    user.id = null
    await userService.addUser(user)
  }

  async function updateUser() {
    const user = editedUser.value
    console.log(user)
    await userService.updateUser(user)
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
    totalUsers
  }
})
