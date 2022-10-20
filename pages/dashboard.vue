<script lang="ts" setup>
import useEther from '../composables/web3/useEther';


import {useGlobalStore} from "~/stores";
import { ethers } from 'ethers';
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

 const provider = useState('provider', () => undefined);
 onMounted(async () => {
  provider.value = await getProvider();

await connectUser(provider);

store.setLoading(true);
const user:any = await getCurrentUser();
const balance = await getBalance(user[0]);
const chainId = await getChainId();
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
  


      </v-card-text>
    </v-card>

</v-container>
</template>
