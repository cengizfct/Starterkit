<template>
  <div class="container p-0"> 
   
    <div>
       <div class="card pt-2">
      <div style="position: absolute; right: 0; z-index: 1;">
        <b-button @click="setEditCompanyInfo()" variant="transparent"
          ><i class="fas fa-pen text-primary"></i
        ></b-button>
      </div>
      <div class="card-body pt-1 pb-1">
        <div class="row">
          <div class="col-lg-8 col-md-6 col-xs-12">
            <h2
              class="mb-0 companyName m-0 mt-0  h1"
              :style="{ color: titleColor }"
            >
              {{ company.name }}
            </h2>
            <div class=" d-flex align-items-center justify-content-center">
              <img
                :src="logo"
                alt="logo"
                class="logo p-0 rounded"
                style="width: 300px; max-height: 180px;"
              />
            </div>

            <p class="companyText text-justify font-size-14 mb-2 text-dark"></p>
          </div>
          <div
            class="col-lg-4 col-md-6 col-xs-12 d-flex flex-column justify-content-center"
          >
            <p class="mb-2">
              <span class="font-weight-bold">Address: </span>
              <span class="text-secondary">{{ company.address }} </span>
            </p>
            <p class="mb-2">
              <span class="font-weight-bold">Phone: </span>
              <span class="text-secondary">{{ company.phone }} </span>
            </p>
            <p class="mb-2">
              <span class="font-weight-bold">E-mail: </span>
              <span class="text-secondary">{{ company.email }} </span>
            </p>

            <p class="mb-2">
              <span class="font-weight-bold">Website: </span>
              <span class="text-secondary">
                <a target="_blank" :href="'https://' + company.website">
                  {{ company.website }}</a
                >
              </span>
            </p>
            <p class="mb-2 ">
              <span class="font-weight-bold">Panel Website: </span>
              <span class="text-secondary"
                ><a target="_blank" :href="'https://' + company.panelWebsite">
                  {{ company.panelWebsite }}</a
                >
              </span>
            </p>
            <p class="mb-2">
              <span class="mr-3 font-weight-bold">Social:</span>
              <a
                target="_blank"
                v-if="company.twitter && company.twitter !== 'null'"
                :href="company.twitter"
                ><i class="fab fa-twitter icon twitter mr-3"></i></a
              ><a
                target="_blank"
                v-if="company.instagram && company.instagram !== 'null'"
                :href="company.instagram"
                ><i class="fab fa-instagram icon instagram mr-3"></i
              ></a>
              <a
                target="_blank"
                v-if="company.linkedin && company.linkedin !== 'null'"
                :href="company.linkedin"
              >
                <i class="fab fa-linkedin icon linkedin mr-3"></i
              ></a>
              <a
                target="_blank"
                v-if="company.facebook && company.facebook !== 'null'"
                :href="company.facebook"
              >
                <i class="fab fa-facebook icon facebook mr-3"></i
              ></a>
              <a
                target="_blank"
                v-if="company.youtube && company.youtube !== 'null'"
                :href="company.youtube"
              >
                <i class="fab fa-youtube icon youtube"></i
              ></a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div></div>
    <b-modal
    size="lg"
    centered
    v-model="editCompanyInfo.show"
    title="Edit Your Company Information"
    ok-title="Kaydet"
    cancel-title="Kapat"
    @hide="() => (newImageFile = null)"
    hide-footer
    >
    <form @submit.prevent="UPDATE_COMPANY">
        <div class="row">
          <div class="col-6">
            <div class="inputcontainer">
              <label for="name" class="contents-title font-weight-bold animatedLabel "
                >Name:</label
              >
              <input
                name="name"
                id="name"
                class="textinput mb-2"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="editCompanyInfo.name"
              />
            </div>
            <span class="contents-title font-weight-bold ">Image:</span>

            <div class="d-flex align-items-center justify-content-center mt-3">
              <picture-input
                ref="pictureInput"
                width="300"
                height="210"
                margin="16"
                accept="image/jpeg,image/png"
                size="10"
                button-class="btn"
                :custom-strings="{
                  upload: '<h1>Buraya yükleyin!</h1>',
                  drag: '<h1>Buraya Sürükleyin</h1>',
                }"
                @change="onChange"
                :prefill="getImage(this.company.logo)"
              >
              </picture-input>
            </div>
          </div>
          <div class="col-6">
            <div class="inputcontainer">
              <label for="address" class="contents-title font-weight-bold  animatedLabel"
                >Address:</label
              >
              <input
                name="address"
                id="address"
                class="textinput"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="editCompanyInfo.address"
              />
            </div>
            <div class="inputcontainer">
              <label for="phone" class="contents-title font-weight-bold animatedLabel "
                >Phone:</label
              >
              <input
                name="phone"
                id="phone"
                class="textinput"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="editCompanyInfo.phone"
              />
            </div>
            <div class="inputcontainer">
              <label for="e-mail" class="contents-title font-weight-bold animatedLabel "
                >E-mail:</label
              >
              <input
                name="e-mail"
                id="e-mail"
                class="textinput"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="mail"
                v-model="editCompanyInfo.email"
              />
            </div>
            <div class="inputcontainer">
              <label for="website" class="contents-title font-weight-bold  animatedLabel"
                >Website:
                <i
                  class="fas fa-info-circle text-danger ml-0"
                  v-b-tooltip.right="{
                    variant: 'danger',
                    title:
                      'Website linkini değiştirmeden önce yazılım departmanıyla iletişime geçin.',
                  }"
                ></i
              ></label>
              <input
                name="website"
                id="website"
                class="textinput"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                v-model="editCompanyInfo.website"
                required
          
              />
            </div>
            <div class="inputcontainer">
              <label
                for="panelWebsite"
                class="contents-title font-weight-bold animatedLabel "
                >Panel Website:
                <i
                  class="fas fa-info-circle text-danger ml-2"
                  v-b-tooltip.right="{
                    variant: 'danger',
                    title:
                      'Panel linkini değiştirmeden önce yazılım departmanıyla iletişime geçin.',
                  }"
                ></i
              ></label>
              <input
                name="panelWebsite"
                id="panelWebsite"
                class="textinput"
                style="width: 100%;"
                maxlength="256"
                minlength="1"
                type="text"
                required
               v-model="editCompanyInfo.panelWebsite"
              />
            </div>
          </div>
          <div class="row pl-4 pr-4 mt-2 justify-content-between">
            <div class="col-2 border p-2">
              <div class="text-center">
                <label
                  for="twitter"
                  class="contents-title font-weight-bold mt-2"
                  ><i class="fab fa-twitter text-info h4"></i
                ></label>
                <input
                  name="twitter"
                  id="twitter"
                  class="textinput"
                  style="width: 100%;"
                  maxlength="256"
                  minlength="1"
                  type="text"
                  v-model="editCompanyInfo.twitter"
                />
              </div>
            </div>
            <div class="col-2 border p-2">
              <div class="text-center">
                <label
                  for="instagram"
                  class="contents-title font-weight-bold mt-2"
                  ><i class="fab fa-instagram text-danger h4"></i
                ></label>
                <input
                  name="instagram"
                  id="instagram"
                  class="textinput"
                  style="width: 100%;"
                  maxlength="256"
                  minlength="1"
                  type="text"
                  v-model="editCompanyInfo.instagram"
                />
              </div>
            </div>
            <div class="col-2 border p-2">
              <div class="text-center">
                <label
                  for="linkedin"
                  class="contents-title font-weight-bold mt-2"
                  ><i class="fab fa-linkedin text-primary h4"></i
                ></label>
                <input
                  name="linkedin"
                  id="linkedin"
                  class="textinput"
                  style="width: 100%;"
                  maxlength="256"
                  minlength="1"
                  type="text"
                  v-model="editCompanyInfo.linkedin"
                />
              </div>
            </div>
            <div class="col-2 border p-2">
              <div class="text-center">
                <label
                  for="youtube"
                  class="contents-title font-weight-bold mt-2"
                  ><i class="fab fa-youtube text-danger h4"></i
                ></label>
                <input
                  name="youtube"
                  id="youtube"
                  class="textinput"
                  style="width: 100%;"
                  maxlength="256"
                  minlength="1"
                  type="text"
                  v-model="editCompanyInfo.youtube"
                />
              </div>
            </div>
            <div class="col-2 border p-2">
              <div class="text-center">
                <label
                  for="facebook"
                  class="contents-title font-weight-bold mt-2"
                  ><i class="fab fa-facebook text-info h4"></i
                ></label>
                <input
                  name="facebook"
                  id="facebook"
                  class="textinput"
                  style="width: 100%;"
                  maxlength="256"
                  minlength="1"
                  type="text"
                  v-model="editCompanyInfo.facebook"
                />
              </div>
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
            type="submit"
              :disabled="isLoading"
              variant="primary"
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
import api from "../../../services/Api";
import PictureInput from "vue-picture-input";
import requestResponseCheckMixin from "../../../mixins/requestResponseCheck";
import { REQUEST_TO_PUT_COMPANY } from "../../../services/Requests/Companies";
export default {
  components: {
    PictureInput,
  },
  props: {
    company: {
      default: () => {},
      type: Object,
    },
    titleColor: {
      default: () => "",
      type: String,
    },
    activeSection: {
      default: () => "",
      type: String
    }
  },
  mixins: [requestResponseCheckMixin],
  data() {
    return {
      isLoading: false,
      newImageFile: null,
      editCompanyInfo: {
        show: false,
        name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
        panelWebsite: "",
        logo: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        facebook: "",
        youtube: "",
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
    logo() {
      return api.image(this.company.logo);
    },
  },
  methods: {
    setEditCompanyInfo() {
      this.editCompanyInfo = {
        show: true,
        name: this.company.name,
        address: this.company.address,
        phone: this.company.phone,
        email: this.company.email,
        website: this.company.website,
        panelWebsite: this.company.panelWebsite,
        logo: this.company.logo,
        twitter: this.company.twitter,
        instagram: this.company.instagram,
        linkedin: this.company.linkedin,
        facebook: this.company.facebook,
        youtube: this.company.youtube,
      };
    },
    async UPDATE_COMPANY() {
      this.isLoading = true;
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };
      const formData = new FormData();
      formData.append("Name", this.editCompanyInfo.name);
      formData.append("Address", this.editCompanyInfo.address);
      formData.append("Phone", this.editCompanyInfo.phone);
      formData.append("Email", this.editCompanyInfo.email);
      formData.append("Website", this.editCompanyInfo.website);
      formData.append("PanelWebsite", this.editCompanyInfo.panelWebsite);
      formData.append("Logo", this.newImageFile);
      formData.append("DefaultImage", this.newImageFile);
      if (this.editCompanyInfo.twitter === "") {
        this.editCompanyInfo.twitter = null;
      }
      if (this.editCompanyInfo.instagram === "") {
        this.editCompanyInfo.instagram = null;
      }
      if (this.editCompanyInfo.linkedin === "") {
        this.editCompanyInfo.linkedin = null;
      }
      if (this.editCompanyInfo.facebook === "") {
        this.editCompanyInfo.facebook = null;
      }
      if (this.editCompanyInfo.youtube === "") {
        this.editCompanyInfo.youtube = null;
      }

      formData.append("Twitter", this.editCompanyInfo.twitter);
      formData.append("Instagram", this.editCompanyInfo.instagram);
      formData.append("Linkedin", this.editCompanyInfo.linkedin);
      formData.append("Facebook", this.editCompanyInfo.facebook);
      formData.append("Youtube", this.editCompanyInfo.youtube);

      const response = await REQUEST_TO_PUT_COMPANY(options, formData);

      this.isLoading = false;
      this.requestResponseCheck(response, this.editCompanyInfo);
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
.logo {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  transform: scale(0.8);
}
.companyText {
  font-size: 18px !important;
  width: fit-content;
}
.companyName {
  letter-spacing: 4px;
  font-weight: bold;
  text-align: center;
  font-family: "Nunito", sans-serif;

  text-shadow: 0.1em 0.1em 0 hsla(200, 50%, 30%, 0.142);
}
.card {
  word-wrap: break-word;
  height: fit-content;
}

.icon {
  font-size: x-large;
  transition: all ease 0.2s;
}
.icon:hover {
  transform: translateY(-4px);
}
.instagram {
  color: rgb(228, 64, 95);
}
.twitter {
  color: rgb(29, 161, 242);
}
.linkedin {
  color: rgb(10, 102, 194);
}
.facebook {
  color: rgb(66, 103, 178);
}
.youtube {
  color: rgb(255, 0, 0);
}
</style>
