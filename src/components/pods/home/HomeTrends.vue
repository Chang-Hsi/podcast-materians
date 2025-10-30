<!-- src/components/pods/home/HeroTrends.vue -->
<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-10 mb-10">
      <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">
        Trending Episodes
      </h2>

      <div class="mt-6 flex flex-wrap gap-6">
        <article
          v-for="ep in items"
          :key="ep.id"
          :ref="setArticleRef"
          class="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(25%-18px)] opacity-0 will-change-transform"
        >
          <a :href="ep.href" class="block group">
            <div class="rounded-2xl overflow-hidden">
              <img
                :src="ep.img"
                :alt="ep.title"
                class="w-full h-48 md:h-56 object-cover transition-transform duration-500 ease-out group-hover:scale-135"
                loading="lazy"
                decoding="async"
              />
            </div>

            <h3
              class="mt-3 text-[15px] md:text-base font-semibold text-slate-900 leading-snug"
            >
              {{ ep.title }}
            </h3>
            <div class="mt-3 flex items-center gap-2 text-slate-800">
              <i class="pi pi-play text-sm"></i>
              <span class="text-sm font-medium">Play Episode</span>
            </div>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from "vue";

let observer = null;
const pendingEls = [];

function setArticleRef(el) {
  if (!el) return;
  // 若 observer 已建立，直接 observe；否則先暫存，等 onMounted 再處理
  if (observer) {
    observer.observe(el);
  } else {
    pendingEls.push(el);
  }
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.remove("opacity-0");
          e.target.classList.add("animate__animated", "animate__fadeInUp");
          observer.unobserve(e.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  // 把之前暫存的元素補 observe
  pendingEls.forEach((el) => observer.observe(el));
  pendingEls.length = 0;
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});

const items = [
  {
    id: 1,
    title: "(Eps. 6) Laugh Factory: Making Mondays Bearable",
    img: "https://i.pinimg.com/736x/aa/f3/0d/aaf30d5685b74740072813c85710658b.jpg",
    href: "#",
  },
  {
    id: 2,
    title: "(Eps. 4) Heartfelt Heroes: Stories of Courage and Compassion",
    img: "https://i.pinimg.com/1200x/c3/95/3f/c3953ff9a18c9bf9b875b7d3edfa9b6d.jpg",
    href: "#",
  },
  {
    id: 3,
    title: "(Eps. 2) Wild Expeditions: From Mountains to Oceans",
    img: "https://i.pinimg.com/736x/ec/3d/8a/ec3d8a6082bcba8ddc511f63aaf4b3a9.jpg",
    href: "#",
  },
  {
    id: 4,
    title: "(Eps. 5) Money Matters: Unlocking Financial Wisdom",
    img: "https://i.pinimg.com/1200x/58/e2/35/58e235d40d694f57a432595baa7f6bfe.jpg",
    href: "#",
  },
];
</script>

<style scoped></style>
