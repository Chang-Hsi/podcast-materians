<!-- src/layouts/DefaultHeader.vue -->
<template>
  <header class="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
    <div class="px-4 h-16 flex items-center">
      <a href="/" class="flex items-center gap-2">
        <img v-if="logoSrc" :src="logoSrc" alt="PODS" class="h-7 w-auto" />
        <span v-else class="text-xl font-extrabold tracking-tight">PODS</span>
      </a>

      <nav class="flex-1 flex justify-center">
        <ul class="flex items-center gap-6">
          <li>
            <RouterLink
              to="/"
              class="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 text-[15px] font-medium transition"
            >
              <span>Home</span>
              <i class="pi pi-plus text-[10px] opacity-60 relative -top-px"></i>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/about"
              class="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 text-[15px] font-medium transition"
            >
              <span>About Us</span>
              <i class="pi pi-plus text-[10px] opacity-60 relative -top-px"></i>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/podcasts"
              class="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 text-[15px] font-medium transition"
            >
              <span>Podcasts</span>
              <i class="pi pi-plus text-[10px] opacity-60 relative -top-px"></i>
            </RouterLink>
          </li>

          <li>
            <RouterLink
              to="/about"
              class="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 text-[15px] font-medium transition"
            >
              <span>Programs</span>
              <i class="pi pi-plus text-[10px] opacity-60 relative -top-px"></i>
            </RouterLink>
          </li>

          <!-- Pages：改成下拉 -->
          <li class="relative">
            <button
              type="button"
              class="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 text-[15px] font-medium transition"
              @click="togglePagesMenu"
            >
              <span>Pages</span>
              <i class="pi pi-angle-down text-[11px] opacity-70"></i>
            </button>
            <Menu ref="pagesMenu" :model="pagesItems" popup />
          </li>

          <li>
            <RouterLink
              to="/contact"
              class="inline-flex items-center gap-1 px-2 py-1 text-slate-600 hover:text-slate-900 text-[15px] font-medium transition"
            >
              <span>Contact</span>
              <i class="pi pi-plus text-[10px] opacity-60 relative -top-px"></i>
            </RouterLink>
          </li>
        </ul>
      </nav>

      <Button
        label="Donate"
        icon="pi pi-heart"
        severity="primary"
        rounded
        class="px-5"
        @click="onDonate"
      />
    </div>
  </header>
</template>

<script setup>
import Button from "primevue/button";
import Menu from "primevue/menu";
import { ref } from "vue";
import { useRouter } from "vue-router";

const logoSrc = "";

const pagesMenu = ref(null);
const router = useRouter();

function togglePagesMenu(e) {
  pagesMenu.value && pagesMenu.value.toggle(e);
}

const pagesItems = [
  {
    label: "Blog",
    icon: "pi pi-book",
    command: () => {
      router.push("/blog");
      pagesMenu.value?.hide();
    },
  },
  {
    label: "Gallery",
    icon: "pi pi-images",
    command: () => {
      router.push("/gallery");
      pagesMenu.value?.hide();
    },
  },
  {
    label: "Our Team",
    icon: "pi pi-users",
    command: () => {
      router.push("/our-team");
      pagesMenu.value?.hide();
    },
  },
  {
    label: "Canvas",
    icon: "pi pi-images",
    command: () => {
      router.push("/canvas");
      pagesMenu.value?.hide();
    },
  },
  {
    label: "FAQ",
    icon: "pi pi-question-circle",
    command: () => {
      router.push("/faq");
      pagesMenu.value?.hide();
    },
  },
];

function onDonate() {
  window.location.href = "#donate";
}
</script>
