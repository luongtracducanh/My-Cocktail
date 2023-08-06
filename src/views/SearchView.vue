<template>
  <div class="container">
    <div class="row" v-if="Object.keys(this.$route.query).includes('name')">
      <div class="col-lg-3"><AlcoholicFilter /></div>
      <div class="col-lg-3"><CategoryFilter /></div>
      <div class="col-lg-3"><GlassFilter /></div>
      <div class="col-lg-3"><IngredientFilter /></div>
    </div>
    <div class="row" v-else>
      <div v-if="Object.keys(this.$route.query).includes('type')">
        <AlcoholicFilter />
      </div>
      <div v-else-if="Object.keys(this.$route.query).includes('category')">
        <CategoryFilter />
      </div>
      <div v-else-if="Object.keys(this.$route.query).includes('glass')">
        <GlassFilter />
      </div>
      <div v-else-if="Object.keys(this.$route.query).includes('ingredient')">
        <IngredientFilter />
      </div>
    </div>
    <div class="row" id="msg">
      <div class="col-lg-12">
        <p>
          <b>{{ msg }}</b>
        </p>
      </div>
    </div>
    <div class="row">
      <!-- loop through the returned data and re-route to the CocktailDetail view on click -->
      <div
        class="col-lg-4"
        v-for="cocktail in cocktails"
        :key="cocktail.idDrink"
        @click="
          $router.push({
            name: 'CocktailDetail',
            params: { idDrink: cocktail.idDrink },
          })
        "
      >
        <!-- pass in the cocktail object to the CocktailPreview component -->
        <CocktailPreview :cocktail="cocktail" />
      </div>
    </div>
  </div>
</template>

<script>
// import the API, filters and the CocktailPreview component
import CocktailAPI from "@/apis/CocktailAPI";
import CocktailPreview from "@/components/CocktailPreview.vue";
import AlcoholicFilter from "@/components/AlcoholicFilter.vue";
import IngredientFilter from "@/components/IngredientFilter.vue";
import CategoryFilter from "@/components/CategoryFilter.vue";
import GlassFilter from "@/components/GlassFilter.vue";

// helper function to check if the cocktail has the selected ingredient
function hasMatchingIngredient(cocktail, ingredient) {
  const ingredientProperties = [
    "strIngredient1",
    "strIngredient2",
    "strIngredient3",
    "strIngredient4",
    "strIngredient5",
    "strIngredient6",
    "strIngredient7",
    "strIngredient8",
    "strIngredient9",
    "strIngredient10",
    "strIngredient11",
    "strIngredient12",
    "strIngredient13",
    "strIngredient14",
    "strIngredient15",
  ];
  for (const property of ingredientProperties) {
    // check if the ingredient is not null and matches the selected ingredient
    if (
      cocktail[property] !== null &&
      cocktail[property].toLowerCase() === ingredient.toLowerCase()
    ) {
      return true;
    }
  }
  return false;
}

export default {
  name: "SearchView",
  data() {
    return {
      cocktails: [],
    };
  },
  components: {
    CocktailPreview,
    AlcoholicFilter,
    IngredientFilter,
    CategoryFilter,
    GlassFilter,
  },
  mounted() {
    this.getCocktails();
  },
  watch: {
    $route() {
      this.getCocktails();
    },
  },
  computed: {
    msg() {
      return `${this.cocktails.length} results found`;
    },
  },
  methods: {
    getCocktails() {
      // query using name as parameter
      if (Object.keys(this.$route.query).includes("name"))
        CocktailAPI.getCocktailByName(this.$route.query.name)
          .then((newCocktails) => {
            // if the returned object is null, set the data property to an empty array
            if (newCocktails === null) this.cocktails = [];
            // otherwise, filter the returned object based on the other query parameters
            else {
              if (Object.keys(this.$route.query).includes("category"))
                newCocktails = newCocktails.filter((cocktail) => {
                  return (
                    cocktail.strCategory.toLowerCase() ===
                    this.$route.query.category.toLowerCase()
                  );
                });
              if (Object.keys(this.$route.query).includes("ingredient"))
                newCocktails = newCocktails.filter((cocktail) =>
                  // call the helper function to check if the cocktail has the selected ingredient
                  hasMatchingIngredient(cocktail, this.$route.query.ingredient)
                );
              if (Object.keys(this.$route.query).includes("type"))
                newCocktails = newCocktails.filter((cocktail) => {
                  return (
                    cocktail.strAlcoholic.toLowerCase() ===
                    this.$route.query.type.toLowerCase()
                  );
                });
              if (Object.keys(this.$route.query).includes("glass"))
                newCocktails = newCocktails.filter((cocktail) => {
                  return (
                    cocktail.strGlass.toLowerCase() ===
                    this.$route.query.glass.toLowerCase()
                  );
                });
              this.cocktails = newCocktails;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      // query using ingredient as parameter
      else if (Object.keys(this.$route.query).includes("ingredient"))
        CocktailAPI.getCocktailByIngredient(this.$route.query.ingredient)
          .then((newCocktails) => {
            if (newCocktails === null) this.cocktails = [];
            else {
              this.cocktails = newCocktails;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      // query using category as parameter
      else if (Object.keys(this.$route.query).includes("category"))
        CocktailAPI.getCocktailByCategory(this.$route.query.category)
          .then((newCocktails) => {
            if (newCocktails === null) this.cocktails = [];
            else {
              this.cocktails = newCocktails;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      // query using type as parameter
      else if (Object.keys(this.$route.query).includes("type"))
        CocktailAPI.getCocktailByType(this.$route.query.type)
          .then((newCocktails) => {
            if (newCocktails === null) this.cocktails = [];
            else {
              this.cocktails = newCocktails;
            }
          })
          .catch((err) => {
            console.log(err);
          });
      // query using glass as parameter
      else if (Object.keys(this.$route.query).includes("glass"))
        CocktailAPI.getCocktailByGlass(this.$route.query.glass)
          .then((newCocktails) => {
            if (newCocktails === null) this.cocktails = [];
            else {
              this.cocktails = newCocktails;
            }
          })
          .catch((err) => {
            console.log(err);
          });
    },
    deleteFromQuery: function (property) {
      let query = Object.assign({}, this.$route.query);
      delete query[property];
      this.$router.replace({ query });
    },
  },
};
</script>

<style>
#msg {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
