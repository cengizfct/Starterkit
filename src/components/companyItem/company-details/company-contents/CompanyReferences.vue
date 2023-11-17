<template>
  <div class="container p-0">
    <form @submit.prevent>
      <b-modal
        size="lg"
        centered
        v-model="editReference.show"
        title="Edit Reference of Your Company"
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
                v-model="editReference.title"
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
                v-model="editReference.description"
                rows="2"
                minlength="1"
              >
              </textarea>
            </div>
          </div>

          <div class="col-6">
            imagepath {{ newImageFile }}
            <span class="contents-title font-weight-bold ">Image:</span>
            <div class="d-flex align-items-center justify-content-center mt-3">
              <picture-input
                ref="pictureInput"
                width="300"
                height="150"
                :prefill="image(editReference.imagePath)"
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
              @click="UPDATE_REFERENCE()"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              <span v-else>Kaydet</span>
            </b-button>
          </div>
        </div>
      </b-modal>
    </form>
    <div class="">
      <p
        class="mb-4 m-2 h3 border-bottom border-dark d-inline-block"
        style="font-family: 'Nunito',sans-serif;"
      >
        Sponsors/References
      </p>
    </div>
    <div
      v-if="typeThree[0]"
      class="pl-2 pr-1  d-flex flex-wrap justify-content-stretch referenceContainer row"
    >
      <div
        class=" col-xl-3 col-lg-4 col-md-4  col-6 p-1  mr-0 mb-2  "
        v-for="(reference, index) in typeThree"
        :key="index"
      >
        <div class="card reference mb-3 ml-">
          <div class="card-body p-0 pt-3">
            <b-button
              class="p-1 ml-2 text-primary"
              variant="transparent"
              @click="setEditReference(reference)"
              style="position: absolute; top: 5%; right: 5%; z-index: 1;"
            >
              <i class="fas fa-pen p-0 "></i
            ></b-button>
            <div class="media">
              <div class="media-body overflow-hidden">
                <div class="row ">
                  <div class="col-12 text-center">
                    <div class="d-inline-block"></div>
                    <div class="mb-4">
                      <img
                        height="60"
                        :src="getImage(reference.imagePath)"
                        alt=""
                        class="rounded"
                      />
                    </div>
                    <p>
                      <span class="font-weight-bold "> </span>
                      {{ reference.title }}
                    </p>
                    <div class=" card-body border-top p-1 pt- ">
                      <a target="_blank" :href="reference.description">{{
                        reference.description
                      }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
    <div class="text-center">
      <b-button class="p-1 ml-2" variant="success" @click="setAddReference()"
        >Add New Reference <i class="fas fa-plus"></i
      ></b-button>
      <b-modal
        size="lg"
        centered
        v-model="addReference.show"
        title="Add a Reference to Your Company"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <form @submit.prevent="POST_ADD_REFERENCES">
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
                  v-model="addReference.Title"
                  maxlength="256"
                  minlength="1"
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
                  v-model="addReference.Description"
                  rows="3"
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
                  width="150"
                  height="150"
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
  REQUEST_TO_PUT_SPECIFIC_COMPANY_REFERENCES,
  REQUEST_TO_POST_SPECIFIC_COMPANY_REFERENCES,
} from "../../../../services/Requests/References";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck";
export default {
  components: {
    PictureInput,
  },
  props: {
    typeThree: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      newImageFile: null,
      editReference: {
        show: false,
        title: "",
        description: "",
      },
      addReference: {
        show: false,
        Title: "",
        Description: "",
      },
      editStatus: "",
      addStatus: "",
      isLoading: false,
    };
  },
  mixins: [requestResponseCheckMixin],
  methods: {
    getImage(image) {
      return api.image(image);
    },
    image: (image) => $api.image(image),
    setEditReference(reference) {
      this.editReference = {
        id: reference.id,
        show: true,
        title: reference.title,
        description: reference.description,
        imagePath: reference.imagePath,
      };
    },
    setAddReference() {
      this.addReference = {
        show: true,
      };
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

    async UPDATE_REFERENCE() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("title", this.editReference.title);
      formData.append("description", this.editReference.description);
      formData.append("image", this.newImageFile);
      const options = {
        params: {
          id: this.editReference.id,
        },
      };

      const response = await REQUEST_TO_PUT_SPECIFIC_COMPANY_REFERENCES(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.editReference);
      if (response.message === "OK") {
        this.$emit("refresh", 3, "typeThree");
      }
    },

    async POST_ADD_REFERENCES() {
      if (this.newImageFile === null)
        return this.sendNotification(
          "Uyarı",
          "Resim yüklemeniz gerekmektedir.",
          "danger"
        );
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.addReference.Title);
      formData.append("Description", this.addReference.Description);
      formData.append("Language", "TR");
      formData.append("Overview", "xx");
      formData.append("Image", this.newImageFile);
      formData.append("Type", 3);
      const options = {
        query: {
          companyId: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_POST_SPECIFIC_COMPANY_REFERENCES(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.addReference);
      if (response.message === "OK") {
        this.$emit("refresh", 3, "typeThree");
      }
    },
  },
};
</script>

<style scoped>
.reference {
  width: 98%;
  height: 100%;
}
</style>
