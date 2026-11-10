import type { Directive } from 'vue'

/**
 * v-magnetic：主按钮被光标轻轻「吸」过去（最多 ~6px），离开时弹回。
 * 写独立的 `translate` 属性而不是 transform —— 两者叠加，
 * 不会和 hover 时的 translateY / :active 缩放打架。
 * 只在精确指针 + 允许动画时启用。
 */
const cleanups = new WeakMap<Element, () => void>()

export const vMagnetic: Directive<HTMLElement> = {
  mounted(el) {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    let raf = 0
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect()
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height
        el.style.translate = `${(dx * 12).toFixed(2)}px ${(dy * 8).toFixed(2)}px`
      })
    }
    const leave = () => {
      cancelAnimationFrame(raf)
      el.style.translate = ''
    }
    el.style.transition += `${el.style.transition ? ',' : ''}translate .35s cubic-bezier(.22,1,.36,1)`
    el.addEventListener('pointermove', move)
    el.addEventListener('pointerleave', leave)
    cleanups.set(el, () => {
      el.removeEventListener('pointermove', move)
      el.removeEventListener('pointerleave', leave)
    })
  },
  unmounted(el) {
    cleanups.get(el)?.()
    cleanups.delete(el)
  },
}
