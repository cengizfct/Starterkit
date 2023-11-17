<template>
  <div>
    <div id="layout-wrapper">
      <!-- That sidebar is actually all the view, wrong name, will be fixed -->
      <side-bar :companies="companies" />
    </div>
  </div>
</template>

<script>

import { REQUEST_TO_GET_COMPANIES } from "../../services/Requests/Companies";
import SideBar from "./side-bar.vue";


export default {
  components: { SideBar },
  data() {
    return {
      isMenuCondensed: false,
      isLoading: true,
      isSidebarActive: false,
      companies: []
    };
  },
 
  methods: {
    async GET_COMPANIES() {
      this.isLoading = true;
      const options = {
        query: {
          page: 1,
          limit: 12,
        },
      };
      const response = await REQUEST_TO_GET_COMPANIES(options);
      if (response.message === "OK") {
        this.companies = response.data.items;
        console.log(this.companies);
        this.count = response.data.count;
      }
      this.isLoading = false;
    },
  },
  mounted() {
    this.GET_COMPANIES();
    
  },
};
</script>
