<script setup>

 import {useGlobalStore} from "../stores";

 const props = defineProps({leftNav:Boolean, rightNav:Boolean, rail:Boolean,  drawer:Boolean, networkName:String, coinName:String})
 const store = useGlobalStore();

</script>
<template>
  <v-app-bar :elevation="11" rounded>
    <template v-slot:append>
      <v-btn icon="fa-sharp fa-solid fa-hexagon-exclamation"></v-btn>

      <v-btn icon="fa-duotone fa-user-astronaut"></v-btn>

      <v-btn icon="fa-sharp fa-solid fa-circle-question" ></v-btn>

    </template>
  </v-app-bar>
  <NavigationLeft v-if="props.leftNav" :drawer="props.drawer" :rail="props.rail" :conn="{netName:props.networkName, coinName:props.coinName}" :balance="store.getBalance" :price="store.getPrice" :ethbal="store.getEth" :maticbal="store.getMatics"  />
  <NavigationRight :drawer="props.drawer" :rail="props.rail" v-if="props.rightNav" />
</template>