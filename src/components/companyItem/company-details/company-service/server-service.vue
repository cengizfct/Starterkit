<template>
  <div>
  
    <company-service
      :serviceForm="serviceForm"
      :serverStatus="serverStatus"
      @serviceLoaded="serviceEmitted"
      @goToServerForm="goToServerForm" 
    ></company-service>
    <company-server
      :serverForm="serverForm"
      :service="service"
      @sendServerAndService="sendServerAndService"
      @sendServerStatus="setServerStatus"
    ></company-server>
   
  </div>
</template>

<script>
import CompanyServer from "./CompanyServer.vue";
import CompanyService from "./CompanyService.vue";
import { REQUEST_TO_PUT_COMPANYSERVICE, REQUEST_TO_POST_COMPANYSERVICE } from "../../../../services/Requests/Service";
import { REQUEST_TO_POST_SERVERS_CREATESERVICE,REQUEST_TO_PUT_SERVERS_UPDATESERVICE,REQUEST_TO_POST_SERVERS_STARTSERVICE,REQUEST_TO_POST_SERVERS_STOPSERVICE,REQUEST_TO_POST_SERVERS_RESTARTSERVICE } from "../../../../services/Requests/Servers";
import requestResponseCheck from "../../../../mixins/requestResponseCheck";
export default {
  components: {
    CompanyServer,
    CompanyService,
  },
  mixins:[requestResponseCheck],
  data() {
    return {
      service: {},
      serverStatus: null,
      serviceForm: {
        show: false,
        requestType: "",

        //below will be sent
        serviceName: "",
        port: null,
        databaseName: "",
        companyId: null,
        isActive: null,
        isDelete: 0,
      },
      serverForm: {
        show: false,
        requestType: "",

        //below will be sent
        serviceName: "",
        apiPort: "",
        databaseName: "",
        payRedirectUrl: "",
        userBaseUrl: "",
        callbackBaseUrl: "",
        emailFrom: "",
        emailUsername: "",
        emailPassword: "",
        emailDisplay: "",
        emailSmtp: "",
        websiteTitle: "",
        contentUserUrl: "",
        contentPanelUrl: "",
        publicFolder: "",
        heoWebsite: "",
        cronDailyHour: null,
        cronInfoMinute: null,
        cronIsActive: null,
        companyName: "",
        wpUrl: "",
      },
    };
  },
  methods: {
    serviceEmitted(service) {
      this.service = service;
      console.log(this.service, "parent service");
    },
    goToServerForm(requestType){
        this.serverForm.requestType = requestType
        this.serverForm.serviceName = this.serviceForm.serviceName
        this.serverForm.apiPort = this.serviceForm.port
        this.serverForm.databaseName = this.serviceForm.databaseName
        this.serverForm.show = true
    },
    sendServerAndService(requestType){
        if(requestType === "PUT"){
            this.PUT_SERVICE()
        }
        if(requestType === "POST"){
            this.POST_SERVICE()
        }
    },
    setServerStatus(serverStatus){
      this.serverStatus = serverStatus
    },
    // PUT AND POST REQUESTS OF SERVICES
    async PUT_SERVICE() {
      this.isLoading = true;
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_PUT_COMPANYSERVICE(options, {
        serviceName: this.serviceForm.serviceName,
        port: this.serviceForm.port,
        databaseName: this.serviceForm.databaseName,
        companyId: this.serviceForm.companyId,
        isDelete: this.serviceForm.isDelete,
        isActive: 1
      });

      if (response.message === "OK") {
        //if updating service is successful, updates server
        this.PUT_UPDATESERVICE()
      }
    },

    async POST_SERVICE() {
      this.isLoading = true;
      console.log("postservice");
      const response = await REQUEST_TO_POST_COMPANYSERVICE({
        serviceName: this.serviceForm.serviceName,
        port: this.serviceForm.port,
        databaseName: this.serviceForm.databaseName,
        companyId: this.serviceForm.companyId,
      });
 
      if (response.message === "OK") {
        //if posting service is successful, posts server
        this.POST_CREATESERVICE()
      }
    
    },
    // END OF REQUESTS OF SERVICES

    //PUT AND POST REQUESTS OF SERVERS
    async POST_CREATESERVICE() {
        //this function will not be called by itself, it will only run after service is posted
      
      const response = await REQUEST_TO_POST_SERVERS_CREATESERVICE({
        serviceName: this.serverForm.serviceName,
        apiPort: this.serverForm.apiPort,
        databaseName: this.serverForm.databaseName,
        payRedirectUrl: this.serverForm.payRedirectUrl,
        userBaseUrl: this.serverForm.userBaseUrl,
        callbackBaseUrl: this.serverForm.callbackBaseUrl,
        emailFrom: this.serverForm.emailFrom,
        emailUsername: this.serverForm.emailUsername,
        emailPassword: this.serverForm.emailPassword,
        emailDisplay: this.serverForm.emailDisplay,
        emailSmtp: this.serverForm.emailSmtp,
        websiteTitle: this.serverForm.websiteTitle,
        contentUserUrl: this.serverForm.contentUserUrl,
        contentPanelUrl: this.serverForm.contentPanelUrl,
        publicFolder: this.serverForm.publicFolder,
        heoWebsite: this.serverForm.heoWebsite,
        cronDailyHour: this.serverForm.cronDailyHour,
        cronInfoMinute: this.serverForm.cronInfoMinute,
        cronIsActive: this.serverForm.cronIsActive,
        companyName: this.serverForm.companyName,
        wpUrl: this.serverForm.wpUrl,
      });
      console.log(response);
      this.isLoading = false;
      this.requestResponseCheck(response, this.serverForm);
  
    },
    async PUT_UPDATESERVICE() {
        //this function will not be called by itself, it will only run after service is updated
      const response = await REQUEST_TO_PUT_SERVERS_UPDATESERVICE({
        serviceName: this.serverForm.serviceName,
        apiPort: this.serverForm.apiPort,
        databaseName: this.serverForm.databaseName,
        payRedirectUrl: this.serverForm.payRedirectUrl,
        userBaseUrl: this.serverForm.userBaseUrl,
        callbackBaseUrl: this.serverForm.callbackBaseUrl,
        emailFrom: this.serverForm.emailFrom,
        emailUsername: this.serverForm.emailUsername,
        emailPassword: this.serverForm.emailPassword,
        emailDisplay: this.serverForm.emailDisplay,
        emailSmtp: this.serverForm.emailSmtp,
        websiteTitle: this.serverForm.websiteTitle,
        contentUserUrl: this.serverForm.contentUserUrl,
        contentPanelUrl: this.serverForm.contentPanelUrl,
        publicFolder: this.serverForm.publicFolder,
        heoWebsite: this.serverForm.heoWebsite,
        cronDailyHour: this.serverForm.cronDailyHour,
        cronInfoMinute: this.serverForm.cronInfoMinute,
        cronIsActive: this.serverForm.cronIsActive,
        companyName: this.serverForm.companyName,
        wpUrl: this.serverForm.wpUrl,
      });
      console.log(response);
      this.isLoading = false;
      this.requestResponseCheck(response, this.serverForm);
      if(response.message === "OK"){
        this.$router.go()
      }
    },

    async POST_STARTSERVICE(serviceName) {
      this.serverLoading = true;
      console.log("startserver");
      const response = await REQUEST_TO_POST_SERVERS_STARTSERVICE({
        serviceName: serviceName,
      });
      console.log(response);
      this.serverLoading = false;
    },
    async POST_STOPSERVICE(serviceName) {
      this.serverLoading = true;
      console.log("startserver");
      const response = await REQUEST_TO_POST_SERVERS_STOPSERVICE({
        serviceName: serviceName,
      });
      console.log(response);
      this.serverLoading = false;
    },
    async POST_RESTARTSERVICE(serviceName) {
      this.serverLoading = true;
      console.log("startserver");
      const response = await REQUEST_TO_POST_SERVERS_RESTARTSERVICE({
        serviceName: serviceName,
      });
      console.log(response);
      this.serverLoading = false;
    },
    // END OF REQUESTS OF SERVERS
  },
};
</script>

<style scoped></style>
