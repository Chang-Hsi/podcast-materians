// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '@/views/Home.vue'
import About from '@/views/About.vue'
import Podcasts from '@/views/Podcasts.vue'
import PodcastDetail from '@/views/PodcastDetail.vue'
import Programs from '@/views/Programs.vue'
import Contact from '@/views/Contact.vue'
import Blog from '@/views/Blog.vue'
import Gallery from '@/views/Gallery.vue'
import OurTeam from '@/views/OurTeam.vue'
import Faq from '@/views/Faq.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: Home },
    { path: '/about', name: 'about', component: About },
    { path: '/podcasts', name: 'podcasts', component: Podcasts },
    { path: '/podcasts/:id', name: 'podcast-detail', component: PodcastDetail },
    { path: '/programs', name: 'programs', component: Programs },
    { path: '/blog', name: 'blog', component: Blog },
    { path: '/gallery', name: 'gallery', component: Gallery },
    { path: '/our-team', name: 'our-team', component: OurTeam },
    { path: '/faq', name: 'faq', component: Faq },
    { path: '/contact', name: 'contact', component: Contact },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
