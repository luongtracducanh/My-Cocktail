<template>
  <!-- loop through the retured object -->
  <div v-for="category in categories" :key="category.strCategory">
    <!-- buttons navigate to the SearchView with the category as the query -->
    <button
      class="my-button"
      @click="
        $router.push({
          name: 'SearchView',
          query: { category: category.strCategory.toLowerCase() },
        })
      "
    >
      {{ category.strCategory }}
    </button>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "CategorySearch",
  data() {
    return {
      categories: [],
    };
  },
  mounted() {
    CocktailAPI.getAllCategories()
      .then((categories) => {
        // store the returned object from the API to the data property, sort by alphabetical order
        this.categories = categories.sort((a, b) => {
          if (a.strCategory < b.strCategory) return -1;
          if (a.strCategory > b.strCategory) return 1;
          return 0;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
