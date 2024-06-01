const switchElement: HTMLDivElement | null =
  document.querySelector(".switch-theme");
const countriesElement: HTMLDivElement | null =
  document.querySelector(".countries");
const formElement: HTMLFormElement | null =
  document.querySelector(".searchByName");
const spanElement: HTMLSpanElement | null =
  document.querySelector(".searchByName span");

const selectedOption = document.querySelector(
  ".selected-option"
) as HTMLDivElement;
const optionsList = document.querySelector(".options") as HTMLUListElement;

switchElement?.addEventListener("click", () => {
  if (switchElement.classList.contains("light")) {
    document.body.classList.toggle("dark");
    switchElement.classList.toggle("dark");
  }
});

interface Country {
  countryName: string;
  population: number;
  region: string;
  capital: string;
  image: {
    path: string;
    alt: string;
  };
}

interface InputCountry {
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  region: string;
  population: number;
  capital: string;
  name: {
    common: string;
    official: string;
    nativeName: {
      ron: {
        common: string;
        official: string;
      };
    };
  };
}

const getAllCountries = async (): Promise<Country[]> => {
  const countries: Country[] = [];

  const res = await fetch("https://restcountries.com/v3.1/all");
  const data = await res.json();

  data.forEach(({ flags, name, population, capital, region }: InputCountry) => {
    countries.push({
      countryName: name.common,
      population: population,
      region,
      capital,
      image: { path: flags.png, alt: flags.alt },
    });
  });
  return countries;
};

const countries: Promise<Country[]> = getAllCountries();

const renderCountries = async (
  parent: HTMLDivElement | null,
  countries: Country[]
) => {
  if (parent) {
    parent.innerHTML = countries.reduce(
      (acc: string, country: Country) =>
        (acc += `<div class="country">
                <img src="${country.image.path}" alt="${country.image.alt}" />
                <div class="country-info">
                  <h2 class="name">${country.countryName}</h2>
                  <div class="population">Population: ${country.population}</div>
                  <div class="region">Region: ${country.region}</div>
                  <div class="capital">Capital: ${country.capital}</div>
                </div>
              </div>`),
      ""
    );
  }
};

const searchByName = async (e: any) => {
  e.preventDefault();
  const countryName: HTMLInputElement = formElement!.elements.namedItem(
    "country"
  ) as HTMLInputElement;

  const c: Country[] = await countries;

  const country: Country[] = c.filter(
    (country) => country.countryName === countryName.value
  );

  renderCountries(countriesElement, country);
};

window.addEventListener("load", async () => {
  await renderCountries(countriesElement, await countries);
});

spanElement?.addEventListener("click", (e: any) => searchByName(e));
formElement!.addEventListener("submit", (e) => searchByName(e));

selectedOption.addEventListener("click", () => {
  optionsList.classList.toggle("show");
});

optionsList.addEventListener("click", async (e) => {
  if (e.target instanceof Element) {
    const li: HTMLLIElement | null = e.target.closest("li");

    if (!li) return;

    const value: string | undefined = li!.dataset.value;

    selectedOption.innerText = li!.innerText;
    optionsList.classList.remove("show");

    if (value === "") return;

    const c = await countries;
    const countriesByRegion = c.filter((country) => country.region === value);
    renderCountries(countriesElement, countriesByRegion);
  }
});

document.addEventListener("click", (event) => {
  if (!selectedOption.contains(event.target as Node)) {
    optionsList.classList.remove("show");
  }
});
