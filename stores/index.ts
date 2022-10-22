import { Network } from "~~/composables/types";
import { useStorage } from "@vueuse/core";
import {useProfileStore} from "~/stores/profile";

export const useGlobalStore = defineStore('globalStore', {
    state: () => {
        return {
            user: null as UserInfo || null,
            connected: false,
            network: null as Network || null,
            loading: false,
            currentPrice: null as String || null
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
        },
        getEth: (state) => {
            if(state.user) {
                if(state.user.chainId == "0x01" || state.user.chainId == "0x05") {
                    return state.user.eth;
                } else {
                    return "not on eth network"
                }

            }
        },
        getMatics: (state) => {
            if(state.user) {
                if(state.user.chainId == "0x13881" || state.user.chainId == "0x89") {
                    return state.user.matic
                } else {
                    return "not on matic network"
                }

            }
        },
        getPrice: (state) => {
            return state.user.price;
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
    matic: String;
    eth: String;
    price: String;

}