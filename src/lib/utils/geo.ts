import { Country, State } from "country-state-city";

export const getCountryIso = (nameOrCode: string): string => {
  if (!nameOrCode) return "IN";
  const countriesList = Country.getAllCountries();
  const found = countriesList.find(
    (c) =>
      c.name.toLowerCase() === nameOrCode.toLowerCase() ||
      c.isoCode.toLowerCase() === nameOrCode.toLowerCase()
  );
  return found ? found.isoCode : "IN";
};

export const getCountryOptions = () => {
  return Country.getAllCountries().map((c) => ({
    value: c.name,
    isoCode: c.isoCode,
    name: c.name,
    flag: c.flag,
  }));
};

export const getStateOptions = (countryName: string) => {
  const countryIso = getCountryIso(countryName);
  return State.getStatesOfCountry(countryIso).map((s) => ({
    value: s.name,
    label: s.name,
  }));
};
