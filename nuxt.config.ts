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
                token: "0x9973b3EA32B43BE1354FeE720e7D8d995F05eE7B",
                sale: "0xAE3917776e609f361a9616DFD96952E43FF23B56"
            },
            mumbai: {
                token: "0xa7a15C109E1BD6e36C1591A627db496C67Ac99D5",
                sale: "0x5b35082ED7dfD277e2933e38c34C29960BCE63d9",
                usdc: "0xe11A86849d99F524cAC3E7A0Ec1241828e332C62"
            },

        },
        apikey: "2493f3b9c68b5eac9f71ad07b174cbeae376e2dc8c4be5bf55f4b25a2d329f1e",
        public: {
            NETWORK_ID: 0x05
        }
    },
    app:{
      pageTransition:false,
      layoutTransition: false
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
          
        {rel: 'stylesheet', href:'https://use.typekit.net/fib6nnw.css'}

        

        ]
      },
      css: ['vuetify/lib/styles/main.sass'],
    

    build: {
        transpile: ['vuetify', '@ethersproject'],
    
      },
      plugins: ["~/plugins/loading"],
    
  
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
