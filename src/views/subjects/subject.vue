<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject';
import { useUserStore } from '@/stores/user';
import type { Subject } from '@/types/Subjects';
import type { User } from '@/types/User';
import { computed, nextTick, onMounted, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import type { PageParams } from '@/types/PageParams'
import SearchData from '@/components/SearchData.vue'
import AddButton from '@/components/AddButton.vue'
const subjects = computed(() => subjectStore.subjects)
const subjectStore = useSubjectStore()
const dialog = ref(false)
const dialogDelete = ref(false)
const refForm = ref<VForm | null>(null)
const loading = ref(false)
onMounted(async () => {
    await subjectStore.fetchSubjects(pageParams.value)
    console.log(subjectStore.totalSubjects)
})
const headers = [
    { title: 'รหัสรายวิชา', key: 'id', value: 'id' },
    { title: 'ชื่อรายวิชา', key: 'thaiName', value: 'thaiName' },
    { title: 'จำนวนหน่วยกิต', key: 'credit', value: 'credit' },
    { title: 'จำนวนเวลาเรียน', key: 'studyTime', value: 'studyTime' },
    { title: '', key: 'actions', sortable: false },
    { title: '', key: 'data-table-expand' },
]
const fetchSubjects = async () => {
    loading.value = true
    try {
        await subjectStore.fetchSubjects(pageParams.value)
    } catch (error) {
        console.error('Error fetching users:', error)
    } finally {
        loading.value = false
    }
}
async function save() {
    console.log(subjectStore.editedSubject)
    console.log(refForm.value)
    const { valid } = await refForm.value!.validate()
    if (!valid) return
    closeDialog()
    await subjectStore.saveSubject(pageParams.value)
}
function closeDialog() {
    dialog.value = false
    nextTick(() => {
        subjectStore.clearForm()
    })
}
const editItem = async (subject: Subject) => {
    console.log(subject)
    dialog.value = true
    await subjectStore.fetchSubject(subject.id)
}
async function deleteItem(subject: Subject) {
    console.log(subject)
    await subjectStore.fetchSubject(subject.id)
    dialogDelete.value = true
    // editedIndex = -1
}
function closeDelete() {
    dialogDelete.value = false
    nextTick(() => {
        subjectStore.clearForm()
    })
}

const addUser = () => {
    dialog.value = true
}

async function deleteItemConfirm() {
    await subjectStore.deleteSubject(pageParams.value)
    closeDelete()
}
const pageParams = ref<PageParams>({
    page: 1,
    limit: 10,
    sort: '',
    order: 'ASC',
    search: ''
})

const updateOptions = (options: any) => {
    pageParams.value.page = options.page
    pageParams.value.limit = options.itemsPerPage
    subjectStore.fetchSubjects(pageParams.value)
}
</script>

<template>
    <v-container fluid>
        <h2 style="font-size: 24px" class="pa-5">รายชื่อผู้ใช้งาน</h2>

        <v-row class="d-flex justify-end ga-5" no-gutters>
            <v-col class="d-flex justify-end flex-grow-1">
                <SearchData style="min-width: 250px" :label="'ค้นหาผู้ใช้'" :search="pageParams.search"
                    :fetch-data="fetchUsers"></SearchData>
            </v-col>
            <v-col class="d-flex justify-end flex-grow-0">
                <AddButton style="width: 300px" :to-link="null" :label="'เพิ่มข้อมูลผู้ใช้'" :clickFucntion="addUser">
                </AddButton>
            </v-col>
        </v-row>
        <v-row no-gutters>
            <v-col>
                <v-card class="mt-4">
                    <div>
                        <v-data-table-server v-model:items-per-page="pageParams.limit" :headers="headers"
                            :items="userStore.users" :items-length="userStore.totalUsers" :loading="loading"
                            item-value="name" class="bg-primary" @update:options="updateOptions">
                            <template v-slot:item="{ item, index }">
                                <tr :class="[{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }]">
                                    <td style="min-width: 130px">{{ item.id }}</td>
                                    <td style="min-width: 220px">{{ item.email }}</td>
                                    <td style="min-width: 180px">{{ item.firstName }}</td>
                                    <td style="min-width: 180px">{{ item.lastName }}</td>
                                    <!-- <td style="min-width: 120px">{{ item.gender }}</td> -->
                                    <!-- <td style="min-width: 150px">{{ item.phone }}</td> -->
                                    <td>
                                        <v-chip-group>
                                            <v-chip v-for="role in item.roles" :key="role.id">
                                                {{ role.name }}
                                            </v-chip>
                                        </v-chip-group>
                                    </td>
                                    <td style="text-align: left; min-width: 90px; padding-left: 40px">
                                        <v-icon primary small
                                            @click="editUser(item)">mdi-file-document-edit-outline</v-icon>
                                        <!-- <v-icon small @click="deleteUser(item.id!)">mdi-delete</v-icon> -->
                                    </td>
                                </tr>
                            </template>
                        </v-data-table-server>
                    </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
    <v-dialog max-width="1200px" v-model="dialog" persistent>
        <FormDialog :item="editedUser" :method="saveUser" :isUpdate="isUpdate" :roles="roleStore.roles"
            @close-dialog="closeDialog"></FormDialog>
    </v-dialog>
</template>
<style scoped>
.rounded-circle {
    border-radius: 50%;
    width: 50px;
    /* คุณสามารถปรับขนาดได้ตามต้องการ */
    height: 50px;
}

.v-btn {
    color: yellow;
}

.elevation-1 {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
}

.v-toolbar-title {
    font-weight: bold;
}

.v-data-table-header th {
    font-weight: bold;
}

.styled-table {
    border-collapse: collapse;
    font-size: 14px;
    font-family: 'Arial', sans-serif;
    min-width: 400px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
}

.rounded-table {
    border-radius: 16px;
    overflow: hidden;
    /* To ensure the content follows the rounded corners */
}
</style>
