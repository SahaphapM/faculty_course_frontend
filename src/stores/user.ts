import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { User } from '@/types/User';
import userService from '@/service/user';

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([]);
  const currentUser = ref<User | null>(null);

  const initialUser: User = {

    id: '' ,
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '' ,
    gender: '',
    phone: '',
    googleId: '',
    roles: null
  };

  const editedUser = ref<User>({ ...initialUser });

  function clearCurrentUser() {
    currentUser.value = null;
  }

  const addUser = (user: User) => {
    users.value.push(user);
  };

  async function fetchUser(id: string) {
    const res = await userService.getUser(id);
    editedUser.value = res.data;
  }

  async function fetchUsers() {
    const res = await userService.getUsers();
    users.value = res.data;
  }


  async function saveUser() {
    const user = editedUser.value;
    await userService.addUser(user);
  }
  
  async function updateUser() {
    const user = editedUser.value;
    await userService.updateUser(user);
  }



  
  async function deleteUser(id: string) {
    await userService.delUser(id);
    await fetchUsers();
  }

  function clearForm() {
    editedUser.value = { ...initialUser };
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
  };
});