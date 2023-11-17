<template>
  <div class="container p-0 mt-4">
    <form @submit.prevent>
      <b-modal
        size="lg"
        centered
        v-model="editMoreAboutUs.show"
        title="Edit More About Us"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <div class="row">
          <div class="col-6">
            <div class="inputcontainer">
              <label for="title" class="contents-title font-weight-bold animatedLabel "
                >Title:</label
              >
              <input
                name="title"
                id="title"
                class="textinput"
                style="width: 100%;"
                v-model="editMoreAboutUs.title"
                maxlength="256"
                minlength="1"
                type="text"
              />
            </div>
            <div class="inputcontainer">
              <label
                for="description"
                class="contents-title font-weight-bold animatedLabel"
                >Link:</label
              >
              <textarea
                name="description"
                id="description"
                class="textinput"
                style="width: 100%;"
                v-model="editMoreAboutUs.description"
                rows="2"
                minlength="1"
              >
              </textarea>
            </div>
            <div class="inputcontainer">
              <label for="overview" class="contents-title font-weight-bold animatedLabel"
                >Overview:</label
              >
              <textarea
                name="overiew"
                id="overview"
                class="textinput"
                style="width: 100%;"
                v-model="editMoreAboutUs.overview"
                rows="8"
                minlength="1"
              >
              </textarea>
            </div>
          </div>

          <div class="col-6">
            <span class="contents-title font-weight-bold">Image:</span>
            <div class="d-flex align-items-center justify-content-center mt-3">
              <picture-input
                ref="pictureInput"
                width="330"
                height="330"
                :prefill="image(editMoreAboutUs.imagePath)"
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
              <i id="alertsign" :class="`fas ${editStatus.icon}`"></i>
              <span class="ml-2">{{ editStatus.text }}</span>
            </div>
          </div>
          <div class="col-6 text-right">
            <b-button variant="secondary" class="ml-2">İptal Et</b-button>
            <b-button
              :disabled="isLoading"
              variant="primary"
              class="ml-2"
              @click="UPDATE_MOREABOUTUS()"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              <span v-else>Kaydet</span>
            </b-button>
          </div>
        </div>
      </b-modal>
    </form>
    <div class="row">
      <div class="col-lg-12 col-md-12 col-xs-12 border-right p-0 ">
        <div class="col-12 pl-3 p-0">
          <p
            class="mb-0 m-2   h3  border-bottom border-dark d-inline-block"
            style="font-family: 'Nunito',sans-serif;"
          >
            More About Us
          </p>
        </div>

        <div
          v-if="typeFour[0]"
          class=" d-flex flex-wrap justify-content-stretch pl-0  "
          style="width: 100%;"
        >
          <div
            class=" col-xl-4 col-lg-4 col-md-6  col-xs-12 "
            v-for="(moreAboutUs, index) in typeFour"
            :key="index"
          >
            <div class="card moreAboutUsCard">
              <div class="card-body p-0 pt-3">
                <b-button
                  class="p-1 ml-2 text-primary"
                  variant="transparent"
                  @click="setEditMoreAboutUs(moreAboutUs)"
                  style="position: absolute; top: 5%; right: 5%; z-index: 1;"
                >
                  <i class="fas fa-pen p-0 "></i
                ></b-button>
                <div class="media">
                  <div class="media-body overflow-hidden">
                    <div class="row ">
                      <div class="col-12 text-center">
                        <div class="mb-4">
                          <img
                            height="120"
                            :src="getImage(moreAboutUs.imagePath)"
                            alt=""
                            class="rounded"
                          />
                        </div>
                        <p class="border-top mb-2 pt-2 pl-2 pr-2">
                          <span class="font-weight-bold "
                            >{{ moreAboutUs.title }}
                          </span>
                        </p>
                        <p class="border-top mb-2 pt-2 pl-2 pr-2 ">
                          {{ moreAboutUs.overview }}
                        </p>
                        <div class="card-body border-top p-1 pb-2 pt-2 ">
                          <a :href="moreAboutUs.description">{{
                            moreAboutUs.description
                          }}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- {{ typeFour }} -->
        </div>
        <div
          v-else
          class="d-flex  align-content-center justify-content-center mb-4"
        >
          <img
            src="../../../../assets/images/langnotfound.png"
            style="max-width:20%; "
            class="d-block justify-self-center"
            alt=""
          />
        </div>
      </div>
    </div>
    <div class="text-center">
      <b-button class="p-1 ml-2" variant="success" @click="setAddMoreAboutUs()"
        >Add New More About Us <i class="fas fa-plus"></i
      ></b-button>
      <b-modal
        size="lg"
        centered
        v-model="addMoreAboutUs.show"
        title="Add an About Us to Your Company"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <form @submit.prevent="POST_ADD_MOREABOUTUS">
          <div class="row">
            <div class="col-6">
              <div class="inputcontainer">
                <label for="title" class="contents-title font-weight-bold animatedLabel "
                  >Title:</label
                >
                <input
                  name="title"
                  id="title"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addMoreAboutUs.Title"
                  maxlength="256"
                  minlength="10"
                  type="text"
                  required
                />
              </div>
              <div class="inputcontainer">
                <label
                  for="description"
                  class="contents-title font-weight-bold animatedLabel"
                  >Link:</label
                >
                <textarea
                  name="description"
                  id="description"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addMoreAboutUs.Description"
                  rows="2"
                  minlength="1"
                  required
                >
                </textarea>
              </div>
              <div class="inputcontainer">
                <label for="overview" class="contents-title font-weight-bold animatedLabel"
                  >Overview:</label
                >
                <textarea
                  name="overiew"
                  id="overview"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addMoreAboutUs.Overview"
                  rows="5"
                  minlength="1"
                  required
                >
                </textarea>
              </div>
            </div>

            <div class="col-6">
              <span class="contents-title font-weight-bold">Image:</span>
              <div class="mt-3">
                <picture-input
                  ref="pictureInput"
                  width="270"
                  height="270"
                  margin="16"
                  accept="image/jpeg,image/png"
                  size="10"
                  button-class="btn"
                  :custom-strings="{
                    upload: '<h4>Buraya yükleyin!</h4>',
                    drag: '<h4>Resmi Buraya Sürükleyin</h4>',
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
  </div>
</template>

<script>
import api from "../../../../services/Api";
import $api from "../../../../services/Api";
import PictureInput from "vue-picture-input";
import {
  REQUEST_TO_PUT_SPECIFIC_COMPANY_MOREABOUTUS,
  REQUEST_TO_POST_SPECIFIC_COMPANY_MOREABOUTUS,
} from "../../../../services/Requests/MoreAboutUs";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck";
export default {
  components: {
    PictureInput,
  },
  props: {
    typeFour: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      newImageFile: null,
      editMoreAboutUs: {
        show: false,
        title: "",
        description: "",
        overview: "",
      },
      addMoreAboutUs: {
        show: false,
        Title: "",
        Description: "",
        Overview: "",
      },
      isLoading: false,
      editStatus: "",
    };
  },
  mixins: [requestResponseCheckMixin],
  methods: {
    getImage(image) {
      return api.image(image);
    },
    image: (image) => $api.image(image),
    onChange(image) {
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        this.newImageFile = this.$refs.pictureInput.file;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },

    setEditMoreAboutUs(moreAboutUs) {
      this.editMoreAboutUs = {
        id: moreAboutUs.id,
        show: true,
        title: moreAboutUs.title,
        description: moreAboutUs.description,
        overview: moreAboutUs.overview,
        imagePath: moreAboutUs.imagePath,
      };
    },
    setAddMoreAboutUs() {
      this.addMoreAboutUs = {
        show: true,
      };
    },
    async UPDATE_MOREABOUTUS() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("title", this.editMoreAboutUs.title);
      formData.append("description", this.editMoreAboutUs.description);
      formData.append("overview", this.editMoreAboutUs.overview);
      formData.append("image", this.newImageFile);
      const options = {
        params: {
          id: this.editMoreAboutUs.id,
        },
      };

      const response = await REQUEST_TO_PUT_SPECIFIC_COMPANY_MOREABOUTUS(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.editMoreAboutUs);
      if (response.message === "OK") {
        this.$emit("refresh", 4, "typeFour");
      }
    },
    async POST_ADD_MOREABOUTUS() {
      if (this.newImageFile === null)
        return this.sendNotification(
          "Uyarı",
          "Resim yüklemeniz gerekmektedir.",
          "danger"
        );
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.addMoreAboutUs.Title);
      formData.append("Description", this.addMoreAboutUs.Description);
      formData.append("Overview", this.addMoreAboutUs.Overview);
      formData.append("Degrees", "");
      formData.append("Image", this.newImageFile);
      formData.append("Language", "TR");
      formData.append("Type", 4);
      const options = {
        query: {
          companyId: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_POST_SPECIFIC_COMPANY_MOREABOUTUS(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.addMoreAboutUs);
      if (response.message === "OK") {
        this.$emit("refresh", 4, "typeFour");
      }
    },
  },
};
</script>

<style scoped>
.moreAboutUsCard {
  height: 92.5%;
}
</style>
