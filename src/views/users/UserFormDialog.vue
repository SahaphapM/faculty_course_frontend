<script setup lang="ts">
import type { Role } from '@/types/Role'
import type { User } from '@/types/User'
import { computed, onMounted, ref } from 'vue'
import UploadImage3 from '@/components/UploadImage.vue'

const props = defineProps<{
  item: User | null
  isUpdate: boolean
  roles: Role[]
  method: (user: User) => Promise<void>
}>()
const emit = defineEmits(['close-dialog'])

const user = ref(Object.assign({}, props.item))
const genders = ['ชาย', 'หญิง']

const previewUrl = ref<string | null>(null)
const errorMessage = ref<string | null>(null)
const imageFile = ref<File | null>(null)
const imageUpdate = ref(false)
const imageURL = ref('https://www.informatics.buu.ac.th/2020/wp-content/uploads/2022/03/23.png')

const uploadFile = async (file: File) => {
  imageFile.value = file
  imageUpdate.value = true
  console.log(file)
}

// Computed property to handle the image source dynamically
const imageSrc = computed(() => {
  if (imageUpdate.value && imageFile.value) {
    return URL.createObjectURL(imageFile.value)
  }
  return imageURL.value
})

const saveImage = (file: File | null) => {
  try {
    //Save image
  } catch (error) {
    //Show error
  }
}

const reset = () => {
  user.value = Object.assign({}, props.item)
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
    style="padding-bottom: 30px"
    min-width="100"
    max-width="1440"
  >
    <v-row class="d-flex justify-end pt-9 pr-9">
      <!-- <v-col cols="12" md="11"> -->
      <!-- <p class="details-text" style="font-size: 2.5vh; margin-left: 1vh">โปรไฟล์</p> -->
      <!-- </v-col> -->
      <!-- class="justify-end" -->

      <v-btn rounded="lg" icon="$close" variant="text" color="error" @click="closeDialog"></v-btn>
    </v-row>

    <v-row>
      <v-col cols="12" md="6" class="px-9">
        <v-row>
          <v-col>
            <v-img
              :aspect-ratio="1"
              class="bg-white rounded-lg"
              style="margin-top: 40px"
              :src="imageSrc"
              min-width="100"
              cover
            ></v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-col col="12" md="5">
            <!-- <label for="image_uploads">Choose images to upload (PNG, JPG)</label> -->
            <!-- <input
              type="file"
              accept=".jpg, .jpeg, .png"
              id="image_uploads"
              name="image_uploads"
              content="choose file"
            /> -->

            <!-- <v-btn class="btn-warning" prepend-icon="mdi-cloud-upload"> Button </v-btn>
            <button type="button" class="btn-warning">Upload</button> -->

            <UploadImage3
              class="mx-auto"
              :initialPreviewUrl="previewUrl"
              :initialErrorMessage="errorMessage"
              :uploadFile="uploadFile"
              :alertMessage="'Change Image Profile'"
            ></UploadImage3>
          </v-col>
          <v-col class="my-1" v-if="imageUpdate">
            <v-btn
              class="mx-3"
              density="compact"
              color="green"
              icon="mdi-check"
              @click="saveImage(imageFile)"
            ></v-btn>
            <v-btn
              density="compact"
              color="red"
              icon="mdi-close"
              @click="(imageFile = null), (imageUpdate = false)"
            ></v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col class="px-9" cols="12" md="6">
        <v-row class="my-1">
          <p class="details-text">รายละเอียด</p>
        </v-row>
        <v-row>
          <v-col>
            <v-form ref="form">
              <v-text-field
                v-model="user.id"
                label="Id"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <v-text-field
                v-model="user.email"
                label="Email"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <v-text-field
                v-if="!isUpdate"
                v-model="user.password"
                label="Password"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <v-text-field
                v-model="user.firstName"
                label="First Name"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <v-text-field
                v-model="user.middleName"
                label="Middle Name"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <v-text-field
                v-model="user.lastName"
                label="Last Name"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
              <v-text-field
                v-model="user.phone"
                label="Phone"
                variant="outlined"
                rounded="lg"
                class="small-input"
              ></v-text-field>
            </v-form>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-select
              v-model="user.gender"
              :items="genders"
              item-title="name"
              label="Base Gender"
              variant="outlined"
              rounded="lg"
              class="small-input"
            ></v-select>
          </v-col>
          <v-col>
            <v-combobox
              v-model="user.roles"
              variant="outlined"
              multiple
              label="Roles"
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
          <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
          ><v-btn @click="method(user)" variant="plain">บันทึก</v-btn></v-row
        >
      </v-col>
    </v-row>
  </v-card>

  >
</template>

<style scoped>
.v-text-field {
  height: 65px;
}
.details-text {
  margin-left: 10px; /* Adjust the spacing between the div and p as needed */
  font-weight: bold;
  font-size: large;
}

.btn-warning input[type='file'] {
  opacity: 0;
}
</style>
