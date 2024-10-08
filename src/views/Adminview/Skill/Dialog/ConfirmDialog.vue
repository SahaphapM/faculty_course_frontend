<script setup lang="ts">
import { ref, defineEmits, watch } from 'vue'
const props = defineProps<{ visible: boolean; item: any | null }>()
const localVisible = ref(props.visible)

watch(
  () => props.visible,
  (newVal) => {
    localVisible.value = newVal
  }
)

const emit = defineEmits(['close-dialog', 'confirm-delete'])

const confirm = () => {
  emit('confirm-delete')
  close()
}

const close = () => {
  emit('close-dialog')
}
</script>
<template>
    <v-dialog v-model="localVisible" max-width="500">
      <v-card>
        <v-card-title>Confirm Deletion</v-card-title>
        <v-card-text>
          Are you sure you want to delete this skill?
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn @click="close" color="grey">Cancel</v-btn>

          <v-btn @click="confirm" color="red">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  

  
