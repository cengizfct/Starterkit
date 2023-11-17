<template>
  <div
    class="row d-flex  justify-content-center page"
    style="min-width: none;300px"
  >
  
    <div class=" col-xl-6 col-md-8 col-sm-10 col-12 ">
      <div class="card p-3">
          <h2 class="text-center mb-2 font-weight-bold border-bottom">Add a New Company</h2>
      <form @submit="nextStep">
        <div>
          <p class="text-center mb-0"> {{ step }}/4</p>
          <b-progress
            :value="step * 25"
            :max="100"
            variant="success"
            class=" bg-light  p-0"
          ></b-progress>
          <div
            class=" mt-0 row align-items-center justify-content-center "
          >
            <div class="p-2 w-100  ">
              <div class="ml-3 mr-3" v-if="step == 1">
                <h3 class="text-center "><span class="badge badge-pill badge-info">Info</span></h3>
                <div class="mb-2">
                  <label class="row"  for="name" >Company Name:</label>
                  <div class="row ">
                    <span v-if="form.name === '' " class="placeholder mt-2 pt-1 font-italic">Your Company Name...</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-user"></i
                    ></span>
                    <input
                      ref="name"
                      v-model="form.name"
                      type="text"
                      class="formarea d-inline col-10"
                      required
                    />
                  </div>
                </div>

                <div class="mb-2">
                  <label class="row" for="email">Email:</label>
                  <div class="row">
                    <span v-if="form.email === '' " class="placeholder mt-2 pt-1 font-italic">example@gmail.com</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-envelope"></i
                    ></span>
                    <input
                      v-model="form.email"
                      type="email"
                      class="formarea d-inline col-10"
                      required
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="password">Password:</label>
                  <div class="row">
                    <span v-if="form.password === '' " class="placeholder mt-2 pt-1 font-italic">Your Password...</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-lock"></i
                    ></span>
                    <input
                      v-model="form.password"
                      type="password"
                      class="formarea d-inline col-10"
                      minlength="3"
                      required
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="phone">Phone:</label>
                  <div class="row">
                    <span v-if="form.phone === '' " class="placeholder mt-2 pt-1 font-italic">0123 456 7890</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-phone"></i
                    ></span>
                    <input
                      v-model="form.phone"
                      type="number"
                      class="formarea d-inline col-10"
                      required
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="address">Address:</label>
                  <div class="row">
                    <span v-if="form.address === '' " class="placeholder mt-2 pt-1 font-italic">Izmir, Turkey</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-map-marker-alt"></i
                    ></span>
                    <input
                      v-model="form.address"
                      type="text"
                      class="formarea d-inline col-10"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="ml-3 mr-3" v-if="step == 2">
                <h3 class="text-center "><span class="badge badge-pill badge-info">Social</span></h3>
                <div class="mb-2">
                  <label class="row" for="twitter">Twitter:</label>
                
                  <div class="row">
                      <span v-if="form.twitter === '' " class="placeholder mt-2 pt-1 font-italic">https://twitter.com/example</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fab fa-twitter"></i
                    ></span>
                    <input
                      ref="twitter"
                      v-model="form.twitter"
                      type="text"
                      class="formarea d-inline col-10"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="instagram">Instagram:</label>
                  <div class="row">
                    <span v-if="form.instagram === '' " class="placeholder mt-2 pt-1 font-italic">https://instagram.com/example</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fab fa-instagram"></i
                    ></span>
                    <input
                      ref="instagram"
                      v-model="form.instagram"
                      type="text"
                      class="formarea d-inline col-10"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="linkedin">LinkedIn:</label>
                  <div class="row">
                    <span v-if="form.linkedin === '' " class="placeholder mt-2 pt-1 font-italic">https://linkedin.com/example</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fab fa-linkedin"></i
                    ></span>
                    <input
                      ref="linkedin"
                      v-model="form.linkedin"
                      type="text"
                      class="formarea d-inline col-10"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="facebook">Facebook:</label>
                  <div class="row">
                    <span v-if="form.facebook === '' " class="placeholder mt-2 pt-1 font-italic">https://facebook.com/example</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fab fa-facebook"></i
                    ></span>
                    <input
                      ref="facebook"
                      v-model="form.facebook"
                      type="text"
                      class="formarea d-inline col-10"
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="youtube">Youtube:</label>
                  <div class="row">
                    <span v-if="form.youtube === '' " class="placeholder mt-2 pt-1 font-italic">https://youtube.com/example</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fab fa-youtube"></i
                    ></span>
                    <input
                      ref="youtube"
                      v-model="form.youtube"
                      type="text"
                      class="formarea d-inline col-10"
                    />
                  </div>
                </div>
              </div>

              <div class="ml-3 mr-3" v-if="step == 3">
                <h3 class="text-center "><span class="badge badge-pill badge-info">Web</span></h3>
                <div class="mb-2">
                  <label class="row" for="website">Website:</label>
                  <div class="row">
                    <span v-if="form.website === '' " class="placeholder mt-2 pt-1 font-italic">www.example.com</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-paperclip"></i
                    ></span>
                    <input
                      ref="website"
                      v-model="form.website"
                      type="text"
                      class="formarea d-inline col-10"
                      required
                      
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="panelwebsite">Panel Website:</label>
                  <div class="row">
                    <span v-if="form.panelwebsite === '' " class="placeholder mt-2 pt-1 font-italic">www.example.com</span>
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-sitemap"></i
                    ></span>
                    <input
                      ref="panelwebsite"
                      v-model="form.panelwebsite"
                      type="text"
                      class="formarea d-inline col-10"
                      required
                    />
                  </div>
                </div>
                <div class="mb-2">
                  <label class="row" for="videopath">Video Path:</label>
                  <div class="row">
                    <span class="col-2  formlogo text-white "
                      ><i class="fas fa-video"></i
                    ></span>
                    <input
                      ref="videopath"
                      v-model="form.videopath"
                      type="text"
                      class="formarea d-inline col-10"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="ml-3 mr-3" v-if="step == 4">
                <h3 class="text-center "><span class="badge badge-pill badge-info">Logo</span></h3>

                <div class="mb-2 pt-2 ">
                  <div
                    class="d-flex align-items-center justify-contents-center"
                  >
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
              <div class="text-right">
                <b-button v-if="step !==1"
                  variant="secondary"
                  class="m-1 "
                  @click.prevent="previousStep"
                  ><i class="fas fa-arrow-left mr-2"></i>Previous </b-button
                >
                <b-spinner small v-if="isLoading"></b-spinner>
                <b-button v-else variant="primary" class="m-1 " type="submit"> {{
                  buttonText 
                }} <i v-if="step !== 4" class="ml-2 fas fa-arrow-right"></i> <i v-else class="ml-2 fas fa-paper-plane"></i></b-button>
              </div>
            </div>
          </div>
        </div>
      </form>
      </div>
    
    </div>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import { REQUEST_TO_POST_COMPANY } from "../../../services/Requests/Companies";
import {REQUEST_TO_POST_COMPANY_SETTINGS} from "../../../services/Requests/Settings";
import requestResponseCheckMixin from "../../../mixins/requestResponseCheck";
export default {
  components: { PictureInput },
  mixins: [requestResponseCheckMixin],
  data() {
    return {
      step: 1,
      text: "Next",
      form: {
        name: "",
        address: "",
        phone: "",
        email: "",
        password: "",
        twitter: "",
        instagram: "",
        linkedin: "",
        facebook: "",
        youtube: "",
        website: "",
        panelwebsite: "",
        baseurl: "",
        logo: "",
        aboutimage: "",
        bannerimage: "",
        video: "",
        videopath: "",
        tags: "",
        components:
          "Banner,Types,WebSiteVideo,Showcase,PopularCategories,About1,PopularProducts,Sponsor",
        departmentid: 1,
      },
      isLoading: false,
    };
  },
  computed: {
    buttonText() {
      if (this.step < 4) {
        return "Next";
      } else {
        return "Submit";
      }
    },
  },
  methods: {
    previousStep() {
      if (this.step - 1 > 0) {
        this.step--;
      }
    },
    nextStep(e) {
      e.preventDefault();
      if (this.step === 4) {
        this.POST_COMPANY();
      }
      if (this.step + 1 < 5) {
        this.step++;
      }
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

    async POST_SETTINGS(id) {
     
      const options = {
        query: {
          companyId: id,
        },
      };

      const settingsResponse = await REQUEST_TO_POST_COMPANY_SETTINGS(options, {
        primaryColor: "#000",
        themeColor: "#000",
        bannerColor: "#000",
        isFile: 0,
        isBook: 0,
        isCourse: 0,
        isPhone: 0,
        popularity: "desc",
      });
     
      this.isLoading = false;
      if (settingsResponse.message === "OK") {
        this.sendNotification("Uyarı", "İşlem Başarılı", "success");
      } else {
        this.sendNotification(
          "Uyarı",
          "Şirket Eklendi Fakat Ayarlar Eklenemedi",
          "warning"
        );
      }
    },

   

    async POST_COMPANY() {
      if (this.newImageFile === null)
        return this.sendNotification(
          "Uyarı",
          "Resim yüklemeniz gerekmektedir.",
          "danger"
        );
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Name", this.form.name);
      formData.append("Address", this.form.address);
      formData.append("Phone", this.form.phone);
      formData.append("Email", this.form.email);
      formData.append("Password", this.form.password);
      formData.append("Twitter", this.form.twitter);
      formData.append("Instagram", this.form.instagram);
      formData.append("Linkedin", this.form.linkedin);
      formData.append("Facebook", this.form.facebook);
      formData.append("Youtube", this.form.youtube);
      formData.append("Website", this.form.website);
      formData.append("PanelWebsite", this.form.panelwebsite);
      formData.append("BaseUrl", "api.cengizdeneme");
      formData.append("Logo", this.newImageFile);
      formData.append("AboutImage", "");
      formData.append("DefaultImage", this.newImageFile);
      formData.append("Video", "");
      formData.append("VideoPath", this.form.videopath);
      formData.append("Tags", "");
      formData.append("Components", this.form.components);
      formData.append("DepartmentId", this.form.departmentid);

      const options = {};

      const response = await REQUEST_TO_POST_COMPANY(options, formData);

      

      if (response.message === "OK") {
        this.POST_SETTINGS(response.data);
        this.$router.push("/companies")
      } else {
        this.sendNotification("Uyarı", "İşlem Başarısız", "danger");
      }
    },

  
  },
  mounted() {
    this.$refs.name.focus();
  },
};
</script>
<style scoped>
.page {
  height: 87.5vh;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  appearance: number;
  -moz-appearance: textfield;
}

.placeholder{
  font-size: 0.8em;
  
  transition: all 0.3s ease;
  pointer-events: none;
  color: gray;
  position: absolute;
  left: 20.5%;
  z-index: 1;
}

input:focus {
  outline: none;
}

.formarea {
  border: 2px solid #ff8a7b;
  border-radius: 10px;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-left: 0;
  height: 40px;
  
}



.formlogo {
  background: #ff8a7b;
  border-radius: 10px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.row:has(.formarea:focus) > .formarea{
  border: 2px solid #ff3e24;
  border-left: 0;
}
.row:has(.formarea:focus) > .formlogo{
  background: #ff3e24;;
}
.row:has(.formarea:focus) > .placeholder{
 opacity: 0;
}
.fas,
.fab {
  font-size: 1.1rem;
}

h1,
h2,
h3 {
  font-family: Nunito, sans-serif;
}
@media screen and (max-width: 767px) {
  input[type="text"],
  input[type="number"],
  input[type="email"],
  input[type="tel"],
  input[type="password"] {
    font-size: 16px;
  }
}
</style>
