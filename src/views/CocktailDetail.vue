<template>
  <div class="spacer"></div>
  <table
    style="width: 50%; margin: auto"
    class="table table-bordered table-hover table-sm table-responsive"
  >
    <thead>
      <tr>
        <th colspan="2" style="background-color: #42b983; color: white">
          <h1>Cocktail Information</h1>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td rowspan="9" style="width: 300px">
          <img class="detail-img" :src="cocktail.strDrinkThumb" />
        </td>
      </tr>
      <tr>
        <th style="background-color: lightgray">Name</th>
      </tr>
      <tr>
        <td>{{ cocktail.strDrink }}</td>
      </tr>
      <tr>
        <th style="background-color: lightgray">
          <router-link class="view-links detail-link" to="/categories"
            >Category</router-link
          >
        </th>
      </tr>
      <tr>
        <td>
          <span
            class="detail-link"
            @click="
              $router.push({
                name: 'SearchView',
                query: {
                  category: cocktail.strCategory.toLowerCase(),
                },
              })
            "
          >
            {{ cocktail.strCategory }}
          </span>
        </td>
      </tr>
      <tr>
        <th style="background-color: lightgray">
          <router-link class="view-links detail-link" to="/alcoholics"
            >Alcoholic</router-link
          >
        </th>
      </tr>
      <tr>
        <td>
          <span
            class="detail-link"
            @click="
              $router.push({
                name: 'SearchView',
                query: {
                  type: cocktail.strAlcoholic.toLowerCase(),
                },
              })
            "
          >
            {{
              cocktail.strAlcoholic === "Alcoholic"
                ? "Yes"
                : cocktail.strAlcoholic === "Non alcoholic"
                ? "No"
                : "Optional"
            }}
          </span>
        </td>
      </tr>
      <tr>
        <th style="background-color: lightgray">
          <router-link class="view-links detail-link" to="/glasses"
            >Glass</router-link
          >
        </th>
      </tr>
      <tr>
        <td>
          <span
            class="detail-link"
            @click="
              $router.push({
                name: 'SearchView',
                query: {
                  glass: cocktail.strGlass.toLowerCase(),
                },
              })
            "
          >
            {{ cocktail.strGlass }}
          </span>
        </td>
      </tr>
      <tr>
        <th colspan="2" style="background-color: lightgray">Instructions</th>
      </tr>
      <tr>
        <td colspan="2">
          {{
            cocktail.strInstructions === ""
              ? "No instruction available for this cocktail."
              : cocktail.strInstructions
          }}
        </td>
      </tr>
      <tr>
        <th colspan="2" style="background-color: lightgray">
          <router-link class="view-links detail-link" to="/ingredients"
            >Ingredients</router-link
          >
        </th>
      </tr>
      <!-- Display each ingredient in a new row -->
      <tr v-for="(ingredient, index) in ingredients" :key="ingredient">
        <td colspan="2">
          <span
            class="detail-link"
            @click="
              $router.push({
                name: 'IngredientDetail',
                params: { name: ingredient },
              })
            "
          >
            {{ measures[index] }} {{ ingredient }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
// import the API
import CocktailAPI from "@/apis/CocktailAPI";

export default {
  name: "CocktailDetail",
  // get the id from the route params
  props: {
    idDrink: String,
  },
  data() {
    return {
      cocktail: {},
      ingredients: [],
      measures: [],
      // there are 15 ingredients from the returned object, some of them are null
      ingredientCount: 15,
    };
  },
  mounted() {
    CocktailAPI.getCocktailById(this.$route.params.idDrink)
      .then((cocktail) => {
        this.cocktail = cocktail;
        // loop through the ingredients and measures and store them in the data properties
        // the number of ingredients and measures are the same
        // if the ingredient or measure is null, don't store it
        for (let i = 1; i <= this.ingredientCount; i++) {
          const ingredient = cocktail[`strIngredient${i}`];
          const measure = cocktail[`strMeasure${i}`];
          if (ingredient !== null) {
            this.ingredients.push(ingredient);
          }
          if (measure !== null) {
            this.measures.push(measure);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
.detail-img {
  width: 300px;
  height: 300px;
}
.spacer {
  height: 30px;
}
.detail-link {
  cursor: pointer;
  display: block;
  width: 100%;
  height: 100%;
}

.view-links {
  color: black;
  text-decoration: none;
}
</style>
