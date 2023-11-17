<template>
 
    <div class="page">
      <p class="title  ">This Page Does Not Exist</p>
          <img src="@/assets/images/notFound.png" alt="" class="img col-sm-12 col-lg-9" />
       <router-link to="/" class="link btn btn-success"
        >Return to Homepage</router-link
      > 
    </div>
   
</template>
<style scoped>
.page {
  display: flex;
  align-content: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f9f9fd;
  opacity: 0.8;
  background-image: radial-gradient(#44a3f7 0.5px, transparent 0.5px),
    radial-gradient(#44a3f7 0.5px, #f9f9fd 0.5px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.title {
  text-align: center;
  position: absolute;
  top: 20%;
  font-size: 3.5em;
  font-weight: bold;
  color: rgb(51, 77, 78);
}
.link {
  position: absolute;
  bottom: 20%;
}
</style>
