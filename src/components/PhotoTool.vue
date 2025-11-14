<template>
  <div class="flex items-center gap-2">
    <!-- ＋ 按鈕 -->
    <button
      type="button"
      class="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-100 text-sky-900 text-3xl font-medium shadow-sm hover:bg-slate-200 active:bg-slate-300 transition"
      @click="openModal"
    >
      +
    </button>

    <!-- 縮圖列 -->
    <div class="flex items-center gap-2">
      <div
        v-for="(photo, index) in photos"
        :key="photo.id"
        class="h-14 w-14 overflow-hidden rounded-xl border border-slate-200 cursor-pointer hover:ring-2 hover:ring-sky-400 transition"
        @click="openEditor(index)"
      >
        <img
          :src="photo.editedUrl || photo.originalUrl"
          alt="已拍攝照片縮圖"
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <!-- 縮圖的另一種呈現方法 -->
    <div class="flex items-center gap-2">
      <!-- 有照片時：顯示第一張 + 數量角標 -->
      <div
        v-if="photos.length > 0"
        class="relative h-14 w-14 overflow-hidden rounded-xl border border-slate-200 cursor-pointer"
        @click="openEditor(0)"
      >
        <img
          :src="photos[0].editedUrl || photos[0].originalUrl"
          alt="已拍攝照片縮圖"
          class="h-full w-full object-cover"
        />
        <!-- 右下角黑色毛玻璃底＋白色數字 -->
        <div
          class="absolute bottom-1 right-1 min-w-6 h-6 px-1.5 rounded-full bg-black/70 flex items-center justify-center text-[12px] font-semibold text-white"
        >
          {{ photos.length }}
        </div>
      </div>
    </div>

    <!-- 彈窗 -->
    <div v-if="isOpen" class="fixed inset-0 z-9999">
      <div class="absolute inset-0 bg-black/50" @click="closeModal"></div>

      <div
        class="relative z-10 mx-auto my-8 flex h-[83.5vh] w-[90vw] max-w-5xl flex-col rounded-2xl bg-white shadow-xl"
      >
        <!-- Header：Tab + 關閉 -->
        <header class="flex items-center justify-between px-4 pt-5">
          <div class="inline-flex mx-auto rounded-full bg-slate-100 p-1">
            <button
              type="button"
              class="px-4 py-1 text-sm font-medium rounded-full transition"
              :class="
                activeTab === 'capture'
                  ? 'bg-white shadow text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              "
              @click="switchToCapture"
            >
              拍照
            </button>
            <button
              type="button"
              class="px-4 py-1 text-sm font-medium rounded-full transition"
              :class="
                activeTab === 'edit'
                  ? 'bg-white shadow text-slate-900'
                  : 'text-slate-500 hover:text-slate-700'
              "
              :disabled="photos.length === 0"
              @click="switchToEdit"
            >
              編輯
            </button>
          </div>

          <button
            type="button"
            class="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition"
            @click="closeModal"
          >
            <span class="text-xl leading-none">×</span>
          </button>
        </header>

        <!-- Main -->
        <main class="relative flex-1 flex flex-col gap-4 pt-4">
          <!-- 拍照模式 -->
          <div v-show="activeTab === 'capture'" class="flex flex-1 flex-col">
            <div class="flex items-center justify-center">
              <div
                class="w-full h-[60vh] bg-slate-900 overflow-hidden flex items-center justify-center"
              >
                <video
                  ref="videoRef"
                  autoplay
                  playsinline
                  class="h-full w-full object-contain"
                ></video>
              </div>
            </div>

            <div class="flex flex-col items-center gap-3 mt-8">
              <div class="text-sm text-slate-500">{{ captureHint }}</div>

              <div class="flex items-center justify-center gap-6">
                <button
                  type="button"
                  class="flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-300 bg-slate-100 shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
                  :disabled="!canCaptureMore || isCapturing"
                  @click="handleCapture"
                >
                  <div class="h-10 w-10 rounded-full bg-white"></div>
                </button>
                <div class="text-sm text-slate-600">
                  已拍 {{ photos.length }} / {{ MAX_PHOTOS }} 張
                </div>
              </div>

              <div v-if="errorMessage" class="mt-1 text-sm text-rose-500">
                {{ errorMessage }}
              </div>
            </div>
          </div>

          <!-- 編輯模式 -->
          <div
            v-show="activeTab === 'edit'"
            class="flex flex-1 flex-col items-center justify-center"
          >
            <div v-if="photos.length === 0" class="text-slate-400 text-sm">
              尚未拍照，請先到「拍照」分頁拍攝至少一張照片。
            </div>

            <div v-else class="flex h-full w-full flex-col items-center gap-2">
              <!-- 左右切換箭頭（貼兩側） -->
              <button
                type="button"
                class="absolute left-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="photos.length <= 1 || activeIndex === 0"
                @click="goPrev"
              >
                <i class="pi pi-chevron-left" style="font-size: 1.5rem"></i>
              </button>

              <button
                type="button"
                class="absolute right-2 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow hover:bg-white transition disabled:opacity-40 disabled:cursor-not-allowed"
                :disabled="photos.length <= 1 || activeIndex === photos.length - 1"
                @click="goNext"
              >
                <i class="pi pi-chevron-right" style="font-size: 1.5rem"></i>
              </button>

              <!-- 畫布 -->
              <div class="flex justify-center w-full">
                <div
                  class="w-full h-[60vh] bg-slate-900 overflow-hidden flex items-center justify-center"
                >
                  <canvas ref="canvasRef" class="h-full w-full"></canvas>
                </div>
              </div>

              <!-- 工具列：icon 列 + 顏色/粗細 + 動作 -->
              <div class="w-full flex flex-col">
                <div
                  class="flex flex-wrap items-center justify-between gap-3 rounded-md bg-slate-50 px-3 py-2"
                >
                  <div class="flex items-center gap-2">
                    <button
                      type="button"
                      :class="toolButtonClass('text')"
                      @click="setTool('text')"
                      style="border: #000000"
                    >
                      <i class="pi pi-language" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      :class="toolButtonClass('brush')"
                      @click="setTool('brush')"
                      style="border: #000000"
                    >
                      <i class="pi pi-pencil" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      :class="toolButtonClass('circle')"
                      @click="setTool('circle')"
                      style="border: #000000"
                    >
                      <i class="pi pi-circle" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      :class="toolButtonClass('rect')"
                      @click="setTool('rect')"
                      style="border: #000000"
                    >
                      <i class="pi pi-stop" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      :class="toolButtonClass('eraser')"
                      @click="setTool('eraser')"
                      style="border: #000000"
                    >
                      <i class="pi pi-eraser" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      :class="toolButtonClass('move')"
                      @click="setTool('move')"
                      style="border: #000000"
                    >
                      <i class="pi pi-arrows-alt" style="font-size: 1.5rem"></i>
                    </button>
                  </div>

                  <div class="flex items-center gap-2">
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="h-7 w-7 rounded border border-slate-300"
                        :class="brushColor === '#cc4b4b' ? 'ring-2 ring-slate-900' : ''"
                        style="background-color: #cc4b4b"
                        @click="setBrushColor('#cc4b4b')"
                      ></button>
                      <button
                        type="button"
                        class="h-7 w-7 rounded border border-slate-300"
                        :class="brushColor === '#ffffff' ? 'ring-2 ring-slate-900' : ''"
                        style="background-color: #ffffff"
                        @click="setBrushColor('#ffffff')"
                      ></button>
                      <button
                        type="button"
                        class="h-7 w-7 rounded border border-slate-300"
                        :class="brushColor === '#000000' ? 'ring-2 ring-slate-900' : ''"
                        style="background-color: #000000"
                        @click="setBrushColor('#000000')"
                      ></button>
                    </div>
                  </div>

                  <div class="flex items-center gap-3">
                    <button
                      type="button"
                      class="tool-icon-btn"
                      :disabled="!canUndo"
                      @click="undo"
                    >
                      <i class="pi pi-replay" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      class="tool-icon-btn"
                      :disabled="!canRedo"
                      @click="redo"
                    >
                      <i class="pi pi-refresh" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      class="tool-icon-btn"
                      @click="deleteCurrentPhoto"
                    >
                      <i class="pi pi-trash" style="font-size: 1.5rem"></i>
                    </button>
                    <button
                      type="button"
                      class="tool-icon-btn disabled:opacity-50"
                      :disabled="isSaving"
                      @click="handleSaveAndClose"
                    >
                      <i class="pi pi-check" style="font-size: 1.5rem"></i>
                    </button>
                  </div>
                </div>

                <!-- 標籤列：印章文字（兩行格子 + 右側箭頭） -->
                <div class="flex w-full text-lg">
                  <!-- 左側：兩行印章格子 -->
                  <div
                    class="flex-1 rounded-l-md border border-slate-200 overflow-hidden"
                  >
                    <!-- 第一行 -->
                    <div
                      class="grid grid-cols-10 border-t border-gray-200 divide-x divide-gray-200"
                    >
                      <button type="button" class="stamp-cell" @click="addStamp('背膠')">
                        背膠
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('變色')">
                        變色
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('脫皮')">
                        脫皮
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('脫落')">
                        脫落
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('硬化')">
                        硬化
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('起泡')">
                        起泡
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('黃汗')">
                        黃汗
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('移染')">
                        移染
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('色差')">
                        色差
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('脫線')">
                        脫線
                      </button>
                    </div>

                    <!-- 第二行 -->
                    <div
                      class="grid grid-cols-10 border-t border-gray-200 divide-x divide-gray-200"
                    >
                      <button
                        type="button"
                        class="stamp-cell"
                        @click="addStamp('起毛球')"
                      >
                        起毛球
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('掉飾')">
                        掉飾
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('縮水')">
                        縮水
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('脫膠')">
                        脫膠
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('掉漆')">
                        掉漆
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('破損')">
                        破損
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('變形')">
                        變形
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('logo')">
                        logo
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('磨損')">
                        磨損
                      </button>
                      <button type="button" class="stamp-cell" @click="addStamp('風險')">
                        風險
                      </button>
                    </div>
                  </div>

                  <!-- 右側：+備註 與箭頭 -->
                  <div
                    class="flex flex-col w-24 overflow-hidden border-t border-b border-gray-200"
                  >
                    <!-- 上方按鈕：佔一半高度 -->
                    <div
                      type="button"
                      class="flex-1 flex items-center justify-center bg-white hover:bg-slate-50"
                      @click="addStamp('備註')"
                    >
                      + 備註
                    </div>

                    <!-- 下方一左一右按鈕：佔另一半高度 -->
                    <div class="flex flex-1 bg-white border-t border-gray-200">
                      <div
                        type="button"
                        class="flex-1 flex items-center justify-center hover:bg-slate-50"
                        @click="goPrev"
                      >
                        <i class="pi pi-chevron-left text-lg"></i>
                      </div>
                      <div
                        type="button"
                        class="flex-1 flex items-center justify-center border-l border-gray-200 hover:bg-slate-50"
                        @click="goNext"
                      >
                        <i class="pi pi-chevron-right text-lg"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ref,
  computed,
  watch,
  onUnmounted,
  nextTick,
  defineProps,
  defineEmits,
} from "vue";
// 注意：以下寫法適用的fabric版本是"^6.9.0"
import {
  Canvas as FabricCanvas,
  Image as FabricImage,
  PencilBrush,
  IText,
  Circle,
  Rect,
  util as FabricUtil, // 用來 enlivenObjects
} from "fabric";

const MAX_PHOTOS = 5;

const props = defineProps({
  photos: {
    type: Array,
    default: () => [],
  },
});

const emit = defineEmits(["update:photos", "save"]);

/* ----------------- photos 狀態同步 ----------------- */

const photos = ref([]);

// 把父層的照片資料複製一份到本元件自己可修改的 photos 裡，並且在父層資料改變時保持同步
watch(
  () => props.photos,
  (val) => {
    if (Array.isArray(val)) {
      photos.value = val.map((p) => ({ ...p }));
    } else {
      photos.value = [];
    }
  },
  { immediate: true, deep: true }
);

const syncPhotosToParent = () => {
  emit(
    "update:photos",
    photos.value.map((p) => ({ ...p }))
  );
};

/* ----------------- 彈窗 / 分頁狀態 ----------------- */

const isOpen = ref(false);
const activeTab = ref("capture");
const activeIndex = ref(0);

const openModal = () => {
  isOpen.value = true;
  activeTab.value = "capture";
  errorMessage.value = "";
};

const closeModal = () => {
  isOpen.value = false;
  stopCamera();
};

const openEditor = (index) => {
  activeIndex.value = index;
  isOpen.value = true;
  activeTab.value = "edit";
  errorMessage.value = "";
  stopCamera();
};

const switchToCapture = () => {
  activeTab.value = "capture";
  errorMessage.value = "";
};

const switchToEdit = () => {
  if (photos.value.length === 0) return;
  activeTab.value = "edit";
  errorMessage.value = "";
  stopCamera();
};

const canCaptureMore = computed(() => photos.value.length < MAX_PHOTOS);

const currentPhotoSrc = computed(() => {
  const photo = photos.value[activeIndex.value];
  if (!photo) return "";
  return photo.editedUrl || photo.originalUrl;
});

/* ----------------- 相機處理 ----------------- */

const videoRef = ref(null);
const mediaStream = ref(null);
const isCapturing = ref(false);
const errorMessage = ref("");

const captureHint = computed(() => {
  if (!canCaptureMore.value) {
    return "已拍滿 5 張照片，如需重新拍攝，請先刪除或覆蓋照片（之後可在編輯流程中設計）";
  }
  if (errorMessage.value) {
    return "相機啟動失敗，請確認瀏覽器權限與連線環境。";
  }
  return "請允許瀏覽器使用相機，將畫面對準後點擊下方白色快門按鈕拍照。";
});

const startCamera = async () => {
  try {
    errorMessage.value = "";
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      errorMessage.value = "此瀏覽器不支援相機功能，請改用較新版本或其他瀏覽器。";
      return;
    }

    stopCamera();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
      audio: false,
    });

    mediaStream.value = stream;

    if (videoRef.value) {
      videoRef.value.srcObject = stream;
    }
  } catch (err) {
    console.error("啟動相機失敗：", err);
    errorMessage.value = "無法啟動相機，可能是權限被拒絕或裝置沒有相機。";
  }
};

const stopCamera = () => {
  if (mediaStream.value) {
    mediaStream.value.getTracks().forEach((track) => track.stop());
    mediaStream.value = null;
  }
  if (videoRef.value) {
    videoRef.value.srcObject = null;
  }
};

const handleCapture = async () => {
  if (!canCaptureMore.value) return;
  if (!videoRef.value) return;
  if (isCapturing.value) return;

  try {
    isCapturing.value = true;

    const video = videoRef.value;
    const width = video.videoWidth || 1280;
    const height = video.videoHeight || 720;

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.92);

    const newPhoto = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      originalUrl: dataUrl,
      editedUrl: null,
    };

    photos.value.push(newPhoto);
    activeIndex.value = photos.value.length - 1;
    syncPhotosToParent();
  } catch (err) {
    console.error("拍照失敗：", err);
    errorMessage.value = "拍照過程發生錯誤，請稍後再試一次。";
  } finally {
    isCapturing.value = false;
  }
};

/* ----------------- 照片切換 ----------------- */

const goPrev = () => {
  if (photos.value.length <= 1) return;
  if (activeIndex.value === 0) return;
  activeIndex.value -= 1;
};

const goNext = () => {
  if (photos.value.length <= 1) return;
  if (activeIndex.value >= photos.value.length - 1) return;
  activeIndex.value += 1;
};

/* ----------------- Fabric 相關 ----------------- */

const canvasRef = ref(null);
let fabricCanvas = null;
let bgImage = null; // 背景圖片物件

// 工具狀態
const currentTool = ref("none");
const brushColor = ref("#cc4b4b");
const brushWidth = ref(6);
const isSaving = ref(false);

/* --------- Undo / Redo：只記錄「非背景物件」 --------- */

const historyStack = ref([]); // 每一筆是「非背景物件的 JSON 陣列」
const historyIndex = ref(-1);
let isRestoringHistory = false;

// 判斷是否為 overlay 物件（非背景）
const isOverlayObject = (obj) => {
  return obj && !obj.isBackground;
};

// 取得目前所有 overlay 物件的 snapshot
const getOverlaySnapshot = () => {
  if (!fabricCanvas) return [];
  return fabricCanvas
    .getObjects()
    .filter((obj) => isOverlayObject(obj))
    .map((obj) => obj.toObject());
};

// 寫入一筆新的歷史紀錄
const pushHistory = (label = "") => {
  if (!fabricCanvas || isRestoringHistory) return;

  const snapshot = getOverlaySnapshot();

  // 如果中間有 redo 的歷史，先砍掉未來分支
  if (historyIndex.value < historyStack.value.length - 1) {
    historyStack.value.splice(historyIndex.value + 1);
  }

  historyStack.value.push(snapshot);
  historyIndex.value = historyStack.value.length - 1;

  console.log(
    "💾 pushHistory",
    label,
    "index=",
    historyIndex.value,
    "stackLen=",
    historyStack.value.length,
    "overlayObjects=",
    snapshot.length
  );
};

// 從 snapshot 還原 overlay 物件
const restoreOverlaysFromSnapshot = async (snapshot) => {
  if (!fabricCanvas) return;

  isRestoringHistory = true;

  // 1) 清掉所有 overlay
  const allObjects = fabricCanvas.getObjects().slice();
  allObjects.forEach((obj) => {
    if (!obj.isBackground) {
      fabricCanvas.remove(obj);
    }
  });

  try {
    // 2) 用 Promise 形式 enliven
    const enlivenedObjects = await FabricUtil.enlivenObjects(snapshot || []);

    enlivenedObjects.forEach((obj) => {
      obj.selectable = true;
      obj.evented = true;
      fabricCanvas.add(obj);
    });

    fabricCanvas.renderAll();
  } catch (err) {
    console.error("restoreOverlaysFromSnapshot 失敗：", err);
  } finally {
    isRestoringHistory = false;
    applyBrushSettings();
  }
};

// 每張新照片載入時，重設歷史：第 0 筆為「只有背景、沒有 overlay」
const resetHistoryForNewPhoto = () => {
  historyStack.value = [];
  historyIndex.value = -1;
  pushHistory("init empty");
};

const canUndo = computed(() => historyIndex.value > 0);
const canRedo = computed(
  () => historyIndex.value >= 0 && historyIndex.value < historyStack.value.length - 1
);

const undo = () => {
  if (!fabricCanvas || !canUndo.value) return;
  console.log(
    "🟡 undo clicked historyIndex(before)=",
    historyIndex.value,
    "stackLen=",
    historyStack.value.length
  );
  historyIndex.value -= 1;
  restoreOverlaysFromSnapshot(historyStack.value[historyIndex.value]);
};

const redo = () => {
  if (!fabricCanvas || !canRedo.value) return;
  console.log(
    "🟢 redo clicked historyIndex(before)=",
    historyIndex.value,
    "stackLen=",
    historyStack.value.length
  );
  historyIndex.value += 1;
  restoreOverlaysFromSnapshot(historyStack.value[historyIndex.value]);
};

/* ----------------- Canvas 事件：把「一個動作」寫進歷史 ----------------- */

// object:added / modified / removed 負責：文字、圈圈、方框、印章、移動、縮放、刪除
const handleObjectAdded = (e) => {
  if (!fabricCanvas || isRestoringHistory) return;
  const obj = e.target;
  if (!isOverlayObject(obj)) return;
  // 避免畫筆同時由 path:created + object:added 造成兩次紀錄
  if (obj.type === "path") return;
  pushHistory("object:added");
};

const handleObjectModified = (e) => {
  if (!fabricCanvas || isRestoringHistory) return;
  const obj = e.target;
  if (!isOverlayObject(obj)) return;
  pushHistory("object:modified");
};

const handleObjectRemoved = (e) => {
  if (!fabricCanvas || isRestoringHistory) return;
  const obj = e.target;
  if (!isOverlayObject(obj)) return;
  pushHistory("object:removed");
};

// 畫筆專用：一條線是一個動作
const handlePathCreated = (e) => {
  if (!fabricCanvas || isRestoringHistory) return;
  const path = e.path;
  if (!path) return;
  // path 這時候已經加到 canvas 裡了，只要記錄 history 即可
  pushHistory("path:created");
};

/* ----------------- 初始化 / 背景載入 ----------------- */

const initCanvasIfNeeded = async () => {
  await nextTick();
  if (!canvasRef.value) return;

  if (!fabricCanvas) {
    const rect = canvasRef.value.getBoundingClientRect();

    fabricCanvas = new FabricCanvas(canvasRef.value, {
      width: rect.width || canvasRef.value.offsetWidth || 800,
      height: rect.height || canvasRef.value.offsetHeight || 400,
      selection: true,
      isDrawingMode: false,
    });

    fabricCanvas.on("mouse:down", handleCanvasMouseDown);
    fabricCanvas.on("object:added", handleObjectAdded);
    fabricCanvas.on("object:modified", handleObjectModified);
    fabricCanvas.on("object:removed", handleObjectRemoved);
    fabricCanvas.on("path:created", handlePathCreated);

    applyBrushSettings();
  }
};

const loadBackgroundImage = (src) => {
  if (!fabricCanvas || !src) return;

  console.log("🎨 loadBackgroundImage", src.slice(0, 50) + "...");
  const imgEl = new Image();

  imgEl.onload = () => {
    const canvasW = fabricCanvas.getWidth();
    const canvasH = fabricCanvas.getHeight();
    const naturalW = imgEl.naturalWidth || imgEl.width;
    const naturalH = imgEl.naturalHeight || imgEl.height;

    const scale = Math.min(canvasW / naturalW, canvasH / naturalH);

    const img = new FabricImage(imgEl, {
      left: canvasW / 2,
      top: canvasH / 2,
      originX: "center",
      originY: "center",
      selectable: false,
      evented: false,
      isBackground: true,
    });

    img.scaleX = scale;
    img.scaleY = scale;

    // 只保留背景
    isRestoringHistory = true;
    fabricCanvas.clear();
    bgImage = img;
    fabricCanvas.add(bgImage);
    fabricCanvas.renderAll();
    isRestoringHistory = false;

    // 這裡重設 undo/redo 歷史（第 0 筆是「只有背景」）
    resetHistoryForNewPhoto();
  };

  imgEl.onerror = (err) => {
    console.error("載入背景圖片失敗：", err);
  };

  imgEl.src = src;
};

/* ----------------- 畫筆 / 工具設定 ----------------- */

const applyBrushSettings = () => {
  if (!fabricCanvas) return;

  fabricCanvas.isDrawingMode = currentTool.value === "brush";

  if (fabricCanvas.isDrawingMode) {
    if (!fabricCanvas.freeDrawingBrush) {
      fabricCanvas.freeDrawingBrush = new PencilBrush(fabricCanvas);
    }
    fabricCanvas.freeDrawingBrush.color = brushColor.value;
    fabricCanvas.freeDrawingBrush.width = brushWidth.value;
  }
};

// 刪除目前這一張照片（含其所有標註）
const deleteCurrentPhoto = () => {
  // 沒照片或 index 不合法就不做事
  if (!photos.value.length || activeIndex.value < 0) return;

  const targetIndex = activeIndex.value;

  // 1) 從本元件的 photos 陣列移除這張
  photos.value.splice(targetIndex, 1);

  // 2) 通知父層同步（v-model:photos）
  syncPhotosToParent();

  // 3) 如果刪到一張都不剩
  if (photos.value.length === 0) {
    // 清掉畫布 & undo/redo 狀態
    destroyCanvas();
    lastLoadedSrc = "";
    // 回到「拍照」分頁，讓使用者可以再拍新的
    activeTab.value = "capture";
    return;
  }

  // 4) 還有照片：調整 activeIndex
  //    儘量留在「原本那一格」，若刪的是最後一張就往前一格
  if (targetIndex >= photos.value.length) {
    activeIndex.value = photos.value.length - 1;
  } else {
    activeIndex.value = targetIndex;
  }

  // 不用手動載入背景：
  // activeIndex 改變 -> currentPhotoSrc 改變 -> watcher
  // 會自動呼叫 loadBackgroundImage() + resetHistoryForNewPhoto()
};

const setTool = (tool) => {
  currentTool.value = tool;
  applyBrushSettings();
};

const setBrushColor = (color) => {
  brushColor.value = color;
  applyBrushSettings();
};

/* ----------------- 建立物件 ----------------- */

const addTextAt = (x, y) => {
  if (!fabricCanvas) return;

  const text = new IText("文字", {
    left: x,
    top: y,
    originX: "center",
    originY: "center",
    fill: brushColor.value,
    fontSize: 28,
    fontWeight: "bold",
    editable: true,
  });

  fabricCanvas.add(text);
  fabricCanvas.setActiveObject(text);
  fabricCanvas.requestRenderAll();
  text.enterEditing();
  text.selectAll();
  // 不在這裡 pushHistory，交給 object:added 事件處理
};

const addCircleAt = (x, y) => {
  if (!fabricCanvas) return;

  const circle = new Circle({
    left: x,
    top: y,
    originX: "center",
    originY: "center",
    radius: 40,
    stroke: brushColor.value,
    strokeWidth: brushWidth.value,
    fill: "transparent",
  });

  fabricCanvas.add(circle);
  fabricCanvas.setActiveObject(circle);
  fabricCanvas.requestRenderAll();
  // history 交給 object:added
};

const addRectAt = (x, y) => {
  if (!fabricCanvas) return;

  const rect = new Rect({
    left: x - 60,
    top: y - 40,
    width: 120,
    height: 80,
    stroke: brushColor.value,
    strokeWidth: brushWidth.value,
    fill: "transparent",
  });

  fabricCanvas.add(rect);
  fabricCanvas.setActiveObject(rect);
  fabricCanvas.requestRenderAll();
  // history 交給 object:added
};

const addStamp = (label) => {
  if (!fabricCanvas) return;

  const canvasW = fabricCanvas.getWidth();
  const canvasH = fabricCanvas.getHeight();

  const text = new IText(label, {
    left: canvasW / 2,
    top: canvasH / 2,
    originX: "center",
    originY: "center",
    fill: brushColor.value,
    fontSize: 24,
    fontWeight: 600,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 6,
  });

  fabricCanvas.add(text);
  fabricCanvas.setActiveObject(text);
  fabricCanvas.requestRenderAll();
  // history 交給 object:added
};

/* ----------------- 畫布點擊 ----------------- */

const handleCanvasMouseDown = (opt) => {
  if (!fabricCanvas) return;

  // 空白狀態，不做任何事
  if (currentTool.value === "none") return;

  const pointer = fabricCanvas.getPointer(opt.e);
  if (!pointer) return;

  if (currentTool.value === "text") {
    if (opt.target) return;
    addTextAt(pointer.x, pointer.y);
    currentTool.value = "none";
    applyBrushSettings();
  } else if (currentTool.value === "circle") {
    if (opt.target) return;
    addCircleAt(pointer.x, pointer.y);
    currentTool.value = "none";
    applyBrushSettings();
  } else if (currentTool.value === "rect") {
    if (opt.target) return;
    addRectAt(pointer.x, pointer.y);
    currentTool.value = "none";
    applyBrushSettings();
  } else if (currentTool.value === "eraser") {
    if (opt.target && !opt.target.isBackground) {
      fabricCanvas.remove(opt.target);
      fabricCanvas.requestRenderAll();
      // history 交給 object:removed
    }
  }
  // move 模式交給 fabric 自己處理，不在這裡做事
};

/* ----------------- 儲存 ----------------- */

const handleSaveAndClose = async () => {
  if (!fabricCanvas || !photos.value[activeIndex.value]) {
    closeModal();
    return;
  }

  try {
    isSaving.value = true;

    const dataUrl = fabricCanvas.toDataURL({
      format: "png",
      quality: 0.92,
    });

    photos.value[activeIndex.value].editedUrl = dataUrl;
    syncPhotosToParent();
    emit(
      "save",
      photos.value.map((p) => ({ ...p }))
    );

    closeModal();
  } catch (err) {
    console.error("儲存編輯結果失敗：", err);
  } finally {
    isSaving.value = false;
  }
};

/* ----------------- 銷毀 ----------------- */

const destroyCanvas = () => {
  if (fabricCanvas) {
    fabricCanvas.off("mouse:down", handleCanvasMouseDown);
    fabricCanvas.off("object:added", handleObjectAdded);
    fabricCanvas.off("object:modified", handleObjectModified);
    fabricCanvas.off("object:removed", handleObjectRemoved);
    fabricCanvas.off("path:created", handlePathCreated);
    fabricCanvas.dispose();
    fabricCanvas = null;
  }
  bgImage = null;
  historyStack.value = [];
  historyIndex.value = -1;
  isRestoringHistory = false;
};

const toolButtonClass = (tool) => {
  const base =
    "tool-icon-btn border text-lg h-8 w-8 flex items-center justify-center rounded-md";
  if (currentTool.value === tool) {
    return `${base} bg-slate-900 text-white border-slate-900`;
  }
  return `${base} bg-white text-slate-700 border-slate-300 hover:bg-slate-50`;
};

/* ----------------- watch 邏輯 ----------------- */

watch(
  () => ({ open: isOpen.value, tab: activeTab.value }),
  (state) => {
    if (state.open && state.tab === "capture") {
      startCamera();
    } else {
      stopCamera();
    }
  }
);
/**
 * 從「編輯 → 拍照 → 編輯」來回切 tab 之後，原本編輯中的東西不見，只剩一片畫布
 * 記錄目前畫布裡的背景 src，用來判斷是否需要重新載入
 * 功能：如果只是同一張照片在 tab 間切換，就不要重跑 loadBackgroundImage
 */
let lastLoadedSrc = "";

watch(
  () => ({
    open: isOpen.value,
    tab: activeTab.value,
    index: activeIndex.value,
    src: currentPhotoSrc.value,
  }),
  async (state) => {
    if (!state.open) {
      destroyCanvas();
      lastLoadedSrc = "";
      return;
    }

    // 只有在「編輯頁」而且有 src 時才處理
    if (state.tab === "edit" && state.src) {
      await initCanvasIfNeeded();

      // 如果這張照片跟上一次載入的一樣，就不要重新載背景
      // 避免把原本畫好的東西清空
      if (state.src === lastLoadedSrc) {
        return;
      }

      // 換了一張照片（或第一次進來），才真正載入
      lastLoadedSrc = state.src;
      loadBackgroundImage(state.src);
    }
  }
);

watch([brushColor, brushWidth], () => {
  applyBrushSettings();
});

onUnmounted(() => {
  stopCamera();
  destroyCanvas();
});
</script>

<style scoped>
.tool-icon-btn {
  margin: 4px;
}

.stamp-cell {
  margin: 0;
  padding-top: 4px;
  padding-bottom: 4px;
}
</style>
