<!-- src/components/pods/gallery/GalleryCardList.vue -->
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
          {{ titleLine1 }}<br class="hidden md:block" />{{ titleLine2 }}
        </h2>
        <p class="mt-3 text-slate-600 max-w-3xl mx-auto">
          {{ introText }}
        </p>
      </div>

      <!-- 成員卡片清單（lg: 一行 3 張） -->
      <div
        ref="gridRef"
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <article
          v-for="card in cards"
          :key="card.id"
          :ref="setCardRef"
          class="opacity-0 will-change-transform"
        >
          <div class="group relative overflow-hidden rounded-2xl">
            <div class="aspect-4/3 overflow-hidden rounded-2xl">
              <Image
                :src="card.img"
                :alt="card.name"
                preview
                :imageClass="'block w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'"
                :pt="{
                  root: { class: 'absolute inset-0 w-full h-full' },
                  mask: { class: 'inset-0 rounded-2xl' },
                  zoominbutton: { class: 'rounded-full' },
                }"
              />
            </div>
          </div>

          <!-- 成員名字 / 職稱 -->
          <div class="mt-4">
            <h3 class="text-slate-900 font-semibold leading-snug">
              {{ card.name }}
            </h3>
            <p class="text-sm text-slate-500 mt-1">
              {{ card.role }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Image from "primevue/image";

/* 文案 */
const sectionKicker = "Meet Our Pods Squad";
const titleLine1 = "United Voices, Limitless Stories,";
const titleLine2 = "Clean Preview";
const introText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id ante eu purus luctus viverra id vitae augue.";

const cards = [
  {
    id: 1,
    name: "Jaxon Kingslay",
    role: "Professional Host",
    img: "https://i.pinimg.com/1200x/04/3e/44/043e44f0da2f7bf0b182d68a5779806e.jpg",
  },
  {
    id: 2,
    name: "Celeste Harrington",
    role: "Professional Host",
    img: "https://i.pinimg.com/736x/0d/5f/54/0d5f54d3e02f541eec0c4677adbe1283.jpg",
  },
  {
    id: 3,
    name: "Sebastian Wilde",
    role: "Professional Host",
    img: "https://i.pinimg.com/736x/a3/76/28/a3762825a5b2b7d9d441953dddd90c5d.jpg",
  },
  {
    id: 4,
    name: "Landon Kensington",
    role: "Producer",
    img: "https://i.pinimg.com/736x/c4/c6/70/c4c6704cb1e74e26b9d52a46c6c47107.jpg",
  },
  {
    id: 5,
    name: "Adelaide Montgomery",
    role: "Co-Host",
    img: "https://i.pinimg.com/1200x/41/86/02/4186023f2ab72c92da545f4f09c9fed9.jpg",
  },
  {
    id: 6,
    name: "Harrison Beaumont",
    role: "Sound Engineer",
    img: "https://i.pinimg.com/736x/1f/56/67/1f5667b2387800b6f0a56ccd647d34df.jpg",
  },
];

/* 標題區動畫 */
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

/* 卡片逐行動畫（沿用你的行分組邏輯，RWD 成立） */
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
  const sorted = els
    .map((el) => ({ el, top: el.offsetTop }))
    .sort((a, b) => a.top - b.top);

  const rows = [];
  const delta = 6;
  let current = [sorted[0].el];
  let lastTop = sorted[0].top;

  for (let i = 1; i < sorted.length; i++) {
    if (Math.abs(sorted[i].top - lastTop) <= delta) {
      current.push(sorted[i].el);
    } else {
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
  setupHeadingIO();
  setupIO();
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(recomputeOnResize, 150);
  });
});

onBeforeUnmount(() => {
  if (io) io.disconnect();
  if (headingIO) headingIO.disconnect();
  if (resizeTimer) clearTimeout(resizeTimer);
});
</script>
