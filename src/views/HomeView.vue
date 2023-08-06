<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="header">Featured cocktail for today</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <!-- generate a random cocktail in the home page -->
        <div class="preview" id="preview-home">
          <img class="preview-img" :src="cocktailToday.strDrinkThumb" />
          <p class="text-label" id="text-label-home">
            {{ cocktailToday.strDrink }}
          </p>
          <button
            class="more-info"
            @click="
              $router.push({
                name: 'CocktailDetail',
                params: { idDrink: cocktailToday.idDrink },
              })
            "
          >
            More Information
          </button>
        </div>
      </div>
    </div>

    <!-- Search out using other criteria -->
    <div class="set-bg">
      <div class="row">
        <div
          class="col-lg-6 d-flex flex-column justify-content-center align-items-center"
        >
          <h3>Search by Alcoholic Options</h3>
          <router-link to="/alcoholics" class="search-btn try-out-btn"
            >Try it out</router-link
          >
        </div>
        <div class="col-lg-6">
          <div class="scrollable">
            <AlcoholicSearch />
          </div>
        </div>
      </div>
    </div>

    <div class="set-bg">
      <div class="row">
        <div
          class="col-lg-6 d-flex flex-column justify-content-center align-items-center"
        >
          <h3>Search by Category</h3>
          <router-link to="/categories" class="search-btn try-out-btn"
            >Try it out</router-link
          >
        </div>
        <div class="col-lg-6">
          <div class="scrollable">
            <CategorySearch />
          </div>
        </div>
      </div>
    </div>

    <div class="set-bg">
      <div class="row">
        <div
          class="col-lg-6 d-flex flex-column justify-content-center align-items-center"
        >
          <h3>Search by Glasses</h3>
          <router-link to="/glasses" class="search-btn try-out-btn"
            >Try it out</router-link
          >
        </div>
        <div class="col-lg-6">
          <div class="scrollable">
            <GlassSearch />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import the API and search components
import CocktailAPI from "@/apis/CocktailAPI";
import GlassSearch from "@/components/GlassSearch.vue";
import CategorySearch from "@/components/CategorySearch.vue";
import AlcoholicSearch from "@/components/AlcoholicSearch.vue";

export default {
  name: "HomeView",
  components: {
    GlassSearch,
    CategorySearch,
    AlcoholicSearch,
  },
  data() {
    return {
      cocktailToday: {},
    };
  },
  mounted() {
    // get a random cocktail from the API
    CocktailAPI.getRandomCocktail().then((cocktail) => {
      this.cocktailToday = cocktail;
    });
  },
};
</script>

<style>
.more-info {
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  cursor: pointer;
}

#text-label-home {
  margin-bottom: 10px;
}

#preview-home {
  cursor: default;
}

.scrollable {
  overflow-y: scroll;
  height: 210px;
}

.set-bg {
  background-color: lightcyan;
  border-style: solid;
  border-radius: 10px;
  margin-bottom: 30px;
  margin-left: 10px;
  margin-right: 10px;
  padding: 10px;
}

.scrollable::-webkit-scrollbar {
  width: 0 !important;
}
</style>
