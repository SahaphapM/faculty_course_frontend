<script setup lang="ts">
import { useSubjectStore } from '@/stores/subject';
import { useUserStore } from '@/stores/user';
import type { Subject } from '@/types/Subjects';
import type { User } from '@/types/User';
import { computed, nextTick, onMounted, ref } from 'vue';
import type { VForm } from 'vuetify/components';
import type { PageParams } from '@/types/PageParams'
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
    <div>{{ console.log(headers) }}</div>
    <v-container>
        <v-card>
            <v-responsive>
                <v-data-table-server v-model:items-per-page="pageParams.limit" :headers="headers" :items="subjects"
                    :style="{ width: '2000px', padding: '50px' }" class="elevation-1 styled-table" show-expand
                    :items-length="subjectStore.totalSubjects" :loading="loading" @update:options="updateOptions"
                    :class="rounded - table">
                    <template v-slot:item.actions="{ item }">
                        <v-icon size="small" class="mr-2 edit-icon" @click="editItem(item)"> mdi-pencil</v-icon>
                        <v-icon size="small" class="mr-2 delete-icon" @click="deleteItem(item)">mdi-delete</v-icon>
                    </template>
                    <template v-slot:top>
                        <v-toolbar color="white">
                            <v-toolbar-title>รายวิชา</v-toolbar-title>
                            <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                            <v-spacer></v-spacer>
                            <v-dialog v-model="dialog" max-width="600px">
                                <template v-slot:activator="{ props }">
                                    <!--search-->
                                    <v-text-field v-model="pageParams.search" label="Search" @input="fetchSubjects"
                                        class="mx-4" prepend-inner-icon="mdi-magnify" clearable density="compact"
                                        single-line flat hide-details variant="solo-filled"></v-text-field>

                                    <v-btn color="blue" dark v-bind="props">เพิ่มรายวิชา</v-btn>
                                </template>
                                <v-card>
                                    <v-card-title>
                                        <span class="text-h5">{{ formTitle }}</span>
                                        เพิ่ม/แก้ไขรายวิชา
                                    </v-card-title>

                                    <v-card-text>
                                        <v-form ref="refForm">
                                            <v-container>
                                                <v-row>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="subjectStore.editedSubject.id"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="รหัสรายวิชา"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="subjectStore.editedSubject.thaiName"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label=" ชื่อรายวิชา"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-text-field v-model="subjectStore.editedSubject.engName"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="ชื่อรายวิชา(ภาษาอังกฤษ)"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <v-text-field v-model.number="subjectStore.editedSubject.credit"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="หน่วยกิต"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="6">
                                                        <v-text-field v-model="subjectStore.editedSubject.studyTime"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="จำนวนชั่วโมงเรียน"></v-text-field>
                                                    </v-col>
                                                    <v-col cols="12">
                                                        <v-textarea v-model="subjectStore.editedSubject.description"
                                                            :rules="[(v) => !!v || 'Field is required']"
                                                            label="คำอธิบายรายวิชา"></v-textarea>
                                                    </v-col>
                                                </v-row>
                                            </v-container>
                                        </v-form>
                                    </v-card-text>
                                    <!--action of card-->
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                                            Cancel
                                        </v-btn>
                                        <v-btn color="blue-darken-1" variant="text" @click="save()">
                                            Save
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-dialog>
                        </v-toolbar>
                    </template>
                    <!--description-->
                    <template v-slot:expanded-row="{ columns, item }">
                        <tr>
                            Course Description
                        </tr>
                        <tr>
                            <td :colspan="columns.length">
                                {{ item.description }}
                            </td>
                        </tr>
                    </template>
                </v-data-table-server>
            </v-responsive>
        </v-card>
    </v-container>
    <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<!-- <template>
    <div>{{ console.log(headers) }}</div>

    <v-data-table :headers="headers" :items="subjects">
        <template v-slot:item.actions="{ item }">
            <v-icon size="small" @click="editItem(item)"> mdi-pencil</v-icon>
            <v-icon size="small" @click="deleteItem(item)">
                mdi-delete
            </v-icon>
        </template>
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>รายวิชา</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
            </v-toolbar>
        </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ props }">
            <v-btn class="mb-2" color="primary" dark v-bind="props">
                New Item
            </v-btn>
        </template>
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
                เพิ่ม/แก้ไขรายวิชา
            </v-card-title>

            <v-card-text>
                <v-form ref="refForm">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.id"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="รหัสรายวิชา"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.thaiName"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label=" ชื่อรายวิชา"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.engName"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="ชื่อรายวิชา(ภาษาอังกฤษ)"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model.number="subjectStore.editedSubject.credit"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="หน่วยกิต"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-text-field v-model="subjectStore.editedSubject.studyTime"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="จำนวนชั่วโมงเรียน"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" sm="6">
                                <v-textarea v-model="subjectStore.editedSubject.description"
                                    :rules="[(v) => !!v || 'Field is Field is required']"
                                    label="คำอธิบายรายวิชา"></v-textarea>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            
<v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialog()">
                    Cancel
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="save()">
                    Save
                </v-btn>
            </v-card-actions>
</v-card>
</v-dialog>
<v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template> -->
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
