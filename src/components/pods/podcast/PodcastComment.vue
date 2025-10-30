<!-- src/components/pods/podcast/PodcastMessage.vue -->
<template>
  <section :style="bgStyle" class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-14">
      <div class="flex flex-col lg:flex-row items-start gap-10">
        <div class="basis-full lg:basis-1/5">
          <div class="text-slate-500 text-sm">{{ kickerText }}</div>
          <div class="mt-3 h-0.5 w-96 bg-slate-500"></div>
        </div>
        <div class="basis-full lg:basis-3/5">
          <h2 class="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
            {{ titleLine1 }}<br class="hidden md:block" />
            {{ titleLine2 }}
          </h2>
          <p class="mt-3 text-slate-600 max-w-2xl">
            {{ introText }}
          </p>
        </div>
      </div>

      <div class="mt-10">
        <div class="flex flex-wrap lg:flex-nowrap gap-6">
          <article
            v-for="c in visibleCards"
            :key="c.id"
            class="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
          >
            <div
              class="rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-5 h-[220px] flex flex-col"
            >
              <p class="text-base leading-relaxed text-slate-900 clamp-4">
                {{ c.text }}
              </p>

              <div class="mt-auto pt-5 flex items-center gap-3">
                <img
                  :src="c.avatar"
                  :alt="c.name"
                  class="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div class="text-sm font-semibold text-slate-900">{{ c.name }}</div>
                  <div class="text-xs text-slate-500">{{ viewerRoleLabel }}</div>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="mt-6 flex items-center justify-center gap-2">
          <button
            v-for="n in totalPages"
            :key="n"
            type="button"
            class="w-2.5 h-2.5 rounded-full transition"
            :class="
              currentPage === n - 1 ? 'bg-slate-800' : 'bg-slate-300 hover:bg-slate-400'
            "
            @click="goPage(n - 1)"
            :aria-label="pagerAriaLabel"
          ></button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import texture from "@/assets/imgs/texture.jpg";

// 版頭文案
const kickerText = "Here What Our Viewer Saying";
const titleLine1 = "Shine Bright, Speak Loud:";
const titleLine2 = "Testimonials Take Flight";
const introText =
  "Welcome to “Testimonials,” where real stories and heartfelt experiences take center stage. Get ready to be inspired and moved by the power of shared voices.";
const viewerRoleLabel = "Viewer";
const pagerAriaLabel = "go page";

// 背景樣式
const bgStyle = {
  backgroundImage: `url(${texture})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

// 卡片資料
const cards = [
  {
    id: 1,
    name: "Harrison Beaumont",
    avatar: "https://i.pinimg.com/1200x/04/3e/44/043e44f0da2f7bf0b182d68a5779806e.jpg",
    text:
      "Your podcast is my happy place! Motivating, insightful, and never fails to lift my spirits. Grateful for your wonderful work!",
  },
  {
    id: 2,
    name: "Genevieve Everly",
    avatar: "https://i.pinimg.com/736x/0d/5f/54/0d5f54d3e02f541eec0c4677adbe1283.jpg",
    text:
      "Tune in and boost your mood! Your podcast is a ray of sunshine in my day. Every episode uplifts and inspires. Thank you for the smiles!",
  },
  {
    id: 3,
    name: "Sterling Fitzgerald",
    avatar: "https://i.pinimg.com/736x/a3/76/28/a3762825a5b2b7d9d441953dddd90c5d.jpg",
    text:
      "Your podcast brightens my day! Inspiring, engaging, and always leaves me smiling. Thank you for the joy you bring!",
  },
  {
    id: 4,
    name: "Mila Davenport",
    avatar: "https://i.pinimg.com/736x/c4/c6/70/c4c6704cb1e74e26b9d52a46c6c47107.jpg",
    text:
      "Thoughtful and refreshing conversations. I learn something new every single time. Keep it up! Production quality is top-notch and the pacing is perfect. Highly recommended! ",
  },
  {
    id: 5,
    name: "Rowan Whitmore",
    avatar: "https://i.pinimg.com/1200x/41/86/02/4186023f2ab72c92da545f4f09c9fed9.jpg",
    text:
      "A perfect blend of fun and wisdom. The hosts are fantastic and the topics are so relevant. Production quality is top-notch and the pacing is perfect. Highly recommended! ",
  },
  {
    id: 6,
    name: "Iris Montague",
    avatar: "https://i.pinimg.com/736x/1f/56/67/1f5667b2387800b6f0a56ccd647d34df.jpg",
    text:
      "Feels like chatting with smart friends. I always leave with a smile and a new idea. Production quality is top-notch and the pacing is perfect. Highly recommended! ",
  },
  {
    id: 7,
    name: "Zane Calloway",
    avatar: "https://i.pinimg.com/736x/2f/b5/88/2fb58875e8be14686373b972c7327dbe.jpg",
    text:
      "Production quality is top-notch and the pacing is perfect. Highly recommended! Empowering stories and practical tips. This show has become part of my daily routine.",
  },
  {
    id: 8,
    name: "Ophelia Hart",
    avatar: "https://i.pinimg.com/736x/d4/63/9e/d4639e6e32a2fb1e5e153bba8006c53a.jpg",
    text:
      "Empowering stories and practical tips. This show has become part of my daily routine. Production quality is top-notch and the pacing is perfect. Highly recommended! ",
  },
  {
    id: 9,
    name: "Kai Livingston",
    avatar: "https://i.pinimg.com/1200x/e8/9a/e2/e89ae240efb025533d30ba103aa1fa20.jpg",
    text:
      "I appreciate the positivity and honesty. It helps me reset and focus for the week. Empowering stories and practical tips. This show has become part of my daily routine.",
  },
];

// 分頁
const perPage = 3;
const totalPages = Math.ceil(cards.length / perPage);
const currentPage = ref(0);

const visibleCards = computed(() => {
  const start = currentPage.value * perPage;
  return cards.slice(start, start + perPage);
});

function nextPage() {
  currentPage.value = (currentPage.value + 1) % totalPages;
}
function goPage(n) {
  currentPage.value = n;
}

// 自動輪播
let timer = null;
onMounted(() => {
  timer = setInterval(nextPage, 8000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>

<style scoped>
.clamp-4 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
