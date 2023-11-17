<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
};
</script>
<style>
#app {
  background-color: #f1f5f7;
  opacity: 1;
  background-image: radial-gradient(#96d3d8 0.5px, transparent 0.5px),
    radial-gradient(#96d3d8 0.5px, #f1f5f7 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}
</style>
