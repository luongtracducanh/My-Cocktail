<template>
  <div class="search-filter">
    <span>Category</span><br />
    <select
      v-model="selectedCategory"
      @change="updateCategory($event.target.value)"
    >
      <!-- an option to remove the filter if user search with name -->
      <option v-if="Object.keys(this.$route.query).includes('name')" value="">
        None selected
      </option>
      <!-- loop through the returned object from the API, obtain the value and display the text -->
      <option
        v-for="category in categories"
        :key="category"
        :value="category.strCategory.toLowerCase()"
      >
        {{ category.strCategory }}
      </option>
    </select>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "CategoryFilter",
  data() {
    return {
      categories: [],
      // initialize the selected category to the query value or empty string if it doesn't exist
      selectedCategory: this.$route.query.category || "",
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
  methods: {
    // delete the value from the query if the user selects the "None selected" option
    deleteFromQuery: function (property) {
      let query = Object.assign({}, this.$route.query);
      delete query[property];
      this.$router.replace({ query });
    },
    // update the router query based on the change in value
    updateCategory(value) {
      if (value !== "")
        this.$router.push({
          name: "SearchView",
          query: { ...this.$route.query, category: value },
        });
      else this.deleteFromQuery("category");
    },
  },
};
</script>
