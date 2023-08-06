<template>
  <h1 class="header">Categories</h1>
  <!-- add the component -->
  <CategorySearch />
</template>

<script>
// import the API and the drop-down menu component
import CocktailAPI from "@/apis/CocktailAPI";
import CategorySearch from "@/components/CategorySearch.vue";

export default {
  name: "CategoryView",
  components: {
    CategorySearch,
  },
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
