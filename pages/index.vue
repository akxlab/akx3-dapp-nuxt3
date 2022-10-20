<script lang="ts" setup>
import useEther from '../composables/web3/useEther';
import { useStorage } from "@vueuse/core";

import { useGlobalStore } from "~/stores";
import { ethers } from 'ethers';
const store = useGlobalStore();
const nuxtApp = useNuxtApp();

const overlay = ref(false);
nuxtApp.hook("page:start", () => {
  overlay.value = true
});
nuxtApp.hook("page:finish", () => {
  overlay.value = false;
});

const {
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



const provider = useState('provider', () => undefined);

provider.value = await getProvider();

const storage = useStorage('connected', store.isConnected);
const connect = async () => {

  await connectUser(provider);

  store.setLoading(true);
  store.setProvider(await getProvider());
  const user: any = await getCurrentUser();
  const balance = await getBalance(user[0]);
  const chainId = await getChainId();
  store.setUserData({ address: user[0], balance: ethers.utils.formatUnits(balance), chainId })
  store.authenticated(true);
  store.setLoading(false);

  store.$subscribe((mutation, state) => {
    state.loading= overlay.value;
    store.$patch(state);
  })

  navigateTo("/dashboard");
}



onMounted(async () => {

  loadConnectedWallet(provider.value);


  provider.value.on('accountsChanged', async (accounts) => {
    loadConnectedWallet(provider.value);
    store.setLoading(true);
    const user: any = await getCurrentUser();
    const balance = await getBalance(user[0]);
    const chainId = await getChainId();
    store.setUserData({ address: user[0], balance: ethers.utils.formatUnits(balance), chainId })
    store.authenticated(true);
    store.setLoading(false);
  })


})

</script>
<template>
<v-container>


    <v-card class="ma-auto" width="90vw" elevation="11"
      style="background-color:rgba(0,0,0,0.8); background-image:url('/akxbg.png'); background-size:cover;border-radius:20px;background-blend-mode: overlay;">

      <v-card-text class="pa-12">
        <v-row justify="center" align-content="center">
          <v-col cols="12" xl="6" lg="10" class="text-center">
            <v-row justify="center" align-content="center">
              <v-col cols="3" xl="3" lg="5" sm="5" xs="5">
                <v-img src="/akxlogo.png" width="100%" class="ma-auto" />
              </v-col>
            </v-row>
            <v-row justify="center" align-content="center">
              <v-col cols="12" xl="10" lg="10" sm="12" xs="12">
                <div class="welcome-title mt-8 mb-8">welcome to the Ecosystem</div>
                <div class="mt-8 mb-8 text-center ma-auto">
                  <p class="home-content ma-auto">
                    <strong>WHY CONNECT?</strong><br />
                    AKX3 is running on top of Ethereum which is a decentralized secure network. By using Metamask to
                    connect, you can be assured nobody else than you will be able to use your wallet. It also enables
                    you to get access to your dashboard to fine tune your experience in the AKX3 Ecosystem.<br /><br>
                    <a href="#">learn how to get metamask and connect</a>
                  </p>
                </div>
              </v-col>
            </v-row>
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row justify="center" align-content="center">
          <v-col cols="12" sm="12" xl="6" lg="8" class="text-center">
            <v-btn width="100%" height="60" append-icon="mdi-account-supervisor-circle" color="primary"
              @click="connect()" class="ma-auto btn-text">CONNECT TO THE decentralized world (ETH)</v-btn>
          </v-col>
        </v-row>

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
</style>