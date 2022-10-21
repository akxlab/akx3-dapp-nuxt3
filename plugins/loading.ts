import { useGlobalStore } from "~~/stores";
import {defineNuxtPlugin} from "#app";

export default defineNuxtPlugin((nuxtApp) => {
    const store = useGlobalStore();
nuxtApp.hook("page:start", () => {
  store.setLoading(true);
});
nuxtApp.hook("page:finish", () => {
    store.setLoading(false);
    
});
});