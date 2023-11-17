<template>
  <div class="container p-0">
    <div class="row p-0 m-0 justify-content-between">
      <div class="nft mt-0 mb-4 col-lg-3 col-md-6 col-sm-12">
        <div class="main d-flex align-items-center">
          <img
            class="tokenImage"
            src="../../../assets/images/settings.png"
            alt="NFT"
          />

          <p class="description text-white  font-weight-bold">
            Edit Settings of Your Website
          </p>
          <hr />
          <div class="tokenInfo w-100">
            <b-button
              block
              variant="primary"
              @click="$router.push({ query: { tab: 'Settings' } })"
            >
              Settings</b-button
            >
          </div>
        </div>
      </div>
      <div class="nft mt-0 mb-4 col-lg-3 col-md-6 col-sm-12">
        <div class="main d-flex align-items-center">
          <img
            class="tokenImage"
            src="../../../assets/images/contents.png"
            alt="NFT"
          />

          <p class="description text-white  font-weight-bold">
            Edit Contents of Your Website
          </p>
          <hr />
          <div class="tokenInfo w-100">
            <b-button
              block
              variant="primary"
              @click="$router.push({ query: { tab: 'Contents' } })"
              >Contents</b-button
            >
          </div>
        </div>
      </div>
      <div class="nft mt-0 mb-4 col-lg-3 col-md-6 col-sm-12">
        <div class="main d-flex align-items-center">
          <img
            class="tokenImage"
            src="../../../assets/images/design.png"
            alt="NFT"
          />

          <p class="description text-white font-weight-bold">
            Design Your Components
          </p>
          <hr />
          <div class="tokenInfo w-100">
            <b-button
              block
              variant="primary"
              @click="$router.push({ query: { tab: 'Design' } })"
              >Design</b-button
            >
          </div>
        </div>
      </div>
      <div class="nft mt-0 mb-4 col-lg-3 col-md-6 col-sm-12">
        <div class="main d-flex align-items-center">
          <img
            class="tokenImage"
            src="../../../assets/images/servers.png"
            alt="NFT"
           
          />

          <p class="description text-white  font-weight-bold">
            Edit Service Settings 
          </p>
          <hr />
          <div class="tokenInfo w-100">
            <b-button
              block
              variant="primary"
              @click="$router.push({ query: { tab: 'Service' } })"
            >
              Service</b-button
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.nft {
  user-select: none;
  
  border: 1px solid #ffffff22;
  background-color: #282c34;
  background: linear-gradient(0deg, #ffa05d 0%, rgb(246, 109, 109) 100%);
  box-shadow: 0 0 10px 5px #00000029;
  border-radius: 0.7rem;
  backdrop-filter: blur(7px);
  -webkit-backdrop-filter: blur(7px);
  overflow: hidden;
  transition: 0.5s all;
  
}
.nft hr {
  width: 100%;
  border: none;
  border-bottom: 1px solid #88888855;
  margin-top: 0;
}
.nft ins {
  text-decoration: none;
}
.nft .main {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
}
.nft .main .tokenImage {
  border-radius: 0.5rem;
  max-width: 100%;
  height: 175px;
  object-fit: cover;
}
.nft .main .description {
  margin: 0.5rem 0;
  color: #a89ec9;
}
.nft .main .tokenInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nft ::before {
  position: fixed;
  content: "";
  box-shadow: 0 0 100px 40px #ffffff08;
  top: -10%;
  left: -100%;
  transform: rotate(-45deg);
  height: 60rem;
  transition: 0.7s all;
}
.nft:hover {
  border: 1px solid #ffffff44;
  box-shadow: 0 4px 5px 3px #00000023;
  transform: scale(0.99);
  filter: brightness(1.1);
}
.nft:hover ::before {
  filter: brightness(0.5);
  top: -100%;
  left: 200%;
}

@media(min-width: 768px){
  .nft{
    max-width: 48%;
  }
}
@media(min-width: 992px){
  .nft{
    max-width: 24%;
  }
}
</style>
