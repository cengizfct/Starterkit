<template>
  <div class="container p-0">
    <div class="card pb-2">
      <div style="position: absolute; right: 0; z-index: 1;">
        <b-button @click="setEditOtherSetting()" variant="transparent"
          ><i class="fas fa-pen text-primary"></i
        ></b-button>
      </div>
      <div class="card-body">
        <p class="mb-0 m-0   h3  border-bottom d-inline-block">
          <i class="fas fa-wrench mr-2 text-muted"></i> Other Settings
        </p>

        <div class="row mt-3">
          <div class="col-lg-6 col-md-6 col-xs-12 border-right">
            <p
              class="mb-3 m-0   h4 text-secondary border-bottom d-inline-block"
            >
              Notification
            </p>
            <p>
              <span class="font-weight-bold ">Cron is Active: </span>
              <span
                class="text-secondary"
                :class="[cronIsActive ? 'text-success' : 'text-danger']"
                >{{ cronIsActive ? "Yes" : "No" }}
              </span>
            </p>
            <p>
              <span class="font-weight-bold ">Daily Hour: </span>
              <span class="text-secondary"
                >{{ otherSetting.dailyHour > 10 ? "" : "0"
                }}{{ otherSetting.dailyHour }}:00
              </span>
            </p>
            <p>
              <span class="font-weight-bold ">Info Minute: </span>
              <span class="text-secondary">
                {{ otherSetting.infoMinute }}
              </span>
            </p>
          </div>

          <div class="col-lg-6 col-md-6 col-xs-12 ">
            <p
              class="mb-3 m-0   h4 text-secondary border-bottom d-inline-block"
            >
              E-mail
            </p>
            <p>
              <span class="font-weight-bold ">Email User Name: </span>
              <span class="text-secondary">
                {{ otherSetting.emailUsername }}
              </span>
            </p>
            <p>
              <span class="font-weight-bold ">Email Password: </span>
              <span class="text-secondary">
                {{ otherSetting.emailPassword }}
              </span>
            </p>
            <p>
              <span class="font-weight-bold ">Email SMTP: </span>
              <span class="text-secondary">
                {{ otherSetting.emailSMTP }}
              </span>
            </p>
          </div>
          <div class="col-lg-6 col-md-6 col-xs-12 border-right">
            <p
              class="mb-3 m-0   h4 text-secondary border-bottom d-inline-block"
            >
              Software
            </p>
            <p>
              <span class="font-weight-bold ">Database: </span>
              <span class="text-secondary">
                {{ otherSetting.database
                }}<i
                  class="fas fa-info-circle text-danger ml-2"
                  v-b-tooltip.right="{
                    variant: 'danger',
                    title:
                      'Veri tabanını değiştirmeden önce yazılım departmanıyla iletişime geçin.',
                  }"
                ></i>
              </span>
            </p>

            <p>
              <span class="font-weight-bold ">WhatsApp URL: </span>
              <span class="text-secondary"> {{ otherSetting.wpUrl }} </span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <form @submit.prevent>
      <b-modal
        centered
        v-model="editOtherSetting.show"
        title="Edit Other Settings of Your Page"
        ok-title="Kaydet"
        cancel-title="Kapat"
        hide-footer
        size="md"
      >
        <div class="d-flex flex-column ">
          <div>
            <span class="othersettinginput-title font-weight-bold mb-3"
              ><i
                class="fas fa-info-circle text-info"
                v-b-tooltip.left="{
                  variant: 'info',
                  title: 'description',
                }"
              ></i>
              Is Cron Active:</span
            >
            <select
              class="textinput othersettinginput"
              id="isFile"
              v-model="editOtherSetting.cronIsActive"
            >
              <option :value="0">No</option>
              <option :value="1">Yes</option>
            </select>
          </div>
          <div>
            <span class="othersettinginput-title font-weight-bold mb-3"
              ><i
                class="fas fa-info-circle text-info"
                v-b-tooltip.left="{
                  variant: 'info',
                  title: 'description',
                }"
              ></i>
              Daily Hour:</span
            >
            <select
              class="textinput othersettinginput"
              v-model="editOtherSetting.dailyHour"
              :disabled="!editOtherSetting.cronIsActive"
            >
              <option v-for="(_, index) in 24" :key="index" :value="index"
                >{{ 10 > index ? "0" : "" }}{{ index }}:00</option
              >
            </select>
          </div>
          <div>
            <span class="othersettinginput-title font-weight-bold mb-3"
              ><i
                class="fas fa-info-circle text-info"
                v-b-tooltip.left="{
                  variant: 'info',
                  title: 'description',
                }"
              ></i>
              Info Minute:</span
            >
            <select
              class="textinput othersettinginput"
              v-model="editOtherSetting.infoMinute"
              :disabled="!editOtherSetting.cronIsActive"
            >
              <option v-for="i in 11" :key="i" :value="i * 5">{{
                i * 5
              }}</option>
            </select>
          </div>
        </div>
        <div class="border-top row flex-column">
          <div class="col-12 mt-3">
            <div>
              <span class="othersettinginput-title font-weight-bold mb-3"
                ><i
                  class="fas fa-info-circle text-info"
                  v-b-tooltip.left="{
                    variant: 'info',
                    title: 'description.',
                  }"
                ></i>
                Email User Name:</span
              >
              <input
                type="text"
                class="textinput othersettingtextinput "
                v-model="editOtherSetting.emailUsername"
              />
            </div>
            <div>
              <span class="othersettinginput-title font-weight-bold mb-3"
                ><i
                  class="fas fa-info-circle text-info"
                  v-b-tooltip.left="{
                    variant: 'info',
                    title: 'description',
                  }"
                ></i>
                Email Password:</span
              >
              <input
                type="text"
                class="textinput othersettingtextinput"
                v-model="editOtherSetting.emailPassword"
              />
            </div>
            <div>
              <span class="othersettinginput-title font-weight-bold mb-3"
                ><i
                  class="fas fa-info-circle text-info"
                  v-b-tooltip.left="{
                    variant: 'info',
                    title: 'description',
                  }"
                ></i>
                Email SMTP:</span
              >
              <input
                type="text"
                class="textinput othersettingtextinput"
                v-model="editOtherSetting.emailSMTP"
              />
            </div>
          </div>
        </div>
        <div class="border-top row flex-column">
          <div class="col-12 mt-3">
            <div>
              <span class="othersettinginput-title font-weight-bold mb-3"
                ><i
                  class="fas fa-info-circle text-danger"
                  v-b-tooltip.left="{
                    variant: 'danger',
                    title:
                      'Veri tabanını değiştirmeden önce yazılım departmanıyla iletişime geçin.',
                  }"
                ></i>
                Database:</span
              >
              <input
                type="text"
                class="textinput othersettingtextinput text-danger"
                :max="59"
                v-model="editOtherSetting.database"
              />
            </div>
            <div>
              <span class="othersettinginput-title font-weight-bold mb-3"
                ><i
                  class="fas fa-info-circle text-info"
                  v-b-tooltip.left="{
                    variant: 'info',
                    title: 'description',
                  }"
                ></i>
                WhatsApp URL:</span
              >
              <input
                type="text"
                class="textinput othersettingtextinput"
                :max="59"
                v-model="editOtherSetting.wpUrl"
              />
            </div>
          </div>
        </div>

        <div class="mt-4 pt-4 border-top row">
          <div class="col-6 text-right">
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
              @click="REQUEST_OTHERSETTINGS()"
              :disabled="isLoading"
              variant="primary"
              class="ml-2"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              <span v-else>Kaydet</span>
            </b-button>
          </div>
        </div>
      </b-modal>
    </form>
   
  </div>
</template>

<script>
import {
  REQUEST_TO_GET_OTHERCOMPANYSETTING,
  REQUEST_TO_PUT_OTHERCOMPANYSETTING,
  REQUEST_TO_POST_OTHERCOMPANYSETTING,
} from "../../../../services/Requests/OtherSettings";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck";
export default {
  mixins: [requestResponseCheckMixin],
  data() {
    return {
      otherSetting: {},
      isLoading: false,
      editOtherSetting: {
        show: false,
        id: null,
        cronIsActive: null,
        wpUrl: "",
        dailyHour: 0,
        infoMinute: 0,
        database: "",
        emailUsername: "",
        emailPassword: "",
        emailSMTP: "",
      },
      editStatus: {
        text: "",
        variant: "",
        show: false,
        icon: "",
      },
    };
  },
  computed: {
    cronIsActive() {
      return this.otherSetting.cronIsActive === 1;
    },
  },
  methods: {
    setEditOtherSetting() {
      this.editOtherSetting = {
        show: true,
        id: this.$route.params.id,
        cronIsActive: this.otherSetting.cronIsActive,
        wpUrl: this.otherSetting.wpUrl,
        dailyHour: this.otherSetting.dailyHour,
        infoMinute: this.otherSetting.infoMinute,
        database: this.otherSetting.database,
        emailUsername: this.otherSetting.emailUsername,
        emailPassword: this.otherSetting.emailPassword,
        emailSMTP: this.otherSetting.emailSMTP,
      };
    },

    async GET_COMPANY_OTHERCOMPANYSETTING() {
      this.isLoading = true;
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };
      const response = await REQUEST_TO_GET_OTHERCOMPANYSETTING(options);
  
      if (response.message === "OK") {
        this.otherSetting = response.data;
       
      }
      this.isLoading = false;
    },

    async UPDATE_OTHERSETTINGS() {
      this.isLoading = true;
      const options = {
        params: {
          companyId: this.otherSetting.companyId,
        },
      };

      const response = await REQUEST_TO_PUT_OTHERCOMPANYSETTING(options, {
        cronIsActive: this.editOtherSetting.cronIsActive,
        wpUrl: this.editOtherSetting.wpUrl,
        dailyHour: this.editOtherSetting.dailyHour,
        infoMinute: this.editOtherSetting.infoMinute,
        database: this.editOtherSetting.database,
        emailUsername: this.editOtherSetting.emailUsername,
        emailPassword: this.editOtherSetting.emailPassword,
        emailSMTP: this.editOtherSetting.emailSMTP,
      });
     
      this.isLoading = false;
      this.requestResponseCheck(response, this.editOtherSetting);
      if (response.message === "OK") {
        this.GET_COMPANY_OTHERCOMPANYSETTING();
      }
    },
    async POST_OTHERSETTINGS() {
      this.isLoading = true;

      const response = await REQUEST_TO_POST_OTHERCOMPANYSETTING({
        companyId: Number(this.editOtherSetting.id),
        cronIsActive: this.editOtherSetting.cronIsActive,
        wpUrl: this.editOtherSetting.wpUrl,
        dailyHour: this.editOtherSetting.dailyHour,
        infoMinute: this.editOtherSetting.infoMinute,
        database: this.editOtherSetting.database,
        emailUsername: this.editOtherSetting.emailUsername,
        emailPassword: this.editOtherSetting.emailPassword,
        emailSMTP: this.editOtherSetting.emailSMTP,
      });
      this.requestResponseCheck(response, this.editOtherSetting);
      if (response.message === "OK") {
        
        this.GET_COMPANY_OTHERCOMPANYSETTING();
      }
      this.isLoading = false;
    },

    REQUEST_OTHERSETTINGS() {
      if (Object.keys(this.otherSetting).length === 0) {
        this.POST_OTHERSETTINGS()
      } else {
        this.UPDATE_OTHERSETTINGS()
      }
    },
  },
  beforeMount() {
    this.GET_COMPANY_OTHERCOMPANYSETTING();
  },
};
</script>
<style scoped>
.othersettinginput-title {
  width: 30%;
  display: inline-block;
}
.othersettinginput {
  width: 100px;
}
.othersettingtextinput {
  width: 70%;
}

.h3 {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
.h4 {
  font-family: "Nunito", sans-serif;
}
</style>
