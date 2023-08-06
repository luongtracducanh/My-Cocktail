<template>
  <!-- loop through the returned object -->
  <div v-for="glass in glasses" :key="glass.strGlass">
    <!-- buttons navigate to the SearchView with the glass as the query -->
    <button
      class="my-button"
      @click="
        $router.push({
          name: 'SearchView',
          query: { glass: glass.strGlass.toLowerCase() },
        })
      "
    >
      {{ glass.strGlass }}
    </button>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "GlassSearch",
  data() {
    return {
      glasses: [],
    };
  },
  mounted() {
    CocktailAPI.getAllGlasses()
      .then((glasses) => {
        // store the returned object from the API to the data property, sort by alphabetical order
        this.glasses = glasses.sort((a, b) => {
          if (a.strGlass < b.strGlass) return -1;
          if (a.strGlass > b.strGlass) return 1;
          return 0;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
