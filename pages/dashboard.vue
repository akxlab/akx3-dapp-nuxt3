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
    loadConnectedWallet,
    getAKXBalance,
    getTokenContract,
    getSaleContract
  }
 = useEther();

 const loading = store.isLoading;
 const drawer = true;
const rail = true;
const networkName = useState("netName", () => undefined);
const coinName = useState("coinName", () => undefined);
 const provider = useState('provider', () => undefined);
let bal;
let price;
const isSet = useState('isset', () => false)

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

   if(store) {

     store.setUserData({address: user[0], balance: bal, chainId, eth: balance, matic: balance, price:price})
     isSet.value = true
   }


 })
 
    </script>
<template>


<v-container>



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
@import "../assets/css/main.css";

</style>