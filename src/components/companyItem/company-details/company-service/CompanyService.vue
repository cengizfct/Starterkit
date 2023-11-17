<template>
  <div v-if="!isLoading" class="container p-0 pt-2">
    <div v-if="!service.id" class="d-flex justify-content-center align-items-center" style="height: 80vh;">
      <div class="card col-12 col-md-5 ">
        <p class="mb-0 m-3  d-inline-block h3 ">
          <span class="border-bottom">
            <i class="fas fa-server mr-2 text-muted"></i>Service
          </span>
        </p>
        <div
          class="card-body d-flex flex-column align-items-center justify-content-center"
        >
          <img src="../../../../assets/images/service1.png" alt="" />
          <b-button
            @click="setServiceForm('POST')"
            block
            variant="primary "
            class="mt-3"
          >
            <i class="fas fa-plus"></i> Add New Service</b-button
          >
        </div>
      </div>
    </div>
    <div v-else class="card">
      <div class="card-body">
        <b-button
          class="p-1 ml-2 text-primary"
          variant="transparent"
          @click="setServiceForm('PUT')"
          :disabled="serverStatus === 1"
          style="position: absolute; top: 5%; right: 2%; z-index: 1;"
        >
          <i class="fas fa-pen p-0 "></i>
        </b-button>

        <p class="mb-0 m-0   h3  border-bottom d-inline-block">
          <i class="fas fa-concierge-bell mr-2 text-muted"></i> Service
        </p>
        <div class="mt-2">
          <p>
            <span class="font-weight-bold ">Service Name: </span>
            <span class="text-secondary">{{ service.serviceName }} </span>
          </p>
          <p>
            <span class="font-weight-bold ">Port:</span>
            <span class="text-secondary"> {{ service.port }} </span>
          </p>
          <p>
            <span class="font-weight-bold ">Database Name: </span>
            <span class="text-secondary">{{ service.databaseName }} </span>
          </p>
        </div>
        <span
        v-if="serverStatus === 1"
          class="p-1 ml-2 text-info"
          v-b-tooltip.left="{
            variant: 'info',
            title: 'You must start the server before you update or delete it',
          }"
          style="position: absolute; bottom: 42.5%; right: 2%; z-index: 1;"
        >
          <i class="fas fa-info-circle p-0 "></i
        ></span>
        <b-button
          class="p-1 ml-2 text-danger"
          variant="transparent"
          @click="showDeleteModal.show = true"
          :disabled="serverStatus === 1"
          style="position: absolute; bottom: 5%; right: 2%; z-index: 1;"
        >
          <i class="fas fa-trash p-0 "></i
        ></b-button>
      </div>
    </div>

    <b-modal
      centered
      v-model="serviceForm.show"
      :title="`${serviceForm.requestType}`"
      ok-title="Kaydet"
      cancel-title="Kapat"
      hide-footer
    >
      <form @submit.prevent="goToServerForm(serviceForm.requestType)">
        <div class="inputcontainer">
          <label
            for="serviceName"
            class="contents-title font-weight-bold animatedLabel "
            >Service Name:</label
          >
          <input
            name="serviceName"
            id="serviceName"
            class="textinput mb-2"
            style="width: 100%;"
            maxlength="256"
            minlength="1"
            type="text"
            v-model="serviceForm.serviceName"
            required
          />
        </div>
        <div class="inputcontainer">
          <label
            for="databaseName"
            class="contents-title font-weight-bold animatedLabel "
            >Database Name:</label
          >
          <input
            name="databaseName"
            id="databaseName"
            class="textinput mb-2"
            style="width: 100%;"
            maxlength="256"
            minlength="1"
            type="text"
            v-model="serviceForm.databaseName"
            required
          />
        </div>
        <div class="inputcontainer">
          <label
            for="port"
            class="contents-title font-weight-bold animatedLabel "
            >Port:</label
          >
          <input
            name="port"
            id="port"
            class="textinput mb-2"
            style="width: 100%;"
            maxlength="256"
            minlength="1"
            type="number"
            v-model="serviceForm.port"
            required
          />
          <div class="mt-4 pt-4 border-top row">
            <div class="col-6">
              <div
                v-if="editStatus.show"
                id="alert"
                :class="`text-${editStatus.variant} text-left`"
              >
                <i id="alertsign" :class="`fas ${editStatus.icon}`"></i>
                <span class="ml-2">{{ editStatus.text }}</span>
              </div>
            </div>
            <div class="col-6 text-right">
              <b-button variant="secondary" class="ml-2">İptal Et</b-button>
              <b-button
                :disabled="isLoading"
                variant="primary"
                type="submit"
                class="ml-2"
              >
                <b-spinner small v-if="isLoading"></b-spinner>
                <span v-else>İleri</span>
              </b-button>
            </div>
          </div>
        </div>
      </form>
    </b-modal>

    <b-modal
      size="md"
      centered
      v-model="showDeleteModal.show"
      ok-title="Kaydet"
      cancel-title="Kapat"
      hide-footer
    >
      <p class="h2 text-center">Are You Sure to Delete This Service</p>
      <div class="row">
        <div class="col-4">
          <b-button @click="showDeleteModal.show = false" block
            >Go Back</b-button
          >
        </div>
        <div class="col-8">
          <b-button @click="DELETE_SERVICE" block variant="danger"
            >Delete</b-button
          >
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import requestResponseCheck from "../../../../mixins/requestResponseCheck";
import {
  REQUEST_TO_GET_COMPANYSERVICE_BYCOMPANYID,
  REQUEST_TO_PUT_COMPANYSERVICE,
} from "../../../../services/Requests/Service";

export default {
  props: {
    serviceForm: {
      type: Object,
    },
    serverStatus: {
      type: Number,
    },
  },
  mixins: [requestResponseCheck],
  data() {
    return {
      isLoading: false,
      service: {},
      getServiceMessage: "",
      editStatus: {},
      showDeleteModal: {
        show: false,
      },
    };
  },
  methods: {
    goToServerForm(requestType) {
      this.serviceForm.show = false;
      this.$emit("goToServerForm", requestType);
    },
    setServiceForm(requestType) {
      console.log(requestType);
      this.serviceForm.show = true;
      this.serviceForm.requestType = requestType;
      this.serviceForm.companyId = this.$route.params.id;
      if (requestType === "PUT") {
        (this.serviceForm.serviceName = this.service.serviceName),
          (this.serviceForm.port = this.service.port),
          (this.serviceForm.databaseName = this.service.databaseName);
      }
      if (requestType === "POST") {
        (this.serviceForm.serviceName = ""),
          (this.serviceForm.port = null),
          (this.serviceForm.databaseName = "");
      }
    },
    // REQUESTS START
    async GET_COMPANYSERVICE_BYCOMPANYID() {
      this.isLoading = true;
      const options = {
        params: {
          companyId: this.$route.params.id,
        },
      };
      const response = await REQUEST_TO_GET_COMPANYSERVICE_BYCOMPANYID(options);
      this.getServiceMessage = response.message;
      if (response.message === "OK") {
        this.service = response.data;
        this.$emit("serviceLoaded", this.service);
      }
      this.isLoading = false;
    },
    // async GET_COMPANYSERVICE() {
    //   this.isLoading = true;
    //   const options = {
    //     params: {
    //       id: this.$route.params.id,
    //     },
    //   };
    //   const response = await REQUEST_TO_GET_COMPANYSERVICE(options);
    //   this.getServiceMessage = response.message;
    //   if (response.message === "OK") {
    //     this.service = response.data;
    //     this.$emit('serviceLoaded',this.service)
    //   }
    //   this.isLoading = false;
    // },
    async DELETE_SERVICE() {
      this.isLoading = true;
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };
      const response = await REQUEST_TO_PUT_COMPANYSERVICE(options, {
        serviceName: this.service.serviceName,
        port: this.service.port,
        databaseName: this.service.databaseName,
        companyId: this.$route.params.id,
        isActive: 0,
        isDelete: 1,
      });
      this.isLoading = false;
      this.requestResponseCheck(response, this.showDeleteModal);
      if (response.message === "OK") {
        this.GET_COMPANYSERVICE();
      }
    },
    // REQUESTS END
  },
  mounted() {
    this.GET_COMPANYSERVICE_BYCOMPANYID();
  },
};
</script>

<style scoped>
img {
  max-width: 100%;
  max-height: 175px;
  object-fit: cover;
}
.h3,
.h2 {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
.h4 {
  font-family: "Nunito", sans-serif;
}
</style>
