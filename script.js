const zomatoApi = "https://developers.zomato.com/api/v2.1/search?city_id=280&cuisines=162";
const apiKey = "0df34bb3167daea7d292823d2085aebd";

const restaurantContainer = document.getElementById('restaurantContainer');

fetch(zomatoApi, { headers: { "user-key": apiKey } })
  .then((response) => {
    return response.json();
  })
.then((newyork) => {
    console.log(newyork);
    console.log(newyork.restaurants[0].restaurant.name);
        
    // Loop each restaurants name, address and image from API fetch 
    newyork.restaurants.forEach((item) => {
        const name = item.restaurant.name;
        const address = item.restaurant.location.address;
        const image = `<img src="${item.restaurant.thumb}"/>`;
        const rating = item.restaurant.user_rating.rating_text;
    
    restaurantContainer.innerHTML += `<div>${image}<h2>${name}</h2><p>Rating: ${rating}</p><p>${address}</p></div>`;
    })
  
});




/** The restaurant name
* The average cost for a dinner there
* The address of the restaurant
* An image (you choose which image you'd like to display from the response)*/