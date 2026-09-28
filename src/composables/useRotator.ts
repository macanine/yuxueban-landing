import { onMounted, onUnmounted, ref, type Ref } from 'vue'

/**
 * 灵动切换词：上下翻转 + 高亮扫入。
 * SSR 首帧 current = -1，五个词都不可见（与原静态页输出一致）；
 * 水合后先点亮第一个词，再等字体就绪开始轮播。
 */
export function useRotator(rotEl: Ref<HTMLElement | null>, words: ReadonlyArray<string>) {
  const current = ref(-1)
  const leaving = ref(-1)

  let timer: ReturnType<typeof setInterval> | null = null
  let leaveTimer: ReturnType<typeof setTimeout> | null = null
  let started = false
  let fitQueued = false

  function next() {
    leaving.value = current.value
    current.value = (current.value + 1) % words.length
    if (leaveTimer !== null) clearTimeout(leaveTimer)
    leaveTimer = setTimeout(() => { leaving.value = -1 }, 680)
  }

  function stopTimer() {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  function tick() {
    stopTimer()
    timer = setInterval(next, 2400)
  }

  /* 用最长词撑开容器宽度，避免切换时左右抖动 */
  function measure() {
    const rot = rotEl.value
    if (!rot) return
    let max = 0
    rot.querySelectorAll<HTMLElement>('.rot-item').forEach((el) => {
      const w = el.getBoundingClientRect().width
      if (w > max) max = w
    })
    if (max) rot.style.minWidth = `${Math.ceil(max)}px`
  }

  /* 拖拽窗口时 resize 会连发，合并到同一帧再量，避免反复触发同步布局 */
  function fit() {
    if (fitQueued) return
    fitQueued = true
    window.requestAnimationFrame(() => {
      fitQueued = false
      measure()
    })
  }

  function motionAllowed() {
    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }

  function start() {
    if (started) return
    started = true
    measure()
    if (motionAllowed()) tick()
    window.addEventListener('resize', fit)
    /* 切到后台时暂停，回来再继续，避免快速连跳 */
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) stopTimer()
      else if (motionAllowed()) tick()
    })
    /* 用户在系统里中途打开「减少动态」时，立刻停掉轮播 */
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    mqReduce.addEventListener?.('change', (e) => {
      if (e.matches) stopTimer()
    })
  }

  onMounted(() => {
    current.value = 0
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(start)
      window.addEventListener('load', start)
    } else {
      window.addEventListener('load', start)
    }
  })

  onUnmounted(() => {
    stopTimer()
    if (leaveTimer !== null) clearTimeout(leaveTimer)
  })

  return { current, leaving }
}
