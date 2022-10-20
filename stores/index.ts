import { Network } from "~~/composables/types";
import { useStorage } from "@vueuse/core";

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            user: null as UserInfo || null,
            connected: false,
            network: null as Network || null,
            loading: false
        }
    },
    getters: {
        isLoading: (state) => {
            return state.loading;
        },
        isConnected: (state) => {
            return state.connected;
        },
        getNetwork: (state) => {
            return state.network;
        },
        User: (state) => {
            return state.user;
        },
        getAddress: (state) => {
           if(state.user) {
                return state.user.address;
           }
           return null;
        },
        getBalance: (state) => {
            if(state.user) {
                return state.user.balance;
           }
           return null;
        }
    },
    actions: {
        authenticated(status:boolean)  {
        
                this.connected = status;
                useStorage('connected', status);
           
        },
        setUserData(user:UserInfo) {
            this.user = user;
            useStorage('user', user);
        },
        setLoading(status:boolean) {
            this.loading = status;
        },
        setProvider(provider:any) {
            this.network = {provider:provider.value, chainId:null, contracts:null}
          
        }
    },
    persist: {
        enabled:true
    }
});

interface UserInfo {
    address: String;
    balance: String;
    chainId: String;
}