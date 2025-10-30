<!-- src/components/pods/home/HeroCards.vue -->
<template>
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-12">
      <div class="flex flex-col lg:flex-row items-start lg:gap-36">
        <div
          :ref="setLeftRef"
          class="min-w-0 basis-[60%] opacity-0 will-change-transform"
        >
          <div class="flex flex-wrap lg:flex-nowrap gap-6">
            <article v-for="p in hosts" :key="p.id" class="flex-1 min-w-60">
              <a :href="p.href" class="block">
                <img
                  :src="p.img"
                  :alt="p.name"
                  class="w-full h-64 object-cover rounded-2xl"
                  loading="lazy"
                  decoding="async"
                />
                <h3 class="mt-3 text-lg font-extrabold text-slate-900">{{ p.name }}</h3>
                <p class="text-sm text-slate-500">{{ roleLabel }}</p>
              </a>
            </article>
          </div>
        </div>

        <div
          :ref="setRightRef"
          class="min-w-0 flex-1 basis-[40%] opacity-0 will-change-transform"
        >
          <div class="flex flex-col gap-4 max-w-xl">
            <span class="text-slate-500 text-sm">{{ rightKicker }}</span>
            <h2 class="text-4xl md:text-5xl font-black leading-tight text-slate-900">
              {{ titleLine1 }}<br class="hidden md:block" />
              {{ titleLine2 }}
            </h2>
            <p class="text-slate-600">
              {{ rightDesc }}
            </p>
            <div class="pt-2">
              <Button :label="viewMoreLabel" severity="primary" rounded class="px-5!" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Button from "primevue/button";
import { onMounted, onBeforeUnmount } from "vue";

const roleLabel = "Professional Host";
const rightKicker = "Meet Our Pods Squad";
const titleLine1 = "United Voices,";
const titleLine2 = "Limitless Stories";
const rightDesc =
  "Integer aliquam ligula in elit ullamcorper, vel tempor sapien auctor. Fusce feugiat et diam id mollis. Pellentesque blandit odio ac leo.";
const viewMoreLabel = "View More";

const hosts = [
  {
    id: 1,
    name: "Jaxon Kingslay",
    img:
      "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 2,
    name: "Celeste Harrington",
    img:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
  {
    id: 3,
    name: "Sebastian Wilde",
    img:
      "https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=1600&auto=format&fit=crop",
    href: "#",
  },
];

// IntersectionObserver：左區塊用 fadeInLeft、右區塊用 fadeInRight
let observer = null;
const pending = [];
const animMap = new Map();

function setLeftRef(el) {
  if (!el) return;
  animMap.set(el, ["animate__animated", "animate__fadeInLeft"]);
  if (observer) observer.observe(el);
  else pending.push(el);
}
function setRightRef(el) {
  if (!el) return;
  animMap.set(el, ["animate__animated", "animate__fadeInRight"]);
  if (observer) observer.observe(el);
  else pending.push(el);
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.remove("opacity-0");
        const anim = animMap.get(e.target) || ["animate__animated", "animate__fadeInUp"];
        e.target.classList.add(...anim);
        observer.unobserve(e.target);
      });
    },
    { threshold: 0.2 }
  );
  pending.forEach((el) => observer.observe(el));
  pending.length = 0;
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped></style>
