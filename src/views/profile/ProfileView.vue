<template>
  <v-container class="mx-auto">
    <v-row>
      <v-col cols="12" md="4">
        <v-card class="pa-5" height="50hv" style="border-top: 4px solid #2d487e">
          <template #text>
            <v-row class="d-flex justify-center">
              <v-img
                :src="profile?.picture"
                min-width="200"
                min-height="200"
                max-width="200"
                max-height="200"
                class="rounded-circle"
              ></v-img>
            </v-row>

            <div class="mt-7 text-center">
              <!-- <p>{{ profile?.name }}</p>
              <p>{{ profile?.email }}</p> -->
              <p>Chanon Thansawad</p>
              <p>65160066@go.buu.ac.th</p>
              <p class="mt-7" style="color: green">สถานะ : กำลังศึกษา</p>
            </div>

            <v-divider class="mt-4 mb-4"></v-divider>
            <div style="display: flex; margin-bottom: 2vh">
              <div class="rounded-rectangle"></div>
              <p class="text-header ml-3" style="font-size: 2.5vh">ทักษะที่โดดเด่น</p>
            </div>

            <div ref="chartDom" style="width: 100%; height: 320px; margin-top: 10px"></div>
          </template>
        </v-card>
      </v-col>
      <v-col cols="12" md="8">
        <v-card class="pa-7" height="380px" style="border-top: 4px solid #2d487e">
          <div style="display: flex; margin-bottom: 2vh">
            <div class="rounded-rectangle"></div>
            <p class="text-header ml-3" style="font-size: 2.5vh">ระเบียนประวัติ</p>
          </div>

          <p class="text-content mt-1">รหัสประจำตัว : 65160066</p>
          <p class="text-content mt-1">ชื่อ : ชานนท์ ตันสวัสดิ์</p>
          <p class="text-content mt-1">ชื่ออังกฤษ : MR.CHANON THANSAWAD</p>
          <p class="text-content mt-1">คณะ : คณะวิทยาการสารสนเทศ</p>
          <p class="text-content mt-1">วิทยาเขต : บางแสน</p>
          <p class="text-content mt-1">
            หลักสูตร : 2134003 วท.บ. (วิทยาการคอมพิวเตอร์) ปรับปรุง 65 - ป.ตรี 4 ปี ปกติ
          </p>
          <p class="text-content mt-1">ระดับการศึกษา : ปริญญาตรี</p>
          <p class="text-content mt-1">
            ชื่อปริญญา : วิทยาศาสตรบัณฑิต วท.บ. (วิทยาการคอมพิวเตอร์) ปรับปรุง 65 - ป.ตรี 4 ปี ปกติ
          </p>
        </v-card>

        <v-card class="pa-7 mt-2" style="border-top: 4px solid #2d487e">
          <div style="display: flex; align-items: center; margin-bottom: 2vh">
            <div class="rounded-rectangle"></div>
            <p class="text-header ml-3" style="font-size: 2.5vh; margin: 0">
              ทักษะของผู้เรียนทั้งหมด
            </p>
          </div>

          <div class="d-flex justify-space-between align-center" style="margin-bottom: 1vh">
            <v-icon color="amber-accent-4">mdi-numeric-1-circle</v-icon>
            <p class="text-content" style="margin-left: 1vh">หล่อ</p>
            <p class="text-content" style="margin-left: auto">10000000000/1000000</p>
          </div>

          <v-divider class="mt-2 mb-2"></v-divider>

          <div class="d-flex justify-space-between align-center" style="margin-bottom: 1vh">
            <v-icon color="grey">mdi-numeric-2-circle</v-icon>
            <p class="text-content" style="margin-left: 1vh">web programming</p>
            <p class="text-content" style="margin-left: auto">10/1000000</p>
          </div>

          <v-divider class="mt-2 mb-2"></v-divider>

          <div class="d-flex justify-space-between align-center">
            <v-icon color="brown-darken-3">mdi-numeric-3-circle</v-icon>
            <p class="text-content" style="margin-left: 1vh">data analytics</p>
            <p class="text-content" style="margin-left: auto">10/1000000</p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { Profile } from '@/types/Profile'
import * as echarts from 'echarts'

// Store reference to auth and profile
const auth = useAuthStore()
const profile = ref<Profile | null>(null)

// Reference to the chart DOM element
const chartDom = ref<HTMLElement | null>(null)

// Fetch profile and initialize chart
onMounted(async () => {
  profile.value = await auth.fetchProfile()

  if (chartDom.value) {
    const myChart = echarts.init(chartDom.value)

    const option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        left: 'center'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 1048, name: 'หล่อ' },
            { value: 735, name: 'Data analytics' },
            { value: 580, name: 'Web programming' }
          ]
        }
      ]
    }

    // Set the chart options
    myChart.setOption(option)
  }
})
</script>

<style>
.rounded-rectangle {
  width: 1vh; /* Adjust the width as needed */
  height: 3.5vh; /* Adjust the height as needed */
  background-color: #392fc5; /* Background color of the rectangle */
  border-top-left-radius: 50px; /* Adjust the radius as needed */
  border-top-right-radius: 50px; /* Adjust the radius as needed */
  border-bottom-left-radius: 50px; /* Adjust the radius as needed */
  border-bottom-right-radius: 50px; /* Adjust the radius as needed */
}
</style>
