import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import LandingPage from './pages/Landing.vue'
import { vReveal } from './directives/reveal'
import { vSpotlight } from './directives/spotlight'

import './styles/base.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/footer.css'
import './styles/responsive.css'
import './styles/motion.css'

const routes = [{ path: '/', component: LandingPage }]

export const createApp = ViteSSG(App, { routes }, ({ app, head }) => {
  /* vite-ssg 内部 unhead 默认注入 htmlAttrs.lang = "en"，会覆盖模板里的 zh-CN；
     用户侧 push 优先级高于 init 默认项，这里显式压回中文 */
  head?.push({ htmlAttrs: { lang: 'zh-CN' } })
  app.directive('reveal', vReveal)
  app.directive('spotlight', vSpotlight)
})
