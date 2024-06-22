<script setup lang="ts"></script>

<template>
  <div>
    <v-app-bar style="background-color: #212d69">
      <v-app-bar-title class="custom-title">
        <div>มหาวิทยาลัยบูรพา</div>
        <div>Burapha University</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-app-bar style="background-color: #112f69">
      <div class="button-bar">
        <v-btn color="white" to="/home"> หน้าหลัก </v-btn>
        <v-btn color="white" to="/news"> ข่าวสาร </v-btn>
        <v-btn color="white" to="/mainIFCurriculumView"> หลักสูตร </v-btn>
        <v-btn color="white" to="/contact"> ติดต่อ </v-btn>
      </div>
    </v-app-bar>
    <v-card></v-card>
  </div>
</template>

<style scoped>
div {
  font-family: 'Kanit';
}
.custom-title {
  color: #fff;
}
.button-bar {
  justify-content: space-around;
  background-color: #212d69;
  padding: 10px 0;
}
.button-bar .v-btn {
  color: white !important;
}
</style>
