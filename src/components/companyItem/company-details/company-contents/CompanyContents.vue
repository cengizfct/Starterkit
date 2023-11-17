<template>
  <div class="container p-0">
    <div class="card pb-2">
      <div class="card-body">
        <div class="media">
          <div class="media-body overflow-hidden">
            <p class="mb-0 m-2   h3  border-bottom d-inline-block">
              <i class="fas fa-folder-open mr-2"></i> Banner
            </p>
            <div class="row">
              <div class="IMAGE col-lg-6 col-md-6 col-xs-12 mb-3 border-right">
                <p class="mb-3  h4 text-secondary border-bottom d-inline-block">
                  Banner Image <i class="fas fa-image ml-1 mr-2 "></i>
                </p>
                <b-button
                  class="p-1 ml-2"
                  variant="primary"
                  @click="setEditBannerImage()"
                  ><i class="fas fa-pen"></i
                ></b-button>
                <div class="ml-2 text-center p-0">
                  <img :src="getImage(bannerImage)" alt="" width="300" />
                </div>
                <form @submit.prevent>
                  <b-modal
                    size="md"
                    centered
                    v-model="editBannerImage.show"
                    title="Edit Banner Image of Your Company"
                    ok-title="Kaydet"
                    cancel-title="Kapat"
                    @hide="() => (newImageFile = null)"
                    hide-footer
                  >
                    <div class="row">
                      <div class="col-12">
                        <span class="contents-title font-weight-bold"
                          >Image:</span
                        >
                        <div
                          class="d-flex align-items-center justify-content-center mt-3"
                        >
                          <picture-input
                            ref="pictureInput"
                            width="300"
                            height="290"
                            :prefill="getImage(bannerImage)"
                            margin="16"
                            accept="image/jpeg,image/png"
                            size="10"
                            button-class="btn"
                            :custom-strings="{
                              upload: '<h1>Buraya yükleyin!</h1>',
                              drag: '<h1>Buraya Sürükleyin</h1>',
                            }"
                            @change="onChange"
                          >
                          </picture-input>
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
                          <i
                            id="alertsign"
                            :class="`fas ${editStatus.icon}`"
                          ></i>
                          <span class="ml-2">{{ editStatus.text }}</span>
                        </div>
                      </div>
                      <div class="col-6 text-right">
                        <b-button variant="secondary" class="ml-2"
                          >İptal Et</b-button
                        >
                        <b-button
                          :disabled="imgIsLoading"
                          variant="primary"
                          class="ml-2"
                          @click="UPDATE_BANNER_IMAGE"
                        >
                          <b-spinner small v-if="imgIsLoading"></b-spinner>
                          <span v-else>Kaydet</span>
                        </b-button>
                      </div>
                    </div>
                  </b-modal>
                </form>
              </div>

              <div
                v-for="(banner, index) in typeOne"
                :key="index"
                class="TEXTS col-lg-6 col-md-6 col-xs-12 border-right"
              >
                <div>
                  <div>
                    <span class="mb-3 m-2  h4 text-secondary border-bottom">
                      {{ banner.language }}
                      <img
                        :src="
                          require(`../../../../assets/images/flags/${banner.language}.png`)
                        "
                        width="30"
                        alt=""
                      />
                    </span>
                    <div class="d-inline-block">
                      <b-button
                        class="p-1 ml-2"
                        variant="primary"
                        @click="setEditContents(banner)"
                      >
                        <i class="fas fa-pen "></i
                      ></b-button>

                      
                    </div>
                  </div>
                  <div class="mt-3 ml-2">
                    <p>
                      <span class="font-weight-bold ">Başlık: </span>
                      <span class="text-secondary">{{ banner.title }} </span>
                    </p>
                    <p>
                      <span class="font-weight-bold ">Açıklama: </span>
                      <span class="text-secondary">
                        {{ banner.description }}
                      </span>
                    </p>
                    <p>
                      <span class="font-weight-bold ">Genel Bakış: </span>
                      <span class="text-secondary">{{ banner.overview }} </span>
                    </p>
                  </div>
                </div>
              </div>
              <b-modal
                        centered
                        v-model="editContents.show"
                        title="Edit Contents of Your Page"
                        ok-title="Kaydet"
                        cancel-title="Kapat"
                        hide-footer
                      >
                        
                        <div class="d-flex flex-column ">
                          <div class="inputcontainer">
                            <label class="contents-title font-weight-bold animatedLabel"
                              >Title:</label
                            >
                            <input
                              class="textinput"
                              style="width: 100%;"
                              v-model="editContents.title"
                              maxlength="256"
                              minlength="1"
                              type="text"
                            />
                          </div>
                          <div class="inputcontainer">
                            <label class="contents-title font-weight-bold animatedLabel"
                              >Description:</label
                            >
                            <textarea
                              class="textinput"
                              style="width: 100%;"
                              v-model="editContents.description"
                              rows="4"
                              minlength="1"
                            >
                            </textarea>
                          </div>
                          <div class="inputcontainer">
                            <label class="contents-title font-weight-bold animatedLabel"
                              >Overview:</label
                            >
                            <textarea
                              class="textinput"
                              style="width: 100%;"
                              v-model="editContents.overview"
                              rows="8"
                              minlength="1"
                            >
                            </textarea>
                          </div>
                        </div>
                        <div class="mt-4 pt-4 border-top row">
                          <div class="col-6 text-right">
                            <div
                              v-if="editStatus.show"
                              id="alert"
                              :class="`text-${editStatus.variant} text-left`"
                            >
                              <i
                                id="alertsign"
                                :class="`fas ${editStatus.icon}`"
                              ></i>
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
                              @click="UPDATE_CONTENTS(editContents.id)"
                            >
                              <b-spinner small v-if="isLoading"></b-spinner>
                              <span v-else>Kaydet</span>
                            </b-button>
                          </div>
                        </div>
                      </b-modal>
            </div>
          </div>
        </div>
      </div>
      <div v-if="typeOneMissingLanguages[0]" class="text-center">
        <b-button
          @click="setAddContents()"
          variant="success"
          class="p-1 ml-2 mb-4"
          >Add New Language <i class="fas fa-plus"></i
        ></b-button>
      </div>
    </div>

    <b-modal
      centered
      v-model="addContents.show"
      title="Add a content to Your Page"
      ok-title="Kaydet"
      cancel-title="Kapat"
      hide-footer
      ><form @submit.prevent="POST_CONTENTS">
        <div class="d-flex flex-column ">
          <div >
            <label class="contents-title font-weight-bold">Language:</label>
            <select
              class="textinput registrationinput "
              v-model="addContents.language"
              name="lang"
              id="lang"
              required
            >
              <option value="" selected disabled>Select</option>
              <option
                v-for="(lang, i) in typeOneMissingLanguages"
                :key="i"
                :value="lang"
              >
                {{ lang }}
              </option>
            </select>
          </div>
          <div class="inputcontainer">
            <label class="contents-title font-weight-bold animatedLabel">Title:</label>
            <input
              class="textinput"
              style="width: 100%;"
              v-model="addContents.title"
              maxlength="256"
              minlength="1"
              type="text"
            />
          </div>
          <div class="inputcontainer">
            <label class="contents-title font-weight-bold animatedLabel">Description:</label>
            <textarea
              class="textinput"
              style="width: 100%;"
              v-model="addContents.description"
              rows="2"
              minlength="1"
            >
            </textarea>
          </div>
          <div class="inputcontainer">
            <label class="contents-title font-weight-bold animatedLabel">Overview:</label>
            <textarea
              class="textinput"
              style="width: 100%;"
              v-model="addContents.overview"
              rows="4"
              minlength="1"
            >
            </textarea>
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
import api from "../../../../services/Api";
import PictureInput from "vue-picture-input";
import { REQUEST_TO_PUT_COMPANY } from "../../../../services/Requests/Companies";
import {
  REQUEST_TO_PUT_SPECIFIC_COMPANY_CONTENT,
  REQUEST_TO_POST_SPECIFIC_COMPANY_CONTENT,
} from "../../../../services/Requests/Contents";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck";

export default {
  components: { PictureInput },
  props: {
    typeOne: {
      default: () => [],
      type: Array,
    },
    typeOneLanguages: {
      default: () => [],
      type: Array,
    },
    typeOneMissingLanguages: {
      default: () => [],
      type: Array,
    },
    bannerImage: {
      default: () => "",
      type: String,
    },
  },
  data() {
    return {
      isLoading: false,
      newImageFile: null,
      permittedLanguages: ["TR", "EN", "DE"],
      editStatus: {
        text: "",
        variant: "",
        show: false,
        icon: "",
      },
      imgIsLoading: null,
      editBannerImage: {
        show: false,
      },
      editContentsLoading: false,
      editContents: {
        show: false,
        title: "",
        description: "",
        overview: "",
        id: null,
      },
      addContents: {
        show: false,
        language: "",
        title: "",
        description: "",
        overview: "",
      },
    };
  },
  mixins: [requestResponseCheckMixin],
  methods: {
    setEditBannerImage() {
      this.editBannerImage = {
        show: true,
      };
    },
    setEditContents(banner) {
      this.editContents = {
        show: true,
        title: banner.title,
        description: banner.description,
        overview: banner.overview,
        id: banner.id,
      };
    },
    setAddContents() {
      this.addContents = {
        show: true,
        language: "",
        title: "",
        description: "",
        overview: "",
      };
    },
    async POST_CONTENTS() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.addContents.title);
      formData.append("Description", this.addContents.description);
      formData.append("Overview", this.addContents.overview);
      formData.append("Language", this.addContents.language);
      formData.append("Type", 1);

      const options = {
        query: {
          companyId: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_POST_SPECIFIC_COMPANY_CONTENT(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.addContents);
      if (response.message === "OK") {
        this.$emit("refresh", 1, "typeOne");
      }
    },

    async UPDATE_CONTENTS(contentId) {
      this.editContentsLoading = true;
      const formData = new FormData();
      formData.append("Title", this.editContents.title);
      formData.append("Description", this.editContents.description);
      formData.append("Overview", this.editContents.overview);
      const options = {
        params: {
          id: contentId,
        },
      };
      const response = await REQUEST_TO_PUT_SPECIFIC_COMPANY_CONTENT(
        options,
        formData
      );

      this.editContentsLoading = false;
      this.requestResponseCheck(response, this.editContents);
      if (response.message === "OK") {
        this.$emit("refresh", 1, "typeOne");
      }
    },

    async UPDATE_BANNER_IMAGE() {
      this.imgIsLoading = true;
      const formData = new FormData();
      formData.append("BannerImage", this.newImageFile);
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_PUT_COMPANY(options, formData);

      this.imgIsLoading = false;
      this.requestResponseCheck(response, this.editBannerImage);
      if (response.message === "OK") {
        setTimeout(() => {
          this.$router.go();
        }, 900);
      }
    },
    getImage(image) {
      return api.image(image);
    },

    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.newImageFile = this.$refs.pictureInput.file;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
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





</style>
