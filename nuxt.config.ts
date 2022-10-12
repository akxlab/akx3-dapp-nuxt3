// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'


export default defineNuxtConfig({

 telemetry: false,
    runtimeConfig: {
       
        CONTRACTS: {
            mainnet: {
                token: "",
                sale: ""
            },
            goerli: {
                token: "",
                sale: ""
            },
            polygon: {
                token: "",
                sale: ""
            },
            mumbai: {
                token: "",
                sale: ""
            }
        },
        apikey: "2493f3b9c68b5eac9f71ad07b174cbeae376e2dc8c4be5bf55f4b25a2d329f1e",
        public: {
            NETWORK_ID: 0x05
        }
    },
    globalName: 'AKX3',
    head: {
        components: true,
        title: 'AKX3 ECOSYSTEM DAPP',
        htmlAttrs: {
          lang: 'en'
        },
        meta: [
          { charset: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { hid: 'description', name: 'description', content: '' },
          { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
          { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
          
        {rel: 'stylesheet', href:'https://use.typekit.net/tie2ewy.css'}

        ]
      },
      css: ['vuetify/lib/styles/main.sass'],
    

    build: {
        transpile: ['vuetify', '@ethersproject'],
      },
   
  
    vite: {
        optimizeDeps: {
            include: ['bn.js', 'js-sha3', 'hash.js', 'aes-js', 'scrypt-js', 'bech32'],
        
            esbuildOptions: {
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true
                    }),
                    NodeModulesPolyfillPlugin()
                ]
            }
          },
      define: {
        'process.env.DEBUG': false
      },
      build: {
        
        commonjsOptions: {
            transformMixedEsModules: true
        }

      }


    
    },
    experimental: {
        reactivityTransform: true
    },
    modules: [
        ['nuxt-highcharts', {pluginOptions: {}}],
        ['@pinia/nuxt', {
        autoImports: [
            'defineStore',
            ['defineStore', 'definePiniaStore']
        ]
    }
],],
highcharts: {
    exporting: true
  }
  
})
