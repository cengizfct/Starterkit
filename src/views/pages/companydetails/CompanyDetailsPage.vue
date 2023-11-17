<template>
  <div>
    <ScrollTop></ScrollTop>
    
   

    <div v-if="isLoading" class="d-flex justify-content-center">
        <loading class="mt-4 text-center">
        </loading>
      </div>
    <div v-else class="page">
      <company-details :company="company"></company-details>
    </div>
  </div>
</template>
<script>

import ScrollTop from "../../../components/scrolltop.vue";
import { REQUEST_TO_GET_SPECIFIC_COMPANY } from "../../../services/Requests/Companies";
import CompanyDetails from '../../../components/companyItem/company-details/company-details.vue';
import loading from "../../../components/loading.vue";

export default {
  components: {
    
    CompanyDetails,
    ScrollTop,
    loading
  },
  data() {
    return {
      company: null,
      isLoading: true,
    };
  },
  watch:{
    $route: {
      deep: true,
      handler(){
        this.GET_SPECIFIC_COMPANY()
      },
    }
  },
  methods: {
    async GET_SPECIFIC_COMPANY() {
      this.isLoading = true;
      const options = {
        params: {
          id: this.$route.params.id
        },
      };
      const response = await REQUEST_TO_GET_SPECIFIC_COMPANY(options);
      if (response.message === "OK") {
        if(response.data === null) return this.$router.push('/not-found')
        this.company = response.data;
      }     
      this.isLoading = false;
    },
  
  },
  beforeMount() {
    this.GET_SPECIFIC_COMPANY()  
  },
};
</script>
<style scoped>

/* Mobil görünüm */
@media screen and (max-width: 500px) {
  .page {
    margin-top: 5% !important;
  }
}
/* */
.page {
  margin-left: 0%;
  margin-right: 0%;
}
</style>
