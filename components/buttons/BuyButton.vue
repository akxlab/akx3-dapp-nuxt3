
<script lang="ts" setup>
import {useRuntimeConfig, useState} from "#app";
import {useGlobalStore} from '~/stores';
import useEther from "~/composables/web3/useEther";
import {utils} from "ethers";
import Web3 from "web3"


const ether = useEther()

const address = useState("address", () => undefined);
const amount = useState("amount", () => undefined)

const SALE_CONTRACT = "0x5d0aA3B7Bb489b546EB1f2d6dfE7A101C554d360"
const store = useGlobalStore();

const listener = useState("listener", () => undefined)
const logs = useState("logs", () => undefined)
let addr

defineProps({
  coinName: String,
  netName: String,
})

onBeforeMount(async () => {

  const logFormat = (hex, addr) => {
    return web3.eth.abi.decodeLog([{type: 'uint256', name:'ethAmount'}, {type: 'uint256', name:'akxAmount'}], hex, ['0x1cbc5ab135991bd2b6a4b034a04aa2aa086dac1371cb9b16b8b5e2ed6b036bed', "0x000000000000000000000000"+addr])
  }

  const user = await ether.getCurrentUser()
  address.value = user.address;
  amount.value = "0";

  if(address.value) {
   addr = web3.eth.abi.encodeParameter('address', address.value)
  }

  logs.value = web3.eth.subscribe("logs", {
    address: SALE_CONTRACT,
    topics: ["0x1cbc5ab135991bd2b6a4b034a04aa2aa086dac1371cb9b16b8b5e2ed6b036bed", addr]
  }, function(error, res) {
    if(!error) {
      //console.log(res.data)
    } else {
      console.log(error)
    }
  })  .on("connected", function(subscriptionId) {
    //console.log(subscriptionId);
  })
      .on("data", function(log) {
        // console.log(log.data);
        const r = logFormat(log.data, store.getAddress)

        console.log(`you spent ${utils.formatEther(r.ethAmount)} Matics for ${utils.formatEther(r.akxAmount)} AKX`)
        store.setLoading(false)
      })
      .on("changed", function(log) {});




})
const currentTime = Math.floor(new Date().getTime() / 1000)

const saleContract = await ether.getSaleContract(SALE_CONTRACT)

const web3 = new Web3("wss://polygon-mumbai.g.alchemy.com/v2/dYBs4rt0uxcBgkMnAW2nZN3leZmWMngm")


const buy = async () => {
  store.setLoading(true)
  const tx = await saleContract.buy(currentTime, {value:utils.parseEther(amount.value), gasLimit:100000})
  await tx.wait()

}

const amountLabel = `amount of Matic to change for `

</script>
<template>
  <div>
    <v-card>
      <v-card-text v-if="store.$state.user">
        <h1 class="my-8">CONNECTED TO: {{$props.netName}}</h1>
        <v-divider/>
        <h2 class="buying-title my-4">you are buying for: <br /></h2>
        <h3 class="buying-address"> Connected Address: {{store.$state.user.address}}</h3>
        <div class="buying-note pt-4 pb-4 my-6">please, make sure this is your metamask address.</div>
        <v-divider/>
        <h4 class="my-6">amount of <span class="blue">{{ $props.coinName }}</span> to change for AKX</h4>
        <v-text-field v-model="amount" label="amount to change for AKX" hide-details class="my-6" />
        <v-btn  color="primary" size="x-large" class="buynow" @click="buy">BUY AKX</v-btn>
      </v-card-text>
    </v-card>


  </div>
</template>

<style>

h1 {
  font-size:1.2rem;
  color: #c6cbcc;


  font-family: sofia-pro, sans-serif;

  font-weight: 700 !important;

  font-style: normal !important;
}

.blue {
  color: #009fe3;
}

h2.buying-title {
  line-height:normal;


  font-family: sofia-pro, sans-serif;

  font-weight: 300 !important;

  font-style: normal !important;
}

h3.buying-address {
  font-size:1.2rem;
  color: #009fe3;


  font-family: sofia-pro, sans-serif;

  font-weight: 700 !important;

  font-style: normal !important;
}

.buying-note {
  font-size:0.9rem;
  margin-top:4px;
}

.buynow {
  font-family: sofia-pro, sans-serif;

  font-weight: 700 !important;

  font-style: normal !important;
}

</style>