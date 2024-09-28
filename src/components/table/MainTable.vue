<template>
  <div>
    <h2 class="mb-5">
      <v-icon v-if="pageIcon" :icon="pageIcon" class="mr-2"></v-icon>
      {{ pageTitle }}
    </h2>

    <v-row class="d-flex justify-end ga-5" no-gutters>
      <v-col
        ><SearchTextfield :label="searchLabel" :fetchData="fetchData"></SearchTextfield>
      </v-col>
      <v-col v-if="fetchByBranch">
        <SelectByFeature
          :by-branch="fetchByBranch"
          :by-curriculum="fetchByCurriculum"
          :by-subject="fetchBySubject"
          :by-skill="fetchBySkill"
          :by-tech-skill="fetchByTechSkill"
          :fetch-data="fetchData"
        ></SelectByFeature></v-col
      ><v-col class="d-flex justify-end flex-grow-0">
        <v-btn v-if="btnAddAction" prepend-icon="mdi-plus" @click="btnAddAction" min-width="150"
          >{{ t('add') }}
        </v-btn></v-col
      ></v-row
    >
    <!-- style="min-width: 300px; height: 55px" -->
    <v-card rounded="lg">
      <v-data-table-server
        class="bg-primary"
        :items-per-page="itemsPerPage ?? 10"
        :headers="
          headers.concat(
            props.action ? [{ title: t('actions'), key: 'actions' }] : []
          ) as ReadonlyArray<any>
        "
        :items="items"
        :items-length="items?.length"
        :search="params.search"
        @update:options="updateOptions"
      >
        <template #headers="{ columns, isSorted, getSortIcon, toggleSort }">
          <tr>
            <template v-for="column in columns" :key="column.key">
              <td>
                <span class="cursor-pointer" @click="() => toggleSort(column)">{{
                  t(column.title!)
                }}</span>
                <template v-if="isSorted(column)">
                  <v-icon :icon="getSortIcon(column)"></v-icon>
                </template>
              </td>
            </template>
          </tr>
        </template>
        <!-- @vue-ignore -->
        <template v-slot:item="{ item, index, columns }">
          <tr :class="{ 'even-row': index % 2 === 0, 'odd-row': index % 2 !== 0 }">
            <!-- @vue-ignore -->
            <td v-for="column in columns" :key="column.key">
              <v-btn
                v-if="column.key === 'actions' && action"
                icon="mdi-file-document-edit"
                size="small"
                variant="plain"
                color="table-text"
                @click="action(item)"
              ></v-btn>
              <div v-if="column.key === customCol">
                <slot :name="customCol" :item="item" :index="index"></slot>
              </div>
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
import SelectByFeature from '../SelectByFeature.vue'
import SearchTextfield from './SearchTextfield.vue'

const { t } = useLocale()

const props = defineProps<{
  pageIcon?: string
  pageTitle: string
  headers: HeaderItem[]
  itemsPerPage?: number
  items: Record<string, any>[]
  fetchData: (search: string, columnId?: string, columnName?: string) => Promise<void>
  searchLabel: string
  fetchByBranch?: boolean
  fetchByCurriculum?: boolean
  fetchBySubject?: boolean
  fetchBySkill?: boolean
  fetchByTechSkill?: boolean
  btnAddAction?: () => void
  action?: (item: any) => void
  customCol?: string
}>()

const params = reactive<PageParams>({
  page: 1,
  limit: 10,
  sort: '',
  order: 'ASC',
  search: '',
  columnId: '',
  columnName: ''
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
    props.fetchData
  }
})
</script>

<style scoped>
.even-row {
  background-color: rgb(var(--v-theme-trow-even));
  color: rgb(var(--v-theme-table-text));
}
.odd-row {
  background-color: rgb(var(--v-theme-trow-odd));
  color: rgb(var(--v-theme-table-text));
}
</style>
