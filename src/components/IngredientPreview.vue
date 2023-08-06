<template>
  <!-- create a preview card for IngredientView -->
  <div class="preview">
    <img
      class="preview-img"
      :src="`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1.replaceAll(
        ' ',
        '%20'
      )}.png`"
      :alt="ingredient.strIngredient1"
    />
    <p class="text-label">{{ ingredient.strIngredient1 }}</p>
  </div>
</template>

<script>
export default {
  name: "IngredientPreview",
  props: {
    // use props to pass data from parent to child
    ingredient: {},
  },
};
</script>

<style>
.preview-img {
  width: 250px;
  height: 250px;
  border-radius: 5px;
  border-style: solid;
  margin-bottom: 10px;
  background-color: whitesmoke;
}

.preview {
  border-radius: 10px;
  background-color: lightgoldenrodyellow;
  border-style: solid;
  margin-bottom: 30px;
  display: inline-block;
  padding: 10px;
  cursor: pointer;
  height: auto;
  width: 275px;
}

.text-label {
  font-weight: bold;
  margin: 0;
  padding: 0;
}
</style>
