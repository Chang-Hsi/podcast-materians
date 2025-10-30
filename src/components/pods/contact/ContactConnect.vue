<!-- src/components/pods/contact/ContactConnect.vue -->
<template>
  <section :style="bgStyle" class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-14">
      <div class="flex flex-col lg:flex-row items-stretch gap-4">
        <div
          class="flex-1 min-w-0 rounded-2xl backdrop-blur px-6 py-6 flex flex-col lg:min-h-[420px]"
        >
          <h2 class="text-3xl font-extrabold text-slate-900">{{ headingText }}</h2>
          <p class="mt-2 text-slate-600">{{ introText }}</p>

          <div class="mt-6 space-y-6">
            <div class="flex items-center gap-3">
              <i class="pi pi-map-marker text-xl text-slate-900"></i>
              <div>
                <div class="font-semibold text-slate-900">{{ addressTitle }}</div>
                <div class="text-sm text-slate-600">{{ addressLine }}</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-phone text-xl text-slate-900"></i>
              <div>
                <div class="font-semibold text-slate-900">{{ phoneTitle }}</div>
                <div class="text-sm text-slate-600">
                  {{ phonePrimary }}<br />{{ phoneSecondary }}
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-envelope text-xl text-slate-900"></i>
              <div>
                <div class="font-semibold text-slate-900">{{ mailTitle }}</div>
                <div class="text-sm text-slate-600">{{ mailAddress }}</div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex-1 min-w-0 rounded-2xl overflow-hidden backdrop-blur lg:min-h-[420px]"
        >
          <div class="relative w-full h-56 sm:h-72 lg:h-full">
            <img
              :src="centerImg"
              :alt="centerImgAlt"
              class="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div
          class="flex-1 min-w-0 rounded-2xl backdrop-blur px-6 py-6 flex flex-col lg:min-h-[420px]"
        >
          <h2 class="text-3xl font-extrabold text-slate-900">{{ headingText }}</h2>

          <div class="mt-4 flex flex-wrap gap-3">
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.name"
                :placeholder="phName"
                class="w-full h-11! px-4!"
              />
            </div>
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.email"
                :placeholder="phEmail"
                class="w-full h-11! px-4!"
              />
            </div>
          </div>

          <div class="mt-3 flex flex-wrap gap-3">
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.phone"
                :placeholder="phPhone"
                class="w-full h-11! px-4!"
              />
            </div>
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.subject"
                :placeholder="phSubject"
                class="w-full h-11! px-4!"
              />
            </div>
          </div>

          <div class="mt-3">
            <Textarea
              v-model="form.message"
              rows="6"
              :placeholder="phMessage"
              class="w-full"
            />
          </div>

          <div class="mt-auto pt-4">
            <Button
              :label="btnSendLabel"
              severity="primary"
              rounded
              class="px-5!"
              @click="submit"
            />
          </div>
        </div>
      </div>

      <div class="relative mt-10">
        <iframe
          :src="mapSrc"
          class="w-full h-64 md:h-80 lg:h-96 border-0"
          style="display: block"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          allowfullscreen
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script setup>
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import { reactive, computed } from "vue";
import texture from "@/assets/imgs/texture.jpg";

const headingText = "Get in Touch";
const introText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.";

const addressTitle = "Studio Address";
const addressLine = "Creative District Ahmad Yani No. 456 Medan, North Sumatera";

const phoneTitle = "Call Us";
const phonePrimary = "+809-3374-4676";
const phoneSecondary = "555-274-4564";

const mailTitle = "Mail Us";
const mailAddress = "hola@dominantsite.com";

const centerImg =
  "https://i.pinimg.com/736x/6c/d8/da/6cd8da22abea36898c6dbdb7b1f44092.jpg";
const centerImgAlt = "contact";

const phName = "Name";
const phEmail = "Email";
const phPhone = "Phone Number";
const phSubject = "Subject";
const phMessage = "Write Your Message";
const btnSendLabel = "Send Message";

const form = reactive({
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

function submit() {
  console.log("送出", { ...form });
}

const bgStyle = computed(() => ({
  backgroundImage: `url(${texture})`,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
}));

const mapAddress = "320桃園市中壢區中山路138號6樓";
const mapSrc = computed(() => {
  const q = encodeURIComponent(mapAddress);
  return `https://www.google.com/maps?q=${q}&output=embed`;
});
</script>

<style scoped></style>
