<template>
  <div class="spacer"></div>
  <table
    style="width: 50%; margin: auto"
    class="table table-bordered table-hover table-sm table-responsive"
  >
    <thead>
      <tr>
        <th colspan="2" style="background-color: #42b983; color: white">
          <h1>Ingredient Information</h1>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="9" style="width: 300px">
          <img class="detail-img" :src="image" />
        </td>
      </tr>
      <tr>
        <th style="background-color: lightgray">Name</th>
      </tr>
      <tr>
        <td>{{ ingredient.strIngredient }}</td>
      </tr>
      <tr>
        <th style="background-color: lightgray">Type</th>
      </tr>
      <tr>
        <td>
          {{ ingredient.strType ? ingredient.strType : "No type available" }}
        </td>
      </tr>
      <tr>
        <th style="background-color: lightgray">Alcoholic</th>
      </tr>
      <tr>
        <td>{{ ingredient.strAlcohol }}</td>
      </tr>
      <tr>
        <th style="background-color: lightgray">Alcoholic by volume</th>
      </tr>
      <tr>
        <td>{{ ingredient.strABV ? ingredient.strABV : 0 }}%</td>
      </tr>
      <tr>
        <th colspan="2" style="background-color: lightgray">Description</th>
      </tr>
      <tr>
        <td colspan="2">
          {{
            ingredient.strDescription
              ? ingredient.strDescription
              : "No description available."
          }}
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <button
            class="more-info"
            @click="
              $router.push({
                name: 'SearchView',
                query: {
                  ingredient: ingredient.strIngredient.toLowerCase(),
                },
              })
            "
          >
            Cocktails that use this ingredient
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "IngredientDetail",
  props: {
    name: String,
  },
  data() {
    return {
      ingredient: {},
      image: "",
    };
  },
  mounted() {
    CocktailAPI.getIngredientByName(this.$route.params.name)
      .then((ingredient) => {
        // store the returned object from the API to the data property
        this.ingredient = ingredient;
        this.image = `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient.replaceAll(
          " ",
          "%20"
        )}.png`;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
