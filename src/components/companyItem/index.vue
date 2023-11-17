<template>
  <div class="companyItem col-4 col-lg-4">
    <div class="card">
      <div class="card-body cardtop p-3">
        <div class="media">
          <div class="media-body overflow-hidden">
        
            <h4 :title="company.name" class="companyName mb-0   line-1">
              <router-link
                :to="'/companies/' + company.id"
                :title="company.name"
                class="companyName"
              >
                {{ company.name }}
              </router-link>
            </h4>
            <p class="companyText text-truncate font-size-14 mb-2 ">
              <a class="text-secondary" target="_blank" :href="'https://' + company.website">
                {{ company.website }}</a
              >
            </p>
            <p class="companyText text-truncate font-size-14 mb-2">
              <a class="text-secondary" target="_blank" :href="company.panelWebsite">
                {{ company.panelWebsite }}</a
              >
            </p>
            <div class="row ">
              <div class="col-12 pr-0">
                <a
                  target="_blank"
                  v-if="company.instagram && company.instagram !== 'null'"
                  :href="company.instagram"
                  ><i class="fab fa-instagram icon instagram mr-3"></i
                ></a>
                <a
                  target="_blank"
                  v-if="company.twitter && company.twitter !== 'null'"
                  :href="company.twitter"
                  ><i class="fab fa-twitter icon twitter mr-3"></i
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
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card-body border-top pt-2 pb-2 text-center  ">
        <router-link :to="'/companies/' + company.id" :title="company.name">
          <p class="m-0  color-light seeDetails">
            See Details <i class="fas fa-arrow-right ml-2"></i>
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
// this.$route.params.id
export default {
  props: {
    company: {
      default: () => {},
      type: Object,
    },
    titleColor:{
      default: '',
      type: String
    }
  },
};
</script>
<style scoped>
.companyItem {
  margin: 0px;
}
.card {
  margin-top: 10px;
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.08);
  transition: all ease 0.2s;
  
}
.card-body {
  padding-bottom: 3%;
}
.cardtop {
  height: 10rem;
}
.card:hover {
  transform: scale(0.98);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.02);
}
.fa-arrow-right{
   transition: all ease 0.2s;
}
.seeDetails{
  color: #352929;
}
.seeDetails:hover .fa-arrow-right{

  transform: translateX(3px);
}
.icon {
  font-size: x-large;
  transition: all ease 0.2s;
}
.icon:hover {
  transform: translateY(-3px);
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
.companyItem:hover {
  transition: all ease 0.2s;
}
.companyName:hover {
  
  color: #a43d0d;
  text-shadow: -2px .1em 0 hsla(200, 50%, 30%, 0.19)
}
.companyName {
 
  transition: all ease 0.2s;
  font-family: "Nunito", sans-serif;
  font-weight: bolder;
  color: rgb(255, 87, 64);
  text-shadow: .1em .1em 0 hsla(200, 50%, 30%, 0.19)
}

/* Mobil görünüm */
@media screen and (max-width: 593px) {
  .cardtop {
    height: 11rem;
  }
}
@media screen and (max-width: 360px) {
  .cardtop {
    height: 12.5rem;
  }
}
/* */
</style>
