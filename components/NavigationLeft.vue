<script setup lang="ts">




import {useGlobalStore} from '~/stores';
const store = useGlobalStore()

defineProps({drawer:Boolean, rail:Boolean, conn: Object, balance: String, ethbal: String, maticbal:String, price:String});





const navItems = [
  {
    title: 'Create / Edit Profile', icon: "fa-light fa-user-pen",

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
  <v-navigation-drawer app  :permanent="true" location="left" v-model="drawer"  >
    <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        title="PROFILE NOT SET"
        nav
    >

    </v-list-item>

    <v-divider></v-divider>
    <v-list density="compact">
      <v-card  class="ma-2" >
        <v-card-title>CONNECTION</v-card-title>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              {{$props.conn.netName}}
            </v-col>

            <v-divider />
            <v-col cols="5">
             Coin
            </v-col>
            <v-col cols="7">
              {{$props.conn.coinName}}
            </v-col>
            <v-divider />
            <v-col cols="5">
              AKX Price
            </v-col>
            <v-col cols="7">
              {{$props.price}} {{$props.conn.coinName}}
            </v-col>
          </v-row>
        </v-card-text>
      </v-card></v-list>
    <v-list density="compact">
      <v-card  class="ma-2" color="primary">
      <v-card-title>BALANCES</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="5">
            ETH
          </v-col>
          <v-col cols="7">
            {{  $props.ethbal }}
          </v-col>
          <v-divider />
          <v-col cols="5">
            MATICS
          </v-col>
          <v-col cols="7">
            {{  $props.maticbal }}
          </v-col>
          <v-divider />
          <v-col cols="5">
            AKX
          </v-col>
          <v-col cols="7">
            {{ balance }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card></v-list>
    <v-list density="compact">
      <v-list-item v-for="item in navItems" :key="item.title" link :prepend-icon="item.icon" :title="item.title" class="my-4">


      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
