<template>
  <div class="container p-0">
    <scrolltop></scrolltop>
    <h1
      class="mb-4 m-2 text-center font-weight-bold"
      style="font-family: 'Nunito',sans-serif;"
    >
      <span> Components</span>
    </h1>
    <div v-if="isLoading" class="d-flex align-items-center justify-content-center">
       <loading></loading>
    </div>
   
    <div v-else>
      <div v-for="(list, i) in mainComponentList" :key="i">
        <p class="mb-4 m-2 h4 " style="font-family: 'Nunito',sans-serif;">
          <span class="border-bottom  border-dark">
            {{ list.component }}
          </span>
        </p>
        <div class="pl-2 pr-1  d-flex flex-wrap justify-content-stretch  row">
          <div
            class=" col-xl-6 col-lg-6 col-md-6  col-12 p-1  mr-0 mb-2"
            v-for="(component, index) in list.items"
            :key="index"
          >
            <div class="card">
              <div class="card-body p-0 pb-0">
                <div class="text-right">
                  <b-button
                    @click="setComponentForm(component)"
                    variant="transparent"
                    ><i class="fas fa-pen text-primary"></i
                  ></b-button>
                </div>
                <div class="text-center p-2">
                  <img
                    :src="getImage(component.image)"
                    :alt="component.name"
                    class="image rounded"
                    @click="setImageModal(component)"
                  />
                </div>
                <div class="text-center pt-2 pb-2 border-top ">
                  {{ component.name }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <b-button
            class="p-1 ml-2"
            variant="success"
            @click="setComponentForm(list)"
            >Add New {{ list.component }} Design <i class="fas fa-plus"></i
          ></b-button>
        </div>
      </div>
      <b-modal
        size="md"
        centered
        v-model="componentForm.show"
        :title="baseForm.formTitle"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <form
          @submit.prevent="
            REQUEST_COMPONENTS(componentForm.type, componentForm.request)
          "
        >
          <div class="row">
            <div class="col-12">
         
              <div>
                <label for="title" class="contents-title font-weight-bold mt-2 "
                  >Title:</label
                >
                <input
                  name="title"
                  id="title"
                  class="textinput"
                  style="width: 100%;"
                  v-model="componentForm.Name"
                  maxlength="256"
                  minlength="1"
                  type="text"
                  required
                />
              </div>
            </div>

            <div class="col-12">
              <span class="contents-title font-weight-bold">Image:</span>
              <div class="mt-3">
                <picture-input
                  ref="pictureInput"
                  width="400"
                  height="200"
                  margin="16"
                  accept="image/jpeg,image/png"
                  size="10"
                  :prefill="getImage(componentForm.Image)"
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
      <b-modal
        size="xl"
        centered
        v-model="imageModal.show"
        :title="imageModal.name"
        ok-title="Kaydet"
        cancel-title="Kapat"
        hide-footer
      >
    <img :src="getImage(imageModal.image)" width="100%">
    </b-modal>
    </div>
  </div>
</template>

<script>
import GetComponentMixin from "../../../mixins/GetComponents";
import requestResponseCheckMixin from "../../../mixins/requestResponseCheck";
import api from "../../../services/Api";
import loading from "../../../components/loading.vue";
import scrolltop from "../../../components/scrolltop.vue";

import {
  REQUEST_TO_POST_COMPONENTS,
  REQUEST_TO_PUT_COMPONENTS,
} from "../../../services/Requests/Components";
import PictureInput from "vue-picture-input";
export default {
  components: { PictureInput, loading,scrolltop },
  mixins: [GetComponentMixin, requestResponseCheckMixin],
  props: {
    componentList: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      isLoading: false,
      newImageFile: null,
      mainComponentList: [],
      componentForm: {
        show: false,
        Id: null,
        Name: "",
        Image: "",
        Type: null,
        IsActive: null,
      },
      imageModal:{
        show:false,
        name:"",
        Image:"",
      },
      baseForm: {
        formTitle: "",
      },
      editStatus: {
        text: "",
        variant: "",
        show: false,
        icon: "",
      },
    };
  },
  methods: {
    setComponentForm(item) {
      // if item.component -> gelen parametrenin bütün liste mi yoksa tek bir component itemi mi olduğunu kontrol eder
      if (item.component) {
        this.baseForm = {
          formTitle: item.component,
        };
        this.componentForm = {
          show: true,
          Type: item.type,
          Name: "",
          request: "POST",
        };
      } else {
        this.baseForm = {
          formTitle: "Edit " + item.name,
        };
        this.componentForm = {
          show: true,
          Id: item.id,
          Type: item.type,
          Name: item.name,
          Image: item.image,
          IsActive: item.isActive,
          request: "PUT",
        };
      } // else durumu eğer bir put işlemi yapılacaksa (yani tek bir gelen parametre tek bir component itemi ise) form alanlarının güncelleme öncesi haliyle hazır gözükmesini sağlar
    },
    setImageModal(item){
      this.imageModal = {
        show: true,
        name: item.name,
        image: item.image

      }
    },
    getImage(image) {
      return api.image(image);
    },
    async GET_ITEMS_OF_MAIN_COMPONENTS() {
      this.isLoading = true;
      for (let i = 0; i < this.mainComponentList.length; i++) {
        const element = this.mainComponentList[i];
        const response = await this.GET_COMPONENTS_BY_TYPE(element.type);
        this.mainComponentList[i].items = response.items;
        this.mainComponentList[i].count = response.count;
      }
      this.isLoading = false;
    },
    async REQUEST_COMPONENTS(type, request) {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Name", this.componentForm.Name);
      if (this.newImageFile) formData.append("Image", this.newImageFile);
      formData.append("Type", this.componentForm.Type);

      if (request === "POST") {
        if (this.newImageFile === null)
          return this.sendNotification(
            "Uyarı",
            "Resim yüklemeniz gerekmektedir.",
            "danger"
          );
        const options = {};
        const response = await REQUEST_TO_POST_COMPONENTS(options, formData);

        this.isLoading = false;
        this.requestResponseCheck(response, this.componentForm);
        if (response.message === "OK") {
          //
        }
      }
      if (request === "PUT") {
        formData.append("Id", this.componentForm.Id);
        formData.append("IsActive", this.componentForm.IsActive);
        const options = {
          params: {
            id: this.componentForm.Id,
          },
        };
        const response = await REQUEST_TO_PUT_COMPONENTS(options, formData);

        this.isLoading = false;
        this.requestResponseCheck(response, this.componentForm);
        if (response.message === "OK") {
          //
        }
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
  },
  mounted() {
    this.componentList.forEach((comp) => {
      const index = this.componentAllList.findIndex((list) =>
        comp.includes(list.name)
      );

      if (index > -1)
        this.mainComponentList.push({
          component: this.componentAllList[index].name,
          type: this.componentAllList[index].type,
          value: comp,
          count: 0,
          items: [],
        });
    });
    const notIncludesItems = this.componentAllList.filter((cal) => {
      return !this.mainComponentList
        .map((mcl) => mcl.component)
        .includes(cal.name);
    });
    this.mainComponentList.push(
      ...notIncludesItems.map((item) => ({
        component: item.name,
        type: item.type,
        value: "",
        items: [],
        count: 0,
      }))
    );
    this.GET_ITEMS_OF_MAIN_COMPONENTS();
  },
};
</script>
<style scoped>
.image {
  width: 100%;
  cursor: pointer;
}
.card {
  height: 95%;
}
</style>
