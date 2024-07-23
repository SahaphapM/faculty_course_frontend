<script setup lang="ts">
import type { Role } from '@/types/Role'
import type { User } from '@/types/User'
import { ref } from 'vue'

const props = defineProps<{
  item: User | null
  isUpdate: boolean
  roles: Role[]
}>()
const genders = ['ชาย', 'หญิง']
const item = ref(props.item)
</script>

<template>
  <v-dialog max-width="1000px" persistent>
    <v-card
      class="elevation-5 pa-6"
      rounded="lg"
      max-width="1000px"
      width="1000px"
      style="min-width: 40vh"
    >
      <v-row>
        <v-col>
          <v-img> IMAGE </v-img>
        </v-col>
        <v-col>
          <v-row>
            <p class="details-text" style="font-size: 2.5vh; margin-left: 1vh">รายละเอียด</p>
          </v-row>
          <v-row>
            <v-col>
              <v-form ref="form">
                <v-text-field
                  v-model="item.id"
                  label="Id"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
                <v-text-field
                  v-model="item.email"
                  label="Email"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
                <v-text-field
                  v-if="isCreate"
                  v-model="item.password"
                  label="Password"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
                <v-text-field
                  v-model="item.firstName"
                  label="First Name"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
                <v-text-field
                  v-model="item.middleName"
                  label="Middle Name"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
                <v-text-field
                  v-model="item.lastName"
                  label="Last Name"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
                <v-text-field
                  v-model="item.phone"
                  label="Phone"
                  variant="outlined"
                  rounded="lg"
                ></v-text-field>
              </v-form>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-select
                v-model="item.gender"
                :items="genders"
                label="Base Gender"
                variant="outlined"
                rounded="lg"
              ></v-select>
            </v-col>
            <v-col>
              <v-combobox
                v-model="item.roles"
                variant="outlined"
                multiple
                label="Roles"
                :items="roles"
                item-title="name"
                item-value="id"
                :return-object="true"
                rounded="lg"
              ></v-combobox>
            </v-col>
          </v-row>
          <v-row class="justify-end">
            <v-btn @click="reset" variant="plain" color="error">ล้าง</v-btn
            ><v-btn @click="save" variant="plain">บันทึก</v-btn></v-row
          >
        </v-col>
      </v-row>
    </v-card></v-dialog
  >
</template>
