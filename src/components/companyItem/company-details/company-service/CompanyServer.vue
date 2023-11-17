<template>
  <div class="container p-0">
  
    <div v-if="Object.keys(service).length !== 0">
      <div class=" justify-content-center ">
        <div class="card  ">
          <p class="mb-0 m-3  d-inline-block h3 ">
            <span class="border-bottom">
              <i class="fas fa-server mr-2 text-muted"></i>Server
            </span>
          </p>
          <div
            class="card-body d-flex flex-column align-items-center justify-content-center"
          >
            <div v-if="serverStatus === 1">
              <img
                v-if="!serverLoading"
                src="../../../../assets/images/serverexists.png"
                alt=""
              />

              <p v-if="!serverLoading" class="h2 text-center">Server is Running!</p>
            </div>

            <div v-if="serverStatus !== 1">
              <img
                v-if="!serverLoading"
                src="../../../../assets/images/noserver.png"
                alt=""
              />

              <p v-if="!serverLoading" class="h2 text-center">Server is Not Running</p>
            </div>
            <div v-if="serverLoading"><b-spinner variant="primary"></b-spinner></div>
            <div v-else class="w-100 row mt-2">
              <div class="col-4 p-0 pr-1">
                <b-button
                  @click="POST_STARTSERVICE(service.serviceName)"
                  block
                  variant="info"
                  class="py-2 px-0"
                  :disabled="serverStatus === 1"
                  >Start Server</b-button
                >
              </div>
              <div class="col-4 p-0 ">
                <b-button
                  @click="POST_STOPSERVICE(service.serviceName)"
                  block
                  variant="info"
                  class="py-2 px-0"
                  :disabled="serverStatus === 2"
                  >Stop Server</b-button
                >
              </div>
              <div class="col-4 p-0 pl-1">
                <b-button
                  @click="POST_RESTARTSERVICE(service.serviceName)"
                  block
                  variant="info"
                  class="py-2 px-0"
                  :disabled="serverStatus === 1"
                  >Restart Server</b-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <b-modal
      size="xl"
      centered
      v-model="serverForm.show"
      :title="serverForm.requestType"
      ok-title="Kaydet"
      cancel-title="Kapat"
      hide-footer
    >
      <form @submit.prevent="formServerServiceIsDone(serverForm.requestType)">
        <div class="row">
          <div class="col-12 col-lg-4">
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
                v-model="serverForm.serviceName"
                required
                disabled
              />
            </div>
            <div class="inputcontainer">
              <label
                for="apiPort"
                class="contents-title font-weight-bold animatedLabel "
                >API Port:</label
              >
              <input
                name="apiPort"
                id="apiPort"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.apiPort"
                required
                disabled
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
                v-model="serverForm.databaseName"
                required
                disabled
              />
            </div>
            <div class="inputcontainer">
              <label
                for="payRedirectUrl"
                class="contents-title font-weight-bold animatedLabel "
                >Pay Redirect URL:</label
              >
              <input
                name="payRedirectUrl"
                id="payRedirectUrl"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.payRedirectUrl"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="userBaseUrl"
                class="contents-title font-weight-bold animatedLabel "
                >User Base URL:</label
              >
              <input
                name="userBaseUrl"
                id="userBaseUrl"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.userBaseUrl"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="callbackBaseUrl"
                class="contents-title font-weight-bold animatedLabel "
                >Callback Base URL:</label
              >
              <input
                name="callbackBaseUrl"
                id="callbackBaseUrl"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.callbackBaseUrl"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="emailFrom"
                class="contents-title font-weight-bold animatedLabel "
                >Email From:</label
              >
              <input
                name="emailFrom"
                id="emailFrom"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.emailFrom"
                required
              />
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="inputcontainer">
              <label
                for="emailUsername"
                class="contents-title font-weight-bold animatedLabel "
                >Email Username:</label
              >
              <input
                name="emailUsername"
                id="emailUsername"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.emailUsername"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="emailPassword"
                class="contents-title font-weight-bold animatedLabel "
                >Email Password:</label
              >
              <input
                name="emailPassword"
                id="emailPassword"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.emailPassword"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="emailDisplay"
                class="contents-title font-weight-bold animatedLabel "
                >Email Display:</label
              >
              <input
                name="emailDisplay"
                id="emailDisplay"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.emailDisplay"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="emailSmtp"
                class="contents-title font-weight-bold animatedLabel "
                >Email SMTP:</label
              >
              <input
                name="emailSmtp"
                id="emailSmtp"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.emailSmtp"
                required
              />
            </div>

            <div class="inputcontainer">
              <label
                for="websiteTitle"
                class="contents-title font-weight-bold animatedLabel "
                >Website Title:</label
              >
              <input
                name="websiteTitle"
                id="websiteTitle"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.websiteTitle"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="contentUserUrl"
                class="contents-title font-weight-bold animatedLabel "
                >Content User URL:</label
              >
              <input
                name="contentUserUrl"
                id="contentUserUrl"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.contentUserUrl"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="contentPanelUrl"
                class="contents-title font-weight-bold animatedLabel "
                >Content Panel URL:</label
              >
              <input
                name="contentPanelUrl"
                id="contentPanelUrl"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.contentPanelUrl"
                required
              />
            </div>
          </div>
          <div class="col-12 col-lg-4">
            <div class="inputcontainer">
              <label
                for="publicFolder"
                class="contents-title font-weight-bold animatedLabel "
                >Public Folder:</label
              >
              <input
                name="publicFolder"
                id="publicFolder"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.publicFolder"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="heoWebsite"
                class="contents-title font-weight-bold animatedLabel "
                >Heo Website:</label
              >
              <input
                name="heoWebsite"
                id="heoWebsite"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.heoWebsite"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="cronDailyHour"
                class="contents-title font-weight-bold animatedLabel "
                >Cron Daily Hour:</label
              >
              <input
                name="cronDailyHour"
                id="cronDailyHour"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="number"
                v-model="serverForm.cronDailyHour"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="cronInfoMinute"
                class="contents-title font-weight-bold animatedLabel "
                >Cron Info Minute:</label
              >
              <input
                name="cronInfoMinute"
                id="cronInfoMinute"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="number"
                v-model="serverForm.cronInfoMinute"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="cronIsActive"
                class="contents-title font-weight-bold animatedLabel "
                >Cron Is Active:</label
              >
              <input
                name="cronIsActive"
                id="cronIsActive"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="number"
                v-model="serverForm.cronIsActive"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="companyName"
                class="contents-title font-weight-bold animatedLabel "
                >Company Name:</label
              >
              <input
                name="companyName"
                id="companyName"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.companyName"
                required
              />
            </div>
            <div class="inputcontainer">
              <label
                for="wpUrl"
                class="contents-title font-weight-bold animatedLabel "
                >WhatsApp URL:</label
              >
              <input
                name="wpUrl"
                id="wpUrl"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="serverForm.wpUrl"
                required
              />
            </div>
          </div>
        </div>
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
              <span v-else>Kaydet</span>
            </b-button>
          </div>
        </div>
      </form>
    </b-modal>
  </div>
</template>

<script>
import requestResponseCheck from "../../../../mixins/requestResponseCheck";
import {
  REQUEST_TO_POST_SERVERS_CHECKSTATUS,
  REQUEST_TO_POST_SERVERS_STARTSERVICE,
  REQUEST_TO_POST_SERVERS_STOPSERVICE,
  REQUEST_TO_POST_SERVERS_RESTARTSERVICE,
} from "../../../../services/Requests/Servers";
export default {
  mixins: [requestResponseCheck],
  props: {
    service: {
      type: Object,
    },
    serverForm: {
      type: Object,
    },
  },
  data() {
    return {
      // 1 -> VAR 2-> YOK
      isLoading: false,
      serverLoading: false,
      server: {},
      serverStatus: null,

      editStatus: {},
    };
  },
  methods: {
    formServerServiceIsDone(requestType) {
      this.$emit("sendServerAndService", requestType);
    },
    responseCheck(response){
      if (response.message === "OK") {
      this.editStatus = {
        show: true,
        text: "İşlem Başarılı",
        variant: "success",
        icon: "fa-check",
      };
      this.sendNotification("Uyarı", "İşlem Başarılı", "success");
    } else {
      this.sendNotification("Uyarı", "İşlem Başarısız", "danger");
      this.editStatus = {
        show: true,
        text: "İşlem Başarısız",
        variant: "danger",
        icon: "fa-times",
      };
    }
    },

    async POST_CHECKSERVER(serviceName) {
      console.log("servicename", serviceName);
      this.serverLoading = true;
      console.log("checkserver");
      const response = await REQUEST_TO_POST_SERVERS_CHECKSTATUS({
        serviceName: serviceName,
      });
      this.serverStatus = response.data;
      this.$emit('sendServerStatus',this.serverStatus)
      console.log(this.serverStatus);
      this.serverLoading = false;
    },
    async POST_STARTSERVICE(serviceName) {
      this.serverLoading = true;
      console.log("startserver");
      const response = await REQUEST_TO_POST_SERVERS_STARTSERVICE({
        serviceName: serviceName,
      });
      console.log(response);
      this.responseCheck(response)
      this.POST_CHECKSERVER(serviceName)
      this.serverLoading = false;
    },
    async POST_STOPSERVICE(serviceName) {
      this.serverLoading = true;
      console.log("startserver");
      const response = await REQUEST_TO_POST_SERVERS_STOPSERVICE({
        serviceName: serviceName,
      });
      console.log(response);
      this.responseCheck(response)
      this.POST_CHECKSERVER(serviceName)
      this.serverLoading = false;
    },
    async POST_RESTARTSERVICE(serviceName) {
      this.serverLoading = true;
      console.log("startserver");
      const response = await REQUEST_TO_POST_SERVERS_RESTARTSERVICE({
        serviceName: serviceName,
      });
      console.log(response);
      this.responseCheck(response)
      this.POST_CHECKSERVER(serviceName)
      this.serverLoading = false;
    },
  },
  watch: {
    service() {
      this.POST_CHECKSERVER(this.service.serviceName);
    },
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
.checkserverbutton {
  border-radius: 0;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.checkserverp {
  border-width: 2px !important;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  outline: none;
}
</style>
