<!-- src/components/pods/faq/FaqList.vue -->
<template>
  <section class="bg-white mb-10">
    <div class="mx-auto max-w-7xl px-4 py-10">
      <div class="flex flex-wrap gap-3">
        <button
          v-for="item in faqs"
          :key="item.id"
          type="button"
          class="flex-1 basis-full lg:basis-[calc(50%-0.375rem)] w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-left transition hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-slate-400 flex items-center justify-between"
          @click="open(item)"
        >
          <span class="truncate text-lg text-slate-900 font-medium">{{ item.q }}</span>
          <i class="pi pi-chevron-down text-sm opacity-70"></i>
        </button>
      </div>

      <Dialog
        v-model:visible="visible"
        modal
        :draggable="false"
        class="w-[92vw] sm:w-[640px]"
        :breakpoints="{ '640px': '92vw' }"
      >
        <template #header>
          <h3 class="text-2xl font-extrabold text-slate-900 leading-snug">
            {{ current?.q }}
          </h3>
        </template>

        <p class="text-slate-700 text-2xl mb-5">{{ current?.a }}</p>
      </Dialog>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import Dialog from "primevue/dialog";
import Button from "primevue/button";

const faqs = [
  {
    id: 1,
    q: "How can I listen to your radio station?",
    a:
      "You can listen via our website player, mobile app, or supported smart speakers. Visit the Listen page for quick links and setup tips.",
  },
  {
    id: 2,
    q: "How can I subscribe to your podcasts?",
    a:
      "Open your preferred podcast app and search our channel name, then tap Follow/Subscribe. We support Spotify, Apple Podcasts, Google Podcasts, and RSS.",
  },
  {
    id: 3,
    q: "What time are your live shows broadcast?",
    a:
      "Live shows air Monday to Friday between 8:00–10:00 and 18:00–20:00 (GMT+8). See the Programs page for the full weekly schedule.",
  },
  {
    id: 4,
    q: "How can I request a song or dedicate a message?",
    a:
      "Send your request through the Request form on our site or DM our official Instagram. Remember to include song title, artist, and your message.",
  },
  {
    id: 5,
    q: "How can I become a guest on one of your shows?",
    a:
      "Fill out the Guest Application with your topic, bio, and availability. Our producers will contact you if the topic fits an upcoming show.",
  },
  {
    id: 6,
    q: "What should I do if I experience technical issues while listening?",
    a:
      "Try refreshing the page, switching networks, or using another browser. If issues persist, contact support and include your device and OS details.",
  },
  {
    id: 7,
    q: "How can I provide feedback or suggestions?",
    a:
      "Use the Feedback form or email us. We read every message and regularly incorporate listener suggestions into new segments.",
  },
  {
    id: 8,
    q: "Are there opportunities to volunteer or intern at the station?",
    a:
      "Yes. We offer seasonal internships and volunteer roles in production and social media. Check the Careers page for current openings.",
  },
];

const visible = ref(false);
const current = ref(null);

function open(item) {
  current.value = item;
  visible.value = true;
}
</script>

<style scoped></style>
