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
      const map = `<img src="./map.png" height="30px" width="30px"/>`;
      const review = `<img src="./review.png" height="30px" width="30px"/>`;
      const dollar = `<img src="./money.png" height="30px" width="30px"/>`;
      const clock = `<img src="./clock.png" height="30px" width="30px"/>`;
      
      restaurantContainer.innerHTML += `<div class="eachrestaurant">${image}
              <h2>${name}</h2>
              <p class="wrapper">${map} ${address}</p>
              <p class="wrapper">${review}&nbsp ${rating}</p>
              <p class="wrapper">${dollar}&nbsp $${price}</p>
              <p class="wrapper">${clock} ${openingHours}</p></div>`;
    });
  });