import {
  ICityData,
  IParsedData,
  IWeatherIcon,
  IWeatherData,
} from "./Interfaces";

const searchElement: HTMLFormElement | null = document.querySelector(".search");
const weatherElemet: HTMLDivElement | null = document.querySelector(".weather");

searchElement!.addEventListener("submit", async (e) => {
  e.preventDefault();
  const cityName: HTMLInputElement = searchElement?.elements.namedItem(
    "cityName"
  ) as HTMLInputElement;

  let weatherList = await getCityWeather(cityName.value);
  if (weatherList) {
    const parsedData: IParsedData = parseData(weatherList);
    render(objectToArray(parsedData), weatherElemet!);
  }
});

async function getCityWeather(cityName: string) {
  const apiKey = "b990d220bbca1070ddbeadd51dcac407";
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`
  );
  const data = await res.json();
  if (data.cod === 404) {
    return alert("Не коректна назва міста");
  }
  return {
    weatherList: data.list as IWeatherData[],
    city: data.city as ICityData,
  };
}

function objectToArray(data: any) {
  return Object.keys(data).map((key) => {
    return {
      id: key,
      ...data[key],
    };
  });
}

const icon: IWeatherIcon = {
  Clear: "sunny.png",
  Clouds: "clouds.png",
  Rain: "rain.png",
  Sun: "sunny.png",
};
const convertTemp = (temp: number): number => Math.round(temp - 273);

function render(list: any, parent: HTMLDivElement) {
  let currentDay = String(new Date()).slice(0, 3);
  let div: HTMLDivElement = document.createElement("div");
  let ul: HTMLUListElement = document.createElement("ul");
  let str: string = "";

  div.innerHTML = "";
  ul.innerHTML = "";
  parent.innerHTML = "";

  if (currentDay === list[0].weekDay) {
    div.innerHTML = `
      <div class="current-day">
        <div class="info">
          <span>
            ${convertTemp(list[0].day.main.temp)}°C
          </span>
          <span>
            ${list[0].night.weather.main} ${convertTemp(list[0].night.main.temp)}
          </span>
        </div>
        <div class="city">
          <span>${list[0].name}</span>
          <span>${list[0].country}</span>
        </div>
        <img 
          src=./public/images/${icon[String(list[0].night.weather.main)]}
          alt=${icon[String(list[0].night.weather.main)]} 
        />
      </div>`;
    parent.append(div);
  }
  for (let i = 1; i < list.length; i++) {
    str += `
      <li>
        <div class="day">${list[i].weekDay}</div>
          <img 
            src=./public/images/${icon[String(list[i].night.weather.main)]} 
            alt=${icon[String(list[i].night.weather.main)]} 
          />
          <div class="info">Rain</div>
          <div class="temp">
            <div class="day">
              <span>Day</span>
              ${convertTemp(list[i].day.main.temp)}°C
            </div>
            <div class="night">
              ${convertTemp(list[i].night.main.temp)}°C
              <span>night</span>
            </div>
        </div>
      </li>`;
    ul.innerHTML = str;
    parent.appendChild(ul);
  }
}

function parseData(data: {
  weatherList: IWeatherData[];
  city: ICityData;
}): IParsedData {
  const preResult: any = {};
  const result: IParsedData = {};

  for (const item of data.weatherList) {
    const date = item.dt_txt.slice(0, 10);

    if (!preResult[date]) {
      preResult[date] = [];
    }

    preResult[date].push({
      dt: item.dt,
      dt_txt: item.dt_txt,
      main: item.main,
      weather: item.weather[0],
      name: data.city.name,
    });
  }

  for (const date in preResult) {
    if (preResult.hasOwnProperty(date)) {
      const dataForDate = preResult[date];
      const lastIndex = dataForDate.length - 1;

      if (lastIndex >= 2) {
        const middleIndex = Math.floor(lastIndex / 2);

        if (!result[date]) {
          preResult[date] = [];
        }

        let weekDay: string = String(
          new Date(dataForDate[lastIndex].dt_txt)
        ).slice(0, 3);

        result[date] = {
          day: dataForDate[middleIndex],
          night: dataForDate[lastIndex],
          weekDay,
          country: data.city.country,
          name: data.city.name,
        };
      } else {
        preResult[date] = dataForDate;
      }
    }
  }
  return result;
}
