import type { Directive } from 'vue'

/**
 * v-reveal：滚动入场。模板上写死 class="reveal"，指令只在挂载后
 * 用 IntersectionObserver 点亮 .in（含兄弟错峰、3 秒兜底、减少动态降级）。
 * 服务端渲染时指令不执行，输出的 HTML 与原静态页一致（不带 .in）。
 */

const pending = new Set<Element>()
let observer: IntersectionObserver | null = null
let failsafe: ReturnType<typeof setTimeout> | null = null

function show(el: Element) {
  /* 与原版一致：按兄弟位次做 0/70/140/210ms 的错峰入场 */
  const sibs = el.parentNode ? el.parentNode.children : [el]
  const i = Array.prototype.indexOf.call(sibs, el)
  window.setTimeout(() => el.classList.add('in'), Math.max(i, 0) % 4 * 70)
}

function showAllPending() {
  pending.forEach((el) => {
    el.classList.add('in')
    observer?.unobserve(el)
  })
  pending.clear()
}

function getObserver(): IntersectionObserver | null {
  if (typeof IntersectionObserver === 'undefined') return null
  if (observer) return observer
  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting || !pending.has(e.target)) continue
        pending.delete(e.target)
        observer?.unobserve(e.target)
        show(e.target)
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
  )
  return observer
}

function scheduleFailsafe() {
  if (failsafe !== null) return
  failsafe = setTimeout(() => {
    failsafe = null
    /* 兜底：3 秒后点亮视口内仍未显示的模块，避免内容永久不可见 */
    pending.forEach((el) => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) show(el)
    })
  }, 3000)
}

export const vReveal: Directive<HTMLElement> = {
  mounted(el) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const io = getObserver()
    if (reduce || !io) {
      el.classList.add('in')
      return
    }
    pending.add(el)
    io.observe(el)
    scheduleFailsafe()

    /* 系统中途切换「减少动态」时，直接显示全部内容 */
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    mq.addEventListener?.('change', (e) => {
      if (e.matches) showAllPending()
    })
  },
  unmounted(el) {
    pending.delete(el)
    observer?.unobserve(el)
  },
}
