<template>
  <div class="container p-0 faqcontainer mb-4">
    <form @submit.prevent>
      <b-modal
        size="lg"
        centered
        v-model="editFaq.show"
        title="Edit Question"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <div class="row">
          <div class="col-12">
            <div class="inputcontainer">
              <label for="title" class="contents-title font-weight-bold animatedLabel "
                >Question:</label
              >
              <textarea
                name="title"
                id="title"
                class="textinput"
                style="width: 100%;"
                v-model="editFaq.title"
                maxlength="256"
                minlength="1"
                type="text"
                rows="2"
              />
            </div>

            <div class="inputcontainer">
              <label for="overview" class="contents-title font-weight-bold animatedLabel"
                >Answer:</label
              >
              <textarea
                name="overiew"
                id="overview"
                class="textinput"
                style="width: 100%;"
                v-model="editFaq.overview"
                rows="4"
                minlength="1"
              >
              </textarea>
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
              @click="UPDATE_FAQ()"
            >
              <b-spinner small v-if="isLoading"></b-spinner>
              <span v-else>Kaydet</span>
            </b-button>
          </div>
        </div>
      </b-modal>
    </form>
    <div class="pb-2">
      <div>
        <p
          class="mb-0 m-2 border-bottom border-dark  h3  border-bottom d-inline-block"
          style="font-family: 'Nunito',sans-serif;"
        >
          <i class="fas fa-question mr-2"></i> F.A.Q.
        </p>
      </div>

      <div v-if="typeFive[0]" class="row">
        <div class="col-lg-12 col-md-12 col-xs-12">
          <div>
            <b-card v-for="(faq, index) in typeFive" :key="index">
              <b-button
                class="p-1 ml-2 text-primary"
                variant="transparent"
                @click="setEditFaq(faq)"
                style="position: absolute; top: 5%; right: 1%; z-index: 1;"
              >
                <i class="fas fa-pen p-0 "></i
              ></b-button>
              <b-button
                v-b-toggle="'faq-' + index"
                variant="link"
                class="faq-question"
              >
                {{ faq.title }}
              </b-button>
              <b-collapse :id="'faq-' + index">
                <div class="row">
                  <div class="faq-answer pl-3 pr-3 mt-3">
                    {{ faq.overview }}
                  </div>
                </div>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>

      <div
        v-else
        class="d-flex align-content-center justify-content-center kb-4"
      >
        <img
          src="../../../../assets/images/langnotfound.png"
          style="max-width:20%; "
          class="d-block justify-self-center"
          alt=""
        />
      </div>
    </div>
    <div class="text-center">
      <b-button class="p-1 ml-2" variant="success" @click="setAddFaq()"
        >Add FAQ <i class="fas fa-plus"></i
      ></b-button>
      <b-modal
        size="m"
        centered
        v-model="addFaq.show"
        title="Add an FAQ to Your Company"
        ok-title="Kaydet"
        cancel-title="Kapat"
        @hide="() => (newImageFile = null)"
        hide-footer
      >
        <form @submit.prevent="POST_ADD_FAQ">
          <div class="row">
            <div class="col-12">
              <div class="inputcontainer">
                <label for="title" class="contents-title font-weight-bold animatedLabel "
                  >Soru:</label
                >
                <input
                  name="title"
                  id="title"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addFaq.Title"
                  maxlength="256"
                  minlength="10"
                  type="text"
                  required
                />
              </div>
              <div class="inputcontainer">
                <label for="overview" class="contents-title font-weight-bold animatedLabel"
                  >Cevap:</label
                >
                <textarea
                  name="overiew"
                  id="overview"
                  class="textinput"
                  style="width: 100%;"
                  v-model="addFaq.Overview"
                  rows="5"
                  minlength="1"
                  required
                >
                </textarea>
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
import {
  REQUEST_TO_PUT_SPECIFIC_COMPANY_FAQ,
  REQUEST_TO_POST_SPECIFIC_COMPANY_FAQ,
} from "../../../../services/Requests/faq";
import requestResponseCheckMixin from "../../../../mixins/requestResponseCheck";
export default {
  props: {
    typeFive: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      editFaq: {
        show: false,
        title: "",
        overview: "",
      },
      addFaq: {
        show: false,
        Title: "",
        Overview: "",
      },
      editStatus: "",

      isLoading: false,
    };
  },
  mixins: [requestResponseCheckMixin],
  methods: {
    setEditFaq(faq) {
      this.editFaq = {
        id: faq.id,
        show: true,
        title: faq.title,
        overview: faq.overview,
      };
    },
    setAddFaq() {
      this.addFaq = {
        show: true,
      };
    },

    async UPDATE_FAQ() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.editFaq.title);
      formData.append("Overview", this.editFaq.overview);

      const options = {
        params: {
          id: this.editFaq.id,
        },
      };
      const response = await REQUEST_TO_PUT_SPECIFIC_COMPANY_FAQ(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.editFaq);
      if (response.message === "OK") {
        this.$emit("refresh", 5, "typeFive");
      }
    },
    async POST_ADD_FAQ() {
      this.isLoading = true;
      const formData = new FormData();
      formData.append("Title", this.addFaq.Title);
      formData.append("Overview", this.addFaq.Overview);
      formData.append("Type", 5);
      formData.append("Image", null);
      formData.append("Language", "TR");
      formData.append("Description", "https://youtu.be/VjJWlFmk3_s");
      formData.append("Degrees", null);
      const options = {
        query: {
          companyId: this.$route.params.id,
        },
      };

      const response = await REQUEST_TO_POST_SPECIFIC_COMPANY_FAQ(
        options,
        formData
      );

      this.isLoading = false;
      this.requestResponseCheck(response, this.addFaq);
      if (response.message === "OK") {
        this.$emit("refresh", 5, "typeFive");
      }
    },
  },
};
</script>

<style></style>
