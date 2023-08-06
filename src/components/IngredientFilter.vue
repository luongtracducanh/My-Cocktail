<template>
  <div class="search-filter">
    <span>Ingredient</span><br />
    <select
      v-model="selectedIngredient"
      @change="updateIngredient($event.target.value)"
    >
      <!-- an option to remove the filter if user serach with name -->
      <option v-if="Object.keys(this.$route.query).includes('name')" value="">
        None selected
      </option>
      <!-- loop through the returned object from the API, obtain the value and display the text -->
      <option
        v-for="ingredient in ingredients"
        :key="ingredient"
        :value="ingredient.strIngredient1.toLowerCase()"
      >
        {{ ingredient.strIngredient1 }}
      </option>
    </select>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "IngredientFilter",
  data() {
    return {
      ingredients: [],
      // initialize the selected ingredient to the query value or empty string if it doesn't exist
      selectedIngredient: this.$route.query.ingredient || "",
    };
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
  methods: {
    // delete the value from the query if the user selects the "None selected" option
    deleteFromQuery: function (property) {
      let query = Object.assign({}, this.$route.query);
      delete query[property];
      this.$router.replace({ query });
    },
    // update the router query based on the change in value
    updateIngredient(value) {
      if (value !== "")
        this.$router.push({
          name: "SearchView",
          query: { ...this.$route.query, ingredient: value },
        });
      else this.deleteFromQuery("ingredient");
    },
  },
};
</script>
