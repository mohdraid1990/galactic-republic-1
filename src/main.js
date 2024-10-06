import { createApp } from "vue"; // تأكد من استخدام createApp
import App from "./App.vue";
import router from "./router"; // استيراد router

createApp(App)
  .use(router) // تأكد من استخدام router هنا
  .mount("#app");
