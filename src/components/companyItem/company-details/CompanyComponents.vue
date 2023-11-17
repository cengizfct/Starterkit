<template>
  <div class="container p-0 mb-4">
    <div class="text-center">
      <p
        class=" mb-4 m-2 h3 border-bottom border-dark d-inline-block"
        style="font-family: 'Nunito',sans-serif;"
      >
        Components
      </p>
      <p class="ml-2">Choose how your website looks like, part by part</p>
    </div>

    <div>
      <b-alert variant="success" show dismissible>
        <i class="fas fa-info-circle mr-2"></i> At first, choose how you want
        your website parts look</b-alert
      >
      <div v-for="(list, i) in mainComponentList" :key="i">
        <p class="mb-4 m-2 h4 " style="font-family: 'Nunito',sans-serif;">
          <span class="border-bottom  border-dark">
            {{ list.component }}
          </span>
        </p>
        <div class="pl-2 pr-1  d-flex flex-wrap justify-content-stretch  row">
          <div
            class=" col-xl-6 col-lg-6 col-md-12  col-12 p-1  mr-0 mb-2"
            v-for="(component, index) in list.items"
            :key="index"
          >
            {{ list.value }}
            <div class="card">
              <div
                class="card-body d-flex align-items-center justify-content-center"
              >
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="list.value"
                    :aria-describedby="ariaDescribedby"
                    :name="list.component"
                    :value="component.name"
                    class="text-center p-0 pl-2"
                  >
                    <img
                      :src="getImage(component.image)"
                      :alt="component.name"
                      class="image"
                    />
                    <div></div>
                  </b-form-radio>
                </b-form-group>
              </div>
              <p class="text-weight-bold border-top p-1 text-center m-0">
                {{ component.name }}
              </p>
            </div>
          </div>
          <div
            v-if="list.component !== 'Banner' && list.component !== 'Types'"
            class="d-flex align-items-center justify-content-center col-sm-11 col-lg-5 p-1  mr-0 m-4"
          >
            <div class=" p-0">
              <div class="card-body  p-0">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio
                    v-model="list.value"
                    :aria-describedby="ariaDescribedby"
                    :name="list.component"
                    value=""
                    class=""
                  >
                    <p>
                      <i class="fas fa-eye-slash h1 "></i><br />
                      <span class="ml-2">Hide</span>
                    </p>
                  </b-form-radio>
                </b-form-group>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="my-5 text-center">
        <b-alert variant="success" show dismissible>
          <i class="fas fa-info-circle mr-2"></i> Now, choose how you want your
          website parts to be ordered</b-alert
        >

        <b-button variant="primary" @click="openCompanyModal"
          >Start Ordering Your Website Parts</b-button
        >
        <b-modal
          size="m"
          centered
          v-model="companyModal.show"
          title="Change Order of Components"
          ok-title="Kaydet"
          cancel-title="Kapat"
          @hide="() => (newImageFile = null)"
          hide-footer
        >
          <form @submit.prevent="UPDATE_COMPONENT_DESIGN">
            <div class="row">
              <div class="col-12  text-center">
                <p class="ml-3 mb-0 text-left text-secondary">
                  * Banner and Types cannot be replaced
                </p>
                <ul class="list-group  ">
                  <li class=" pb-1 pt-1 ">
                    1
                    <b-button variant="light" class="namebutton" disabled
                      ><i class="fas fa-thumbtack"></i>
                      {{ firstComponent }}</b-button
                    >
                  </li>
                  <li class=" pb-1 pt-1 ">
                    2
                    <b-button variant="light" class="namebutton" disabled
                      ><i class="fas fa-thumbtack"></i>
                      {{ secondComponent }}</b-button
                    >
                  </li>

                  <draggable
                    v-model="mainComponentList"
                    :options="{ draggable: '.componentitem' }"
                  >
                    <li
                      v-for="(component, index) in mainComponentList.filter(
                        (cmp) => cmp.value !== ''
                      )"
                      :key="index"
                      class="componentitem m-1 "
                    >
                      <div
                        v-show="
                          component.component !== 'Types' &&
                            component.component !== 'Banner'
                        "
                      >
                        {{ index + 1 }}
                        <b-button variant="success" class="namebutton">
                          {{ component.component }}
                        </b-button>
                      </div>
                    </li>
                  </draggable>
                </ul>
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
  </div>
</template>

<script>
import GetComponentMixin from "../../../mixins/GetComponents";
import api from "../../../services/Api";
import draggable from "vuedraggable";
import { REQUEST_TO_PUT_COMPANY } from "../../../services/Requests/Companies";
import requestResponseCheckMixin from "../../../mixins/requestResponseCheck";

export default {
  components: {
    draggable,
  },
  mixins: [GetComponentMixin, requestResponseCheckMixin],
  props: {
    componentList: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      mainComponentList: [],
      showComponentsDesign: false,
      companyModal: {
        show: false,
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
    firstComponent() {
      return this.mainComponentList[0]?.component;
    },
    secondComponent() {
      return this.mainComponentList[1]?.component;
    },
  },
  methods: {
    openCompanyModal() {
      this.companyModal = {
        show: true,
      };
    },
    toggleComponentDesign() {
      this.showComponentsDesign = !this.showComponentsDesign;
    },
    getImage(image) {
      return api.image(image);
    },
    async GET_ITEMS_OF_MAIN_COMPONENTS() {
      for (let i = 0; i < this.mainComponentList.length; i++) {
        const element = this.mainComponentList[i];
        const response = await this.GET_COMPONENTS_BY_TYPE(element.type);
        this.mainComponentList[i].items = response.items;
        this.mainComponentList[i].count = response.count;
      }
    },
    SAVE_TO_COMPONENT() {
      const stringComponent = this.mainComponentList
        .filter((c) => c.value !== "")
        .map((comp) => comp.value)
        .join(",");
      console.log(
        "Update component isteğine gönderilen component stringi: ",
        stringComponent
      );
    },
    async UPDATE_COMPONENT_DESIGN() {
      this.isLoading = true;
      const stringComponent = this.mainComponentList
        .filter((c) => c.value !== "")
        .map((comp) => comp.value)
        .join(",");
      const formData = new FormData();
      formData.append("Components", stringComponent);
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_PUT_COMPANY(options, formData);

      this.isLoading = false;
      this.requestResponseCheck(response, this.companyModal);
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
ul {
  list-style: none;
}
.card {
  height: 95% !important;
  overflow: hidden;
}
.image {
  width: 100%;
  border-radius: 10px;
  transition: all ease 0.2s;
}
.image:hover {
  transform: scale(1.05);
}
.namebutton {
  width: 95%;
}
</style>
