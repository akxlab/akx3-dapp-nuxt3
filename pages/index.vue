<script lang="ts" setup>
import useEther from '../composables/web3/useEther';
import { useStorage } from "@vueuse/core";

import {useGlobalStore} from "~/stores";
import { ethers } from 'ethers';
const store = useGlobalStore();
definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

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

 let showpopup = true;
 provider.value =  await getProvider();

 const connect = async () => {
  await connectUser(provider);
  
 store.setLoading(true);
 const user:any = await getCurrentUser();
 const balance = await getBalance(user[0]);
 const chainId = await getChainId();
 store.setUserData({address:user[0], balance:ethers.utils.formatUnits(balance), chainId})
 store.authenticated(true);
 store.setLoading(false);
 }

 const storage = useStorage('connected', false);

 if(storage.value == true) {
   await connectUser(provider);
  
 store.setLoading(true);
 const user:any = await getCurrentUser();
 const balance = await getBalance(user[0]);
 const chainId = await getChainId();
 store.setUserData({address:user[0], balance:ethers.utils.formatUnits(balance), chainId})
 store.authenticated(true);
 store.setLoading(false);
 }

onMounted(async () => {

  loadConnectedWallet(provider.value);


provider.value.on('accountsChanged', async (accounts) => {
  loadConnectedWallet(provider.value);
 store.setLoading(true);
 const user:any = await getCurrentUser();
 const balance = await getBalance(user[0]);
 const chainId = await getChainId();
 store.setUserData({address:user[0], balance:ethers.utils.formatUnits(balance), chainId})
 store.authenticated(true);
 store.setLoading(false);
})
   

})

</script>
<template>
<v-container>
 <v-dialog v-model="showpopup">
  <v-card
class="ma-auto"
width="80vw"
height="50vh"
    >

    <v-card-text>
      <v-btn size="x-large" variant="flat" color="primary" @click="connect()" >CONNECT</v-btn>

      </v-card-text>
    </v-card>
 </v-dialog>
</v-container>
</template>


