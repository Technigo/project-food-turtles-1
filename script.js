const apiKey = "0df34bb3167daea7d292823d2085aebd";
const cityId = 280;
const cuisineId = 162;
let sort = "cost";
sort = document.getElementById("sort-order").value;
const order = "asc";
const zomatoApi = `https://developers.zomato.com/api/v2.1/search?city_id=${cityId}&cuisines=${cuisineId}&sort=${sort}&order=${order}`;

const restaurantContainer = document.getElementById("restaurantContainer");

fetch(zomatoApi, { headers: { "user-key": apiKey } })
  .then((response) => {
    return response.json();
  })
  .then((newyork) => {
    console.log(newyork);

    // Loop each restaurants name, address and image from API fetch
    newyork.restaurants.forEach((item) => {
      const imageUrl = item.restaurant.thumb;
      if (imageUrl === "") {
        imageURL =
          "https://cdn.pixabay.com/photo/2014/09/17/20/26/restaurant-449952_960_720.jpg";
      }

      const name = item.restaurant.name;
      const address = item.restaurant.location.address;
      const image = `<img src="${imageUrl}" height="200px" width="200px"/>`;
      const rating = item.restaurant.user_rating.rating_text;
      const price = item.restaurant.average_cost_for_two;
      const openingHours = item.restaurant.timings;
      
      restaurantContainer.innerHTML += `<div>${image}
              <h2>${name}</h2>
              <p>Address: ${address}</p>
              <p>Rating: ${rating}</p>
              <p>Price for two: $${price}</p>
              <p>Opening hours: ${openingHours}</p></div>`;
    });
  });