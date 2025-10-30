<!-- src/components/pods/about/AboutCardList.vue -->
<template>
  <section class="bg-white mb-10">
    <div class="mx-auto max-w-7xl px-4 py-14">
      <div class="text-center">
        <span class="text-slate-500 text-sm">{{ sectionKicker }}</span>
        <h2 class="mt-2 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
          {{ titleLine1 }}<br class="hidden md:block" />
          {{ titleLine2 }}
        </h2>
        <p class="mt-3 text-slate-600 max-w-3xl mx-auto">
          {{ introText }}
        </p>
      </div>

      <div
        ref="gridRef"
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <article
          v-for="card in cards"
          :key="card.id"
          :ref="setCardRef"
          class="rounded-2xl opacity-0 will-change-transform"
        >
          <a :href="card.href" class="block group">
            <template v-if="card.kind === 'image'">
              <div class="rounded-2xl overflow-hidden">
                <img
                  :src="card.img"
                  :alt="card.title"
                  class="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-150"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </template>

            <!-- 文字卡（固定高度 = h-56，與圖片一致） -->
            <template v-else>
              <div
                class="rounded-2xl h-56 border px-6 py-5 overflow-hidden flex flex-col justify-between bg-white text-slate-900 border-slate-200 shadow-sm"
              >
                <div class="flex items-center gap-3">
                  <span
                    class="grid place-items-center rounded-xl w-10 h-10 shrink-0 bg-slate-100"
                  >
                    <i :class="['pi', card.icon, 'text-base text-slate-900']"></i>
                  </span>
                  <div class="min-w-0">
                    <h3 class="font-extrabold truncate text-slate-900">
                      {{ card.title }}
                    </h3>
                  </div>
                </div>

                <p class="mt-2 text-sm desc text-slate-600">
                  {{ card.desc }}
                </p>

                <div class="mt-3 flex items-center gap-2 text-slate-900">
                  <i class="pi pi-play text-sm"></i>
                  <span class="text-sm font-medium">{{ playNowLabel }}</span>
                </div>
              </div>
            </template>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";

const sectionKicker = "Latest Podcast";
const titleLine1 = "Tap into Trending Topics:";
const titleLine2 = "Latest Podcast, Always On";
const introText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id ante eu purus luctus viverra id vitae augue.";
const playNowLabel = "Play Now";

// 交錯：圖片 / 文字 / 圖片 / 文字 / …
const cards = [
  {
    id: 1,
    kind: "image",
    title: "Morning Drive Show",
    img: "https://i.pinimg.com/736x/56/e8/0f/56e80f66b26b327953d4d384e989c5a9.jpg",
    href: "#",
  },
  {
    id: 2,
    kind: "text",
    title: "Morning Drive Show",
    icon: "pi-sun",
    desc:
      "Start your day with upbeat music, news updates, weather, and engaging talk segments.",
    href: "#",
  },

  {
    id: 3,
    kind: "image",
    title: "Happy Hour",
    img: "https://i.pinimg.com/1200x/5a/49/20/5a49200b8c3a7a391c907b27583aa01f.jpg",
    href: "#",
  },
  {
    id: 4,
    kind: "text",
    title: "Top Hits Countdown",
    icon: "pi-sun",
    desc: "Weekly chart-toppers, exclusive artist interviews, and the latest hot tracks.",
    dark: true,
    href: "#",
  },

  {
    id: 5,
    kind: "text",
    title: "Throwback Thursdays",
    icon: "pi-calendar",
    desc: "Enjoy classic hits, fun facts, and nostalgic moments from past decades.",
    href: "#",
  },
  {
    id: 6,
    kind: "image",
    title: "Studio Talk",
    img: "https://i.pinimg.com/736x/f7/7e/d1/f77ed13af95ed1520df23458b8db9924.jpg",
    href: "#",
  },

  {
    id: 7,
    kind: "text",
    title: "Late Night Chill",
    icon: "pi-moon",
    desc:
      "Relax with smooth tunes and intimate, thought-provoking late-night conversations.",
    href: "#",
  },
  {
    id: 8,
    kind: "image",
    title: "Tech & Tunes",
    img: "https://i.pinimg.com/736x/6d/30/d5/6d30d523884775494265c06e8bc4785d.jpg",
    href: "#",
  },
];

// 動畫（逐行 fadeInUp，已支援 RWD）
const cardEls = [];
function setCardRef(el) {
  if (el) cardEls.push(el);
}

const gridRef = ref(null);
let io = null;
let resizeTimer = null;
let animatedOnce = false;

function groupRows() {
  const els = cardEls.filter(Boolean);
  if (!els.length) return [];
  const rows = [];
  const sorted = els
    .map((el) => ({ el, top: el.offsetTop }))
    .sort((a, b) => a.top - b.top);
  const delta = 6;
  let current = [sorted[0].el];
  let lastTop = sorted[0].top;
  for (let i = 1; i < sorted.length; i++) {
    if (Math.abs(sorted[i].top - lastTop) <= delta) current.push(sorted[i].el);
    else {
      rows.push(current);
      current = [sorted[i].el];
      lastTop = sorted[i].top;
    }
  }
  rows.push(current);
  return rows;
}

function animateByRows() {
  const rows = groupRows();
  rows.forEach((row, rowIdx) => {
    setTimeout(() => {
      row.forEach((el) => {
        if (!el.classList.contains("animate__animated")) {
          el.classList.remove("opacity-0");
          el.classList.add("animate__animated", "animate__fadeInUp");
        }
      });
    }, rowIdx * 160);
  });
}

function setupIO() {
  if (io) io.disconnect();
  io = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting && !animatedOnce) {
        animatedOnce = true;
        animateByRows();
        io.disconnect();
      }
    },
    { threshold: 0.15 }
  );
  if (gridRef.value) io.observe(gridRef.value);
}

function recomputeOnResize() {
  if (!animatedOnce) return;
  cardEls.forEach((el) => {
    el.classList.remove("animate__animated", "animate__fadeInUp");
    el.classList.add("opacity-0");
  });
  animatedOnce = false;
  setupIO();
}

onMounted(async () => {
  await nextTick();
  setupIO();
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => recomputeOnResize(), 150);
  });
});

onBeforeUnmount(() => {
  if (io) io.disconnect();
  if (resizeTimer) clearTimeout(resizeTimer);
});
</script>

<style scoped>
.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
