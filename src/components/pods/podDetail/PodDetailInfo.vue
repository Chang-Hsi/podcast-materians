<!-- src/components/pods/podDetail/PodDetailInfo.vue -->
<template>
  <div class="bg-white mb-10">
    <section>
      <div class="mx-auto max-w-7xl px-4 py-8">
        <div class="text-sm text-slate-500">{{ listenLabel }}</div>

        <div class="mt-3 flex flex-wrap items-center gap-3">
          <Button
            v-for="p in platforms"
            :key="p.label"
            :label="p.label"
            severity="primary"
            rounded
            class="px-7!"
          >
            <template #icon>
              <i :class="['pi', p.icon, 'mr-2']"></i>
            </template>
          </Button>
        </div>
      </div>
    </section>

    <section>
      <div class="mx-auto max-w-7xl px-4 pb-12">
        <div class="flex flex-col lg:flex-row items-start gap-6 lg:gap-10">
          <div class="min-w-0 flex-1">
            <span class="text-sm text-slate-500">{{ singlePodcastLabel }}</span>
            <h1
              class="mt-2 text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 leading-tight"
            >
              {{ title }}
            </h1>
            <p class="mt-4 text-slate-700 leading-relaxed">
              {{ description }}
            </p>
          </div>

          <div class="w-full lg:w-[360px]">
            <div
              class="rounded-2xl border border-slate-200 bg-white shadow-sm px-5 py-10"
              :style="cardBgStyle"
            >
              <h3 class="text-slate-900 font-bold text-xl">{{ timelineTitle }}</h3>

              <ul class="mt-4 space-y-6">
                <li
                  v-for="(t, idx) in timeline"
                  :key="idx"
                  class="flex items-start gap-3"
                >
                  <span
                    class="shrink-0 inline-flex items-center justify-center rounded-md bg-slate-200/80 text-slate-900 text-[11px] font-bold px-2 py-1"
                  >
                    {{ t.time }}
                  </span>
                  <span class="text-slate-800 font-medium">{{ t.label }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="mx-auto max-w-7xl px-4 py-10">
        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900">
          {{ supportTitle }}
        </h2>
        <p class="mt-2 text-slate-600">
          {{ supportIntro }}
        </p>

        <div class="mt-8 flex flex-wrap gap-6">
          <article
            v-for="t in tiers"
            :key="t.id"
            class="flex-1 basis-full sm:basis-[calc(50%-12px)] lg:basis-[calc(33.333%-16px)]"
          >
            <div
              :class="[
                'h-72 rounded-3xl border px-6 py-6 flex flex-col justify-between',
                t.theme === 'dark'
                  ? 'bg-black text-white border-black'
                  : t.theme === 'mid'
                  ? 'bg-slate-900 text-white border-slate-900/80'
                  : 'bg-white text-slate-900 border-slate-200 shadow-sm',
              ]"
            >
              <div>
                <div class="text-sm font-semibold opacity-90">{{ t.name }}</div>
                <div class="mt-2 flex items-end gap-1">
                  <span class="text-xl font-black">{{ currencySymbol }}</span>
                  <span class="text-4xl md:text-5xl font-black tracking-tight">
                    {{ t.price }}
                  </span>
                  <span class="mb-1 text-sm font-medium opacity-80">{{
                    priceSuffix
                  }}</span>
                </div>

                <ul class="mt-4 space-y-2 text-sm">
                  <li
                    v-for="(f, i) in t.features"
                    :key="i"
                    class="flex items-start gap-2"
                  >
                    <span
                      class="mt-[3px] w-1.5 h-1.5 rounded-full"
                      :class="t.theme === 'light' ? 'bg-slate-900' : 'bg-white'"
                    ></span>
                    <span>{{ f }}</span>
                  </li>
                </ul>
              </div>

              <div>
                <Button :label="joinLabel" severity="primary" rounded class="px-5!" />
              </div>
            </div>
          </article>
        </div>

        <p class="mt-8 text-slate-600 leading-relaxed text-sm">
          {{ supportOutro }}
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import Button from "primevue/button";
import texture from "/src/assets/imgs/texture.jpg";

// 置頂提示與平台
const listenLabel = "Listen & Subscribe On:";
const platforms = [
  { label: "Spotify", icon: "pi-play-circle" },
  { label: "Apple Podcasts", icon: "pi-apple" },
  { label: "Google Podcasts", icon: "pi-wave-pulse" },
  { label: "Soundcloud", icon: "pi-volume-up" },
];

// 單集資訊
const singlePodcastLabel = "Single Podcast";
const title = "Laugh Factory: Making Mondays Bearable";
const description =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar lacus vitae laoreet consectetur. Sed et pretium nunc. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ultrices vulputate tincidunt. Suspendisse sed neque eu libero dapibus convallis. Aenean pellentesque efficitur tortor, eu mollis diam aliquet eu. Cras sed odio mauris. Nam cursus a sapien at finibus.";

// 右側卡片：時間軸
const timelineTitle = "Episode Timeline";
const timeline = [
  { time: "01:00", label: "Introduction" },
  { time: "03:45", label: "Exploring the topic" },
  { time: "06:34", label: "Podcaster Testimonial" },
  { time: "12:54", label: "Closing" },
];
const cardBgStyle = {
  backgroundImage: `url(${texture})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
};

// Patreon 區塊
const supportTitle = "Support us on Patreon";
const supportIntro =
  "Suspendisse nec dolor iaculis justo placerat scelerisque. Suspendisse ullamcorper consectetur maximus. Sed varius leo at magna maximus lobortis. Cras mattis efficitur fringilla. Proin imperdiet semper quam eget convallis.";

const currencySymbol = "$";
const priceSuffix = "/month";
const joinLabel = "Join Now";

const tiers = [
  {
    id: 1,
    name: "Official Patreon",
    price: "4,99",
    theme: "light",
    features: [
      "Sed et enim porttitor tellus",
      "Euismod consectetur",
      "Fusce vehicula nibh quis",
    ],
  },
  {
    id: 2,
    name: "All-access Patreon",
    price: "14,99",
    theme: "mid",
    features: [
      "Sed et enim porttitor tellus",
      "Euismod consectetur",
      "Fusce vehicula nibh quis",
    ],
  },
  {
    id: 3,
    name: "VIP Patreon",
    price: "24,99",
    theme: "dark",
    features: [
      "Sed et enim porttitor tellus",
      "Euismod consectetur",
      "Fusce vehicula nibh quis",
    ],
  },
];

const supportOutro =
  "Nam aliquet massa urna, a semper lorem tincidunt quis. Mauris non rutrum ex. Etiam facilisis velit consectetur massa commodo sagittis. Mauris sed imperdiet erat, ac molestie dolor. Donec at purus nec augue auctor volutpat. Suspendisse sit amet lectus at odio convallis mollis. Donec vestibulum justo ac lacinia viverra.";
</script>

<style scoped></style>
