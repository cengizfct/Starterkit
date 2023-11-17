<template>
  <div class="container p-0">
    <div class="card pb-2">
      <div class="card-body">
        <p class="mb-0 m-2   h3  border-bottom d-inline-block">
          <i class="fas fa-cogs mr-2 text-muted"></i> Company Settings
        </p>
        <div class="row">
          <div class="col-lg-6 col-md-6 col-xs-12 border-right">
            <p
              class="mb-3 m-2   h4 text-secondary border-bottom d-inline-block"
            >
              Services
            </p>
            <div class=" ml-2">
              <p>
                <span class="font-weight-bold ">Video Courses: </span>
                <span
                  class="text-secondary"
                  :class="[isCourse ? 'text-success' : 'text-danger']"
                  >{{ isCourse ? "Yes" : "No" }}
                </span>
              </p>
              <p>
                <span class="font-weight-bold">Event: </span>
                <span
                  class="text-secondary"
                  :class="[isEvent ? 'text-success' : 'text-danger']"
                  >{{ isEvent ? "Yes" : "No" }}
                </span>
              </p>
              <p>
                <span class="font-weight-bold">Seance: </span>
                <span
                  class="text-secondary"
                  :class="[isSeance ? 'text-success' : 'text-danger']"
                  >{{ isSeance ? "Yes" : "No" }}
                </span>
              </p>
              <p>
                <span class="font-weight-bold">Book: </span>
                <span
                  class="text-secondary"
                  :class="[isBook ? 'text-success' : 'text-danger']"
                  >{{ isBook ? "Yes" : "No" }}
                </span>
              </p>
              <p>
                <span class="font-weight-bold">Blog: </span>
                <span
                  class="text-secondary"
                  :class="[isBlog ? 'text-success' : 'text-danger']"
                  >{{ isBlog ? "Yes" : "No" }}
                </span>
              </p>
            </div>
          </div>
          <div class="col-lg-6 col-md-6 col-xs-12 ">
            <p
              class="mb-3 m-2   h4 text-secondary border-bottom d-inline-block"
            >
              Registration Status
            </p>
            <div class="d-inline-block">
              <b-button
                class="p-1 ml-2"
                variant="primary"
                @click="setEditRegistrationStatus()"
              >
                <i class="fas fa-pen "></i
              ></b-button>

              <b-modal
                centered
                v-model="editRegistrationStatus.show"
                title="Edit Registration Status of Your Page"
                ok-title="Kaydet"
                cancel-title="Kapat"
                hide-footer
              >
                <div class="d-flex flex-column ">
                  <div>
                    <span class="settingsinput-title font-weight-bold mb-3"
                      ><i
                        class="fas fa-info-circle text-info"
                        v-b-tooltip.left="{
                          variant: 'info',
                          title: 'description',
                        }"
                      ></i>
                      Certificated Registration:</span
                    >
                    <select
                      class="textinput registrationinput"
                      id="isFile"
                      v-model="editRegistrationStatus.isFile"
                    >
                      <option :value="0">No</option>
                      <option :value="1">Yes</option>
                    </select>
                  </div>
                  <div>
                    <span class="settingsinput-title font-weight-bold mb-3"
                      ><i
                        class="fas fa-info-circle text-info"
                        v-b-tooltip.left="{
                          variant: 'info',
                          title: 'description',
                        }"
                      ></i>
                      File Description:</span
                    >
                    <input
                      class="textinput registrationinput"
                      type="text"
                      v-model="editRegistrationStatus.fileDescription"
                      :disabled="editRegistrationStatus.isFile === 0"
                    />
                  </div>
                  <div>
                    <span class="settingsinput-title font-weight-bold mb-3"
                      ><i
                        class="fas fa-info-circle text-info"
                        v-b-tooltip.left="{
                          variant: 'info',
                          title: 'description',
                        }"
                      ></i>
                      Mandatory Phone:</span
                    >
                    <select
                      class="textinput registrationinput"
                      id="isPhone"
                      v-model="editRegistrationStatus.isPhone"
                    >
                      <option :value="0">No</option>
                      <option :value="1">Yes</option>
                    </select>
                  </div>
                  <div>
                    <span class="settingsinput-title font-weight-bold "
                      ><i
                        class="fas fa-info-circle text-info"
                        v-b-tooltip.left="{
                          variant: 'info',
                          title: 'description',
                        }"
                      ></i>
                      Popularity:</span
                    >
                    <select
                      class="textinput registrationinput"
                      id="isFile"
                      v-model="editRegistrationStatus.popularity"
                    >
                      <option value="asc">Ascending</option>
                      <option value="desc">Descending</option>
                    </select>
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
                    <b-button variant="secondary" class="ml-2"
                      >İptal Et</b-button
                    >
                    <b-button
                      :disabled="isLoading"
                      variant="primary"
                      class="ml-2"
                      @click="UPDATE_SETTINGS(editRegistrationStatus)"
                    >
                      <b-spinner small v-if="isLoading"></b-spinner>
                      <span v-else>Kaydet</span>
                    </b-button>
                  </div>
                </div>
              </b-modal>
            </div>
            <div class="ml-2">
              <p>
                <span class="font-weight-bold"
                  >Cercificated Registration:
                </span>
                <span
                  class="text-secondary"
                  :class="[isFile ? 'text-success' : 'text-danger']"
                  >{{ isFile ? "Yes" : "No" }}
                </span>
              </p>
              <p>
                <span class="font-weight-bold">File Description: </span>
                <span class="text-secondary">
                  "{{ settings.fileDescription }}"
                </span>
              </p>
              <p>
                <span class="font-weight-bold">Mandatory Phone: </span>
                <span
                  class="text-secondary"
                  :class="[isPhone ? 'text-success' : 'text-danger']"
                  >{{ isPhone ? "Yes" : "No" }}
                </span>
              </p>

              <p>
                <span class="font-weight-bold">Popularity: </span>
                <span class="text-secondary">
                  {{
                    settings.popularity === "desc" ? "Descending" : "Ascending"
                  }}
                </span>
              </p>
            </div>

            <div></div>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <div class="mb-3 m-2   h4 text-secondary d-inline-block">
              <span class="border-bottom">Colors</span>
              <div class="d-inline-block">
                <b-button
                  class="p-1 ml-2"
                  variant="primary"
                  @click="setEditColors()"
                >
                  <i class="fas fa-palette "></i
                ></b-button>

                <b-modal
                  centered
                  v-model="editColors.show"
                  title="Edit Colors of Your Page"
                  ok-title="Kaydet"
                  cancel-title="Kapat"
                  hide-footer
                >
                  <div class="d-flex align-items-center">
                    <span class="color-title font-weight-bold"
                      >Primary Color:</span
                    ><input
                      class="colorinput   mr-3"
                      v-model="editColors.primaryColor"
                      type="color"
                      name=""
                      id=""
                    />
                    <span v-if="editColors.primaryColor === ''">{{
                      settings.primaryColor
                    }}</span>
                    {{ editColors.primaryColor }}
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="color-title font-weight-bold"
                      >Theme Color:</span
                    >
                    <input
                      class="colorinput  mr-3"
                      v-model="editColors.themeColor"
                      type="color"
                      name=""
                      id=""
                    />
                    <span v-if="editColors.themeColor === ''">{{
                      settings.themeColor
                    }}</span>
                    {{ editColors.themeColor }}
                  </div>
                  <div class="d-flex align-items-center">
                    <span class="color-title font-weight-bold"
                      >Banner Color:</span
                    >
                    <input
                      class="colorinput   mr-3"
                      v-model="editColors.bannerColor"
                      type="color"
                      name=""
                      id=""
                    />
                    <span v-if="editColors.bannerColor === ''">{{
                      settings.bannerColor
                    }}</span>
                    {{ editColors.bannerColor }}
                  </div>
                  <div class="mt-4 pt-4 border-top  row">
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
                      <b-button variant="secondary" class="ml-2"
                        >İptal Et</b-button
                      >
                      <b-button
                        :disabled="isLoading"
                        variant="primary"
                        class="ml-2"
                        @click="UPDATE_SETTINGS(editColors)"
                      >
                        <b-spinner small v-if="isLoading"></b-spinner>
                        <span v-else>Kaydet</span>
                      </b-button>
                    </div>
                  </div>
                </b-modal>
              </div>
            </div>
            <div class="row pl-2">
              <div class="col-lg-4 col-md-4 col-xs-12">
                <span class="font-weight-bold">Primary Color: </span>
                <span class="text-secondary">
                  {{ settings.primaryColor }}
                </span>
                <i
                  class="fas fa-square ml-2 h5"
                  :style="{ color: settings.primaryColor }"
                ></i>
              </div>
              <div class="col-lg-4 col-md-4 col-xs-12">
                <span class="font-weight-bold">Theme Color: </span>
                <span class="text-secondary">
                  {{ settings.themeColor }}
                </span>
                <i
                  class="fas fa-square ml-2 h5"
                  :style="{ color: settings.themeColor }"
                ></i>
              </div>
              <div class="col-lg-4 col-md-4 col-xs-12">
                <span class="font-weight-bold">Banner Color: </span>
                <span class="text-secondary">
                  {{ settings.bannerColor }}
                </span>
                <i
                  class="fas fa-square ml-2 h5"
                  :style="{ color: settings.bannerColor }"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { REQUEST_TO_PUT_SPECIFIC_COMPANY_SETTINGS } from "../../../../services/Requests/Settings";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck";
export default {
  props: {
    settings: {
      default: () => {},
      type: Object,
    },
  },
  mixins: [requestResponseCheckMixin],
  data() {
    return {
      isLoading: null,
      editRegistrationStatus: {
        show: false,
        isFile: null,
        fileDescription: "",
        isPhone: null,
        popularity: "",
      },
      editColors: {
        show: false,
        primaryColor: "",
        themeColor: "",
        bannerColor: "",
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
    isCourse() {
      return this.settings.isCourse === 1;
    },
    isEvent() {
      return this.settings.isEvent === 1;
    },
    isSeance() {
      return this.settings.isSeance === 1;
    },
    isBook() {
      return this.settings.isBook === 1;
    },
    isBlog() {
      return this.settings.isBlog === 1;
    },
    isFile() {
      return this.settings.isFile === 1;
    },
    isPhone() {
      return this.settings.isPhone === 1;
    },
  },
  methods: {
    setEditColors() {
      this.editColors = {
        show: true,
        primaryColor: this.settings.primaryColor,
        themeColor: this.settings.themeColor,
        bannerColor: this.settings.bannerColor,
      };
    },
    setEditRegistrationStatus() {
      this.editRegistrationStatus = {
        show: true,
        isFile: this.settings.isFile,
        fileDescription: this.settings.fileDescription,
        isPhone: this.settings.isPhone,
        popularity: this.settings.popularity,
      };
    },

    async UPDATE_SETTINGS(input) {
      this.editColorsLoading = true;
      const options = {
        params: {
          id: this.settings.id,
        },
      };

      const response = await REQUEST_TO_PUT_SPECIFIC_COMPANY_SETTINGS(options, {
        primaryColor: input.primaryColor,
        themeColor: input.themeColor,
        bannerColor: input.bannerColor,
        isFile: input.isFile,
        fileDescription: input.fileDescription,
        isPhone: input.isPhone,
        popularity: input.popularity,
      });

      this.editColorsLoading = false;
      this.requestResponseCheck(response, input);
      if (response.message === "OK") {
        this.refreshSettings();
      }
    },
    refreshSettings() {
      this.$emit("refreshSettings");
    },
  },
};
</script>

<style scoped>
.h3 {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
.h4 {
  font-family: "Nunito", sans-serif;
}

.colorinput {
  appearance: none;
  border: none;
  background: none;
  padding: 0;
  margin: 2px;
  width: 35px;
  height: 35px;
}
.colorinput::-webkit-color-swatch {
  border-radius: 20%;
}
.color-title {
  width: 120px;
  display: inline-block;
}
.settingsinput-title {
  width: 200px;
  display: inline-block;
}
.registrationinput {
  width: 100px;
}
</style>
