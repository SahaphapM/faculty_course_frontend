<template>
  <v-treeview :items="items" item-value="id" activatable>
    <template #title="{ item }">
      <p>
        {{ item.name }}
        <span v-if="item.level && !readonly" class="text-blue px-1">
          &Delta; Level: {{ item.level }}</span
        >
        <v-btn
          density="compact"
          icon="mdi-plus-circle"
          variant="text"
          v-if="!readonly && item.children"
          class="mb-1"
        >
          <v-icon icon="mdi-plus-circle"></v-icon>
          <v-dialog activator="parent">
            <template #default="{ isActive }">
              <v-card min-width="400" maxWidth="800" class="mx-auto">
                <template #title>
                  <p>{{ item.name }} &RightArrow; Add Child</p>
                  <v-divider class="mt-2"></v-divider>
                </template>
                <template #text>
                  <v-combobox
                    label="Available Skill"
                    :items="['doctor dance', 'skibidi']"
                  ></v-combobox>
                  <v-select label="Level" :items="[1, 2, 3, 4, 5]" variant="outlined"></v-select>
                  <v-textarea
                    label="Description"
                    variant="outlined"
                    v-model="item.description"
                  ></v-textarea>
                </template>
                <template #actions>
                  <v-btn color="error" variant="text" @click="isActive.value = false">Delete</v-btn>
                  <v-btn variant="text" @click="isActive.value = false">Cancel</v-btn>
                  <v-btn color="info" variant="text" @click="isActive.value = false">Add</v-btn>
                </template>
              </v-card>
            </template>
          </v-dialog>
        </v-btn>
      </p>
    </template>
    <template #prepend="{ item }">
      <v-icon :icon="item.icon"></v-icon>
    </template>
    <template #append="{ item }">
      <div v-if="item.description && readonly">
        <v-icon icon="mdi-information"> </v-icon>
        <v-dialog activator="parent">
          <template #default="{ isActive }">
            <v-card maxWidth="800" class="mx-auto">
              <template #title>
                <p>
                  {{ item.name }}
                </p>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template #text>
                <p>
                  {{ item.description }}
                </p>
              </template>
              <template #actions>
                <v-btn variant="text" @click="isActive.value = false">Close</v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </div>
      <div v-else>
        <v-icon icon="mdi-pencil"> </v-icon>
        <v-dialog activator="parent">
          <template #default="{ isActive }">
            <v-card maxWidth="800" min-width="400" class="mx-auto">
              <template #title>
                <p>{{ item.name }} &RightArrow; Edit</p>
                <v-divider class="mt-2"></v-divider>
              </template>
              <template #text>
                <v-combobox label="Replace Skill" :items="['doctor dance', 'skibidi']"></v-combobox>
                <v-select label="Level" :items="[1, 2, 3, 4, 5]" variant="outlined"></v-select>
                <v-textarea
                  label="Description"
                  variant="outlined"
                  v-model="item.description"
                ></v-textarea>
              </template>
              <template #actions>
                <v-btn color="error" variant="text" @click="isActive.value = false">Delete</v-btn>
                <v-btn variant="text" @click="isActive.value = false">Cancel</v-btn>
                <v-btn color="info" variant="text" @click="isActive.value = false">Save</v-btn>
              </template>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </template>
  </v-treeview>
</template>

<script lang="ts" setup>
interface Skill {
  id: string
  name: string
  description?: string
  level?: string
  icon?: string
  children?: Skill[]
}
defineProps<{
  items: Skill[]
  readonly?: true
}>()
</script>
