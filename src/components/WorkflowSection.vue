<script setup lang="ts">
import SectionHead from './SectionHead.vue'
</script>

<template>
  <section class="block alt" id="workflow">
    <div class="container">
      <SectionHead eyebrow="Workflow">
        <template #title>三步，从碎片到<span class="hl">体系</span></template>
        <template #desc>采集 → 闪卡 → 聚合。<br class="br-m">Agent 负责所有繁琐的事，你只管学。</template>
      </SectionHead>

      <div class="flow">
        <!-- 步骤 1：采集 -->
        <div class="flow-step reveal" v-reveal>
          <svg class="flow-art" viewBox="0 0 210 138" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g stroke="#DCDCDC" stroke-width="1.7" fill="#fff">
              <rect x="8" y="20" width="66" height="26" rx="8"/>
              <rect x="8" y="56" width="66" height="26" rx="8"/>
              <rect x="8" y="92" width="66" height="26" rx="8"/>
            </g>
            <g fill="#00C776">
              <path d="M16 27.5l7 4-7 4z"/>
              <circle cx="19.5" cy="69" r="3.4"/>
              <rect x="15" y="99" width="9" height="12" rx="2"/>
            </g>
            <g stroke="#C4C4C4" stroke-width="2.2" stroke-linecap="round">
              <path d="M32 33h28M32 69h28M32 105h28"/>
            </g>
            <g stroke="#00C776" stroke-width="1.6" stroke-linecap="round" stroke-dasharray="5 6">
              <path class="dash" d="M78 33h22"/>
              <path class="dash" d="M78 69h22"/>
              <path class="dash" d="M78 105h22"/>
            </g>
            <g class="float-a">
              <rect x="112" y="14" width="76" height="112" rx="12" fill="#fff" stroke="#111" stroke-width="1.9"/>
              <rect x="120" y="26" width="60" height="34" rx="6" fill="#F2F2F2"/>
              <path d="M127 37h40M127 46h26" stroke="#C4C4C4" stroke-width="2.6" stroke-linecap="round"/>
              <rect x="120" y="68" width="60" height="20" rx="6" fill="#E9FBF2"/>
              <path d="M128 78h34" stroke="#00C776" stroke-width="2.6" stroke-linecap="round"/>
              <rect x="120" y="94" width="60" height="20" rx="6" fill="#F2F2F2"/>
              <path d="M128 104h30" stroke="#C4C4C4" stroke-width="2.6" stroke-linecap="round"/>
            </g>
            <path class="spark" d="M196 22l3.4 7.6 7.6 3.4-7.6 3.4-3.4 7.6-3.4-7.6-7.6-3.4 7.6-3.4z" fill="#00C776"/>
          </svg>
          <div class="flow-num">1</div>
          <h3>随手采集</h3>
          <p>截图、上传、粘贴链接。任何格式的英语素材，扔进语学伴就自动记一笔。</p>
          <!-- 箭头必须是当前步骤的子元素：绝对定位的包含块才是这一格，right:-20px 才能落在两栏之间 -->
          <span class="flow-arrow" aria-hidden="true">
            <svg viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="dashline" d="M2 12h30" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M28 6l7 6-7 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <circle class="dotflow" cx="6" cy="12" r="3" fill="currentColor"/>
            </svg>
          </span>
        </div>

        <!-- 步骤 2：闪卡 -->
        <div class="flow-step reveal" v-reveal>
          <svg class="flow-art" viewBox="0 0 210 138" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <rect class="float-b" x="46" y="26" width="104" height="74" rx="12" fill="#F1F1F1" transform="rotate(-7 98 63)"/>
            <g class="float-a">
              <rect x="52" y="34" width="104" height="74" rx="12" fill="#fff" stroke="#111" stroke-width="1.9"/>
              <rect x="62" y="44" width="30" height="10" rx="5" fill="#E9FBF2"/>
              <path d="M67 49h20" stroke="#00C776" stroke-width="2.4" stroke-linecap="round"/>
              <path d="M62 66h74M62 78h58M62 90h40" stroke="#CFCFCF" stroke-width="3" stroke-linecap="round"/>
            </g>
            <path class="spark" d="M172 30l3.6 8 8 3.6-8 3.6-3.6 8-3.6-8-8-3.6 8-3.6z" fill="#00C776"/>
            <path class="spark" d="M26 94l2.4 5.4 5.4 2.4-5.4 2.4-2.4 5.4-2.4-5.4-5.4-2.4 5.4-2.4z" fill="#7FE0B4"/>
          </svg>
          <div class="flow-num">2</div>
          <h3>统一为闪卡</h3>
          <p>所有资产被 Agent 拆解、规范成一张张闪卡碎片，语境、来源、难度标签一并带上。</p>
          <span class="flow-arrow" aria-hidden="true">
            <svg viewBox="0 0 44 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path class="dashline" d="M2 12h30" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M28 6l7 6-7 6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              <circle class="dotflow" cx="6" cy="12" r="3" fill="currentColor"/>
            </svg>
          </span>
        </div>

        <!-- 步骤 3：聚合 -->
        <div class="flow-step reveal" v-reveal>
          <svg class="flow-art" viewBox="0 0 210 138" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <g fill="#E9FBF2" stroke="#00C776" stroke-width="1.4">
              <rect class="float-b" x="14" y="28" width="18" height="18" rx="5"/>
              <rect x="40" y="46" width="18" height="18" rx="5"/>
              <rect class="float-b" x="14" y="64" width="18" height="18" rx="5"/>
              <rect x="40" y="82" width="18" height="18" rx="5"/>
              <rect class="float-b" x="14" y="100" width="18" height="18" rx="5"/>
            </g>
            <path class="dash" d="M70 69h26" stroke="#00C776" stroke-width="1.8" stroke-linecap="round" stroke-dasharray="5 6"/>
            <path d="M90 62l7 7-7 7" stroke="#00C776" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
            <g class="float-a">
              <rect x="110" y="22" width="82" height="96" rx="12" fill="#fff" stroke="#111" stroke-width="1.9"/>
              <path d="M122 44h58M122 58h44M122 72h52" stroke="#CFCFCF" stroke-width="3" stroke-linecap="round"/>
              <rect x="122" y="86" width="58" height="20" rx="6" fill="#E9FBF2"/>
              <path d="M130 96h26" stroke="#00C776" stroke-width="2.6" stroke-linecap="round"/>
            </g>
            <g class="spark">
              <circle cx="192" cy="28" r="11" fill="#00C776"/>
              <path d="M187 28.4l3.6 3.6 6.8-7" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            </g>
          </svg>
          <div class="flow-num">3</div>
          <h3>聚合为学习内容</h3>
          <p>Agent 按你的目标把碎片重新聚合：要考试的生成机考真题，练听说的变成对话练习。</p>
        </div>
      </div>
    </div>
  </section>
</template>
