<script setup lang="ts"></script>

<template>
  <!-- <div>
    <v-app-bar style="background-color: #102073">
      <v-img
        style="margin-left: 70px"
        src="./img/Buu-logo11.png"
        max-width="55px"
        class="mr-2"
      ></v-img>
      <v-app-bar-title class="custom-title">
        <div>มหาวิทยาลัยบูรพา</div>
        <div>Burapha University</div>
      </v-app-bar-title>
    </v-app-bar>
    <v-app-bar style="background-color: #112f69">
      <div class="">
        <v-btn color="white" to="/"> หน้าหลัก </v-btn>
        <v-btn color="white" to="/news"> ข่าวสาร </v-btn>
        <v-btn color="white" to="/mainIFCurriculumView"> หลักสูตร </v-btn>
        <v-btn color="white" to="/contacts"> ติดต่อ </v-btn>
      </div>
    </v-app-bar>
  </div> -->
  <v-app-bar :style="{ backgroundColor: '#102073' }" class="w-screen" flat>
    <v-container class="d-flex align-center">
      <v-img src="./img/Buu-logo11.png" max-width="55px" class="mr-2"></v-img>
      <v-app-bar-title class="custom-title">
        <div>มหาวิทยาลัยบูรพา</div>
        <div>Burapha University</div>
      </v-app-bar-title>
      <v-app-bar-append> <v-btn class="rounded bg-white">Login</v-btn> </v-app-bar-append>
    </v-container>
  </v-app-bar>
  <v-app-bar style="background-color: #112f69">
    <v-container>
      <v-btn color="white" to="/"> หน้าหลัก </v-btn>
      <v-btn color="white" to="/news"> ข่าวสาร </v-btn>
      <v-btn color="white" to="/mainIFCurriculumView"> หลักสูตร </v-btn>
      <v-btn color="white" to="/contacts"> ติดต่อ </v-btn>
    </v-container>
  </v-app-bar>
</template>

<style scoped>
div {
  font-family: 'Kanit';
}
.custom-title {
  color: #fff;
  margin-left: 10px;
}
.button-bar {
  justify-content: space-around;
  background-color: #212d69;
  padding: 10px 0;
}
.button-bar .v-btn {
  color: white !important;
}
.left-align {
  display: flex;
  align-items: center;
}
</style>
