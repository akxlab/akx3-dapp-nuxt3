<script setup lang="ts">

import {useGlobalStore} from "~/stores"
import {useProfileStore} from "~/stores/profile";


const store = useGlobalStore()
const profile = useProfileStore();
const ausernamem = useState("usernamem", () => undefined);
const avatarm = useState("avatarm", () => undefined);




</script>
<template>

  <v-container>
    <v-card style="border-radius:25px;" class="pa-8" min-width="360" max-width="50%">
      <v-card-title class="pa-4">Create your AKX Profile</v-card-title>
      <v-card-text>
        <v-form>
          <v-text-field variant="outlined" v-model="ausernamem" label="pick a username" />
          <v-file-input v-model="avatarm" label="upload your avatar" />
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>

</template>