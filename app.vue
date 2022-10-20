<script lang="ts" setup>

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
      <v-row justify="center" class="my-1 text-center">
                                                                                                  
               <v-col cols="12" class="align-center">&copy; 2022 AKX3.com</v-col>
      </v-row>
    </v-footer>

    </v-container>
   
  </v-app>
</template>
