import { useStorage } from '@vueuse/core';
import {useGlobalStore} from "~/stores";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const store = useGlobalStore();
    const connected = useStorage('connected', store.isConnected)
    if(connected.value == true) {
       return navigateTo("/dashboard");
    }
    return;

})