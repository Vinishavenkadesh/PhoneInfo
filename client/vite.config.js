import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import multipage from "vite-plugin-multipage";
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    solid(),
    multipage({
      // This is an optional object, defaults as follows:
      mimeCheck: true /* mimeCheck: Set the MIME type on each request using
                         `mime-types.lookup()` */,
      open: "/" /* open: Path to load when starting the server.
                   May be left empty and not open anything. */,
      pageDir: "pages" /* pageDir: Path to the directory with the pages. */,
      purgeDir: "pages" /* purgeDir: Path to be removed after building.
                           May be left empty to remove nothing. */,
      removePageDirs: true /* removePageDirs: Change the final result from
                               "./page/index.html" to "./page.html". */,
      rootPage: "index.html" /* rootPage: The entry point into each page. */,
    }),
  ],

  resolve: {
    alias: {
      "/": resolve(__dirname, "./"),
    },
  },

  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});