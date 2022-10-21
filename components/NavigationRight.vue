<script setup lang="ts">

import {useState} from "#app";

defineProps({drawer:Boolean, rail:Boolean});


const navItems = [
  {
    title: 'Dashboard', icon: "fa-light fa-house-chimney-user",

  },
  {
    title: 'Stats', icon: "fa-sharp fa-solid fa-chart-column"
  },
  {
    title: 'Manage Identity', icon: "fa-sharp fa-solid fa-id-badge"
  },
  {
    title: "Notifications", icon:"fa-sharp fa-solid fa-hexagon-exclamation"
  },
  {
    title: "Logout", icon:"fa-sharp fa-solid fa-power-off"
  }
]


</script>
<template>
  <v-navigation-drawer app :rail="rail" :permanent="true" location="right" v-model="drawer" @click="rail = false" color="primary">
    <v-list-item

        nav
    >
      <template v-slot:append>
        <v-btn v-if="rail == false"
            variant="text"
            icon="fa-solid fa-sharp fa-arrow-right-from-line"
            @click.stop="rail = !rail"
        ></v-btn>
        <v-btn v-if="rail == true"
               variant="text"
               icon="fa-solid fa-sharp fa-arrow-left-from-line"
               @click.stop="rail = !rail"
        ></v-btn>
      </template>
    </v-list-item>

    <v-divider></v-divider>
    <v-list density="compact">
      <v-list-item v-for="item in navItems" :key="item.title" link :prepend-icon="item.icon" :title="item.title" class="my-4">


      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
