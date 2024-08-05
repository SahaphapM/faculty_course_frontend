<template>
  <div>
    <v-container fluid class="d-flex ma-0 pa-0 ga-5">
      <v-text-field
        :label="t('search')"
        prepend-inner-icon="mdi-magnify"
        density="comfortable"
        v-model="searchText"
        @keydown.enter="fetchData(searchText)"
      ></v-text-field>
      <v-combobox
        v-if="facultyItems"
        :label="facultyLabel ?? t('faculty')"
        :style="{ maxWidth: '300px' }"
        :items="facultyItems"
      >
      </v-combobox>
      <v-combobox
        v-if="comboboxItems"
        :label="comboboxLabel ?? t('branch')"
        :style="{ maxWidth: '300px' }"
        :items="comboboxItems"
      >
      </v-combobox>
      <v-btn
        v-if="btnAddAction"
        prepend-icon="mdi-plus"
        :style="{ minHeight: '48px', minWidth: '100px' }"
        @click="btnAddAction"
        >{{ t('add') }}
      </v-btn>
    </v-container>
    <v-card>
      <v-data-table-server
        class="bg-primary"
        :items-per-page="itemsPerPage"
        :headers="
          props.headers.concat(
            props.action ? [{ title: 'Actions', key: 'actions' }] : []
          ) as ReadonlyArray<any>
        "
        :items="items"
        :items-length="10"
        @update:options="updateOptions"
      >
        <!-- <template #headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="mr-2 cursor-pointer" @click="() => toggleSort(column)">{{
                  column.title
                }}</span>
                <template v-if="isSorted(column)">
                  <v-icon :icon="getSortIcon(column)"></v-icon>
                </template>
              </td>
            </template>
          </tr>
        </template> -->
        <template #item="{ item, index, columns }">
          <tr :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
            <td v-for="column in columns" :key="column.key!">
              <v-btn
                v-if="column.key === 'action'"
                icon="mdi-file-document-edit"
                size="small"
                variant="tonal"
                @click="action"
              ></v-btn>
              <p v-else>
                {{ item[column.key as keyof typeof item] }}
              </p>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import type { HeaderItem } from '@/types/HeaderItem'
import type { PageParams, SortItem } from '@/types/PageParams'
import { onMounted, reactive, ref } from 'vue'
import { useLocale } from 'vuetify'

const { t } = useLocale()
const searchText = ref('')

const props = defineProps<{
  headers: HeaderItem[]
  itemsPerPage: number
  items: Record<string, any>[]
  fetchData: (value?: string) => Promise<void>
  comboboxItems?: any[]
  comboboxLabel?: string
  facultyItems?: any[]
  facultyLabel?: string
  btnAddAction?: () => void
  action?: () => void
  customColumnName?: string
}>()

const params = reactive<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: ''
})

const sortBy = ref<SortItem[]>([{ key: 'id', order: 'asc' }])

const updateOptions = (options: any) => {
  if (options.sortBy.length === 0) {
    // Set default sort when sortBy is empty
    sortBy.value = [{ key: 'id', order: 'asc' }]
  } else {
    // Update sortBy and sortDesc based on user selection
    sortBy.value = options.sortBy
  }
  // toUpperCase
  params.sort = sortBy.value[0].key
  if (sortBy.value[0].order === 'desc') {
    params.order = 'DESC'
  } else {
    params.order = 'ASC'
  }
  props.fetchData
}

onMounted(async () => {
  if (props.fetchData) {
    await props.fetchData
  }
})
</script>

<style scoped>
.even-row {
  background-color: #ffffff;
  color: black;
  text-align: left;
}
.odd-row {
  background-color: #f9f9f9;
  color: black;
  text-align: left;
}
</style>
