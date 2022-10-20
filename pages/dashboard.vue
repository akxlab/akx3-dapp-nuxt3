<script lang="ts" setup>
import useEther from '../composables/web3/useEther';


import {useGlobalStore} from "~/stores";
import { ethers } from 'ethers';
import BuyButton from "~/components/buttons/BuyButton.vue";
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
    loadConnectedWallet
  }
 = useEther();

 const loading = store.isLoading;
const networkName = useState("netName", () => undefined);
const coinName = useState("coinName", () => undefined);
 const provider = useState('provider', () => undefined);
 onMounted(async () => {
  provider.value = await getProvider();


   const chainId = await getChainId();
   if(chainId != "0x13881" && chainId != "0x01" && chainId != "0x05" && chainId != "0x89") {
     await switchNetwork()
   }

   if(chainId == "0x13881") {
     networkName.value = "Mumbai Testnet (Polygon)"
     coinName.value = "TEST MATIC"
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
const balance = await getBalance(user[0]);


store.setUserData({address:user[0], balance:ethers.utils.formatUnits(balance), chainId})
store.authenticated(true);
store.setLoading(false);
 })
 
    </script>
<template>
<v-container fluid>

    <v-app-bar :elevation="11" rounded>
  <template v-slot:append>
    <v-btn icon="mdi-wallet"></v-btn>

    <v-btn icon="mdi-chart-line"></v-btn>

    <v-btn icon="mdi-power"></v-btn>
    <v-btn icon="mdi-dots-vertical"></v-btn>
  </template>
</v-app-bar>
  <v-card
class="ma-auto mt-15"
width="80vw"
height="85vh"
style="border-radius:15px;border:1px rgba(255,255,255,0.2) solid;"

    >

    <v-card-text>
  
  <BuyButton :net-name="networkName" :coin-name="coinName" />

      </v-card-text>
    </v-card>

</v-container>
</template>

<style>
@import url("https://use.typekit.net/fib6nnw.css");

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
</style>