// https://v3.nuxtjs.org/api/configuration/nuxt.config
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'


// @ts-ignore
export default defineNuxtConfig({
ssr:true,

 telemetry: false,
    runtimeConfig: {
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
          
        {rel: 'stylesheet', href:'https://use.typekit.net/fib6nnw.css'},
            {rel: 'stylesheet', href:'/fa/css/all.css'}

        

        ]
      },
      css: ['vuetify/lib/styles/main.sass',  '~/assets/fa/css/all.css', '~/assets/fa/css/sharp-solid.css'],
    

    build: {
        transpile: ['vuetify', '@ethersproject', '@fortawesome', 'gsap'],
    
      },
      plugins: ["~/plugins/loading", "~/plugins/fontawesome"],
    
  
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
