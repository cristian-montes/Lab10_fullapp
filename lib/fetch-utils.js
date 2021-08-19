const fetch = require('node-fetch');


// FETCH WEATHER DATA
async function getWeatherData(lat, lon){
  const apiResp = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_KEY}&lat=${lat}&lon=${lon}`);
  const apiData = await apiResp.json();
  
  const data = apiData.data.map((obj) => {
    return {
      forecast: obj.weather.description,
      time: new Date(obj.ts * 1000).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    };
  });
  return data;
}

// FETCH YELP DATA
async function getYelpData(lat, lon){
  let URL = `https://api.yelp.com/v3/businesses/search?&lat=${lat}&lon=${lon}`;
  let bearer = `Bearer ${process.env.YELP_KEY}`;

  const apiResp = await fetch(URL, {
    method: 'GET',
    withCredentials: true,
    credentials: 'include',
    headers: {
      'Authorization': bearer,
      'Content-Type': 'application/json'
    }
      
  });

  const apiData = await apiResp.json();
  const data = apiData.data.map((obj) => {
    return {
      name: obj.name,
      image_url: obj.image_url,
      price: obj.price,
      rating: obj.rating,
      url: obj.url
    };
  });
  return data;
}

module.exports = {
  getWeatherData, getYelpData
};