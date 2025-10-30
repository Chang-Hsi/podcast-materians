<!-- src/components/pods/about/AboutService.vue -->
<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-12 md:py-16">
      <div class="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
        <div class="w-full lg:w-[28%]">
          <div class="relative flex justify-end">
            <div
              class="rounded-3xl overflow-hidden w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80"
            >
              <img
                :src="hero"
                :alt="heroAlt"
                class="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>

            <div
              ref="badgeRef"
              class="absolute top-6 right-28 sm:top-8 sm:right-32 md:top-10 md:right-48 -translate-x-3 sm:-translate-x-4 md:-translate-x-6 bg-black text-white rounded-2xl shadow-lg px-6! py-6! opacity-0"
            >
              <div class="text-sm opacity-90">{{ subscriberLabel }}</div>
              <div class="text-3xl font-black">{{ subscriberCount }}</div>
            </div>
          </div>
        </div>

        <div class="min-w-0 flex-1">
          <span class="text-slate-500 text-sm">{{ leftKicker }}</span>
          <h2 class="mt-2 text-4xl md:text-5xl font-black leading-tight text-slate-900">
            {{ leftTitleLine1 }}<br class="hidden md:block" />{{ leftTitleLine2 }}
          </h2>
          <p class="mt-4 text-slate-600 max-w-xl">
            {{ leftDesc }}
          </p>
        </div>

        <div class="w-full lg:w-[360px]">
          <div
            class="rounded-lg bg-black text-white px-4 py-3 flex items-center justify-between"
          >
            <span class="font-bold">{{ featureTitle }}</span>
            <i class="pi pi-angle-up"></i>
          </div>
          <p class="mt-3 text-sm text-slate-600">
            {{ featureDesc }}
          </p>

          <div class="mt-8 space-y-3">
            <div
              v-for="(it, i) in faqs"
              :key="it.id"
              class="rounded-lg border border-slate-200 bg-white"
            >
              <button
                type="button"
                class="w-full px-4 py-3 flex items-center justify-between text-left"
                @click="toggle(i)"
              >
                <span class="font-semibold text-slate-900">{{ it.title }}</span>
                <i
                  class="pi pi-angle-down transition-transform duration-200"
                  :class="openIndex === i ? 'rotate-180' : ''"
                ></i>
              </button>
              <div
                v-show="openIndex === i"
                class="px-4 pb-4 -mt-1 text-sm text-slate-600"
              >
                {{ it.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
// 主要圖
const hero =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop";
const heroAlt = "why choose us";

// 小黑卡（訂閱數）
const subscriberLabel = "Our Subscriber";
const subscriberCount = "17.5M+";

// 左側文案
const leftKicker = "Why Choose Us?";
const leftTitleLine1 = "Your Ultimate";
const leftTitleLine2 = "Sound Destination";
const leftDesc =
  "Embark on a journey with us at Pods, where every episode promises to captivate, inspire, and empower. Curious why our podcast is a must-listen? Here are four compelling reasons to tune in.";

// 右側頂部卡片與說明
const featureTitle = "Unbeatable Variety";
const featureDesc =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sed enim et risus ornare commodo eu efficitur ligula.";

// 手風琴內容
const faqs = [
  {
    id: 1,
    title: "Engaging Presenters",
    content:
      "Hosts who bring energy, expertise, and personality—making every topic approachable and fun.",
  },
  {
    id: 2,
    title: "Stay Updated",
    content:
      "Fresh episodes weekly so you are always in the loop with trends, culture, and key stories.",
  },
  {
    id: 3,
    title: "Community and Connection",
    content:
      "Be part of a vibrant listener community that shares ideas, feedback, and inspiration.",
  },
];

const openIndex = ref(-1);
function toggle(i) {
  openIndex.value = openIndex.value === i ? -1 : i;
}

// 疊加黑卡片進場動畫（animate.css：animate__lightSpeedInLeft）
const badgeRef = ref(null);
let io = null;
onMounted(() => {
  io = new IntersectionObserver(
    (entries) => {
      const e = entries[0];
      if (e.isIntersecting && badgeRef.value) {
        const el = badgeRef.value;
        el.classList.remove("opacity-0");
        el.classList.add("animate__animated", "animate__lightSpeedInLeft");
        io.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (badgeRef.value) io.observe(badgeRef.value);
});
onBeforeUnmount(() => {
  if (io) io.disconnect();
});
</script>

<style scoped></style>
