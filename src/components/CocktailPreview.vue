<template>
  <!-- create a preview card for SearchView -->
  <div class="preview">
    <img
      class="preview-img"
      :src="cocktail.strDrinkThumb"
      :alt="cocktail.strDrink"
    />
    <p class="text-label">{{ cocktail.strDrink }}</p>
  </div>
</template>

<script>
export default {
  name: "CocktailPreview",
  props: {
    // use props to pass data from parent to child
    cocktail: {},
  },
};
</script>
