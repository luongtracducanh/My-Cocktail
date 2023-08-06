<template>
  <div class="container">
    <h1 class="header">Alcoholic Options</h1>
    <!-- add the component -->
    <AlcoholicSearch />
  </div>
</template>

<script>
// import the API and the drop-down menu component
import CocktailAPI from "@/apis/CocktailAPI";
import AlcoholicSearch from "@/components/AlcoholicSearch.vue";

export default {
  name: "AlcoholicView",
  components: {
    AlcoholicSearch,
  },
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

<style>
.my-button {
  width: 300px;
  height: 50px;
  margin: 10px;
  border-radius: 10px;
  background-color: #42b983;
  color: white;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
</style>
