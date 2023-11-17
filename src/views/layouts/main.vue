<script>
import { layoutComputed } from "@/state/helpers";
import Vertical from "./vertical";

export default {
  components: { Vertical, },
  data() {
    return {};
  },
  computed: {
    ...layoutComputed,
  }
};
</script>

<template>
  <div>
    <vertical v-if="layoutType === 'vertical'" :layout="layoutType">
      <router-view></router-view>
    </vertical>

    
  </div>
</template>
