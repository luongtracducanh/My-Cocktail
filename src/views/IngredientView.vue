<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-12">
        <h1 class="header">Ingredients</h1>
      </div>
    </div>
    <div class="row">
      <!-- loop through the returned data and re-route to the IngredientDetail view on click -->
      <div
        class="col-lg-4"
        v-for="ingredient in ingredients"
        :key="ingredient.strIngredient1"
        @click="
          $router.push({
            name: 'IngredientDetail',
            params: { name: ingredient.strIngredient1 },
          })
        "
      >
        <!-- pass in the ingredient object to the preview component -->
        <IngredientPreview :ingredient="ingredient" />
      </div>
    </div>
  </div>
</template>

<script>
// import the API and the IngredientPreview component
import IngredientPreview from "@/components/IngredientPreview.vue";
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "IngredientView",
  data() {
    return {
      name: "",
      ingredients: [],
    };
  },
  components: {
    IngredientPreview,
  },
  mounted() {
    CocktailAPI.getAllIngredients()
      .then((ingredients) => {
        // store the returned object from the API to the data property, sort by alphabetical order
        this.ingredients = ingredients.sort((a, b) => {
          if (a.strIngredient1 < b.strIngredient1) return -1;
          if (a.strIngredient1 > b.strIngredient1) return 1;
          return 0;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.header {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
