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

      <div
        ref="gridRef"
        class="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <article
          v-for="card in cards"
          :key="card.id"
          :ref="setCardRef"
          class="rounded-2xl bg-white opacity-0 will-change-transform"
        >
          <div class="group relative aspect-square overflow-hidden rounded-2xl">
            <Image
              :src="card.img"
              :alt="card.title"
              preview
              :imageClass="'block w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110'"
              :pt="{
                root: { class: 'absolute inset-0 w-full h-full' },
                mask: { class: 'inset-0 rounded-2xl' },
                zoominbutton: { class: 'rounded-full' },
              }"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from "vue";
import Image from "primevue/image";

// 文案
const sectionKicker = "Gallery";
const titleLine1 = "Square Thumbs,";
const titleLine2 = "Clean Preview";
const introText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id ante eu purus luctus viverra id vitae augue.";

// 卡片資料
const cards = [
  {
    id: 1,
    title: "A",
    img: "https://i.pinimg.com/736x/56/e8/0f/56e80f66b26b327953d4d384e989c5a9.jpg",
  },
  {
    id: 2,
    title: "B",
    img: "https://i.pinimg.com/1200x/5a/49/20/5a49200b8c3a7a391c907b27583aa01f.jpg",
  },
  {
    id: 3,
    title: "C",
    img: "https://i.pinimg.com/736x/ea/fd/6a/eafd6a24c6d2be48975e5d7d93efaa26.jpg",
  },
  {
    id: 4,
    title: "D",
    img: "https://i.pinimg.com/1200x/a6/90/9c/a6909cf47df97e0dddae61da00bc27db.jpg",
  },
  {
    id: 5,
    title: "E",
    img: "https://i.pinimg.com/736x/f7/7e/d1/f77ed13af95ed1520df23458b8db9924.jpg",
  },
  {
    id: 6,
    title: "F",
    img: "https://i.pinimg.com/736x/40/71/58/407158ba76e670954c4a19ad5a53df47.jpg",
  },
  {
    id: 7,
    title: "G",
    img: "https://i.pinimg.com/1200x/b3/ec/84/b3ec84fd91c93d97939ccb5a5cfacfd3.jpg",
  },
  {
    id: 8,
    title: "H",
    img: "https://i.pinimg.com/736x/6d/30/d5/6d30d523884775494265c06e8bc4785d.jpg",
  },
  {
    id: 9,
    title: "E",
    img: "https://i.pinimg.com/736x/ae/38/26/ae382691b2e7bc4862b4fcbea2ebcfe2.jpg",
  },
  {
    id: 10,
    title: "F",
    img: "https://i.pinimg.com/736x/3c/40/a2/3c40a2669ffecb6abb28f4f6b8bd3351.jpg",
  },
  {
    id: 11,
    title: "G",
    img: "https://i.pinimg.com/736x/ff/98/b6/ff98b670248c921d00cd0ed150a28f54.jpg",
  },
  {
    id: 12,
    title: "H",
    img: "https://i.pinimg.com/736x/ad/36/ca/ad36cab10af50b4fd8b126f56dc131b2.jpg",
  },
  {
    id: 13,
    title: "H",
    img: "https://i.pinimg.com/736x/95/39/6d/95396da790e37dde6df2bf0e7dfa1261.jpg",
  },
];

// 標題區動畫
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

// 卡片逐行動畫（依實際換行自動分組，RWD OK）
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
  const delta = 6; // 容許微小誤差
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
    }, rowIdx * 160); // 每行錯開 160ms
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
