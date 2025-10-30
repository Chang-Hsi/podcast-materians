<template>
  <div>
    <HomeBanner />
    <HomeTrends />
    <HomeFrame />
    <HomeCards />
    <HomeMessage />
    <HomeComment />
    <HomeCardList />
    <HomeConnect />
  </div>
</template>

<script setup>
import HomeBanner from "@/components/pods/home/HomeBanner.vue";
import HomeCardList from "@/components/pods/home/HomeCardList.vue";
import HomeCards from "@/components/pods/home/HomeCards.vue";
import HomeComment from "@/components/pods/home/HomeComment.vue";
import HomeConnect from "@/components/pods/home/HomeConnect.vue";
import HomeFrame from "@/components/pods/home/HomeFrame.vue";
import HomeMessage from "@/components/pods/home/HomeMessage.vue";
import HomeTrends from "@/components/pods/home/HomeTrends.vue";
</script>
