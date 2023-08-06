<template>
  <div class="search-filter">
    <span>Glass</span><br />
    <select v-model="selectedGlass" @change="updateGlass($event.target.value)">
      <!-- an option to remove the filter if user search with name -->
      <option v-if="Object.keys(this.$route.query).includes('name')" value="">
        None selected
      </option>
      <!-- loop through the returned object from the API, obtain the value and display the text -->
      <option
        v-for="glass in glasses"
        :key="glass"
        :value="glass.strGlass.toLowerCase()"
      >
        {{ glass.strGlass }}
      </option>
    </select>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "GlassFilter",
  data() {
    return {
      glasses: [],
      // initialize the selected glass to the query value or empty string if it doesn't exist
      selectedGlass: this.$route.query.glass || "",
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
  methods: {
    // delete the value from the query if the user selects the "None selected" option
    deleteFromQuery: function (property) {
      let query = Object.assign({}, this.$route.query);
      delete query[property];
      this.$router.replace({ query });
    },
    // update the router query based on the change in value
    updateGlass(value) {
      if (value !== "")
        this.$router.push({
          name: "SearchView",
          query: { ...this.$route.query, glass: value },
        });
      else this.deleteFromQuery("glass");
    },
  },
};
</script>
