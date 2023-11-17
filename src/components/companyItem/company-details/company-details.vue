<template>
  <div class="pr-2 pl-2 pb-2 mb-4">
    <!-- COMPANY INFO START -->
    <section v-if="activeSection === '' || activeSection === 'Settings'">
      <company-info
        :company="company"
        :titleColor="settings.themeColor"
        :activeSection="activeSection"
      ></company-info>
    </section>

    <!-- COMPANY INFO END -->

    <company-menu v-if="activeSection === ''"></company-menu>

    <!-- SETTINGS START -->
    <section v-if="activeSection === 'Settings'" class="SETTINGS">
      <company-settings
        :settings="settings"
        @refreshSettings="refreshSettings"
      ></company-settings>
      <company-other-settings></company-other-settings>
    </section>

    <!-- SETTINGS END -->

    <!-- CONTENTS START -->
    <section v-if="activeSection === 'Contents'" class="CONTENTS">
      <company-contents
        :typeOne="typeOne"
        :typeOneLanguages="typeOneLanguages"
        :typeOneMissingLanguages="typeOneMissingLanguages"
        :bannerImage="company.bannerImage"
        @refresh="refresh"
      ></company-contents>
      <company-aboutus
        :primaryColor="settings.primaryColor"
        :typeTwo="typeTwo"
        :image="image"
        @refresh="refresh"
      ></company-aboutus>
      <company-references
        :typeThree="typeThree"
        @refresh="refresh"
      ></company-references>
      <company-moreaboutus
        :typeFour="typeFour"
        @refresh="refresh"
      ></company-moreaboutus>
      <company-faq :typeFive="typeFive" @refresh="refresh"> </company-faq>
    </section>

    <!-- CONTENTS END -->

    <!-- COMPONTENTS START -->
    <section v-if="activeSection === 'Design'" class="COMPONENTS">
      <company-components :componentList="componentList"> </company-components>
    </section>
    <!-- COMPONENTS END -->

     <!-- SERVER START -->
     <section v-if="activeSection === 'Service'" class="SERVER">
      <server-and-service></server-and-service>
    </section>
    <!-- SERVER END -->
  </div>
</template>

<script>
import { REQUEST_TO_GET_SPECIFIC_COMPANY_CONTENTS } from "../../../services/Requests/Contents";
import { REQUEST_TO_GET_SPECIFIC_COMPANY_SETTINGS } from "../../../services/Requests/Settings";
import api from "../../../services/Api";
import requestResponseCheck from "../../../mixins/requestResponseCheck";

export default {
  components: {
    CompanyMenu: () => import("./menu.vue"),
    CompanyInfo: () => import("./CompanyInfo.vue"),
    CompanySettings: () => import("./company-settings/CompanySettings.vue"),
    CompanyContents: () => import("./company-contents/CompanyContents.vue"),
    CompanyAboutus: () => import("./company-contents/CompanyAboutus.vue"),
    CompanyReferences: () => import("./company-contents/CompanyReferences.vue"),
    CompanyMoreaboutus: () => import("./company-contents/CompanyMoreaboutus.vue"),
    CompanyFaq: () => import("./company-contents/CompanyFaq.vue"),
    CompanyComponents: () => import("./CompanyComponents.vue"),
    CompanyOtherSettings: () => import("./company-settings/CompanyOtherSettings.vue"),
    ServerAndService: () => import("./company-service/server-service.vue")
  },
  props: {
    company: {
      default: () => {},
      type: Object,
    },
  },
  watch: {
    "$route.query": {
      deep: true,
      handler() {
        this.getTabFromQuery();
      },
    },
  },
  mixins: [requestResponseCheck],
  data() {
    return {
      activeSection: "",
      isLoading: true,
      editStatus: {
        text: "",
        variant: "",
        show: false,
        icon: "",
      },
     
      settings: {},
      contents: {},
      typeOne: [],
      typeOneLanguages: [],
      typeOneMissingLanguages: [],
      permittedLanguages: ["TR", "EN", "DE"],
      typeTwo: [],
      typeThree: [],
      typeFour: [],
      typeFive: [],
      titleColor: "",

      editContentsLoading: false,
      editContents: {
        show: false,
        title: "",
        description: "",
        overview: "",
      },
    };
  },
  methods: {
   
    setTitleColor(color) {
      this.titleColor = color;
    },
    getTabFromQuery() {
      const q = this.$route.query;
      if (q.tab) {
        this.activeSection = q.tab;
      } else this.activeSection = "";
    },

    async GET_SPECIFIC_COMPANY_SETTINGS() {
      this.isLoading = true;
      const options = {
        params: {
          id: this.$route.params.id,
        },
      };
      const response = await REQUEST_TO_GET_SPECIFIC_COMPANY_SETTINGS(options);

      if (response.message === "OK") {
        if (response.data === null) return this.$router.push("/not-found");
        this.settings = response.data;
      }
      this.isLoading = false;
    },
    async GET_SPECIFIC_COMPANY_CONTENTS(type, key) {
      this.isLoading = true;
      const options = {
        query: {
          type,
          companyId: this.$route.params.id,
        },
      };
      const response = await REQUEST_TO_GET_SPECIFIC_COMPANY_CONTENTS(options);

      if (response.message === "OK") {
        if (response.data === null) return this.$router.push("/not-found");
        this.contents = response.data;
        if (type) {
          this[key] = response.data;
        } else {
          this.typeOne = response.data.filter((data) => data.type === 1);
          this.typeTwo = response.data.filter((data) => data.type === 2);
          this.typeThree = response.data.filter((data) => data.type === 3);
          this.typeFour = response.data.filter((data) => data.type === 4);
          this.typeFive = response.data.filter((data) => data.type === 5);
        }

        for (let i = 0; i < this.typeOne.length; i++) {
          this.typeOneLanguages.push(this.typeOne[i].language);
        }
        this.getDifference(this.permittedLanguages, this.typeOneLanguages);
      }
      this.isLoading = false;
    },
    getDifference(a, b) {
      this.typeOneMissingLanguages = a.filter((lang) => {
        return !b.includes(lang);
      });
    },

    getImage(image) {
      return api.image(image);
    },

    refresh(type, key) {
      this.GET_SPECIFIC_COMPANY_CONTENTS(type, key);
    },
    refreshSettings() {
      this.GET_SPECIFIC_COMPANY_SETTINGS();
    },
  },
  beforeMount() {
    this.getTabFromQuery();
    this.GET_SPECIFIC_COMPANY_CONTENTS();
    this.GET_SPECIFIC_COMPANY_SETTINGS();
  },
  computed: {
    logo() {
      return api.image(this.company.logo);
    },
    image() {
      return api.image(this.typeTwo[0]?.imagePath);
    },
    referenceLogo() {
      return api.image(this.typeThree.imagePath);
    },

    componentList() {
      return this.company.components.split(",");
    },
  },
};
</script>
<style >
.textinput {
  border: 2px solid #ffa69a;
  border-radius: 2px;
  padding: 0.5rem;
  padding-top:0.6rem ;
  
}
.textinput:focus{
  outline: none;
  border: 2px solid #ff5e49 !important; 
}
.inputcontainer{
  position: relative;
  margin-top: 2.5rem;
}
.animatedLabel{
  transition: all 0.2s ease;
  position: absolute;
  top: -0.6rem;
  left: 1rem;
  background: #fff;
  border: 2px solid #ffa69a;
  border-top: 0;
  border-bottom: 0;
  padding: 0 0.5em 0 0.5em;
  
}
div:has(.textinput:focus) > label{
 
 left: 0;
 top: -1.5rem;
 border: none;
 background: none;
}

@media screen and (max-width: 767px) {
  input[type="text"],
  input[type="number"],
  input[type="email"],
  input[type="tel"],
  input[type="password"],textarea {
    font-size: 16px;
  }
}
</style>
