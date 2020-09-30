const apiKey = "0df34bb3167daea7d292823d2085aebd";
const cityId = 280;
const cuisineId = 162;
const order = "desc";
let sort = "rating";
const restaurantContainer = document.getElementById("restaurantContainer");
let zomatoApi = `https://developers.zomato.com/api/v2.1/search?city_id=${cityId}&cuisines=${cuisineId}&sort=${sort}&order=${order}`;
const choise = document.getElementById("sort-order");

choise.addEventListener('click', () => {
    sort = choise.options[choise.selectedIndex].value;
    zomatoApi = `https://developers.zomato.com/api/v2.1/search?city_id=${cityId}&cuisines=${cuisineId}&sort=${sort}&order=${order}`;
    console.log("url: " + zomatoApi);
    fetchApi(zomatoApi);
});

const fetchApi = (url) => {

    // const restaurantInfo = (api) => {
    fetch(url, { headers: { "user-key": apiKey } })
        .then((response) => {
            return response.json();
        })
        .then((newyork) => {
            console.log(newyork);

            // Loop each restaurants name, address and image from API fetch
            newyork.restaurants.forEach((item) => {
                restaurantContainer.innerHTML += generateHTMLForRestaurants(item);
            });
        });
    console.log("hejhej");
};

const generateHTMLForRestaurants = (item) => {
    let imageUrl = item.restaurant.thumb;
    if (imageUrl === "") {
        imageUrl = "https://live.staticflickr.com/3185/3014198039_96f5e654ab_b.jpg";
    }

    const name = `<h2>${item.restaurant.name}</h2>`;
    const address = `<p>Address: ${item.restaurant.location.address}</p>`;
    const image = `<img src="${imageUrl}" height="200px" width="200px"/>`;
    const rating = `<p>Rating: ${item.restaurant.user_rating.rating_text}</p>`;
    const price = `<p>Price for two: $ ${item.restaurant.average_cost_for_two}</p>`;
    const openingHours = `<p>Opening hours: ${item.restaurant.timings}</p>`;

    return `<div>${image}${name}${address}${rating}${price}${openingHours}</div>`;
}

fetchApi(zomatoApi);