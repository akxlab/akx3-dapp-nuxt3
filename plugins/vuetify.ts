import '@mdi/font/scss/materialdesignicons.scss' 
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ThemeDefinition } from 'vuetify'
import {aliases, fa} from 'vuetify/iconsets/fa'
import {defineNuxtPlugin} from "#app";



const AKXTheme: ThemeDefinition = {
  dark: true,
  colors: {
    primary: '#009fe3',
    'primary-darken-1': '#347ed4',
    secondary: '#8d47ba'

  }
}

const AKXLight: ThemeDefinition = {
  dark: true,
  colors: {
    surface: '#31354d'
  }
}

export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    icons: {
      defaultSet:'fa',
      aliases,
      sets: {
        fa,
      }
    },
    defaults: {
      global: {
       ripple: false,
      }
    },
    components,
    directives,
    theme: {
      defaultTheme: 'AKXTheme',
      themes: {
        AKXTheme,
        AKXLight
      }
    }
  })



  nuxtApp.vueApp.use(vuetify)
})