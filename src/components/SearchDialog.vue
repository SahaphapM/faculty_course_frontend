<template>
  <v-dialog v-model="store.isDialogOpen" max-width="500">
    <v-card>
      <v-card-title class="d-flex justify-end" @click="closeAndClear()">
        <v-btn variant="plain" icon="mdi-close" color="error"></v-btn>
      </v-card-title>
      <v-card-text>
        <v-text-field
          prepend-inner-icon="mdi-magnify"
          v-model="searchText"
          clearable
          :placeholder="`${t('search')}...`"
        >
        </v-text-field>
        <v-list v-if="searchText.length > 0">
          <v-list-item
            v-for="(item, index) in filteredItems"
            :key="index"
            :to="item.to"
            @click="closeAndClear()"
          >
            {{ item.title }}
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { getAllAppMenu } from '@/models/navigation'
import { useSearchStore } from '@/stores/search'
import { ref, computed } from 'vue'
import { useLocale } from 'vuetify'

const { t } = useLocale()
const store = useSearchStore()
const searchText = ref('')

const items = getAllAppMenu()

const closeAndClear = () => {
  store.switchToggle()
  searchText.value = ''
}

const resultLimit = 5

const filteredItems = computed(() => {
  const search = searchText.value.toLowerCase()
  return items.filter((item) => item.title.toLowerCase().includes(search)).slice(0, resultLimit)
})
</script>
