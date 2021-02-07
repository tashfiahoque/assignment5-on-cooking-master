// Capturing Different Areas




let searchArea = document.getElementById("search-area");
const searchButton = document.getElementById("search-button");
const searchResults = document.getElementById("search-results");
const noResultsFound = document.getElementById("no-results-found");
const ingredientsContainer = document.getElementById("ingredients-container");

/// adding event listener in form
searchButton.addEventListener("click", () => {
    let searchField = document.getElementById("search-field").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchField}`)
        .then(response => response.json())
        .then(data => displaySearchResults(data))
})
const displaySearchResults = search => {
    let searchField = document.getElementById("search-field").value.trim();
    let html = "";
    if (search.meals) {
        search.meals.forEach(item => {
            html += `
            <div class="meal-item" id="${item.idMeal}">
       <div id="item-image">
       <img src="${item.strMealThumb}">
       </div>
       <div id="item-title">
       <h3>${item.strMeal}</h3>
       </div>
       </div>
`;
        })
        searchResults.innerHTML = html;
        noResultsFound.style.display = 'none';
        searchResults.style.display = 'block';
    } else {
        html += `<h1>Sorry, We don't have any ${searchField} item.</h1>`;
        noResultsFound.innerHTML = html;
        noResultsFound.style.display = 'block';
        searchResults.style.display = 'none';

    }
}
searchResults.addEventListener('click', (e) => {
    e.preventDefault();
    let mealItem = e.target.parentElement.parentElement;
    ingredientsContainer.style.display = 'block';
    searchResults.style.display = 'none';
    searchArea.style.display = 'none';
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.id}`)
        .then(response => response.json())
        .then(data => displaySelectedIngredient(data.meals[0]))
})
const displaySelectedIngredient = list => {
    const ingredientsList = [];
    for (let i = 1; i <= 20; i++) {
        if (list[`strIngredient${i}`]) {
            ingredientsList.push(list[`strMeasure${i}`] + ' ' + list[`strIngredient${i}`])
        } else {
            break;
        }
    }
    ingredientsContainer.innerHTML = `<div class="ingredients-wrapper">
    <img src="${list.strMealThumb}">
    <div class="ingredients-wrapper-content">
    <h2>${list.strMeal}</h2>
    <h4>Ingredients</h4>
    </div>
    <div class="ingredients-list"><ul>${ingredientsList.map(ingredient => `<li><img src="images/checkmark.png"><h5>${ingredient}</h5></li>`).join('')}</ul></div>
    </div>
    `;

}

