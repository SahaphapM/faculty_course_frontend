<script setup lang="ts">
import { computed, ref, onMounted, watch } from 'vue'
import { useSkillStore } from '@/stores/skills'
import AddSkillDialog from './Dialog/addSkillDialog.vue'
import AddSubSkillDialog from './Dialog/addSubSkillDialog.vue'
import SkillDetailDialog from './Dialog/skillDetailDialog.vue'
import ConfirmDialog from './Dialog/ConfirmDialog.vue' 
import type { PageParams } from '@/types/PageParams'

const skillStore = useSkillStore()
const loading = ref(false)
const dialogAddVisible = ref(false)
const dialogAddSubVisible = ref(false)
const dialogDetailVisible = ref(false)
const dialogConfirmVisible = ref(false)
const selectedItem = ref<any | null>(null)
const pageParams = ref<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
})

const skills = computed(() => skillStore.skills || [])

const showDialogAdd = async () => {
  dialogAddVisible.value = true
}

const closeDialogAdd = () => {
  dialogAddVisible.value = false
}

const showDialogAddSub = async (item: any) => {
  selectedItem.value = item
  dialogAddSubVisible.value = true
}

const closeDialogAddSub = () => {
  dialogAddSubVisible.value = false
}

const showDialogDetail = async (item: any) => {
  selectedItem.value = item
  dialogDetailVisible.value = true
}

const closeDialogDetail = () => {
  dialogDetailVisible.value = false
}
const confirmDeleteSkill = async (item: any) => {
  selectedItem.value = item
  dialogConfirmVisible.value = true
}
const deleteSkillConfirmed = async () => {
  if (selectedItem.value) {
    await skillStore.deleteSkill(selectedItem.value.id)
    fetchSkill()
  }
}

const fetchSkill = async () => {
  loading.value = true
  skillStore.clearForm()
  try {
    await skillStore.fetchSkillsPage(pageParams.value)
  } catch (error) {
    console.error('Error fetching skills:', error)
  } finally {
    loading.value = false
  }
}
watch(
  [() => dialogAddVisible.value, () => dialogAddSubVisible.value, () => dialogDetailVisible.value],
  () => {
    fetchSkill()
  }
)

onMounted(fetchSkill)
</script>

<template>
  <v-container fluid>
    &nbsp;
    <h2 style="margin-left: 2%; font-size: 24px; margin-bottom: 2%">ทักษะ</h2>

    <v-spacer></v-spacer>

    <v-row>
      <v-col cols="12" md="7">
        <v-text-field
          clearable
          label="หลักสูตร"
          variant="outlined"
          prepend-inner-icon="mdi-magnify"
          v-model="pageParams.search"
          rounded="lg"
          @keydown.enter="fetchSkill"
          class="my-auto"
          style="height: 55px; width: 100%; min-width: 300px; "
        ></v-text-field>
      </v-col>

      <v-col md="3"> </v-col>
      <v-col md="2">
        <v-btn
          rounded="lg"
          style="height: 45px; min-width: 170px; width: 100%"
          @click="() => showDialogAdd()">
          <v-icon>mdi-plus</v-icon>&nbsp; ADD NEW</v-btn>
        </v-col>
    </v-row>

    <v-card rounded="lg" >
      <v-col cols="12">
        <v-treeview :items="skills" item-value="id">
          <template v-slot:prepend="{ item }">
            <tr>
              <td style="padding-right: 50px">{{ item.name }}</td>
              <td>
                <v-btn
                  icon
                  @click.stop="showDialogAddSub(item)"
                  variant="text"
                  rounded="lg"
                  style="width: px"
                >
                  <v-icon>mdi-plus-thick</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn
                  icon
                  @click.stop="showDialogDetail(item)"
                  variant="text"
                  rounded="lg"
                  style="width: px"
                >
                  <v-icon>mdi-file-document-edit-outline</v-icon>
                </v-btn>
              </td>
              <td>
                <v-btn
                  icon
                  @click.stop="confirmDeleteSkill(item)"
                  variant="text"
                  rounded="lg"
                  style="width: px"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-treeview>
      </v-col>
    </v-card>

    <AddSubSkillDialog
      :visible="dialogAddSubVisible"
      :item="selectedItem"
      @close-dialog="closeDialogAddSub"
    />
    <SkillDetailDialog
      :visible="dialogDetailVisible"
      :item="selectedItem"
      @close-dialog="closeDialogDetail"
    />
    <AddSkillDialog :visible="dialogAddVisible" :item="null" @close-dialog="closeDialogAdd" />
    <ConfirmDialog
      :visible="dialogConfirmVisible"
      @close-dialog="() => (dialogConfirmVisible = false)"
      @confirm-delete="deleteSkillConfirmed()"
    />
  </v-container>
</template>
