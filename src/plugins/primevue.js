// src/plugins/primevue.js
import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import Paginator from 'primevue/paginator'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import AutoComplete from 'primevue/autocomplete'

import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import 'primeicons/primeicons.css'

// 近黑主題（以 neutral 當 primary）
const EduviaNeutralDark = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '{neutral.50}',
      100: '{neutral.100}',
      200: '{neutral.200}',
      300: '{neutral.300}',
      400: '{neutral.400}',
      500: '{neutral.900}',  // 主色
      600: '{neutral.950}',  // hover/active
      700: '{neutral.800}',
      800: '{neutral.800}',
      900: '{neutral.900}',
      950: '{neutral.950}'
    }
  }
})

export default function installPrimeVue(app) {
  app.use(PrimeVue, {
    theme: {
      preset: EduviaNeutralDark,
      options: { cssLayer: false }
    }
  })
  app.directive('tooltip', Tooltip)

  // 全域元件
  app.component('Button', Button)
  app.component('InputText', InputText)
  app.component('AutoComplete', AutoComplete)
  app.component('Paginator', Paginator)
}
