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
    fetchApi(zomatoApi);
});

const fetchApi = (url) => {

    // const restaurantInfo = (api) => {
    fetch(url, { headers: { "user-key": apiKey } })
        .then((response) => {
            return response.json();
        })
        .then((newyork) => {

            // Loop each restaurants name, address and image from API fetch
            newyork.restaurants.forEach((item) => {
                restaurantContainer.innerHTML += generateHTMLForRestaurants(item);
            });
        });
};

const generateHTMLForRestaurants = (item) => {
    let imageUrl = item.restaurant.thumb;
    if (imageUrl === "") {
        imageUrl = "https://upload.wikimedia.org/wikipedia/commons/6/66/Xi%27an_Famous_Foods_Feast.jpg";
    }

    const name = `<h2>${item.restaurant.name}</h2>`;
    const address = `${item.restaurant.location.address}`;
    const image = `<img src="${imageUrl}" height="200px" width="200px"/>`;
    const rating = `${item.restaurant.user_rating.rating_text}`;
    const price = `${item.restaurant.average_cost_for_two}`;
    const openingHours = `${item.restaurant.timings}`;
    const map = `<img src="./map.png" height="30px" width="30px"/>`;
    const review = `<img src="./review.png" height="30px" width="30px"/>`;
    const dollar = `<img src="./money.png" height="30px" width="30px"/>`;
    const clock = `<img src="./clock.png" height="30px" width="30px"/>`;

    //return `<div>${image}${name}${address}${rating}${price}${openingHours}</div>`;
    return `<div class="eachrestaurant">${image}
              ${name}
              <p class="wrapper">${map} ${address}</p>
              <p class="wrapper">${review}&nbsp ${rating}</p>
              <p class="wrapper">${dollar}&nbsp $${price}</p>
              <p class="wrapper">${clock} ${openingHours}</p></div>`;
}

fetchApi(zomatoApi);