<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="8">
        <v-card>
          <v-card-title> Tour Guide 🚀 </v-card-title>
          <v-card-text>
            <v-stepper hide-actions alt-labels flat>
              <v-stepper-header>
                <v-stepper-item title="1" value="1"></v-stepper-item>

                <v-divider></v-divider>

                <v-stepper-item title="2" value="2"></v-stepper-item>

                <v-divider></v-divider>

                <v-stepper-item title="3" value="3"></v-stepper-item>
              </v-stepper-header>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title> Develop Team 🧑‍💻</v-card-title>
          <v-card-text>
            <v-list-item></v-list-item>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts"></script>
