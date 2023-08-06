<template>
  <div class="container">
    <!-- loop through the returned object -->
    <div v-for="type in types" :key="type.strAlcoholic">
      <!-- buttons navigate to the SearchView with the type as the query -->
      <button
        class="my-button"
        @click="
          $router.push({
            name: 'SearchView',
            query: { type: type.strAlcoholic.toLowerCase() },
          })
        "
      >
        {{ type.strAlcoholic }}
      </button>
    </div>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "AlcoholicSearch",
  data() {
    return {
      types: [],
    };
  },
  mounted() {
    CocktailAPI.getAlcoholicFilters()
      .then((types) => {
        // store the returned object from the API to the data property, sort by alphabetical order
        this.types = types.sort((a, b) => {
          if (a.strAlcoholic < b.strAlcoholic) return -1;
          if (a.strAlcoholic > b.strAlcoholic) return 1;
          return 0;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
