import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable'; // for polyfilling everything
import 'regenerator-runtime/runtime'; // for polyfilling async/await

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2   // Forkify API

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;
    recipeView.renderSpinner();

    // 1) Loading recipe
    await model.loadRecipe(id);

    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    alert(err);
  }
};
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// Variant 1
// const addListener = function (listener) {
//   window.addEventListener(listener, controlRecipes);
// };
// addListener('hashchange');
// addListener('load');

// Variant 2
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
