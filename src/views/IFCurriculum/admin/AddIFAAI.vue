<script setup lang="ts">
import { ref } from 'vue'
const nameTH = ref<string>('')
const nameENG = ref<string>('')
const nameRules = [
  (v: string) => !!v || 'Name is required',
  (v: string) => (v && v.length <= 10) || 'Name must be less than 10 characters'
]
const select = ref<string | null>(null)
const items = ref<string[]>(['Item 1', 'Item 2', 'Item 3', 'Item 4'])
const form = ref()

const validate = async () => {
  const { valid } = await form.value.validate()
  if (valid) alert('Form is valid')
}

const reset = () => {
  form.value.reset()
}

const resetValidation = () => {
  form.value.resetValidation()
}
</script>
<template>
  <v-breadcrumbs :items="['หน้าหลัก', 'หลักสูตร', 'วิทยาการสารสนเทศ']">
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
  <p style="font-size: xx-large; margin-left: 3%">เพิ่มหลักสูตร</p>
  <v-card class="ma-5">
    <p class="font-weight-black ma-5" style="font-size: large">
      <v-icon left size="xx-small" class="mr-2" color="#112f69">mdi-circle</v-icon>รายละเอียด
    </p>
    <v-container>
      <v-form ref="form">
        <v-text-field v-model="nameTH" :rules="nameRules" label="ชื่อหลักสูตร"></v-text-field>
        <v-text-field
          v-model="nameENG"
          :rules="nameRules"
          label="ชื่อหลักสูตร (อังกฤษ)"
        ></v-text-field>
        <v-text-field v-model="name" :rules="nameRules" label="รหัสหลักสูตร"></v-text-field>
        <v-select v-model="select" :items="items" label="ชื่อปริญญา"></v-select>
        <v-text-field v-model="name" :rules="nameRules" label="ชื่อปริญญา ( อังกฤษ)"></v-text-field>
        <v-select v-model="select" :items="items" label="สาขาวิชา"></v-select>

        <v-btn @click="validate">บันทึก</v-btn>
        <v-btn @click="reset">ล้าง</v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
