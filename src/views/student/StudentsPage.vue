<template>
  <v-container>
    <MainTable
      page-icon="mdi-school"
      :page-title="t('students')"
      :items="[]"
      :headers="[]"
      :fetch-data="fetchData"
      :search-label="'user'"
      :btnAddAction="() => {}"
      :action="() => {}"
    >
    </MainTable>
  </v-container>
</template>

<script lang="ts" setup>
import MainTable from '@/components/table/MainTable.vue'
import { useLocale } from 'vuetify'
const { t } = useLocale()

const fetchData = async () => {
  await fetch('')
}
</script>
