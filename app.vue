<script lang="ts" setup>
import { useGamepad } from '@vueuse/core';
import { useGlobalStore } from './stores';

const store = useGlobalStore();
const loadValue = ref(0);
if(store.isLoading == false) {
  loadValue.value = 100;
}

</script>
<template>


  <v-app>
    <div >
      <v-overlay :model-value="store.isLoading" class="align-center justify-center">
          <v-progress-circular  indeterminate size="64" color="primary"></v-progress-circular>
        </v-overlay>
       
      </div>
    <v-container fluid>
   
      <v-main>
        <NuxtPage />
      </v-main>
      <v-footer dark app>
      <v-row justify="center" class="my-4 text-center">
        <v-col cols="12">Check us out on those networks</v-col>
        <v-col cols="12">
          <v-btn variant="text">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>
          <v-btn variant="text">
            <v-icon>mdi-twitter</v-icon>
          </v-btn>
          <v-btn variant="text">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn variant="text">
            <v-icon>mdi-ethereum</v-icon>
          </v-btn>

        </v-col>
        <v-col cols="12" class="align-center">&copy; 2022 AKX3.com</v-col>
      </v-row>
    </v-footer>

    </v-container>
   
  </v-app>
</template>
