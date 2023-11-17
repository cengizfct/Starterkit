<template>
  <div style="height: 91vh;">
    <transition
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      name="fade"
      mode="out-in"
    >
 
    </transition>
    <div v-if="isLoading" class="d-flex justify-content-center">
        <loading class="mt-4 text-center">
        </loading>
      </div>
    <div v-else-if="companies.length === 0">Herhangi bir veri bulunamadı.</div>
    <div v-else class="companies row">
      <!-- if it is a mobile device companies are scrollable by touch but not replaceable -->
      <div v-if="isMobile" class="scrollbox">
        <companyItem
          class="col-xl-3 col-lg-4 col-md-4 col-6"
          v-for="(company, index) in companies"
          :key="index"
          :company="company"
        >
        </companyItem>
      </div>
  
      <!-- if it is a desktop device companies are not scrollable by dragging but they are replaceable-->
      <draggable
        v-if="!isMobile"
        class="scrollbox"
        v-model="companies"
        :options="{ draggable: '.company-item' }"
      >
        <company-item
          class="col-xl-3 col-lg-4 col-md-4 col-6 company-item"
          v-for="(company, index) in companies"
          :key="index"
          :company="company"
         
        >
        </company-item>
      </draggable>
    </div>
  </div>

  <!-- end row -->
</template>
<script>
import CompanyItem from "@/components/companyItem/index.vue";
import loading from "../../../components/loading.vue";

import draggable from "vuedraggable";
import { REQUEST_TO_GET_COMPANIES } from "../../../services/Requests/Companies";
export default {
  components: {
    CompanyItem,
    draggable,
    loading
  },
  data() {
    return {
      companies: {},
      count: 0,
      isLoading: true,
      showDeleteAlert: false,
      sureToRemove: false,
      selectedcompany: null,
      isMobile: false,
    };
  },
  methods: {
    async GET_COMPANIES() {
      this.isLoading = true;
      const options = {
        query: {
          page: 1,
          limit: 10,
        },
      };
      const response = await REQUEST_TO_GET_COMPANIES(options);
      if (response.message === "OK") {
        this.companies = response.data.items;
        this.count = response.data.count;
      }
      this.isLoading = false;
    },
 
    detectDevice() {
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
  },
  mounted() {
    this.detectDevice();
    this.GET_COMPANIES();
  },
  computed: {},
};
</script>


<style scoped>
.companies {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  
 
}

.deleteAlert {
  position: fixed;
  z-index: 4;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2%;
  padding-top: 4%;
}
.deleteContainer {
  position: fixed;
  z-index: 10;
  top: 0; bottom: 0; left: -10%; right: 0;
  background: rgba(0, 0, 0, 0.318);
}
.deleteBtn {
  position: absolute;
  left: 3%;
  right: 3%;
  bottom: 4%;
}
.closeBtn {
  position: absolute;
  right: 1%;
  top: 2%;
  border: none;
  appearance: none;
}
.title {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
  color: #4cbd8c !important;
}
.text {
  font-size: larger;
  padding-bottom: 15%;
}
.fadeIn {
  opacity: 1;
  animation: fadeIn 0.2s;
}
.fadeOut {
  opacity: 0;
  animation: fadeIn 0.2s reverse;
}
.scrollbox {
  display: flex;
  overflow-x: auto;
  width: 100%;
  scrollbar-width: thin;
  margin-bottom: 10px;
}

.scrollbox::-webkit-scrollbar {
  height: 10px;
}

.scrollbox::-webkit-scrollbar-track {
  background-color: transparent;
}

.scrollbox::-webkit-scrollbar-thumb {
  background-color: #f0800070;
  border-radius: 2px;
}

.scrollbox::-webkit-scrollbar-thumb:hover {
  background-color: #f08000aa;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
