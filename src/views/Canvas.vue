<template>
  <div class="space-y-4">
    <PhotoTool v-model:photos="photos" @save="handleSave" />

    <!-- <pre class="text-xs bg-slate-900 text-slate-100 p-3 rounded-lg overflow-x-auto"
      >{{ photos }}
    </pre> -->
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import PhotoTool from "@/components/PhotoTool.vue";

const photos = ref([]);

// 可選：存進 localStorage，當作「本地端保存」
onMounted(() => {
  const raw = localStorage.getItem("photo-tool-photos");
  if (raw) {
    try {
      photos.value = JSON.parse(raw);
    } catch (e) {
      console.error("讀取本地照片失敗", e);
    }
  }
});

watch(
  photos,
  (val) => {
    localStorage.setItem("photo-tool-photos", JSON.stringify(val));
  },
  { deep: true }
);

// 可選：按「儲存並關閉」時做額外動作（之後可以換成呼叫 API）
const handleSave = (finalPhotos) => {
  console.log("使用者剛剛儲存的照片列表：", finalPhotos);
  // 未來要改成呼叫 API，就在這裡寫
};
</script>
