<script setup lang="ts">
import { useTeacherStore } from '@/stores/teacher'
import { computed, onMounted, ref } from 'vue'
import { useRoleStore } from '@/stores/role'
import type { Teacher } from '@/types/Teachers'
import type { PageParams, SortItem } from '@/types/PageParams'
import FormDialog from '@/views/teachers/TeacherFormDialog.vue'
import MainTable from '@/components/table/MainTable.vue'
import { useLocale } from 'vuetify'

const teacherStore = useTeacherStore()
const roleStore = useRoleStore()
const { t } = useLocale()

const headers = computed(() => [
  { title: t('uid'), value: 'id', key: 'id', sortable: false },
  { title: t('avatar'), value: 'avatarUrl', key: 'avatarUrl', sortable: false },
  { title: t('email'), value: 'email', key: 'email', sortable: false },
  { title: t('roles'), value: 'roles', key: 'roles', sortable: false }
])

const dialog = ref(false)
const editedTeacher = ref(Object.assign({}, teacherStore.initialTeacher))
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

const fetchTeachers = async (search?: string, columnId?: string, columnName?: string) => {
  loading.value = true
  if (search !== '' && search) {
    pageParams.value.search = search
  }
  // else {
  //   pageParams.value.search = ''
  // }
  if (columnId && columnName) {
    pageParams.value.columnId = columnId
    pageParams.value.columnName = columnName
  }
  // else {
  //   pageParams.value.columnId = ''
  //   pageParams.value.columnName = ''
  // }

  console.log(pageParams)
  try {
    await teacherStore.fetchTeachersPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching teachers:', error)
  } finally {
    loading.value = false
  }
}

const editTeacher = (teacher: Teacher) => {
  editedTeacher.value = { ...teacher } // work with a temporary copy of editedTeacher.value *******************
  selectedRoles.value = teacherStore.editedTeacher.roles
    ? teacherStore.editedTeacher.roles.map((role) => role.id)
    : []

  if (editedTeacher.value.id) {
    isUpdate.value = true
    dialog.value = true
  }
}

const deleteTeacher = async (id: string) => {
  await teacherStore.deleteTeacher(id)
}

const addTeacher = () => {
  isCreate.value = true
  dialog.value = true
}

const saveTeacher = async (teacher: Teacher) => {
  teacherStore.editedTeacher = teacher

  if (isUpdate.value) {
    await teacherStore.updateTeacher()
  } else {
    await teacherStore.saveTeacher()
  }
  isUpdate.value = false
  teacherStore.clearForm()
  fetchTeachers()
  closeDialog()
  dialog.value = false
}

const closeDialog = () => {
  teacherStore.clearForm()
  editedTeacher.value = Object.assign({}, teacherStore.initialTeacher)
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
    // Update sortBy and sortDesc based on teacher selection
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
  // fetchTeacher
  fetchTeachers()
}

onMounted(async () => {
  await roleStore.getRoles()
  await fetchTeachers()
  console.log(teacherStore.teachers)
  console.log(teacherStore.totalTeachers)
})
</script>

<template>
  <v-container fluid>
    <MainTable
      page-icon="mdi-account-group"
      :page-title="t('Teacher')"
      :items="teacherStore.teachers"
      :headers="headers"
      :fetch-data="fetchTeachers"
      :fetch-by-branch="true"
      :fetch-by-curriculum="true"
      :search-label="'teacher'"
      :btnAddAction="addTeacher"
      :action="editTeacher"
      customCol="roles"
    >
      <template #roles="{ item }">
        <v-chip v-if="item.roles.length > 0">
          {{ item.roles.map((n: any) => n.name)[0] }}
        </v-chip>
        <div v-else>
          {{ t('unknown') }}
        </div>
      </template>
    </MainTable>
  </v-container>
  <v-dialog max-width="1000px" v-model="dialog" persistent>
    <FormDialog
      :item="editedTeacher"
      :method="saveTeacher"
      :isUpdate="isUpdate"
      :roles="roleStore.roles"
      @close-dialog="closeDialog"
    ></FormDialog>
  </v-dialog>
</template>
