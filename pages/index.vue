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

const { gsap, ScrollTrigger } = useGSAP()


onMounted(async () => {

  await loadConnectedWallet(provider.value);

})

if(provider.value) {
  provider.value.on('accountsChanged', async (accounts) => {
    await loadConnectedWallet(provider.value);
    store.setLoading(true);
    const user: any = await getCurrentUser();
    const balance = await getBalance(user[0]);
    const chainId = await getChainId();
    store.setUserData({address: user[0], balance: ethers.utils.formatUnits(balance), chainId})
    store.authenticated(true);
    store.setLoading(false);
  })
}

</script>
<template>
<v-container>


    <v-card class="ma-auto" width="100%" elevation="11"
      style="background-color:rgba(0,0,0,0.8); background-image:url('/akxbg.png'); background-size:cover;border-radius:20px;background-blend-mode: overlay;">

      <v-card-text class="pa-12">
        <v-row justify="center" align-content="center">
          <v-col cols="12" xl="6" lg="10" class="text-center">
            <v-row justify="center" align-content="center">
              <v-col cols="10" xl="3" lg="5" sm="10" >
                <v-img src="/akxlogo.png" width="100%" class="ma-auto" />
              </v-col>
            </v-row>
            <v-row justify="center" align-content="center">
              <v-col cols="12" xl="10" lg="10" sm="12" xs="12">
                <div class="welcome-title mt-8 mb-8">welcome to the Ecosystem</div>
                <div class="mt-8 mb-8 text-center ma-auto">
                  <p class="home-content ma-auto">
                    <strong>WHY CONNECT?</strong><br />
                    AKX3 is running on top of Ethereum and Polygon which are decentralized secure network. <span class="hidden-sm-and-down">by using Metamask to
                    connect, you can be assured nobody else than you will be able to use your wallet. It also enables
                    you to get access to your dashboard to fine tune your experience in the AKX3 Ecosystem.<br /><br></span>
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
              @click="connect()" class="ma-auto btn-text">CONNECT</v-btn>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

</v-container>
</template>


<style>
@import url("https://use.typekit.net/fib6nnw.css");

.points-container {
  background: radial-gradient(ellipse at center, rgba(68,53,1,0.3) 0%, #3d3c3c 100%);
  height: 100%;
  width:100%;
  position:absolute;
  top:0;
  left:0;
  z-index:9997;
  opacity:0;
}

.points {
  display:block;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.4);
  width:auto;
  height:auto;
  position:absolute;
  background: linear-gradient(to bottom, #cfc09f 22%,#634f2c 24%, #cfc09f 26%, #cfc09f 27%,#ffecb3 40%,#3a2c0f 78%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #fff;
  font-size:10rem;
  font-family: sofia-pro, sans-serif;
  z-index:10001;
  font-weight: 400 !important;
  top:19%;
  left:40%;
  font-style: normal !important;
  text-align:center;
  opacity:0;
}

.points:after {

  background: none;
  content: attr(data-heading);
  left: 0;
  top: 0;
  z-index: 9998;
  position: absolute;
  text-shadow:
      -1px 0 1px #c6bb9f,
      0 1px 1px #c6bb9f,
      5px 5px 10px rgba(0, 0, 0, 0.4),
      -5px -5px 10px rgba(0, 0, 0, 0.4);
}

.score:after {
  background: none;
  content: attr(data-heading);
  left: 0;
  top: 0;
  z-index: 10001;
  position: absolute;
  text-shadow:
      -1px 0 1px #c6bb9f,
      0 1px 1px #c6bb9f,
      5px 5px 10px rgba(0, 0, 0, 0.4),
      -5px -5px 10px rgba(0, 0, 0, 0.4);
}

.score {
  background: linear-gradient(to bottom, #cfc09f 22%,#634f2c 24%, #cfc09f 26%, #cfc09f 27%,#ffecb3 40%,#3a2c0f 78%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: #fff;
  width:auto;
  height:auto;

  font-size:20rem;
  text-transform: uppercase;
  font-family: sofia-pro, sans-serif;

  font-weight: 700 !important;

  font-style: normal !important;
  text-align:center;
  padding-left:12%;
  padding-right:12%;
  padding-top:-5px;

  z-index:10000;
  position:absolute;
  border-radius:50%;
  opacity:0;
  top:5%;
  left:25%;

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
</style>