document.addEventListener("DOMContentLoaded", function () {
    const ingredientInput = document.getElementById("ingredientInput");
    const addIngredientButton = document.getElementById("addIngredientButton");
    const ingredientList = document.getElementById("ingredientList");
  
    addIngredientButton.addEventListener("click", () => {
      const ingredient = ingredientInput.value.trim();
      if (ingredient !== "") {
        const listItem = document.createElement("li");
        listItem.textContent = ingredient;
        ingredientList.appendChild(listItem);
        ingredientInput.value = "";
      }
    });
  });