<script setup>
// @ts-ignore
const props = defineProps({loadedProfile:Object, identity:String});

</script>

<template>

    <v-col cols="12" xl="4">


      <v-card v-if="loadedProfile" width="600" height="600"  class="mt-10" style="border-radius:20px; border:0;">
        <nuxt-img :src="`https://cloudflare-ipfs.com/ipfs/${loadedProfile.avatar}`" width="820" />

        <v-overlay contained
                   scrim="#000000"

                   :close-on-content-click="false"
                   class="align-center justify-center" :model-value="true" :persistent="true">

          <v-row>
            <v-col cols="4" align="right">
              <v-avatar size="100" class="ma-3" style="border:2px #fff inset;" v-if="loadedProfile.avatar">
                <nuxt-img :src="`https://cloudflare-ipfs.com/ipfs/${loadedProfile.avatar}`" width="100" />
              </v-avatar>
            </v-col>
            <v-col cols="8">

              <h1 class="avatar-title bigger mt-4">{{loadedProfile.username}}</h1>

            </v-col>

          </v-row>
          <v-row justify="center" align-content="center">
            <v-col cols="12" align="center">
              <v-btn variant="text" size="x-large" prepend-icon="fa-light fa-feather-pointed">8,100,123 ptys</v-btn>
            </v-col>

          </v-row>
          <v-card-actions>
            <v-row><v-col cols="12" align="center">
              <v-btn variant="text" size="x-large" style="font-size:18px;" v-if="identity" prepend-icon="fa-light fa-fingerprint">{{ identity }}</v-btn>
            </v-col>
              <v-col cols="12" align="center">
                <v-btn variant="text" size="x-large" color="green" style="font-size:18px;"  prepend-icon="fa-solid fa-badge-check">VERIFIED</v-btn>
              </v-col></v-row>
          </v-card-actions>
          <v-card-item class="mt-12 pt-12">
            <v-row><v-col align="right">
              <v-btn variant="outlined" size="x-large"  style="font-size:18px;"  prepend-icon="fa-regular fa-arrow-up-right-dots">12</v-btn>
            </v-col></v-row>

          </v-card-item>
        </v-overlay>
      </v-card>
    </v-col>


</template>