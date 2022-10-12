import { NuxtModule } from '@nuxt/schema'
declare module '@nuxt/schema' {
  interface NuxtConfig {
    ["pinia"]?: typeof import("@pinia/nuxt").default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
  interface RuntimeConfig {
     app: {
        baseURL: string,

        buildAssetsDir: string,

        cdnURL: string,
    },

    CONTRACTS: {
        mainnet: {
             token: string,

             sale: string,
        },

        goerli: {
             token: string,

             sale: string,
        },

        polygon: {
             token: string,

             sale: string,
        },

        mumbai: {
             token: string,

             sale: string,
        },
    },

    apikey: string,
  }
  interface PublicRuntimeConfig {
     NETWORK_ID: number,

    nuxtHighcharts: {
        pluginOptions: {
             exporting: boolean,

             pluginOptions: any,
        },

        hcMods: Array<string>,
    },
  }
}