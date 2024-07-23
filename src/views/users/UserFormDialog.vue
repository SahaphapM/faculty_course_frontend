<script setup lang="ts">
import type { Role } from '@/types/Role'
import type { User } from '@/types/User'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  item: User | null
  isUpdate: boolean
  roles: Role[]
  method: (user: User) => Promise<void>
}>()
const emit = defineEmits(['close-dialog'])

const user = ref(Object.assign({}, props.item))
const genders = ['ชาย', 'หญิง']

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
  <v-card class="elevation-5 pa-8" rounded="lg">
    <template v-slot:append>
      <v-btn  icon="$close" variant="text" @click="closeDialog"></v-btn>
    </template>
    <v-row>
      <v-col cols="12" md="5">
        <v-row>
          <v-col>
            <v-img
              :aspect-ratio="1"
              class="bg-white my-10 mx-auto rounded-lg"
              src="https://www.informatics.buu.ac.th/2020/wp-content/uploads/2022/03/23.png"
              width="300"
              cover
            ></v-img>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="7">
        <v-row>
          <p class="details-text" style="font-size: 2.5vh; margin-left: 1vh">รายละเอียด</p>
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
</style>
