<!-- src/layouts/DefaultFooter.vue -->
<template>
  <footer class="bg-(--p-primary-950) text-white">
    <div class="mx-auto max-w-7xl px-4 py-10">
      <div class="flex flex-col md:flex-row md:items-start gap-10 md:gap-14">
        <div class="flex-1 flex flex-col gap-4">
          <div class="flex items-center gap-3">
            <img v-if="logoSrc" :src="logoSrc" alt="PODS" class="h-8 w-auto" />
            <span v-else class="text-2xl font-extrabold tracking-wide">PODS</span>
          </div>
          <p class="text-sm text-white/80 leading-relaxed">
            Pods is a full-featured template kit created to help you set up and manage
            your Radio Station &amp; Podcast website in no time.
          </p>
          <div class="text-sm font-semibold text-white/90">Listen & Subscribe on:</div>
          <div class="flex flex-wrap items-center gap-4">
            <a
              href="#"
              class="inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <i class="pi pi-play-circle text-xl"></i><span>Spotify</span>
            </a>
            <a
              href="#"
              class="inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <i class="pi pi-apple text-xl"></i><span>Apple Podcasts</span>
            </a>
            <a
              href="#"
              class="inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <i class="pi pi-wave-pulse text-xl"></i><span>Google Podcasts</span>
            </a>
            <a
              href="#"
              class="inline-flex items-center gap-2 text-white/90 hover:text-white transition"
            >
              <i class="pi pi-volume-up text-xl"></i><span>Soundcloud</span>
            </a>
          </div>
        </div>

        <div class="flex-1 flex flex-col sm:flex-row gap-10 justify-between">
          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-white font-extrabold tracking-wide">Page List</h3>
            <ul class="flex flex-col gap-2 text-sm">
              <li
                v-for="it in pageList"
                :key="it"
                class="text-white/80 hover:text-white transition"
              >
                <a href="#">{{ it }}</a>
              </li>
            </ul>
          </div>

          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-white font-extrabold tracking-wide">Useful Links</h3>
            <ul class="flex flex-col gap-2 text-sm">
              <li
                v-for="it in usefulLinks"
                :key="it"
                class="text-white/80 hover:text-white transition"
              >
                <a href="#">{{ it }}</a>
              </li>
            </ul>
          </div>

          <div class="flex-1 flex flex-col gap-3">
            <h3 class="text-white font-extrabold tracking-wide">Work Hours</h3>
            <ul class="flex flex-col gap-2 text-sm text-white/80">
              <li v-for="(it, idx) in workHours" :key="idx">{{ it }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-8 border-t border-white/10"></div>

      <div class="mt-6 flex items-center justify-between">
        <p class="text-xs text-white/60">
          © Pods. Radio Station & Podcaster. All Rights Reserved {{ year }}.
        </p>
        <div class="flex items-center gap-2">
          <a
            href="#"
            class="grid place-items-center w-8 h-8 rounded bg-white/10 hover:bg-white/20 transition"
            aria-label="Facebook"
          >
            <i class="pi pi-facebook text-sm"></i>
          </a>
          <a
            href="#"
            class="grid place-items-center w-8 h-8 rounded bg-white/10 hover:bg-white/20 transition"
            aria-label="Twitter"
          >
            <i class="pi pi-twitter text-sm"></i>
          </a>
          <a
            href="#"
            class="grid place-items-center w-8 h-8 rounded bg-white/10 hover:bg-white/20 transition"
            aria-label="YouTube"
          >
            <i class="pi pi-youtube text-sm"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const logoSrc = "";
const year = new Date().getFullYear();

const pageList = [
  "Podcaster",
  "Radio Station",
  "About Us 1",
  "About Us 2",
  "Podcast",
  "Programs",
  "Our Team",
];

const usefulLinks = [
  "Useful Links",
  "Terms & Conditions",
  "Disclaimer",
  "Support",
  "FAQ",
  "Blog",
];

const workHours = [
  "Mon – Fri : 10:00 – 22:00",
  "Sat : 09:00 – 22:00",
  "Sun : 08:00 – 23:00",
];
</script>

<style scoped>
footer {
  background-color: var(--p-primary-950);
}
</style>
