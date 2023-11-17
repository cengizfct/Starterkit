<template>
  <div class="">
    <button class="scrollTopBtn" v-if="isScrolledToTop"  @click="scrollTop">
    <i class=" fas fa-angle-double-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScrolledToTop: false,
    };
  },
  methods: {
    scrollTop() {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    checkScrollPosition() {
      this.isScrolledToTop = window.scrollY > 150;
    },
  },
  mounted() {
    window.addEventListener("scroll", this.checkScrollPosition);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.checkScrollPosition);
  },
};
</script>

<style scoped>
.scrollTopBtn {
  box-sizing:border-box;
  position: fixed;
  bottom: 4%;
  right: 2%;
  background: none;
  border-radius: 20px;
  border: none;
  z-index: 2;
  font-size: 25px;
  color: rgb(255, 87, 64) ;

  padding:0;
  transition: all ease-in 0.2s;
  width: 40px;
  height: 40px;
}
.scrollTopBtn:hover{
    
    color: rgb(199, 67, 49);
    transform:  translateY(-5px);
}
</style>
