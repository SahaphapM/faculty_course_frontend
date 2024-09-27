<script setup lang="ts">
import type { Role } from '@/types/Role'
import type { Teacher } from '@/types/Teachers'
import { computed, onMounted, ref } from 'vue'
import UploadImage from '@/components/UploadImage.vue'
import instance from '@/service/http'
import { useTeacherStore } from '@/stores/teacher'

const teacherStore = useTeacherStore()
const props = defineProps<{
  item: Teacher | null
  isUpdate: boolean
  roles: Role[]
  method: (teacher: Teacher) => Promise<void>
}>()
const emit = defineEmits(['close-dialog'])

const teacher = ref(Object.assign({}, props.item))
const genders = ['ชาย', 'หญิง']

const previewUrl = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const imageFile = ref<File | null>(null)
const imageUpdate = ref(false)
const showPassword = ref(false)

const uploadFile = async (file: File) => {
  imageFile.value = file
  imageUpdate.value = true
  console.log(file)
}

const isFormValid = ref(false)

const rules = {
  required: (value: any) => !!value || ''
}

// Computed property to handle the image source dynamically
const imageSrc = computed(() => {
  if (imageUpdate.value && imageFile.value) {
    return URL.createObjectURL(imageFile.value)
  }
  return getImageUrl(teacher.value)
})

const saveImage = (teacherId: string | null, file: File | null) => {
  if (imageUpdate.value && teacherId && file) {
    try {
      //Save image
      teacherStore.updateImage(teacherId, file)
    } catch (error) {
      //Show error
    }
  }
}

const deleteImage = () => {
  teacher.value.image = 'unknown.jpg'
  imageUpdate.value = true
}

function getImageUrl(teacher: Teacher) {
  // Use the base URL from Axios instance
  if (teacher.image) {
    return `${instance.defaults.baseURL}/public/teachers/images/${teacher.image}`
  } else {
    return `${instance.defaults.baseURL}/public/teachers/images/unknown.jpg`
  }
}

const reset = () => {
  teacher.value = Object.assign({}, props.item)
  imageUpdate.value = false
}

const closeDialog = () => {
  emit('close-dialog')
}

onMounted(async () => {
  console.log(props.item)
})
</script>

<template>
  <v-card
    class="elevation-5"
    rounded="lg"
    style="padding: 20px"
    min-width="300px"
    max-width="1000px"
    max-height="800px"
  >
    <v-row>
      <v-col class="d-flex justify-end" style="margin-bottom: -10px">
        <v-icon @click="closeDialog" size="x-large" icon="mdi-close-box-outline"></v-icon>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12" md="4">
        <v-row>
          <v-col style="margin-top: -30px" class="d-flex justify-center">
            <p style="font-size: 24px; font-weight: bold">โปรไฟล์</p>
          </v-col></v-row
        >
        <v-row>
          <v-col class="pt-10 d-flex justify-center">
            <v-img
              cover
              :src="imageSrc"
              max-height="300px"
              max-width="300px"
              rounded="10"
              style="border-radius: 10px; align-items: end; text-align: end"
            >
              <v-icon
                @click="deleteImage"
                style="background-color: white; border-radius: 20%"
                size="45px"
                icon="mdi-delete-circle-outline"
              ></v-icon>
            </v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="d-flex justify-center">
            <UploadImage
              :width="'200px'"
              :height="'45px'"
              :initialPreviewUrl="previewUrl"
              :initialErrorMessage="errorMessage"
              :uploadFile="uploadFile"
              :lebel="'อัพเดตรูปภาพ'"
            ></UploadImage>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-row class="my-1">
          <p style="font-size: 20px; margin-left: 10px">รายละเอียดผู้ใช้</p>
        </v-row>
        <v-row>
          <v-col>
            <v-form ref="form" v-model="isFormValid">
              <v-text-field
                v-model="teacher.id"
                label="รหัสประจำตัว"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="teacher.email"
                label="อีเมลล์"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-if="!isUpdate"
                v-model="teacher.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                label="รหัสผ่าน"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="teacher.firstName"
                label="ชื่อ"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="teacher.middleName"
                label="ชื่อกลาง"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="teacher.lastName"
                label="นามสกุล"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
              <v-text-field
                v-model="teacher.phone"
                label="เบอร์โทรศัพท์"
                variant="outlined"
                rounded="lg"
                class="small-input"
                :rules="[rules.required]"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="teacher.gender"
              :items="genders"
              item-title="name"
              label="เพศ"
              variant="outlined"
              rounded="lg"
              class="small-input"
              :rules="[rules.required]"
            ></v-select>
          </v-col>
          <v-col>
            <v-combobox
              v-model="teacher.roles"
              variant="outlined"
              multiple
              label="ตำแหน่ง"
              :items="roles"
              item-title="name"
              item-value="id"
              :return-object="true"
              rounded="lg"
              class="small-input"
            ></v-combobox>
          </v-col>
        </v-row>
        <v-row class="justify-end">
          <v-btn
            @click="reset, (imageFile = null), (imageUpdate = false)"
            variant="plain"
            color="error"
            >ล้าง</v-btn
          ><v-btn @click="method(teacher), saveImage(teacher.id, imageFile)" variant="plain"
            >บันทึก</v-btn
          ></v-row
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<style scoped>
.v-text-field {
  height: 55px;
  margin-bottom: 15px;
}
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: 20px;
}
</style>
