<template>
  <h1 class="header">Glasses</h1>
  <!-- add the component -->
  <GlassSearch />
</template>

<script>
// import the API and the drop-down menu component
import CocktailAPI from "@/apis/CocktailAPI";
import GlassSearch from "@/components/GlassSearch.vue";

export default {
  name: "GlassView",
  components: {
    GlassSearch,
  },
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
