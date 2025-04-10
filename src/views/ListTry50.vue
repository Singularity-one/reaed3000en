<template>
  <div class="page">
    <section class="section section-lg novi-bg novi-bg-img bg-default">
    <div class="container">
      <h2 class="text-center">50 short articles totaling around 3000 words</h2>
      <div class="box-project-subtitle small">Environment & Nature</div>
      <div class="row row-40 row-lg-50">
        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".1s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy"
              />
            </div>
            <RouterLink to="/ClimateChangeAndItsImpact" @click="transPage('/ClimateChangeAndItsImpact')">Climate change and its impact</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".2s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy"
              />
            </div>
            <RouterLink to="/PollutionInModernCities" @click="transPage('/PollutionInModernCities')">Pollution in modern cities</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".3s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy" 
              />
            </div>
            <RouterLink to="/RenewableEnergyVsFossilFuels" @click="transPage('/RenewableEnergyVsFossilFuels')">Renewable energy vs fossil fuels</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".1s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy" 
              />
            </div>
            <RouterLink to="/TheImportanceOfForests" @click="transPage('/TheImportanceOfForests')">The importance of forests</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".2s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy" 
              />
            </div>
            <RouterLink to="/WaterConservation" @click="transPage('/WaterConservation')">Water conservation</RouterLink>&nbsp;
          </div>
        </div>
    </div>  
    <div class="row row-40 row-lg-50">
      <div class="box-project-subtitle small">Health & Medicine</div>

      <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".1s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy"
              />
            </div>
            <RouterLink to="/ClimateChangeAndItsImpact" @click="transPage('/ClimateChangeAndItsImpact')">Climate change and its impact</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".2s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy"
              />
            </div>
            <RouterLink to="/PollutionInModernCities" @click="transPage('/PollutionInModernCities')">Pollution in modern cities</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".3s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy" 
              />
            </div>
            <RouterLink to="/RenewableEnergyVsFossilFuels" @click="transPage('/RenewableEnergyVsFossilFuels')">Renewable energy vs fossil fuels</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".1s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy" 
              />
            </div>
            <RouterLink to="/TheImportanceOfForests" @click="transPage('/TheImportanceOfForests')">The importance of forests</RouterLink>&nbsp;
          </div>
        </div>

        <div class="col-sm-6 col-md-4 wow fadeInUp" data-wow-delay=".2s">
          <div class="box-project box-width-3">
            <div class="box-project-media">
              <img
                class="box-project-img"
                src="../images/iceberg-6779681_1280.jpg"
                alt=""
                width="360"
                height="345"
                loading="lazy" 
              />
            </div>
            <RouterLink to="/WaterConservation" @click="transPage('/WaterConservation')">Water conservation</RouterLink>&nbsp;
          </div>
        </div>
    </div>

  </div> 
  </section>

  </div>
</template>

<script>export default {
  name: 'ListTry50',
  data() {
    return {
      // 组件状态
    };
  },
 methods: {
    transPage(item) {
      console.log("item",item)
      this.$router.push(`${item}`);
    },
  },
}
</script>

<style>
/*
  Keep your existing CSS styles for the header here.
  The 'scoped' attribute ensures these styles only apply to this component.
*/
.section.page-header {
  /* Example styles - adapt to your needs */
  padding: 20px 0;
  background-color: #f8f9fa;
}

.rd-navbar-wrap {
  /* ... your existing rd-navbar-wrap styles ... */
}

.rd-navbar {
  /* ... your existing rd-navbar styles ... */
}


</style>