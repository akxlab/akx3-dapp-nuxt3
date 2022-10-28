<script setup lang="ts">


import {useFetch, useState} from "#app";
import axios from "axios";
import {onMounted, useAvatar} from "#imports";
import * as fs from "fs";
import {useGlobalStore} from "~/stores";
import {useProfileStore} from "~/stores/profile";

const props = defineProps({uploadUrl: {type:String, required:true}});
const store = useGlobalStore();

const profile = useProfileStore();
const ausernamem = useState("usernamem", () => undefined);
const avatarm = useState("avatarm", () => undefined);

const filename = useState("filename", () => undefined);
const files = useState("file", () => undefined);
const uploadTo = useState("uploadurl", () => "");
const images = useState("images", () => undefined);
const uploader = useAvatar();
const avatar = useState("avatar", () => undefined);
const username = useState("username", () => undefined);
const identity = useState("identity", () => undefined);

const isSet = useState("isset", () => false);
onMounted(async () => {
  uploadTo.value = "/api/avatar/upload/"+props.uploadUrl;
  console.log(uploadTo.value);
  isSet.value = true;
  const userdata = await uploader.getUserData(props.uploadUrl);
  avatar.value = "https://cloudflare-ipfs.com/ipfs/"+userdata.avatar;
  username.value = userdata.username;
  identity.value = userdata.identity;

})

const save = async () => {
  store.setLoading(true)
  const Data = new FormData();
  for (let i = 0; i < images.value.length; i++) {
    const image = images.value[i];
    Data.append(`file`, image);
  }
if(props.uploadUrl) {
  const data = await uploader.uploadAvatar("https://api.akx3.com:3334/avatar/upload/" + props.uploadUrl, Data, { headers: {"Content-Type": "multipart/form-data"}
  });
  const usernameChanged = await uploader.changeUsername(username.value, props.uploadUrl);

  if(data) {
    const userdata = await uploader.getUserData(props.uploadUrl);
    avatar.value = "https://cloudflare-ipfs.com/ipfs/"+userdata.avatar;
    username.value = userdata.username;
    identity.value = userdata.identity;
    profile.setAvatar(avatar.value);
    profile.setUserName(username.value);
    store.setLoading(false);
  }



}


}


</script>
<template>

  <v-container>
    <v-card style="border-radius:25px;" class="pa-8" min-width="360" max-width="50%" theme="AKXLight" elevation="5">
      <v-card-title class="pa-4 form-title">Create / Edit your AKX Profile</v-card-title>
      <v-divider class="mb-5" />
      <v-card-text>

        <form  enctype="multipart/form-data" v-if="isSet">
          <v-text-field variant="outlined" v-model="identity" label="your unique AKXID (NOT EDITABLE)" disabled />
          <v-text-field variant="outlined" v-model="username" label="pick a username" />
          <v-divider class="mb-10 mt-10" />
          <v-row justify="center">
            <v-col cols="2">
              <v-avatar size="80" class="ma-3" style="border:2px #fff inset;" v-if="avatar">
                <nuxt-img :src="avatar" width="100" />
              </v-avatar>
            </v-col>
            <v-col class="mt-10 current-avatar-text ml-sm-4 pl-md-4" cols="10" sm="12" md="6">
             Your current avatar
            </v-col>
          </v-row><v-divider class="mb-10 mt-10" />
          <v-row justify="center">
            <v-col cols="12">
              <v-file-input label="click to pick a new avatar image" v-model="images" name="file" /></v-col>
          <input type="hidden" name="identity" :value="identity"  />
            <v-col cols="12" align="right"><v-btn @click="save()" size="x-large"  color="black">SAVE MY INFO</v-btn></v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
  </v-container>

</template>
<style>
.current-avatar-text {
  font-size:1.2rem;
  text-transform:uppercase;
}

.form-title {
  font-size:2.5rem !important;
  font-weight:900 !important;
  margin-bottom:25px;
}
</style>