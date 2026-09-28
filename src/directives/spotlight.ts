import type { Directive } from 'vue'

/**
 * v-spotlight：卡片光标聚光。pointermove 一帧能触发多次，每次
 * getBoundingClientRect 都要强制同步布局；合并到同一帧里只量一次、只写一次，
 * 且只改 CSS 变量（固定尺寸圆斑走 transform，纯合成层移动，不逐帧整卡重绘）。
 */

const cleanups = new WeakMap<Element, () => void>()

export const vSpotlight: Directive<HTMLElement> = {
  mounted(el) {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    let x = 0
    let y = 0
    let queued = false
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      if (queued) return
      queued = true
      window.requestAnimationFrame(() => {
        queued = false
        const r = el.getBoundingClientRect()
        el.style.setProperty('--mx', `${x - r.left}px`)
        el.style.setProperty('--my', `${y - r.top}px`)
      })
    }
    el.addEventListener('pointermove', move)
    cleanups.set(el, () => el.removeEventListener('pointermove', move))
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}
