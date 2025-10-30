<!-- src/components/pods/home/HeroFrame.vue -->
<template>
  <section :style="bgStyle" class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-14 mb-10">
      <div class="flex flex-col lg:flex-row items-start gap-10">
        <div class="flex-1 flex flex-col gap-5">
          <span class="text-slate-500 text-sm">{{ sectionKicker }}</span>
          <h2 class="text-4xl md:text-5xl font-black leading-tight text-slate-900">
            {{ titleLine1 }}<br class="hidden md:block" />
            {{ titleLine3 }}
          </h2>
          <p class="text-slate-600 max-w-xl">
            {{ introText }}
          </p>
          <div>
            <Button :label="primaryBtnLabel" rounded class="px-5!" />
          </div>
          <div class="mt-4 text-slate-500 text-sm">{{ partnerLabel }}</div>
          <div class="flex flex-wrap items-center gap-2">
            <img class="h-7 w-auto opacity-90" :src="logo1Src" :alt="logo1Alt" />
            <img class="h-7 w-auto opacity-90" :src="logo2Src" :alt="logo2Alt" />
            <img class="h-7 w-auto opacity-90" :src="logo3Src" :alt="logo3Alt" />
            <img class="h-7 w-auto opacity-90" :src="logo4Src" :alt="logo4Alt" />
          </div>
        </div>

        <div class="flex-1 flex justify-center">
          <div
            class="relative w-[360px] sm:w-[420px] lg:w-[460px] h-[520px] rounded-2xl overflow-hidden shadow-lg"
          >
            <iframe
              v-if="play"
              class="absolute inset-0 w-full h-full"
              :src="embedUrl"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
            <button
              v-else
              type="button"
              class="absolute inset-0 w-full h-full"
              @click="play = true"
            >
              <img :src="thumbUrl" :alt="thumbAlt" class="w-full h-full object-cover" />
              <span class="absolute inset-0 flex items-center justify-center">
                <span
                  class="grid place-items-center w-16 h-16 rounded-full bg-white/90 shadow"
                >
                  <i class="pi pi-play text-xl text-black"></i>
                </span>
              </span>
            </button>
          </div>
        </div>

        <div class="flex-1 flex flex-col gap-6 min-h-[520px]">
          <p class="text-slate-600">
            {{ rightIntro }}
          </p>

          <div class="flex items-center gap-3">
            <button
              type="button"
              class="inline-flex items-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-2 hover:bg-slate-50 transition"
              @click="play = true"
            >
              <span
                class="grid place-items-center w-9 h-9 rounded-full bg-black text-white"
              >
                <i class="pi pi-play text-sm"></i>
              </span>
              <span class="text-sm font-semibold text-slate-900">
                {{ playCtaLabel }}
              </span>
            </button>
          </div>

          <div class="mt-2 text-xs font-semibold tracking-widest text-slate-500">
            {{ statsKicker }}
          </div>
          <div class="flex flex-col lg:flex-row lg:items-stretch gap-10">
            <div>
              <div class="text-3xl font-black text-slate-900">{{ stat1Value }}</div>
              <div class="text-slate-500">{{ stat1Label }}</div>
            </div>
            <div>
              <div class="text-3xl font-black text-slate-900">{{ stat2Value }}</div>
              <div class="text-slate-500">{{ stat2Label }}</div>
            </div>
          </div>

          <div class="mt-auto pb-8">
            <div class="my-2 text-slate-500 text-sm">{{ viewersNote }}</div>
            <div class="flex items-center">
              <img
                class="w-10 h-10 rounded-full ring-2 ring-white -mr-2"
                :src="avatar1Src"
                :alt="avatar1Alt"
              />
              <img
                class="w-10 h-10 rounded-full ring-2 ring-white -mr-2"
                :src="avatar2Src"
                :alt="avatar2Alt"
              />
              <img
                class="w-10 h-10 rounded-full ring-2 ring-white -mr-2"
                :src="avatar3Src"
                :alt="avatar3Alt"
              />
              <img
                class="w-10 h-10 rounded-full ring-2 ring-white"
                :src="avatar4Src"
                :alt="avatar4Alt"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";
import texture from "@/assets/imgs/texture.jpg";
import logotext from "@/assets/imgs/logotext.png";
import { computed, ref } from "vue";

const play = ref(false);

// 區塊文案
const sectionKicker = "About Pods";
const titleLine1 = "Epic Headlines,";
const titleLine3 = "Always Here";
const introText =
  "Integer aliquam ligula in elit ullamcorper, vel tempor sapien auctor. Fusce feugiat et diam id mollis. Pellentesque blandit odio ac leo.";
const primaryBtnLabel = "More About Us";
const partnerLabel = "Our Partner";

// 合作夥伴 Logo
const logo1Src = `${logotext}`;
const logo2Src = `${logotext}`;
const logo3Src = `${logotext}`;
const logo4Src = `${logotext}`;
const logo1Alt = "Logo 1";
const logo2Alt = "Logo 2";
const logo3Alt = "Logo 3";
const logo4Alt = "Logo 4";

// 影片
const ytId = "5sR0zEWwHNg";
const embedUrl = computed(
  () => `https://www.youtube-nocookie.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`
);
const thumbUrl = computed(() => `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`);
const thumbAlt = "Video cover";

// 右側文案與按鈕
const rightIntro =
  "Sed eu placerat nulla. Morbi finibus convallis urna. Praesent aliquam orci vitae mi efficitur, facilisis ornare leo efficitur. Aenean mattis quam nec felis porta, efficitur sollicitudin felis feugiat.";
const playCtaLabel = "Play Recent Episodes";

// 統計
const statsKicker = "SPLIT IN NUMBER";
const stat1Value = "17.5M+";
const stat1Label = "Our Subscriber";
const stat2Value = "1.5k+";
const stat2Label = "Total Episodes";

// 觀眾說明與頭像
const viewersNote = "Over 500k+ Viewers Daily";
const avatar1Src = "https://i.pravatar.cc/80?img=11";
const avatar2Src = "https://i.pravatar.cc/80?img=22";
const avatar3Src = "https://i.pravatar.cc/80?img=33";
const avatar4Src = "https://i.pravatar.cc/80?img=44";
const avatar1Alt = "a";
const avatar2Alt = "b";
const avatar3Alt = "c";
const avatar4Alt = "d";

// 背景樣式
const bgStyle = computed(() => ({
  backgroundImage: `url(${texture})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));
</script>

<style scoped></style>
