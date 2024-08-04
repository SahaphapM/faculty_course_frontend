<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCloStore } from '@/stores/clos'

const route = useRoute()
const router = useRouter()
const props = defineProps<{ visible: boolean; item: any | null }>()
const emit = defineEmits(['close-dialog'])
const cloStore = useCloStore()
const clos = computed(() => cloStore.editedClo)
const localVisible = ref(props.visible)

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)

async function fetchCloDetail(id: string) {
  try {
    await cloStore.fetchClo(id)
  } catch (error) {
    console.error('Failed to fetch clo details:', error)
  }
}

const closeDialog = async () => {
  emit('close-dialog')
  // await cloStore.fetchClos()
  // cloStore.clearForm()
}

function saveClo() {
  let clo = { ...clos.value }
  if (route.params.id !== 'addClo') {
    cloStore.updateClo(clo)
    closeDialog()
  } else {
    const payload: { name: string; description: string; subject: object } = {
      name: clo.name,
      description: clo.description,
      subject: clo.subject
    }
    cloStore.addClo(payload)
    closeDialog()
  }
}

onMounted(() => {
  if (!route.params.id) return
  // if (route.params.id !== 'addClo') {
  //   fetchCloDetail(route.params.id as string)
  // }
})
</script>

<template>
  <v-dialog
    v-model="localVisible"
    max-width="1000px"
    persistent
    style="height: 100vh; overflow-y: auto"
  >
    <v-card
      class="elevation-5"
      rounded="lg"
      max-width="1000px"
      width="100%"
      height="100%"
      style="min-width: 200px"
    >
      <v-container style="width: 100%; height: 100%">
        <div style="display: flex; justify-content: flex-end">
          <v-btn
            color="primary"
            variant="plain"
            @click="closeDialog"
            style="height: 40px; width: 40px"
            class="circular-btn"
            icon="mdi-close"
            rounded="lg"
          />
        </div>
        <p style="font-size: 30px">รายละเอียดสกิล</p>

        <v-row>
          <v-col cols="12">
            <v-text-field
              v-model="clos.name"
              :counter="10"
              label="Name"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="clos.description"
              :counter="10"
              label="Description"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="clos.subject"
              :counter="10"
              label="Subject"
              hide-details
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="clos.plos"
              :counter="10"
              label="Plo"
              hide-details
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn @click="saveClo">Save</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
