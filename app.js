const year = new Date().getFullYear();

document.querySelector(".year").innerHTML = year;

const apiKeyIpinfo = "4ef2363664dff5";
const apiUrlIpinfo = "https://ipinfo.io/json?";

const apiKey = "7cf07fb8a3dd94e445e32d41b06de28d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

const ipInfoUrl = `${apiUrlIpinfo}token=${apiKeyIpinfo}`;

const locationInput = document.querySelector(".location");
const locationSearchBtn = document.querySelector(".searcher");

locationSearchBtn.addEventListener("click", () => {
  const location = locationInput.value;
  if (location) {
    getLocationBySearch(location);
  } else {
    console.log("failed to retrieve any data");
  }
});

// get user location .....
async function getResponse() {
  return new Promise((resolve, reject) => {
    fetch(ipInfoUrl)
      .then((response) => {
        if (!response) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// then use the user location to get the weather
const dataPromise = getResponse();

dataPromise
  .then((data) => {
    let city = data.city;
    console.log(city);

    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  })
  .catch((error) => {
    console.error(error);
  });

// search field control
//
function getLocationBySearch(location) {
  const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}
