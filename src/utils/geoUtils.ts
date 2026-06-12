import { Country, State } from "country-state-city";

/**
 * Maps a country's full name (or ISO code) to its standard 2-letter ISO code.
 * Defaults to "IN" (India).
 */
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

/**
 * Returns the dynamic list of all countries.
 */
export const getCountryOptions = () => {
  return Country.getAllCountries().map((c) => ({
    value: c.name,
    isoCode: c.isoCode,
    name: c.name,
    flag: c.flag,
  }));
};

/**
 * Returns the dynamic list of states for a given country name (resolved to ISO first).
 */
export const getStateOptions = (countryName: string) => {
  const countryIso = getCountryIso(countryName);
  return State.getStatesOfCountry(countryIso).map((s) => ({
    value: s.name,
    label: s.name,
  }));
};
