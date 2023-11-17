<script>


import Scrolltop from "@/components/scrolltop.vue";
import Companies from "./companies.vue";
import { mapGetters } from "vuex";

/**
 * Dashboard component
 */
export default {
  components: {
   
   
    Scrolltop,
    Companies,
  },
  data() {
    return {
      title: "Dashboard",
      items: [
        {
          text: "Heocademy",
        },
        {
          text: "Dashboard",
          active: true,
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      getActiveUser: "auth/getCurrentUser",
    }),
    // activeUser(){
    //   return this.$store.getters['auth/getCurrentUser']
    // },
    // activeUserr(){
    //   return this.$store.state.auth.currentUser
    // },
  },
};
</script>

<template>
  <div>
    

    <Scrolltop ></Scrolltop>

    <companies class="pl-3 pr-3"></companies>

  
  </div>
</template>
