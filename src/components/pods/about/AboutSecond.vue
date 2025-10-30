<!-- src/components/pods/about/AboutSecond.vue -->
<template>
  <section :style="bgStyle" class="bg-white mb-10">
    <div class="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div class="flex flex-col md:flex-row items-start gap-6 md:gap-10">
        <div
          ref="leftRef"
          class="md:basis-[45%] md:max-w-[45%] pr-16 opacity-0 will-change-transform"
        >
          <span class="text-slate-500 text-sm">{{ kicker }}</span>
          <h2 class="mt-2 text-4xl md:text-5xl font-black leading-tight text-slate-900">
            {{ titleLine1 }}<br class="hidden md:block" />{{ titleLine2 }}
          </h2>
        </div>

        <div ref="rightRef" class="flex-1 opacity-0 will-change-transform">
          <div class="rounded-3xl overflow-hidden">
            <img
              :src="heroImg"
              alt="about cover"
              class="w-full h-48 sm:h-60 md:h-64 lg:h-64 object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <div
        ref="midRef"
        class="mt-6 md:mt-8 flex items-center gap-4 opacity-0 will-change-transform"
      >
        <p class="flex-1 md:basis-[70%] md:max-w-[70%] text-slate-600">
          {{ intro }}
        </p>
        <div class="ml-auto">
          <Button :label="ctaLabel" severity="primary" rounded class="px-5!" />
        </div>
      </div>

      <div class="mt-8 md:mt-10 flex flex-wrap gap-6">
        <article
          v-for="(f, idx) in features"
          :key="f.id"
          :ref="setCardRef"
          class="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(25%-18px)] opacity-0 will-change-transform"
        >
          <div class="h-full rounded-2xl bg-white shadow-sm px-6 py-5">
            <div class="h-full flex flex-col">
              <div class="flex items-center gap-3">
                <div class="shrink-0 grid place-items-center rounded-xl h-8">
                  <i :class="['pi', f.icon, 'text-xl text-slate-900']"></i>
                </div>
                <h3 class="text-slate-900 font-extrabold">{{ f.title }}</h3>
              </div>
              <p class="mt-auto pt-3 text-sm text-slate-600 leading-relaxed">
                {{ f.desc }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";
import { ref, onMounted, onBeforeUnmount } from "vue";
import texture from "@/assets/imgs/texture.jpg";

const kicker = "About Pods";
const titleLine1 = "Epic Headlines,";
const titleLine2 = "Always Fresh, Always Here";
const heroImg =
  "https://i.pinimg.com/1200x/e9/69/1b/e9691baf334ed0d7a9f48543f89c9719.jpg";
const intro =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam convallis tincidunt elit sed pretium. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.";
const ctaLabel = "More About Us";

const features = [
  {
    id: 1,
    icon: "pi-bolt",
    title: "Trending Topics",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    id: 2,
    icon: "pi-star",
    title: "Pop Culture",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    id: 3,
    icon: "pi-microphone",
    title: "Comedy & Fun",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
  {
    id: 4,
    icon: "pi-heart",
    title: "Sports & Health",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus.",
  },
];

const bgStyle = {
  backgroundImage: `url(${texture})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

// 動畫
const leftRef = ref(null);
const rightRef = ref(null);
const midRef = ref(null);
const cardEls = [];
function setCardRef(el) {
  if (el) cardEls.push(el);
}

let io = null;
onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        // 根據對象加不同動畫
        if (e.target === leftRef.value) {
          reveal(e.target, ["animate__animated", "animate__fadeInLeft"]);
        } else if (e.target === rightRef.value) {
          reveal(e.target, ["animate__animated", "animate__fadeInRight"]);
        } else if (e.target === midRef.value) {
          reveal(e.target, ["animate__animated", "animate__fadeInDown"]);
        } else {
          // 卡片：逐一淡入向上（小間隔）
          const idx = cardEls.indexOf(e.target);
          setTimeout(() => {
            reveal(e.target, ["animate__animated", "animate__fadeInUp"]);
          }, idx * 120);
        }
        io.unobserve(e.target);
      });
    },
    { threshold: 0.2 }
  );

  if (leftRef.value) io.observe(leftRef.value);
  if (rightRef.value) io.observe(rightRef.value);
  if (midRef.value) io.observe(midRef.value);
  cardEls.forEach((el) => io.observe(el));
});

onBeforeUnmount(() => {
  if (io) io.disconnect();
});

function reveal(el, classes) {
  el.classList.remove("opacity-0");
  el.classList.add(...classes);
}
</script>

<style scoped></style>
