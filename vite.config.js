import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        send: resolve(__dirname, "pages/send.html"),
        receive: resolve(__dirname, "pages/receive.html"),
        withdraw: resolve(__dirname, "pages/withdraw.html"),
        more: resolve(__dirname, "pages/more.html"),
        register: resolve(__dirname, "pages/register.html"),
        home: resolve(__dirname, "pages/home.html"),
      },
    },
  },
});
