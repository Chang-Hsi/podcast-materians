<!-- src/components/pods/podcast/PodcastCardList.vue -->
<template>
  <section class="bg-white mb-10">
    <div class="mx-auto max-w-7xl px-4 py-14">
      <div
        ref="headingRef"
        :class="headingClass"
        class="text-center will-change-transform"
      >
        <span class="text-slate-500 text-sm">{{ sectionKicker }}</span>
        <h2 class="mt-2 text-4xl md:text-5xl font-black text-slate-900 leading-tight">
          {{ titleLine1 }}<br class="hidden md:block" />
          {{ titleLine2 }}
        </h2>
        <p class="mt-3 text-slate-600 max-w-3xl mx-auto">
          {{ introText }}
        </p>
      </div>

      <div class="mt-8 flex justify-center">
        <Paginator
          :first="first"
          :rows="rows"
          :totalRecords="cards.length"
          :rowsPerPageOptions="[8, 12, 16, 20]"
          @page="onPage"
          class="rounded-xl"
        />
      </div>

      <div
        ref="gridRef"
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <article
          v-for="card in visibleCards"
          :key="card.id"
          :ref="setCardRef"
          class="rounded-2xl bg-white opacity-0 will-change-transform"
        >
          <RouterLink
            :to="{ name: 'podcast-detail', params: { id: card.id } }"
            class="block group"
          >
            <div class="rounded-2xl overflow-hidden">
              <img
                :src="card.img"
                :alt="card.title"
                class="w-full h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-135"
                loading="lazy"
                decoding="async"
              />
            </div>
            <h3
              class="mt-3 text-[15px] md:text-base font-semibold text-slate-900 leading-snug"
            >
              {{ card.title }}
            </h3>
            <div class="mt-3 flex items-center gap-2 text-slate-900">
              <i class="pi pi-play text-sm"></i>
              <span class="text-sm font-medium">{{ playNowLabel }}</span>
            </div>
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from "vue";
import Paginator from "primevue/paginator";

const sectionKicker = "Latest Podcast";
const titleLine1 = "Tap into Trending Topics:";
const titleLine2 = "Latest Podcast, Always On";
const introText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id ante eu purus luctus viverra id vitae augue.";
const playNowLabel = "Play Now";

const headingRef = ref(null);
const headingClass = ref("opacity-0");
let headingIO = null;
function setupHeadingIO() {
  if (headingIO) headingIO.disconnect();
  headingIO = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (e.isIntersecting) {
        headingClass.value = "animate__animated animate__fadeInDown";
        headingIO.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (headingRef.value) headingIO.observe(headingRef.value);
}

const cards = [
  {
    id: 1,
    title: "(New) Laugh Factory: Making Mondays Bearable",
    img: "https://i.pinimg.com/1200x/4a/9c/d7/4a9cd708e8a8eae5c517d0e4eb2b6db4.jpg",
    href: "#",
  },
  {
    id: 2,
    title: "(New) Heartfelt Heroes: Stories of Courage and Compassion",
    img: "https://i.pinimg.com/736x/0d/a0/c0/0da0c0881e3dbef82ef3e465ba07dfd0.jpg",
    href: "#",
  },
  {
    id: 3,
    title: "(New) Wild Expeditions: From Mountains to Oceans",
    img: "https://i.pinimg.com/1200x/a5/c2/12/a5c2127c244b6ee602600a9c70b3e229.jpg",
    href: "#",
  },
  {
    id: 4,
    title: "(New) Money Matters: Unlocking Financial Wisdom",
    img: "https://i.pinimg.com/736x/75/18/b9/7518b94f7542b4d04d6613db503b4b01.jpg",
    href: "#",
  },
  {
    id: 5,
    title: "(New) Laugh Factory: Making Mondays Bearable",
    img: "https://i.pinimg.com/1200x/22/4a/83/224a83784790f3ae19f82e654f817ad0.jpg",
    href: "#",
  },
  {
    id: 6,
    title: "(New) Heartfelt Heroes: Stories of Courage and Compassion",
    img: "https://i.pinimg.com/736x/fd/74/1b/fd741bda849b30a279fbe63534056137.jpg",
    href: "#",
  },
  {
    id: 7,
    title: "(New) Wild Expeditions: From Mountains to Oceans",
    img: "https://i.pinimg.com/736x/2e/7c/86/2e7c86cff096c4cfb0a404eefe8626bb.jpg",
    href: "#",
  },
  {
    id: 8,
    title: "(New) Money Matters: Unlocking Financial Wisdom",
    img: "https://i.pinimg.com/736x/2d/9c/e1/2d9ce1ba5080e908a4e713bb788ef123.jpg",
    href: "#",
  },
  {
    id: 9,
    title: "(New) Laugh Factory: Making Mondays Bearable",
    img: "https://i.pinimg.com/1200x/83/4c/ba/834cbaf6771f31536ab0a3bb6c0644c8.jpg",
    href: "#",
  },
  {
    id: 10,
    title: "(New) Heartfelt Heroes: Stories of Courage and Compassion",
    img: "https://i.pinimg.com/1200x/65/49/9e/65499e6f8275d95d6c9c82cfc2fcf829.jpg",
    href: "#",
  },
  {
    id: 11,
    title: "(New) Wild Expeditions: From Mountains to Oceans",
    img: "https://i.pinimg.com/736x/f7/84/d3/f784d38a45eaf14f046b5ea761a7321d.jpg",
    href: "#",
  },
  {
    id: 12,
    title: "(New) Money Matters: Unlocking Financial Wisdom",
    img: "https://i.pinimg.com/1200x/94/3f/f3/943ff3d5167ef73cf298ceb5e5d76f08.jpg",
    href: "#",
  },
  {
    id: 13,
    title: "(New) Coffee Chat: Morning Vibes",
    img: "https://i.pinimg.com/1200x/a8/a3/30/a8a330dd455c9c4743f4451f20fc7668.jpg",
    href: "#",
  },
  {
    id: 14,
    title: "(New) Design Talks: UI Tips",
    img: "https://i.pinimg.com/1200x/e1/49/76/e14976a80ec549da73984c557b065429.jpg",
    href: "#",
  },
  {
    id: 15,
    title: "(New) Coding Corner: Vue Tricks",
    img: "https://i.pinimg.com/1200x/f0/9e/2d/f09e2d987b6fb40bb4a1c5d2c8ad76c6.jpg",
    href: "#",
  },
  {
    id: 16,
    title: "(New) Business Bites: Quick Insights",
    img: "https://i.pinimg.com/1200x/98/6a/82/986a828b918dc48dbf10fbfa14d56ed1.jpg",
    href: "#",
  },
  {
    id: 17,
    title: "(New) Travel Notes: City Stories",
    img: "https://i.pinimg.com/1200x/62/61/01/626101c2e6e56625c8f9bfdf20d69cff.jpg",
    href: "#",
  },
  {
    id: 18,
    title: "(New) Fitness Focus: Daily Moves",
    img: "https://i.pinimg.com/736x/0a/3c/9d/0a3c9d2fdb3ba243e96597cc8e444b3f.jpg",
    href: "#",
  },
  {
    id: 19,
    title: "(New) Money Minute: Saving Hacks",
    img: "https://i.pinimg.com/1200x/66/82/d0/6682d0d91f4a24a7ff0fd4ccd48120de.jpg",
    href: "#",
  },
  {
    id: 20,
    title: "(New) Gourmet Talk: Street Foods",
    img: "https://i.pinimg.com/1200x/0e/52/82/0e5282f9099c6285b26b850d356b4506.jpg",
    href: "#",
  },
  {
    id: 21,
    title: "(New) Maker Lab: DIY Hours",
    img: "https://i.pinimg.com/1200x/75/c1/ee/75c1ee9ad4840769541940f3d880333d.jpg",
    href: "#",
  },
  {
    id: 22,
    title: "(New) Photo Talk: Light & Lens",
    img: "https://i.pinimg.com/1200x/6e/d5/34/6ed5343d0284a71f4c5efcaf9e6f5fce.jpg",
    href: "#",
  },
  {
    id: 23,
    title: "(New) Music Mix: Indie Night",
    img: "https://i.pinimg.com/1200x/e8/3b/44/e83b44e7a34f882e7192eafd338bed8d.jpg",
    href: "#",
  },
  {
    id: 24,
    title: "(New) Book Break: Weekly Reads",
    img: "https://i.pinimg.com/736x/25/03/11/250311f05eadb064f5d49824e7009160.jpg",
    href: "#",
  },
];

const first = ref(0);
const rows = ref(8);
const visibleCards = computed(() => cards.slice(first.value, first.value + rows.value));
function onPage(e) {
  first.value = e.first;
  rows.value = e.rows;
  cardEls.length = 0;
  nextTick(() => {
    animateByRows(true);
  });
}

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
  const rowsArr = [];
  const sorted = els
    .map((el) => ({ el, top: el.offsetTop }))
    .sort((a, b) => a.top - b.top);
  const delta = 6;
  let current = [sorted[0].el];
  let lastTop = sorted[0].top;
  for (let i = 1; i < sorted.length; i++) {
    if (Math.abs(sorted[i].top - lastTop) <= delta) current.push(sorted[i].el);
    else {
      rowsArr.push(current);
      current = [sorted[i].el];
      lastTop = sorted[i].top;
    }
  }
  rowsArr.push(current);
  return rowsArr;
}

function animateByRows(forceNow = false) {
  const rowsArr = groupRows();
  rowsArr.forEach((row, rowIdx) => {
    const run = () =>
      row.forEach((el) => {
        if (!el.classList.contains("animate__animated")) {
          el.classList.remove("opacity-0");
          el.classList.add("animate__animated", "animate__fadeInUp");
        }
      });
    if (forceNow) setTimeout(run, rowIdx * 120);
    else setTimeout(run, rowIdx * 160);
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
  setupHeadingIO();
  setupIO();
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      recomputeOnResize();
    }, 150);
  });
});
onBeforeUnmount(() => {
  if (io) io.disconnect();
  if (headingIO) headingIO.disconnect();
  if (resizeTimer) clearTimeout(resizeTimer);
});
</script>
