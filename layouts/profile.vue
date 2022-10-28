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
  <v-app>
    <div >
      <v-overlay :model-value="store.isLoading" class="align-center justify-center">
        <v-progress-circular  indeterminate size="64" color="primary"></v-progress-circular>
      </v-overlay>

    </div>

    <v-container fluid>
      <Nav :left-nav="store.canShowLeftNav" :right-nav="store.canShowRightNav" :drawer="drawer" :rail="rail" :network-name="networkName" :coin-name="coinName" />

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

<style>
@import "../assets/css/main.css";

</style>
