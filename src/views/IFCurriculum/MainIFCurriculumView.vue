<script setup lang="ts">
import { ref } from 'vue'

const tab = ref<string | null>(null)
    const show = ref<boolean>(false);
</script>
<template>
  <div>123</div>
  <!-- <div class="container">
      <v-card max-width="40%" style="padding: 5px">
        <v-btn-toggle rounded="8" group>
          <v-btn value="left" style="margin-right: 2%"> หลักสูตรปริญญาตรี </v-btn>

          <v-btn value="center"> หลักสูตรปริญญาโท </v-btn>

          <v-btn value="right"> หลักสูตรปริญญาเอก </v-btn>
        </v-btn-toggle>
      </v-card>
    </div> -->

  <div class="container">
    <v-card max-width="40%">
      <v-tabs fixed-tabs justify="center">
        <v-tab value="one">หลักสูตรปริญญาตรี</v-tab>
        <v-tab value="two">หลักสูตรปริญญาโท</v-tab>
        <v-tab value="three">หลักสูตรปริญญาเอก</v-tab>
      </v-tabs>
    </v-card>
  </div>
  <br />
  <div class="container">
    <v-card max-width="100%">
      <v-tabs v-model="tab">
        <v-tab value="one">สาขาวิทยาการคอมพิวเตอร์ <br />Computer Science ( CS )</v-tab>
        <v-tab value="two"
          >สาขาเทคโนโลยีสารสนเทศเพื่ออุตสาหกรรมดิจิทัล <br />Information Technology for Digital
          Industry ( IT )</v-tab
        >
        <v-tab value="three">สาขาวิศวกรรมซอฟต์แวร์ <br />Software Engineering ( SE )</v-tab>
        <v-tab value="four"
          >สาขาปัญญาประดิษฐ์ประยุกต์และเทคโนโลยีอัจฉริยะ<br />
          Applied Artificial Intelligence and Smart Technology ( AAI )</v-tab
        >
      </v-tabs>
    </v-card>
  </div>
  <br />
  <div class="container">
    <v-card style="width: 86vw; height: 100vw">
      <v-card-title style="text-align: left; margin: 2%">รายละเอียด</v-card-title>
      <v-divider class="mx-4 mb-1" style="margin: 2%"></v-divider>
      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="one">
            <p style="font-size: large; margin-left: 3%">ชื่อปริญญา</p>
            <p style="margin-left: 6%; font-size: medium">
              ภาษาไทย: วิทยาศาสตรบัณฑิต (วิทยาการคอมพิวเตอร์) <br />ชื่อย่อภาษาไทย: วท.บ.
              (วิทยาการคอมพิวเตอร์) <br />ภาษาอังกฤษ: Bachelor of Science (Computer Science)
              <br />ชื่อย่อภาษาอังกฤษ: B.Sc. (Computer Science)
            </p>

            <p style="font-size: large; margin-left: 3%">คำอธิบายสาขาวิชา</p>
            <p style="margin-left: 6%; font-size: medium">
              วิทยาการคอมพิวเตอร์ (Computer Science: CS)
              เป็นศาสตร์เกี่ยวกับการศึกษาค้นคว้าทฤษฏีการคำนวณสำหรับคอมพิวเตอร์
              และทฤษฏีการประมวลผลสารสนเทศ ทั้งด้านซอฟต์แวร์ ฮาร์ดแวร์ และ เครือข่าย
              ประกอบด้วยหลายหัวข้อที่เกี่ยวข้อง เช่น การวิเคราะห์และสังเคราะห์ขั้นตอนวิธี
              ทฤษฎีภาษาโปรแกรม ทฤษฏีการพัฒนาซอฟต์แวร์ ทฤษฎีฮาร์ดแวร์คอมพิวเตอร์ และทฤษฏีเครือข่าย
            </p>

            <p style="font-size: large; margin-left: 3%">ผลการเรียนรู้ที่คาดหวังของหลักสูตร</p>
            <p style="margin-left: 6%; font-size: medium">
                <ol>
                    <li>บัณฑิตมีความรู้ความสามารถทางด้านวิทยาการคอมพิวเตอร์และศาสตร์ที่เกี่ยวข้อง</li>
                        <li>บัณฑิตมีความสามารถในการวิเคราะห์ปํญหาและเลือกวิธีการแก้ปัญหาได้อย่างเหมาะสม</li>
                            <li>บัณฑิตมีความพร้อมในการเรียนรู้สิ่งใหม่ สามารถค้นคว้าหาความรู้ ได้ด้วยตนเอง</li>
                                <li>บัณฑิตมีความสามารถในการทำงานร่วมกับผู้อื่นได้และยอมรับฟังความคิดเห็นของผู้อื่น</li>
                                    <li>บัณฑิตมีความสามารถในการสื่อสารและการนำเสนอข้อมูลทางวิทยาการคอมพิวเตอร์
              และศาสตร์ที่เกี่ยวข้องให้เข้าใจได้ทั้งภาษาไทยและภาษาอังกฤษ</li>
              <li>บัณฑิตมีจรรยาบรรณและจริยธรรมในวิชาชีพ มีความรับผิดชอบต่อตนเองและสังคม</li>
            </ol>
            </p>

            <p style="font-size: large; margin-left: 3%">เล่มหลักสูตร</p>
            <p style="margin-left: 6%; font-size: medium">
                <ul>
                    <li @click="show = !show">วิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ หลักสูตรปรับปรุง พ.ศ. 2565 (ดาวน์โหลด)
    </li>
                    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape.
        </v-card-text>
      </div>
    </v-expand-transition>
                        <li>หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ หลักสูตรปรับปรุง พ.ศ. 2564 (ดาวน์โหลด)</li>
                            <li>หลักสูตรวิทยาศาสตรบัณฑิต สาขาวิชาวิทยาการคอมพิวเตอร์ หลักสูตรปรับปรุง พ.ศ. 2559 (ดาวน์โหลด)</li>
                             
            </ul>
        </p>
          </v-tabs-window-item>

          <v-tabs-window-item value="two"> Two </v-tabs-window-item>

          <v-tabs-window-item value="three"> Three </v-tabs-window-item>

          <v-tabs-window-item value="four"> Four </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>
<style scoped>
.container {
  display: flex;
  justify-content: center;
}
</style>
