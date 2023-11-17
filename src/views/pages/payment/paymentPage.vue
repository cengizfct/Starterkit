<template>
  <div class="container ">
    <div class="text-center ">
      <p class="mb-0">
        <i class="text-danger h1 fas fa-exclamation-triangle"></i>
      </p>
      <p class="text-danger">
        Your session has expired. Please subscribe to keep going to use our
        features
      </p>
    </div>
    <div>
      <div class="d-flex justify-content-center">
        <div style="background: 	#6082B6;" class="  w-100 p-1 mb-0 text-white card">
          <div class="row">
            <div class="col-4 text-center border-right font-weight-bold">
              First Subscribe Date
            </div>
            <div class="col-4 text-center border-right font-weight-bold">
              Last Subscribe Date
            </div>
            <div class="col-4 text-center font-weight-bold">Subscribe Ending Date</div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class=" w-100 row">
          <div class="col-4 p-0 d-flex justify-content-center border-right ">
            <span class="card flatTop w-75 text-center">26.12.2022</span>
          </div>
          <div class="col-4 p-0 d-flex justify-content-center border-right ">
            <span class="card flatTop w-75 text-center">16.07.2023</span>
          </div>
          <div class="col-4 p-0 d-flex justify-content-center border-right ">
            <span class="card flatTop w-75 text-center">26.07.2023</span>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <h4> <i class="fas fa-shopping-cart text-secondary"></i> Cart</h4>
      <div class="d-flex justify-content-center">
        <div style="background:#4169E1;" class=" w-100 p-2 mb-0 text-white card flatBottom">
          <div class="row">
            <div class="col-3 text-center border-right font-weight-bold">Package</div>
            <div class="col-3 text-center border-right font-weight-bold">Amount</div>
            <div class="col-3 text-center border-right font-weight-bold">Price</div>
            <div class="col-3 text-center border-right font-weight-bold">Last Price</div>
          </div>
        </div>
      </div>
      <div style="background: #ffffff;" class=" w-100 p-2 mb-0 text-dark card flatTop">
          <div class="row text-center">
            <div class="col-3  border-right border-dark">Standard</div>
            <div class="col-3  border-right border-dark">1</div>
            <div class="col-3  border-right border-dark">60€</div>
            <div class="col-3  border-right"><span class="text-secondary" style="text-decoration-line: line-through;">60€</span> 50€</div>
          </div>
        </div>
        <div class="d-flex justify-content-center w-100  mb-0 text-dark ">
          <div class=" w-50 card flatTop bg-white border-top">
           <div class="p-1 row text-center">
            <div class="col-lg-4 col-6 mt1 align-self-center"><span class="h5">Total:</span> </div>
            <div class="col-lg-4 col-6 mt-1 mb-1 align-self-center"><p class="m-0 border-right border-left border-dark ">50€</p></div>
            <div class="col-lg-4 col-xs-12"> <router-link :to="`/companies/${this.$route.params.id}/payment/pay`"><b-button variant="success w-100">Pay</b-button></router-link> </div>
           </div> 
          </div>
        </div>
    </div>
    <div class="mt-1 ">
      <div class="row">
        <div class="col-12">
          <h4> <i class="fas fa-shopping-bag text-secondary mr-2"></i>Our Packages</h4>
        </div>
       
      </div>
      <div class="row mt-1">
          <div class="col-4 "><div class="card ">
            <h4 class="text-center mt-2 pb-2 border-bottom">Entry </h4>
            <div class="card-body p-2">
                <ul class="pl-3">
              <li class="font-weight-bold">25GB Storage</li>
              <li class="font-weight-bold">Feature 1</li>
              <li class="font-weight-bold">Feature 2</li>
              <li class="font-weight-bold">Feature 3</li>
            </ul>
            <div>
              <b-button block variant="primary"><i class="fas fa-plus"></i> Add to Cart</b-button> 
            </div>
            </div>
          
           
          </div></div>
          <div class="col-4 "><div class="card ">
            <h4 class="text-center mt-2 pb-2 border-bottom">Standard </h4>
            <div class="card-body p-2">
                <ul class="pl-3">
              <li class="font-weight-bold">50GB Storage</li>
              <li class="font-weight-bold">Feature 1</li>
              <li class="font-weight-bold">Feature 2</li>
              <li class="font-weight-bold">Feature 3</li>
            </ul>
            <div>
              <b-button block variant="primary"><i class="fas fa-plus"></i> Add to Cart</b-button> 
            </div>
            </div>
          
           
          </div></div>
          <div class="col-4 "><div class="card ">
            <h4 class="text-center mt-2 pb-2 border-bottom">Pro </h4>
            <div class="card-body p-2">
                <ul class="pl-3">
              <li class="font-weight-bold">100GB Storage</li>
              <li class="font-weight-bold">Feature 1</li>
              <li class="font-weight-bold">Feature 2</li>
              <li class="font-weight-bold">Feature 3</li>
            </ul>
            <div>
              <b-button block variant="primary"><i class="fas fa-plus"></i> Add to Cart</b-button> 
            </div>
            </div>
          
           
          </div></div>
        </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  height: 100vh;
}
h1,h2,h3,h4,.h4 {
  font-family: "Nunito", sans-serif;
  font-weight: bold;
}
.title {
  color: rgb(19, 53, 12);
}

.flatTop {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
.flatBottom {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
