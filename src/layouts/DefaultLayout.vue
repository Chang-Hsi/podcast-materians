<template>
  <div class="min-h-svh flex flex-col">
    <!-- Header -->
    <DefaultHeader />

    <!-- 內容區 -->
    <main id="main" accesskey="C" class="flex-1 min-h-[50vh]">
      <!-- 中間主內容：由子路由渲染 -->
      <RouterView />
    </main>

    <!-- Footer -->
    <DefaultFooter id="footer" accesskey="S" />
  </div>
</template>
<script setup>
import DefaultHeader from "./components/DefaultHeader.vue";
import DefaultFooter from "./components/DefaultFooter.vue";
</script>
