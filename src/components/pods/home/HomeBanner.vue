<!-- src/components/pods/home/HomeBanner.vue -->
<template>
  <section class="relative mx-auto mt-4 mb-10 px-4">
    <div class="relative h-[520px] md:h-[640px] overflow-hidden rounded-4xl">
      <div
        class="absolute inset-0 bg-center bg-cover"
        :style="{ backgroundImage: `url(${bg})` }"
      ></div>
      <div class="absolute inset-0 bg-black/45"></div>

      <div
        class="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <p class="text-white/80 text-sm md:text-base">{{ topHint }}</p>
        <h1
          class="mt-3 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight"
        >
          {{ titleLine1 }}<br class="hidden md:block" />{{ titleLine2 }}
        </h1>
        <p class="mt-4 max-w-2xl text-white/80">{{ description }}</p>
        <div class="mt-6">
          <Button :label="buttonLabel" rounded class="px-5!" />
        </div>
      </div>
    </div>

    <div class="relative -mt-8 md:-mt-12">
      <div
        ref="cardRef"
        :class="[
          'mx-auto max-w-4xl rounded-2xl shadow-lg px-6 py-5',
          animated ? 'animate__animated animate__fadeInDown' : '',
        ]"
        :style="{
          backgroundImage: `url(${texture})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }"
      >
        <div class="text-center text-sm text-slate-500">{{ subscribeText }}</div>
        <div class="mt-3 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <a
            v-for="p in platforms"
            :key="p.label"
            :href="p.href"
            class="inline-flex items-center gap-2 text-slate-800 hover:text-black transition"
          >
            <i :class="['pi', p.icon, 'text-xl']"></i>
            <span class="font-semibold">{{ p.label }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";
import { ref, onMounted, onBeforeUnmount } from "vue";
import bg from "@/assets/imgs/HomeBannerBg.jpg";
import texture from "@/assets/imgs/texture.jpg";

const topHint = "What Do You Want to Hear Today?";
const titleLine1 = "DIVE INTO OUR";
const titleLine2 = "PODVERSE";
const description =
  "Pods is a full-featured Elementor Template Kit created to help you set up and manage your Radio Station & Podcast website in no time.";
const buttonLabel = "Learn More";
const subscribeText = "Listen & Subscribe On:";
const platforms = [
  { label: "Spotify", href: "#", icon: "pi-play-circle" },
  { label: "Apple Podcasts", href: "#", icon: "pi-apple" },
  { label: "Google Podcasts", href: "#", icon: "pi-wave-pulse" },
  { label: "Soundcloud", href: "#", icon: "pi-volume-up" },
];

// 進場動畫：進入視窗時觸發一次
const cardRef = ref(null);
const animated = ref(false);
let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        animated.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 }
  );
  if (cardRef.value) observer.observe(cardRef.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped></style>
