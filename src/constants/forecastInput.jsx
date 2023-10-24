const cityInput = document.querySelector(".city-input");
const searchButton = document.querySelector(".search-btn");
const getCityCoordinates = () => {
    const cityName = cityInput.value.trim(); // Get user entered city name and remove extra spaces
    if(!cityName) return; // Return if cityName is empty

    console.log(cityName);
}

searchButton.addEventListener("click", getCityCoordinates)