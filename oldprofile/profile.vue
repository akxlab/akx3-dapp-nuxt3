<script lang="ts" setup>
import useEther from '../composables/web3/useEther';


import {useGlobalStore} from "~/stores";
import { ethers } from 'ethers';
import {useRoute, useState} from "#app";
import {computed, onMounted, useImage} from "#imports";
import useAvatar from "~/composables/useAvatar";
import {useProfileStore} from "~/stores/profile";

const store = useGlobalStore();
const  {
    getProvider,
    switchNetwork,
    signMessage,
    addToken,
    getChainId,
    getCurrentUser,
    getBalance,
    getSigner,
    connectUser,
    loadConnectedWallet,
    getAKXBalance,
    getTokenContract,
    getSaleContract
  }
 = useEther();
const metas = useState("profile_metas", () => undefined);
const profile = useProfileStore();
 const loading = store.isLoading;
 const drawer = true;
const rail = true;
const networkName = useState("netName", () => undefined);
const coinName = useState("coinName", () => undefined);
 const provider = useState('provider', () => undefined);
let bal;
let price;
const isSet = useState('isset', () => false)
const route = useRoute();
const slug = route.params.slugs;
const loadedProfile = useState('loadedProfile', () => undefined)
const identity = useState('identity', () => undefined);
 onMounted(async () => {
   const caller = useAvatar();

  provider.value = await getProvider();
   const username = slug;
   if(username && !loadedProfile.value) {
     // @ts-ignore
     const u = await caller.getDataFromUsername(username);
     loadedProfile.value = u;
     console.log(u);
     if(u) {
       identity.value = u.identity.substring(0, 32)+"...";
     }

   }
   const chainId = await getChainId();
   if(chainId != "0x13881" && chainId != "0x01" && chainId != "0x05" && chainId != "0x89") {
     await switchNetwork()
   }

   if(chainId == "0x13881") {
     networkName.value = "Mumbai Testnet (Polygon)"
     coinName.value = "MATIC"
   } else if(chainId == "0x89") {
     networkName.value = "Polygon (Mainnet)"
     coinName.value = "MATIC"
   }  else if(chainId == "0x05") {
     networkName.value = "Goerli Testnet (Ethereum)"
     coinName.value = "gETH"
   }  else if(chainId == "0x01") {
     networkName.value = "Ethereum (Mainnet)"
     coinName.value = "ETH"
   }

await connectUser(provider);

store.setLoading(true);
const user:any = await getCurrentUser();
const balance0:String = ethers.utils.formatEther(await getBalance(user[0]))
 const balance1 = balance0.split(".")
   const decimals = balance1[1].slice(0, balance1[1].length)
   const balance = balance1[0]+"."+decimals+"..."


store.authenticated(true);
store.setLoading(false);
   const akxBalance = await getTokenContract()
   const saleContract = await getSaleContract('0x5d0aA3B7Bb489b546EB1f2d6dfE7A101C554d360')
   const bal0 = ethers.utils.formatUnits(await akxBalance.balanceOf(user[0])).toLocaleUpperCase()
   const bal1 = bal0.split(".")
   const dec = bal1[1].slice(0, bal1[1].length);
   bal = bal1[0]+"."+dec+"..."
  price = ethers.utils.formatUnits(await saleContract.price())

   if(store) {

     store.setUserData({address: user[0], balance: bal, chainId, eth: balance, matic: balance, price:price})
     isSet.value = true
     const uploadURL = "/api/avatar/upload/"+user[0].address;

   }

 });

 
    </script>
<template>
<v-container fluid>

    <v-app-bar :elevation="11" rounded>
  <template v-slot:append>
    <v-btn icon="fa-sharp fa-solid fa-hexagon-exclamation"></v-btn>

    <v-btn icon="fa-duotone fa-user-astronaut"></v-btn>

    <v-btn icon="fa-sharp fa-solid fa-circle-question" ></v-btn>

  </template>
</v-app-bar>
  <NavigationLeft :drawer="drawer" :rail="rail" :conn="{netName:networkName, coinName:coinName}" :balance="store.getBalance" :price="store.getPrice" :ethbal="store.getEth" :maticbal="store.getMatics" v-if="isSet" />
  <NavigationRight :drawer="drawer" :rail="rail" />
<div v-if="!slug">
  <ProfileCreate v-if="isSet" :uploadUrl="store.$state.user.address" />
</div>
  <div v-if="slug">
    <v-row>
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
      <v-col cols="12" xl="8" class="mt-10">
        <v-card style="border-radius:20px;" min-height="80vh" class="pa-4">
          <v-card-title>OWNED ASSETS (TRUSTED)</v-card-title>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>


</v-container>
</template>

<style>
@import url("https://use.typekit.net/fib6nnw.css");

* {
  font-family: sofia-pro, sans-serif;

  font-weight: 300;

  font-style: normal !important;
}

.v-overlay__scrim {
  opacity:0.9;
}

strong {
  text-transform: uppercase;
  font-family: sofia-pro, sans-serif;

  font-weight: 700 !important;

  font-style: normal !important;
}

.btn-text {
  font-family: sofia-pro, sans-serif;

  font-weight: 700;

  font-style: normal;
}

.welcome-title {
  font-size: 1.8rem;
  text-transform: uppercase;
  font-family: sofia-pro, sans-serif;

  font-weight: 700 !important;

  font-style: normal !important;
}

.home-content {
  width: 360px;
  font-size: 1rem;

  font-family: sofia-pro, sans-serif;

  font-weight: 300 !important;

  font-style: normal !important;
}

@media screen and (min-width: 320px) and (max-width: 767px) {
  .welcome-title {
    font-size: 1.8rem;
    line-height: 3rem;
    text-transform: uppercase;
    font-family: sofia-pro, sans-serif;

    font-weight: 700 !important;

    font-style: normal !important;
  }
  .home-content {
    width: 100%;
    font-size: 1rem;

    font-family: sofia-pro, sans-serif;

    font-weight: 300 !important;

    font-style: normal !important;
  }

  .btn-text {
    font-family: sofia-pro, sans-serif;

    font-weight: 700;

    font-style: normal;
    width:100%;
    word-wrap: break-word;
  }

}
/****** START - iPad ******/
@media screen and (min-width: 768px) and (max-width: 992px) {
  .welcome-title {
    font-size: 1.8rem;
    line-height: 3rem;
    text-transform: uppercase;
    font-family: sofia-pro, sans-serif;

    font-weight: 700 !important;

    font-style: normal !important;
  }
  .home-content {
    width: 100%;
    font-size: 1rem;

    font-family: sofia-pro, sans-serif;

    font-weight: 300 !important;

    font-style: normal !important;
  }
}

.avatar-title.bigger {
  font-size:3rem !important;
}
</style>