<script setup>
import useEther from '../composables/web3/useEther';


import {useGlobalStore} from "~/stores";
import { ethers } from 'ethers';
import BuyButton from "~/components/buttons/BuyButton.vue";

definePageMeta({
  layout: "profile",
});


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
<<<<<<< Updated upstream

 const loading = store.isLoading;
 const drawer = true;
=======
const profile = useProfileStore();
const loading = store.isLoading;
const drawer = true;
>>>>>>> Stashed changes
const rail = true;
const networkName = useState("netName", () => undefined);
const coinName = useState("coinName", () => undefined);
const provider = useState('provider', () => undefined);
let bal;
let price;
const isSet = useState('isset', () => false)
<<<<<<< Updated upstream

 onMounted(async () => {

  provider.value = await getProvider();


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
=======
const route = useRoute();
const slug = route.params.slugs;
const loadedProfile = useState('loadedProfile', () => undefined)
const identity = useState('identity', () => undefined);
onBeforeMount(async () => {
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
>>>>>>> Stashed changes

  }
  const chainId = await getChainId();
  if(chainId != "0x13881" && chainId != "0x01" && chainId != "0x05" && chainId != "0x89") {
    await switchNetwork()
  }

<<<<<<< Updated upstream
     store.setUserData({address: user[0], balance: bal, chainId, eth: balance, matic: balance, price:price})
     isSet.value = true
   }


 })
 
    </script>
=======
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
  const user= await getCurrentUser();
  const balance0= ethers.utils.formatEther(await getBalance(user[0]))
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
  const route = useRoute();
  const path = route.path;
  bal = bal1[0]+"."+dec+"..."
  price = ethers.utils.formatUnits(await saleContract.price())

  if(store) {

    store.setUserData({address: user[0], balance: bal, chainId, eth: balance, matic: balance, price:price})
    isSet.value = true
    const uploadURL = "/api/avatar/upload/"+user[0].address;
    if(path == "/") {
      store.setShowRightNav(false);
      store.setShowLeftNav(false);
    } else {
      store.setShowRightNav(true);
      store.setShowLeftNav(true);
    }
  }

});
</script>
>>>>>>> Stashed changes
<template>

<v-container fluid>

<<<<<<< Updated upstream
  </template>
</v-app-bar>
  <NavigationLeft :drawer="drawer" :rail="rail" :conn="{netName:networkName, coinName:coinName}" :balance="store.getBalance" :price="store.getPrice" :ethbal="store.getEth" :maticbal="store.getMatics" v-if="isSet" />
  <NavigationRight :drawer="drawer" :rail="rail" />

  <ProfileCreate />

=======
<div v-if="!slug">
  <ProfileCreate v-if="isSet" :uploadUrl="store.$state.user.address" />
</div>
  <div v-if="slug">
    <v-row>
    <ProfileCard :loaded-profile="loadedProfile" :identity="identity" />
    <v-col cols="12" xl="8" class="mt-10">
      <v-card style="border-radius:20px;" min-height="80vh" class="pa-4">
        <v-card-title>OWNED ASSETS (TRUSTED)</v-card-title>
        <v-card-text>

        </v-card-text>
      </v-card>
    </v-col>
    </v-row>
  </div>
>>>>>>> Stashed changes


</v-container>
</template>


<style>
@import url("https://use.typekit.net/fib6nnw.css");

* {
  font-family: sofia-pro, sans-serif;

  font-weight: 300 !important;

  font-style: normal !important;
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


@media screen and (min-width: 320px) and (max-width: 767px) {


}
/****** START - iPad ******/
@media screen and (min-width: 768px) and (max-width: 992px) {

}
</style>