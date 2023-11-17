<template>
  <div>
    <scrolltop></scrolltop>
    <div class="page pb-4">
      <h1 class="text-center font-weight-bold">
        All Companies
        <b-button variant="primary" @click="pushToAddCompany" class="p-1  pt-2"
          ><i class="fas fa-plus h4 text-white m-0"></i>
        </b-button>
      </h1>
      <div v-if="companies.length === 0 && !isLoading">
        Herhangi bir veri bulunamadı.
      </div>
      <div class="companies row">
        <div class="company-item-container">
          <companyItem
            class="col-xl-3 col-lg-4 col-md-4 col-6"
            v-for="(company, index) in companies"
            :key="index"
            :company="company"
          ></companyItem>
          <div
            v-if="count === companies.length && count !== 0"
            class="d-flex align-items-center justify-content-center col-xl-3 col-lg-4 col-md-4 col-6"
          >
            <b-button variant="primary" @click="pushToAddCompany" class="p-3"
              ><i class="fas fa-plus h1 text-white m-0"></i> <br />
              Add New Company</b-button
            >
          </div>
        </div>
      </div>
      <div v-if="isLoading" class="d-flex justify-content-center">
        <loading class="mt-4 text-center"> </loading>
      </div>
      <div class="text-center mt-4">
        <div>{{ companies.length }} / {{ count }}</div>
        <p v-if="count === companies.length && count !== 0">
          Tüm veriler yüklendi...
        </p>
        <b-button
          class="mt-4"
          variant="success"
          v-if="companies.length !== count"
          @click="loadMore()"
          >Load More</b-button
        >
      </div>
    </div>
  </div>

  <!-- end row -->
</template>

<script>
import CompanyItem from "@/components/companyItem/index.vue";
import { REQUEST_TO_GET_COMPANIES } from "../../../services/Requests/Companies";

import loading from "../../../components/loading.vue";
import scrolltop from "../../../components/scrolltop.vue";

export default {
  components: {
    CompanyItem,
    scrolltop,
    loading,
  },
  data() {
    return {
      companies: [],
      count: 0,
      isLoading: true,
      isMobile: false,
      companyLimit: 16,
      page: 1,
    };
  },
  methods: {
    async GET_COMPANIES() {
      this.isLoading = true;
      const options = {
        query: {
          page: this.page,
          limit: this.companyLimit,
        },
      };
      const response = await REQUEST_TO_GET_COMPANIES(options);
      if (response.message === "OK") {
        this.companies = [...this.companies, ...response.data.items];
        this.count = response.data.count;
      }
      this.isLoading = false;
    },

    detectDevice() {
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
    handleScroll() {
      if (this.count === this.companies.length) return;
      // Logic to check if user has reached the bottom of the page
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      const bottomPosition =
        document.documentElement.offsetHeight - window.innerHeight;
      if (scrollPosition >= bottomPosition - 1 && !this.isLoading) {
        // Call your function here
        this.loadMore();
      }
    },
    loadMore() {
      this.page += 1;
      this.GET_COMPANIES();
    },
    pushToAddCompany() {
      this.$router.push("/companies/add");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    this.detectDevice();
    this.GET_COMPANIES();
  },
  beforeDestroy() {
    // Remove the event listener when the component is destroyed
    window.removeEventListener("scroll", this.handleScroll);
  },
};
</script>
<style scoped>
.companies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.page {
  margin: 2% 3% 3% 3%;
}
.company-item-container {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
h1 {
  font-family: Nunito, sans-serif;
}
</style>
