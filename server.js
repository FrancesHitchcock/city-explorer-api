const express = require("express");

const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT || 8081;

const app = express();

app.use(cors());

const data = require("./data/weather.json");

// function filterCityByLat(latQuery) {
//   const result = data.filter((city) => city.lat == latQuery);
//   return result;
// }

function filterCityByCoOrds(latQuery, lonQuery) {
  console.log("lat", parseFloat(latQuery).toFixed(2));
  console.log("lon", parseFloat(lonQuery).toFixed(2));
  const searchedCity = data.find(
    (city) =>
      parseFloat(city.lat).toFixed() == parseFloat(latQuery).toFixed() &&
      parseFloat(city.lon).toFixed() == parseFloat(lonQuery).toFixed()
  );
  console.log(searchedCity);
  const result = searchedCity.data.map((day) => {
    return {
      description: `Low of ${day.low_temp}, high of ${
        day.max_temp
      } with ${day.weather.description.toLowerCase()}`,
      date: day.datetime,
    };
  });

  return result;
}

app.get("/", (req, res) => {
  res.json("This is the root page");
});

app.get("/weather", (req, res) => {
  let dataToReturn;
  console.log(req.query);
  if (req.query.lat && req.query.lon) {
    dataToReturn = filterCityByCoOrds(req.query.lat, req.query.lon);
  }

  //   try {
  //     res.json(dataToReturn);
  //   } catch (error) {
  //     console.log("Error: the co-ordinates are wrong");
  //   }

  if (dataToReturn) {
    res.json(dataToReturn);
  } else {
    console.log("Error: the co-ordinates are wrong");
  }

  //   console.log(req.query);
});

app.listen(PORT, () => console.log(`app is running on port ${PORT}`));
