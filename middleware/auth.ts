
import {useGlobalStore} from "~/stores";
import useEther from "~~/composables/web3/useEther";
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
export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useGlobalStore();
    const authCookie = useCookie("authenticated");

    store.$subscribe(async (events, state) => {
      state.connected == true ? authCookie.value = "1" : authCookie.value = "0";
    
    })
   
    if(authCookie.value == "1") {
        
       return navigateTo("/dashboard");
    }
    return;

})