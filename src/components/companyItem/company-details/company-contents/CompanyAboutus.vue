<template>
  <div>
    <b-modal
      size="lg"
      centered
      v-model="editAboutUs.show"
      title="Edit Contents of Your Page"
      ok-title="Kaydet"
      cancel-title="Kapat"
      @hide="() => (newImageFile = null)"
      hide-footer
    >
      <form @submit.prevent>
        <div class="row">
          <div class="col-6">
            <div class="inputcontainer">
              <label for="title" class="contents-title font-weight-bold animatedLabel "
                >Title:</label
              >
              <input
                name="title"
                id="title"
                class="textinput mb-2"
                style="width: 100%;"
                v-model="editAboutUs.title"
                maxlength="256"
                minlength="1"
                type="text"
              />
            </div>
            <div class="inputcontainer">
              <label
                for="description"
                class="contents-title font-weight-bold animatedLabel"
                >Description:</label
              >
              <textarea
                name="description"
                id="description"
                class="textinput mb-2"
                style="width: 100%;"
                v-model="editAboutUs.description"
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
                v-model="editAboutUs.overview"
                rows="7"
                minlength="1"
              >
              </textarea>
            </div>
          </div>

          <div class="col-6 mb-3">
            <span class="contents-title font-weight-bold">Image:</span>
            <div class=" mt-3">
              <img :src="newImageUri" v-if="newImageFile" width="100%" alt="" />
              <picture-input
                ref="pictureInput"
                v-show="!newImageUri"
                width="330"
                height="330"
                :prefill="image(editAboutUs.imagePath)"
                margin="16"
                accept="image/jpeg,image/png"
                size="10"
                button-class="btn btn-primary"
                :custom-strings="{
                  upload: '<h1>Buraya yükleyin!</h1>',
                  drag: '<h1>Buraya Sürükleyin</h1>',
                }"
                @change="onChange"
              >
              </picture-input>
              <div class="text-center">
                <b-button variant="primary" class="mt-3" v-if="newImageUri" @click="$refs.pictureInput.selectImage()">Yeni resim seç.</b-button>
               
              </div>
             
            </div>
          </div>
          <div class="col-12" v-if="showCanvas">
              <canvas
                id="canvas"
                :style="`background: ${primaryColor};`"
                width="654"
                height="654"
              ></canvas>
            </div>
          <div class="col-12">
            <span class="contents-title font-weight-bold ">Degrees:</span>
            <vue-editor class="" v-model="editAboutUs.degrees" :editor-toolbar="customToolbar"></vue-editor>
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
            <b-button variant="secondary" class="ml-2">İptal Et</b-button>
            <b-button
              :disabled="isLoading"
              variant="primary"
              class="ml-2"
              @click="UPDATE_ABOUTUS()"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              <span v-else>Kaydet</span>
            </b-button>
          </div>
        </div>
      </form>
    </b-modal>
    <div v-if="!typeTwo[0]" class="container p-0">
      <p
            class="mb-0 m-2   h3  border-bottom border-dark d-inline-block"
            style="font-family: 'Nunito',sans-serif;"
          >
           About Us
          </p>
          <div class="text-center">
              <img
            src="../../../../assets/images/langnotfound.png"
            style="max-width:20%; "
            class="mb-4"
            alt=""
          />
          </div>
        
    </div>
    
    <div class="container p-0" v-for="(about, i) in typeTwo" :key="i">
      <div class="card pb-2">
        <div class="card-body">
          <div class="media">
            <div class="media-body overflow-hidden">
              <p class="mb-0 m-2   h3  border-bottom d-inline-block">
                <i class="fas fa-address-card mr-2"></i> About Us [{{
                  about.language
                }}]
              </p>
              <div class="d-inline-block">
                <b-button
                  class="p-1 ml-2"
                  variant="primary"
                  @click="setEditAboutUs(about)"
                  ><i class="fas fa-pen"></i
                ></b-button>
              </div>

              <div class="row">
                <div class="col-lg-6 col-md-6 col-xs-12 border-right">
                  <div class="ml-2">
                         <p>
                    <span class="font-weight-bold ">Title: </span>
                    <span class="text-secondary">{{ about.title }} </span>
                  </p>
                  <p>
                    <span class="font-weight-bold ">Description: </span>
                    <span class="text-secondary">{{ about.description }} </span>
                  </p>
                  <span class="font-weight-bold d-block">Image: </span>
                  <div class=" text-center">
                    <p>
                      <span class="text-secondary">
                        <br /><img
                          :src="image(about.imagePath)"
                          style="max-width:75% ;"
                          alt=""
                        />
                      </span>
                    </p>
                  </div> 
                  </div>
            
                </div>
                <div class="col-lg-6 col-md-6 col-xs-12 border-right">
                  <div class="ml-2">
                      <p>
                    <span class="font-weight-bold ">Degrees: </span>
                  </p>
                  <div v-html="about.degrees"></div>

                  <p>
                    <span class="font-weight-bold ">Overview: </span>
                    <span class="text-secondary">{{ about.overview }} </span>
                  </p>
                  </div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <b-button class="p-1 ml-2" variant="success" @click="setAddAboutUs()"
        >Add New About Us <i class="fas fa-plus"></i
      ></b-button>
      <b-modal
        size="lg"
        centered
        v-model="addAboutUs.show"
        title="Add an About Us to Your Company"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <form @submit.prevent="POST_ADD_ABOUTUS">
          <div class="row">
            <div class="col-6">
              <div class="inputcontainer">
                <label
                  for="Language"
                  class="contents-title font-weight-bold animatedLabel "
                  >Language</label
                >
                <select
                  name="Language"
                  id="Language"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addAboutUs.Language"
                >
                  <option value="TR" selected>TR</option>
                  <option value="EN">EN</option>
                  <option value="DE">DE</option>
                </select>
              </div>
              <div class="inputcontainer">
                <label for="title" class="contents-title font-weight-bold animatedLabel "
                  >Title:</label
                >
                <input
                  name="title"
                  id="title"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addAboutUs.Title"
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
                  >Description:</label
                >
                <textarea
                  name="description"
                  id="description"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addAboutUs.Description"
                  rows="2"
                  minlength="1"
                  required
                >
                </textarea>
              </div >
              <div class="inputcontainer">
                <label for="overview" class="contents-title font-weight-bold animatedLabel"
                  >Overview:</label
                >
                <textarea
                  name="overiew"
                  id="overview"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addAboutUs.Overview"
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
                <img :src="newImageUri" v-if="newImageFile" style="border-radius: 40px;" width="100%" alt="" />
                <picture-input
                  ref="pictureInput"
                  v-show="!newImageUri"
                  width="330"
                  height="330"
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
                <div class="text-center">
                     <b-button variant="primary" class="mt-3" v-if="newImageUri" @click="$refs.pictureInput.selectImage()">Yeni resim seç.</b-button>
              
                </div>
             </div>
            </div>
            <div class="col-12" v-if="showCanvas">
              <canvas
                id="canvas"
                :style="`background: ${primaryColor};`"
                width="654"
                height="654"
              ></canvas>
            </div>
            <div class="col-12">
              <span class="contents-title font-weight-bold ">Degrees:</span>
              <vue-editor
                class=""
                v-model="addAboutUs.Degrees"
                :editor-toolbar="customToolbar"
              ></vue-editor>
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
import { VueEditor } from "vue2-editor/dist/vue2-editor.core.js";
import {
  REQUEST_TO_PUT_SPECIFIC_COMPANY_ABOUTUS,
  REQUEST_TO_POST_SPECIFIC_COMPANY_ABOUTUS,
} from "../../../../services/Requests/AboutUs";
import PictureInput from "vue-picture-input";
import $api from "../../../../services/Api";
import FormData from "form-data";
import { dataURItoBlob } from "../../../../helpers/canvasBlobToFile";
import html2canvas from "html2canvas";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck"
export default {
  components: {
    VueEditor,
    PictureInput,
  },
  data() {
    return {
      newImageFile: null,
      newImageUri: null,
      showCanvas: false,
      isLoading: false,
      editAboutUs: {
        show: false,
        title: "",
        description: "",
        overview: "",
      },
      addAboutUs: {
        show: false,
        Title: "",
        Description: "",
        Overview: "",
        Language: "",
        Image: "",
        Degrees: "",
      },
      editStatus: "",
      customToolbar:[
        [{}]
      ]
    };
  },
  props: {
    typeTwo: {
      default: () => [],
      type: Array,
    },
    primaryColor: {
      default: "purple",
    },
  },
  mixins:[requestResponseCheckMixin],
  methods: {
    image: (image) => $api.image(image),
    setEditAboutUs(about) {
     
      this.editAboutUs = {
        id: about.id,
        show: true,
        title: about.title,
        description: about.description ,
        overview: about.overview,
        degrees: about.degrees,
        imagePath: about.imagePath,
      };
    },
    setAddAboutUs() {
      this.addAboutUs = {
        show: true,
        Language: "TR",
        Degrees:"<li> </li>"
      };
    },
    async UPDATE_ABOUTUS() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.editAboutUs.title);
      formData.append("Description", this.editAboutUs.description);
      formData.append("Overview", this.editAboutUs.overview);
      formData.append("Degrees", this.editAboutUs.degrees);
      formData.append("ContentImage", this.newImageFile);
      const options = {
        params: {
          id: this.editAboutUs.id,
        },
      };
        const response = await REQUEST_TO_PUT_SPECIFIC_COMPANY_ABOUTUS(
          options,
          formData
        );

      
        this.isLoading = false;
    this.requestResponseCheck(response,this.editAboutUs)
    if(response.message === "OK"){
      this.$emit("refresh",2, 'typeTwo')
     }
    },
    async POST_ADD_ABOUTUS() {
      
      if (!this.addAboutUs.Degrees)
        return this.sendNotification(
          "Uyarı",
          "Degrees kısmını doldurmanız zorunludur.",
          "danger"
        );
      if (this.newImageFile === null)
        return this.sendNotification(
          "Uyarı",
          "Resim yüklemeniz gerekmektedir.",
          "danger"
        );
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.addAboutUs.Title);
      formData.append("Description", this.addAboutUs.Description);
      formData.append("Overview", this.addAboutUs.Overview);
      formData.append("Degrees", this.addAboutUs.Degrees);
      formData.append("Image", this.newImageFile);
      formData.append("Language", this.addAboutUs.Language);
      formData.append("Type", 2);
      const options = {
        query: {
          companyId: this.$route.params.id,
        },
      };
     
        const response = await REQUEST_TO_POST_SPECIFIC_COMPANY_ABOUTUS(
          options,
          formData
        );
        this.isLoading = false;
      this.requestResponseCheck(response,this.addAboutUs)
      if(response.message === "OK"){
      this.$emit("refresh",2, 'typeTwo')
     }
    },
    CAPTURE_IMAGE() {
      html2canvas(document.querySelector("#canvas")).then((canvas) => {
        this.CREATE_IMAGE(canvas);
      });
    },
    async CREATE_IMAGE(canvas) {
      const response = await dataURItoBlob(canvas);
  
      this.newImageFile = response.file;
      this.newImageUri = URL.createObjectURL(response.blob);
      this.showCanvas = false
    },
    async SET_CANVAS_TO_FILE(uri) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var img = new Image();
      const vm = this;
      img.onload = function() {
        roundedImage(25, 0, 630, 630, 40);
        ctx.clip();
        ctx.drawImage(img, 25, 0, 630, 630);
        vm.CAPTURE_IMAGE()
      };
      img.src = uri;

      function roundedImage(x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(
          x + width,
          y + height,
          x + width - radius,
          y + height
        );
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }
    },
    onChange(image) {
      this.showCanvas = true;
      console.log(this.$refs.pictureInput);
      console.log("New picture selected!");
      if (image) {
        console.log("Picture loaded.");
        setTimeout(() => {
          this.SET_CANVAS_TO_FILE(image);
        }, 20);
        this.newImageFile = this.$refs.pictureInput.file;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
  },
};
</script>
<style lang="css">
@import "~vue2-editor/dist/vue2-editor.css";

/* Import the Quill styles you want */
#canvas {
  border-radius: 40px;
  background: purple;
}

@import "~quill/dist/quill.snow.css";
.ql-editor {
  min-height: 200px;
  font-size: 16px;
}
.ql-snow .ql-stroke.ql-thin,
.ql-snow .ql-thin {
  stroke-width: 1px !important;
}
.quillWrapper .ql-snow.ql-toolbar {
  padding-top: 8px;
  padding-bottom: 4px;
}
.quillWrapper .ql-snow.ql-toolbar .ql-formats {
  margin-bottom: 10px;
}
.ql-snow .ql-toolbar button svg,
.quillWrapper .ql-snow.ql-toolbar button svg {
  width: 22px;
  height: 22px;
}
.quillWrapper .ql-editor ul[data-checked="false"] > li::before,
.quillWrapper .ql-editor ul[data-checked="true"] > li::before {
  font-size: 1.35em;
  vertical-align: baseline;
  bottom: -0.065em;
  font-weight: 900;
  color: #222;
}
.quillWrapper .ql-snow .ql-stroke {
  stroke: rgba(63, 63, 63, 0.95);
  stroke-linecap: square;
  stroke-linejoin: initial;
  stroke-width: 1.7px;
}
.quillWrapper .ql-picker-label {
  font-size: 15px;
}
.quillWrapper .ql-snow .ql-active .ql-stroke {
  stroke-width: 2.25px;
}
.quillWrapper .ql-toolbar.ql-snow .ql-formats {
  vertical-align: top;
}
.ql-picker:not(.ql-background) {
  position: relative;
  top: 2px;
}
.ql-picker.ql-color-picker svg {
  width: 22px !important;
  height: 22px !important;
}
.quillWrapper .imageResizeActive img {
  display: block;
  cursor: pointer;
}
.quillWrapper .imageResizeActive ~ div svg {
  cursor: pointer;
}


</style>
