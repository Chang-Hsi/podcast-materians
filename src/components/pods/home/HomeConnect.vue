<!-- src/components/pods/home/HomeConnect.vue -->
<template>
  <section :style="bgStyle" class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-14">
      <div class="flex flex-col lg:flex-row items-stretch gap-4">
        <div
          class="flex-1 min-w-0 rounded-2xl backdrop-blur px-6 py-6 flex flex-col max-h-[420px]"
        >
          <h2 class="text-3xl font-extrabold text-slate-900">Get in Touch</h2>
          <p class="mt-2 text-slate-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus,
            luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>

          <div class="mt-6 space-y-6">
            <div class="flex items-center gap-3">
              <i class="pi pi-map-marker text-xl text-slate-900"></i>
              <div>
                <div class="font-semibold text-slate-900">Studio Address</div>
                <div class="text-sm text-slate-600">
                  Creative District Ahmad Yani No. 456 Medan, North Sumatera
                </div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-phone text-xl text-slate-900"></i>
              <div>
                <div class="font-semibold text-slate-900">Call Us</div>
                <div class="text-sm text-slate-600">+809-3374-4676<br />555-274-4564</div>
              </div>
            </div>

            <div class="flex items-center gap-3">
              <i class="pi pi-envelope text-xl text-slate-900"></i>
              <div>
                <div class="font-semibold text-slate-900">Mail Us</div>
                <div class="text-sm text-slate-600">hola@dominantsite.com</div>
              </div>
            </div>
          </div>
        </div>

        <div
          class="flex-1 min-w-0 rounded-2xl overflow-hidden backdrop-blur max-h-[420px] flex"
        >
          <img :src="centerImg" alt="contact" class="w-full h-full object-cover" />
        </div>

        <div
          class="flex-1 min-w-0 rounded-2xl backdrop-blur px-6 py-6 flex flex-col max-h-[420px]"
        >
          <h2 class="text-3xl font-extrabold text-slate-900">Get in Touch</h2>

          <div class="mt-4 flex flex-wrap gap-3">
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.name"
                placeholder="Name"
                class="w-full h-11! px-4!"
              />
            </div>
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.email"
                placeholder="Email"
                class="w-full h-11! px-4!"
              />
            </div>
          </div>

          <div class="mt-3 flex flex-wrap gap-3">
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.phone"
                placeholder="Phone Number"
                class="w-full h-11! px-4!"
              />
            </div>
            <div class="flex-1 basis-full lg:basis-[calc(50%-0.75rem)] min-w-40">
              <InputText
                v-model="form.subject"
                placeholder="Subject"
                class="w-full h-11! px-4!"
              />
            </div>
          </div>

          <div class="mt-3">
            <Textarea
              v-model="form.message"
              rows="6"
              placeholder="Write Your Message"
              class="w-full"
            />
          </div>

          <div class="mt-auto pt-4">
            <Button
              label="Send Message"
              severity="primary"
              rounded
              class="px-5!"
              @click="submit"
            />
          </div>
        </div>
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

// 你可以換成自己的圖片
const centerImg =
  "https://i.pinimg.com/736x/6c/d8/da/6cd8da22abea36898c6dbdb7b1f44092.jpg";

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
</script>

<style scoped></style>
