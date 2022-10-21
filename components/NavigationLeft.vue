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
        class="pa-2"
        nav
    >

    </v-list-item>

    <v-divider></v-divider>
    <v-list density="compact">
      <v-card  class="ma-2" >
        <v-card-subtitle class="pa-2">CONNECTION</v-card-subtitle>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col cols="12">
              {{$props.conn.netName}}
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
      <v-card  class="pa-2" color="primary">
      <v-card-title class="pa-0 pl-1 pb-2">BALANCES</v-card-title>
      <v-divider />
      <v-card-text>
        <v-row>
          <v-col cols="5" class="pa-0 pt-2">
         {{$props.conn.coinName}}
          </v-col>
          <v-col cols="7">
            <h2 class="balance-coin">{{  $props.maticbal }}</h2>
          </v-col>
          <v-divider />

          <v-divider />
          <v-col cols="12" class="pa-0 pt-2">
            AKX
          </v-col>
          <v-col cols="12">
            <div class="balance-container"><h2 class="balance"> {{ balance }} </h2></div>
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
<style>
.balance {
  font-size:2.4rem;
  font-weight:700 !important;
  width:100%;
  overflow:hidden;
line-height:3rem;
  vertical-align: middle;
  text-wrap:none;
  max-height:1.3em;
  text-align:center;

}

.balance-container {
  display:block;
  width:100%;
  margin:0 auto;
  background:rgba(0,0,0,0.5);
  padding:2px;
  padding-top:0;
  text-align:center;
  padding-left:14px;
  padding-right:14px;
  border-radius:15px;
  border:2px solid rgba(255,255,255,0.5);
}

.balance-coin {
  font-size:1.8rem;
  width:90%;
  overflow:hidden;
  line-height:2.8rem;
  text-wrap:none;
  max-height:1.3em;
}
</style>