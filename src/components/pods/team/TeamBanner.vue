<!-- src/components/pods/podDetail/PodDetailBanner.vue -->
<template>
  <section class="relative mx-auto mt-4 mb-10 px-4">
    <div class="relative h-[420px] md:h-[540px] overflow-hidden rounded-4xl">
      <div
        class="absolute inset-0 bg-center bg-cover"
        :style="{ backgroundImage: `url(${bg})` }"
      ></div>
      <div class="absolute inset-0 bg-black/45"></div>

      <div
        class="relative z-10 h-full flex flex-col items-center justify-center text-center px-6"
      >
        <h1
          class="mt-3 text-4xl md:text-6xl lg:text-7xl font-black tracking-tight text-white leading-tight"
        >
          {{ titleLine1 }}<br class="hidden md:block" />{{ titleLine2 }}
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import bg from "@/assets/imgs/TeamBannerBg.jpg";

const titleLine1 = "Our Team";
const titleLine2 = "PODVERSE";

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
