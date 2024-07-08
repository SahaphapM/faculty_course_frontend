<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { computed, onMounted, ref, watch } from 'vue';
import { useRoleStore } from '@/stores/role';
import type { User } from '@/types/User';

const userStore = useUserStore()
const roleStore = useRoleStore()

const headers = [
    { text: 'Email', value: 'email' },
    { text: 'First Name', value: 'firstName' },
    { text: 'Last Name', value: 'lastName' },
    { text: 'Gender', value: 'gender' },
    { text: 'Phone', value: 'phone' },
    { text: 'Roles', value: 'roles' }, // Add a header for roles
    { text: 'Actions', value: 'actions', sortable: false }
]
const genders = ['Male', 'Female']

const currentPage = ref(1)
const limit = 10
const pages = ref(1)
const visiblePages = 6; // Number of visible pages before/after the selected page
const dialog = ref(false)
const editedUser = ref(Object.assign({}, userStore.initialUser));
const isUpdate = ref(false)
const isCreate = ref(false)
const selectedRoles = ref()


const fetchPage = async (pageNumber: number, limit: number) => {
    await userStore.fetchUsersPage(pageNumber, limit);
};

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
    fetchPage(currentPage.value, limit)
    closeDialog()
    dialog.value = false
}

watch(currentPage, async (newPage, oldPage) => {
    fetchPage(newPage, limit)
})

onMounted(async () => {
    await roleStore.getRoles()
    await fetchPage(currentPage.value, limit)
    pages.value = Math.ceil(userStore.totalUsers / limit);
    console.log(userStore.totalUsers)
    console.log(pages)
})

</script>
<template>
    <v-container>
        <v-card>
            <v-card-title class="d-flex justify-space-between " style="font-weight: 400;">User List <v-btn
                    color="primary" @click="showAddUserDialog">Add User</v-btn>
            </v-card-title>
            <v-table>
                <thead>
                    <tr style="background-color: royalblue; ">
                        <th class="text-left ">
                            Email
                        </th>
                        <th class="text-left ">
                            First Name
                        </th>
                        <th class="text-left ">
                            Last Name
                        </th>
                        <th class="text-left">
                            Sex
                        </th>
                        <!-- <th class="text-left ">
                            Phone
                        </th> -->
                        <th class="text-left ">
                            Roles
                        </th>
                        <th class="text-left ">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in userStore.users" :key="item.email" style="margin: 0%">
                        <td>{{ item.email }}</td>
                        <td>{{ item.firstName }}</td>
                        <td>{{ item.lastName }}</td>
                        <td>{{ item.gender }}</td>
                        <!-- <td>{{ item.phone }}</td> -->
                        <td>
                            <v-chip v-for="role in item.roles" :key="role.id"
                                style="margin-right: 5px; min-width: 40%; height: 20px; font-size: 12px; padding: 5%;">
                                {{ role.name }}
                            </v-chip>
                        </td>
                        <td>
                            <div class="icon-container"> <v-icon small @click="editUser(item)">mdi-pencil</v-icon>
                                <v-icon small @click="deleteUser(item.id!)">mdi-delete</v-icon>
                            </div>

                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>


        <v-card rounded="10" class=" mx-auto" style=" width: 520px; max-width: 80%; margin-top: 1px">
            <v-pagination next-icon="mdi-menu-right" prev-icon="mdi-menu-left" v-model="currentPage"
                :total-visible="visiblePages" :length="pages" rounded="10"></v-pagination>
        </v-card>


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
                        <v-text-field v-if="isCreate" v-model="editedUser.password" label="Password"></v-text-field>
                        <v-text-field v-model="editedUser.firstName" label="First Name"></v-text-field>
                        <v-text-field v-model="editedUser.middleName" label="Middle Name"></v-text-field>
                        <v-text-field v-model="editedUser.lastName" label="Last Name"></v-text-field>

                        <v-select v-model="editedUser.gender" :items="genders" label="Base Gender"></v-select>
                        <v-text-field v-model="editedUser.phone" label="Phone"></v-text-field>
                        <v-combobox v-model="editedUser.roles" multiple label="Roles" :items="roleStore.roles"
                            item-title="name" item-value="id" :return-object="true"></v-combobox>
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

.icon-container>* {
    margin-right: 8px;
    /* Add some spacing between icons */
}
</style>