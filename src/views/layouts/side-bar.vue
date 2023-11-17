<template>
  <div class="wrapper">
    <!-- SIDEBAR -->
    <nav v-if="!isMobile" id="sidebar" :class="{ active: isActive }">
      <div v-if="!isActive">
        <div
          class="sidebar-header d-flex align-content-center justify-content-center"
          style="height: 68.5px;"
        >
          <router-link to="/"
            ><img src="../../assets/images/heocademylogo.png" height="35" alt=""
          /></router-link>
        </div>

        <ul class="list-unstyled components">
          <li :class="[isActiveRoute('home') ? 'activeRoute' : '']">
            <router-link to="/" class="pt-4 pb-4"
              ><i class="fas fa-home mr-1 "></i> Home</router-link
            >
          </li>
          <li :class="[isActiveRoute('companies') ? 'activeRoute' : '']">
            <router-link to="/companies" class="pt-4 pb-4"
              ><i class="fas fa-city mr-1 "></i> All Companies</router-link
            >
          </li>
          <li :class="[isActiveRoute('components') ? 'activeRoute' : '']">
            <router-link to="/components" class="pt-4 pb-4"
              ><i class="fas fa-folder-open mr-1 "></i> Components</router-link
            >
          </li>

         
        </ul>
      </div>
      <div v-if="isActive" class="d-flex justify-content-end ">
        <div class="row">
          <div class="col-12">
            <div
              class="sidebar-header d-flex align-content-center justify-content-center p-0  pt-2 pb-2"
              style="height: 68.5px;"
            >
              <router-link to="/"
                ><img
                  src="../../assets/images/heocademylogosmwhite.png"
                  height="35"
                  alt=""
                  class="mt-2 mb-1"
              /></router-link>
            </div>

            <div>
              <ul class="list-unstyled components m-0 pt-0 text-center">
                <li
                 
                  :class="[isActiveRoute('home') ? 'activeRoute' : '']"
                >
                  <router-link to="/"
                  class="pb-4 pt-4"
                    ><i class="fas fa-home mr-1 "></i
                  ></router-link>
                </li>

                <li
                  
                  :class="[isActiveRoute('companies') ? 'activeRoute' : '']"
                >
                  <router-link to="/companies"
                    class="pb-4 pt-4"><i class="fas fa-city mr-1 "></i
                  ></router-link>
                </li>
                <li
                  
                  :class="[isActiveRoute('components') ? 'activeRoute' : '']"
                >
                  <router-link to="/components"
                    class="pb-4 pt-4"><i class="fas fa-folder-open mr-1 "></i
                  ></router-link>
                </li>
               
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <!-- END OF SIDEBAR -->

    <!-- CONTENT  -->
    <div v-if="!isMobile" id="content">
      <!-- TOPBAR -->
      <nav id="navbar" class="navbar bg-white" :class="{ active: isActive }">
        <div class="container-fluid">
          <button
            type="button"
            id="sidebarCollapse"
            class="btn btn-info"
            @click="toggleSidebar"
          >
            <i
              class="fas fa-grip-lines"
              :class="[isActive ? 'rotateDown' : '']"
            ></i>
          </button>

          <b-dropdown variant="dark">
            <template #button-content>
              <i class="fas fa-user mr-1"></i> {{ activeUser.fullname }}
              <i class="fas fa-caret-down ml-1"></i>
            </template>
            <b-dropdown-item href="#">Another item</b-dropdown-item>
            <b-dropdown-item @click="logOut()"
              ><span class="text-danger">Log out</span
              ><i class="fas fa-sign-out-alt text-danger ml-3"></i>
            </b-dropdown-item>
          </b-dropdown>
        </div>
      </nav>
      <!-- END OF TOPBAR -->

      <!-- PAGE -->
      <div :class="[isActive ? 'viewLarge' : 'viewSmall']">
        <router-view></router-view>
      </div>
      <!-- END OF PAGE -->

      <!-- FOOTER -->
      <div>
        <Footer id="footer" :class="{ active: isActive }"></Footer>
      </div>
      <!-- END OF FOOTER -->
    </div>

    <!-- MOBİLE VİEW -->
    <div v-if="isMobile" class="pl-0 pr-0" id="content">
      <nav id="navbar" class="navBarMobile bg-white">
        <div class="containerMobile row">
          <div class="col-3 pl-3">
            <b-button variant="light" @click="toggleSidebar"
              ><i class="fas fa-bars"></i
            ></b-button>
            <div
              class="navBarMobileNavigation p-0 pr-2"
              :class="[isActive ? 'show' : 'hide']"
            >
              <div class="row  text-center text-nowrap">
                <div class="col-4 border-right  p-2">
                  <router-link to="/"
                    ><i class="fas fa-home m-1"> </i>Home</router-link
                  >
                </div>
                <div class="col-4 border-right  p-2">
                  <router-link to="/companies"
                    ><i class="fas fa-city m-1"> </i>All Companies</router-link
                  >
                </div>
                <div class="col-4 p-2">
                  <router-link to="/components"
                    ><i class="fas fa-folder-open m-1"> </i>Components</router-link
                  >
                </div>
              </div>
            </div>
          </div>
          <div class="col-6 text-center p-0">
            <router-link to="/"
              ><img
                class="pt-1"
                src="../../assets/images/heocademylogo.png"
                width="150"
                alt=""
            /></router-link>
          </div>
          <div class="col-3 text-right pr-4">
            <b-dropdown right variant="light">
              <template #button-content>
                <i class="fas fa-user mr-1"></i>
                <i class="fas fa-caret-down ml-1"></i>
              </template>
              <b-dropdown-item href="#">{{
                activeUser.fullname
              }}</b-dropdown-item>
              <b-dropdown-item @click="logOut()"
                ><span class="text-danger">Log out</span
                ><i class="fas fa-sign-out-alt text-danger ml-3"></i>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </nav>

      <router-view style="margin: 100px 0 70px 0;"></router-view>
      <Footer></Footer>
    </div>
    <!-- END OF MOBİLE VİEW -->
  </div>
</template>

<script>
import Footer from "../../components/myFooter.vue";

export default {
  components: {
    Footer,
  },
  props: {
    companies: {
      default: () => [],
      type: Array,
    },
  },
  data() {
    return {
      currentUser: "",
      isActive: true,
      isArrowDown: true,
      isMobile: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.isActive = !this.isActive;
    },
    toggleArrow() {
      this.isArrowDown = !this.isArrowDown;
    },
    logOut() {
      this.$store.dispatch("auth/logOut");
      this.$router.push({ path: "/login" });
    },
    detectDevice() {
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );
    },
    isActiveRoute(name) {
      if (name === this.$route.name) {
        return true;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this.detectDevice();
  },
  computed: {
    activeUser() {
      return this.$store.getters["auth/getCurrentUser"];
    },
  },
};
</script>
<style scoped>
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  
}

.navbar {
  position: fixed;
  z-index: 2;
  left: 200px;
  right: 0;
  padding: 15px 10px;
  background: #ffffffae !important;
  border: none;
  border-radius: 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
}

.navBarMobile {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  padding: 10px 5px 10px 5px;
  background: rgb(255, 87, 64) !important;
  border: none;
  border-radius: 0;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.3s;
  height: 60px;
}
.navBarMobileNavigation {
  position: fixed;
  z-index: 2;
  left: 0;
  right: 0;
  top: 59px;
  padding: 10px 5px 10px 5px;
  background: rgb(255, 131, 115) !important;
  border: none;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  transition: all 0.4s ease;
  color: white;
  height: 40px;
}
.navBarMobileNavigation.hide {
  width: 0;
  left: -100vw;
}
.navBarMobileNavigation.show {
  width: 101vw;
  left: 0 !important;
  right: 0;
}

#footer {
  left: 200px;
  transition: all 0.3s;
  display: none;
}

/* ---------------------------------------------------
    SIDEBAR STYLE
----------------------------------------------------- */

.wrapper {
  display: flex;
  width: 100%;
}

#sidebar {
  min-width: 200px;
  max-width: 200px;

  color: #fff;
  transition: all 0.3s;
  opacity: 1;
  background-image: radial-gradient(#e6cfcf 0.5px, transparent 0.5px),
    radial-gradient(#e6cfcf 0.5px, rgb(244, 137, 123) 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
  position: fixed;
  z-index: 2;
  height: 100vh;
}

#sidebar.active,
#navbar.active,
#footer.active {
  margin-left: -155px;
}

#sidebar .sidebar-header {
  padding: 20px;
  background: rgb(255, 87, 64);
}



#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}


li{transition: all 0.3s;}
li:hover{
  color: rgb(255, 87, 64);
  background: #fff;
}


.sideBarspan,
.sideBarSpan > i {
  color: #fff;
  transition: all ease 0.3s;
}

.sideBarButton {
  background: transparent;
  width: 100%;
  outline: none;
  border: none;
  border-radius: 0;
  color: #fff;
  font-size: 1.05em;
  transition: all ease 0.3s;
}

.rotateDown {
  transition: all ease 0.3s;
  transform: rotate(90deg);
}
.fa-arrow-right,
.fa-grip-lines {
  transition: all ease 0.3s;
}
#collapse-1 {
  background: rgb(247, 132, 117);
  padding: 10px;
}

/* ---------------------------------------------------
    CONTENT STYLE
----------------------------------------------------- */

#content {
  width: 100%;
  position: relative;
  transition: all 0.3s;
}
.activeRoute {
  border-right: 5px solid rgb(255, 87, 64);
  background: #ff7f507d;
}
.viewSmall {
  margin: 90px 50px 0px 250px;
  transition: all ease 0.3s;
}
.viewLarge {
  margin: 90px 50px 0px 90px;
  transition: all ease 0.3s;
}
/* ---------------------------------------------------
    MEDIAQUERIES
----------------------------------------------------- */
</style>
