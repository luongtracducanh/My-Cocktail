<template>
  <div class="search-filter">
    <span>Alcoholic Option</span><br />
    <select v-model="selectedType" @change="updateType($event.target.value)">
      <!-- an option to remove the filter if user search with name -->
      <option v-if="Object.keys(this.$route.query).includes('name')" value="">
        None selected
      </option>
      <!-- loop through the returned object from the API, obtain the value and display the text -->
      <option
        v-for="type in types"
        :key="type"
        :value="type.strAlcoholic.toLowerCase()"
      >
        {{ type.strAlcoholic }}
      </option>
    </select>
  </div>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "AlcoholicFilter",
  data() {
    return {
      types: [],
      // initialize the selected type to the query value or empty string if it doesn't exist
      selectedType: this.$route.query.type || "",
    };
  },
  mounted() {
    CocktailAPI.getAlcoholicFilters()
      .then((types) => {
        // store the returned object from the API to the data property
        this.types = types;
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
    updateType(value) {
      if (value !== "")
        this.$router.push({
          name: "SearchView",
          query: { ...this.$route.query, type: value },
        });
      else this.deleteFromQuery("type");
    },
  },
};
</script>

<style>
.search-filter {
  margin-top: 30px;
  margin-bottom: 10px;
}
select {
  width: 200px;
  height: 30px;
  margin: 10px;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
option {
  font-weight: bold;
}
</style>
