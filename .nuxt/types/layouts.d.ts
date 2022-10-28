import { ComputedRef, Ref } from 'vue'
export type LayoutKey = "default" | "profile"
declare module "/Users/nicolascloutier/Desktop/akx3-dapp-nuxt3/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}