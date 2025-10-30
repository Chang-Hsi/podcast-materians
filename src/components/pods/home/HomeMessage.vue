<!-- src/components/pods/home/HomeMessage.vue -->
<template>
  <section class="mx-auto px-10 py-10">
    <div
      class="relative rounded-[28px] overflow-hidden"
      :style="{
        backgroundImage: `url(${motoBg})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center right',
      }"
    >
      <div class="relative z-10 p-8 md:p-24">
        <div class="max-w-[680px] space-y-4 ml-20">
          <h2 class="text-white text-xl md:text-4xl font-black leading-tight">
            {{ titleLine1 }}<br />{{ titleLine2 }}
          </h2>
          <p class="text-white/80">
            {{ subtitle }}
          </p>

          <div class="mt-4">
            <div class="flex items-stretch rounded-xl overflow-hidden">
              <InputText
                v-model="email"
                :placeholder="emailPlaceholder"
                class="flex-1 h-14! px-4! bg-black/40 text-white placeholder-white/60 border border-white/25 rounded-none focus:outline-none"
              />
              <Button
                :label="subscribeLabel"
                class="h-14! px-6! bg-white text-black rounded-none border-0! hover:bg-white/90"
                :style="{ marginLeft: `-${overlapPx}px` }"
                @click="handleClick"
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
import InputText from "primevue/inputtext";
import { ref } from "vue";
import motoBg from "@/assets/imgs/MotoBanner.png";

// 文字與標題（由 script 管理）
const titleLine1 = "What Do You Want to Hear Today?";
const titleLine2 = "Subscribe For The Latest Episodes";
const subtitle = "Integer aliquam ligula in elit ullamcorper, vel tempor sapien auctor.";
const emailPlaceholder = "Email";
const subscribeLabel = "Subscribe";

// 表單狀態
const email = ref("");

// 視覺細節（輸入框與按鈕重疊距離）
const overlapPx = ref(10);

// 事件
function handleClick() {
  console.log("點擊", email.value);
}
</script>

<style scoped></style>
